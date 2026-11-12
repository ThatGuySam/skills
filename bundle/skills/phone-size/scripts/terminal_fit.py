#!/usr/bin/env python3
"""Check a draft reply against a phone terminal grid.

Two commands, standard library only, Python 3.9 or later:

  terminal_fit.py grid
      Report the size of the terminal that displays this agent session.
      A tool shell usually has no terminal of its own, so `tput cols`
      answers 80 whatever the reader's screen is. This looks at the
      terminal of the nearest ancestor process that has one.

  terminal_fit.py check [--columns N] [--rows N] [--gutter N] FILE|-
      Measure a Markdown draft in display columns. Lines inside fenced
      blocks and Markdown tables do not reflow, so each must fit.
      Prose is wrapped the way a terminal would wrap it, to count rows.

The grid defaults to PHONE_SIZE_COLUMNS and PHONE_SIZE_ROWS when they are
set, otherwise to the assumed 40 by 20 described in references/terminal.md.

Exit status for check: 0 when every fixed-width line fits, 1 when one does
not, 2 for a usage error. A row count over budget is reported, not failed.
"""

import argparse
import fcntl
import os
import struct
import subprocess
import sys
import termios
import unicodedata

ASSUMED_COLUMNS = 40
ASSUMED_ROWS = 20
DEFAULT_GUTTER = 2
TAB_STOP = 8

ZERO_WIDTH_JOINER = 0x200D
EMOJI_PRESENTATION = 0xFE0F
KEYCAP = 0x20E3


def is_emoji_block(code):
    """Emoji ranges that older Unicode tables may not know are wide."""
    return (
        0x1F300 <= code <= 0x1F64F
        or 0x1F680 <= code <= 0x1F6FF
        or 0x1F900 <= code <= 0x1FAFF
    )


def is_skin_tone(code):
    return 0x1F3FB <= code <= 0x1F3FF


def is_zero_width(char):
    code = ord(char)
    if code == ZERO_WIDTH_JOINER or code == KEYCAP or is_skin_tone(code):
        return True
    if unicodedata.combining(char):
        return True
    return unicodedata.category(char) in ("Mn", "Me", "Cf", "Cc")


def char_width(char):
    if is_zero_width(char):
        return 0
    if is_emoji_block(ord(char)):
        return 2
    if unicodedata.east_asian_width(char) in ("W", "F"):
        return 2
    return 1


def display_width(text):
    """Columns a monospace terminal uses for text.

    An emoji counts 2. So does a symbol followed by the emoji variation
    selector, and a joined emoji sequence counts as its first emoji.
    Terminals disagree about those two cases; 2 is the safe count.
    """
    width = 0
    last = 0
    joined = False
    for char in text:
        code = ord(char)
        if char == "\t":
            last = TAB_STOP - (width % TAB_STOP)
            width += last
            continue
        if code == ZERO_WIDTH_JOINER:
            joined = True
            continue
        if code == EMOJI_PRESENTATION:
            if last == 1:
                width += 1
                last = 2
            continue
        if joined:
            joined = False
            continue
        this = char_width(char)
        if this:
            last = this
        width += this
    return width


def wrapped_rows(text, columns):
    """Rows used when a terminal wraps this prose line at word breaks."""
    words = text.split()
    if not words:
        return 1
    rows = 1
    used = 0
    for word in words:
        width = display_width(word)
        if used and used + 1 + width <= columns:
            used += 1 + width
            continue
        if used:
            rows += 1
        rows += (width - 1) // columns
        used = width % columns or columns
    return rows


def fence_marker(line):
    stripped = line.lstrip()
    for mark in ("```", "~~~"):
        if stripped.startswith(mark):
            return mark
    return None


def is_table_row(line):
    return line.lstrip().startswith("|")


def table_cells(line):
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def is_table_rule(line):
    cells = table_cells(line)
    return all(cell and set(cell) <= set("-: ") for cell in cells)


def rendered_table_width(lines):
    """Width of the table once drawn with one border and padding per cell."""
    widths = []
    for line in lines:
        if is_table_rule(line):
            continue
        for index, cell in enumerate(table_cells(line)):
            cell_width = display_width(cell)
            if index == len(widths):
                widths.append(cell_width)
            else:
                widths[index] = max(widths[index], cell_width)
    return sum(widths) + 3 * len(widths) + 1


def measure(text, columns, gutter):
    """Return the facts about a draft at this grid."""
    usable = columns - gutter
    fixed = []  # (line number, width) for lines that cannot reflow
    tables = []  # (first line number, rendered width)
    long_tokens = []  # (line number, width) in prose
    rows = 0
    open_fence = None
    table = []
    table_start = 0

    def close_table():
        nonlocal rows
        if table:
            tables.append((table_start, rendered_table_width(table)))
            rows += len(table) + 2
            table.clear()

    for number, line in enumerate(text.splitlines(), start=1):
        marker = fence_marker(line)
        if open_fence:
            if marker == open_fence:
                open_fence = None
                continue
            width = display_width(line.rstrip())
            fixed.append((number, width))
            rows += max(1, -(-width // usable))
            continue
        if marker:
            close_table()
            open_fence = marker
            continue
        if is_table_row(line):
            if not table:
                table_start = number
            table.append(line)
            continue
        close_table()
        rows += wrapped_rows(line, usable)
        for word in line.split():
            width = display_width(word)
            if width > usable:
                long_tokens.append((number, width))
    close_table()

    return {
        "usable": usable,
        "fixed": fixed,
        "tables": tables,
        "long_tokens": long_tokens,
        "rows": rows,
    }


def env_number(name):
    value = os.environ.get(name, "")
    return int(value) if value.isdigit() and int(value) > 0 else None


def run_check(args):
    env_columns = env_number("PHONE_SIZE_COLUMNS")
    env_rows = env_number("PHONE_SIZE_ROWS")
    columns = args.columns or env_columns or ASSUMED_COLUMNS
    row_budget = args.rows or env_rows or ASSUMED_ROWS
    if args.columns:
        source = "given on the command line"
    elif env_columns:
        source = "PHONE_SIZE_COLUMNS"
    else:
        source = "assumed default, not measured"
    if columns - args.gutter < 10:
        print("error: fewer than 10 usable columns", file=sys.stderr)
        return 2

    if args.file == "-":
        text = sys.stdin.read()
    else:
        with open(args.file, encoding="utf-8") as handle:
            text = handle.read()

    facts = measure(text, columns, args.gutter)
    usable = facts["usable"]
    over_lines = [(n, w) for n, w in facts["fixed"] if w > usable]
    over_tables = [(n, w) for n, w in facts["tables"] if w > usable]
    widest = max((w for _, w in facts["fixed"]), default=0)

    print(
        "grid: {} columns - {} gutter = {} usable, {} rows ({})".format(
            columns, args.gutter, usable, row_budget, source
        )
    )
    if facts["fixed"] or facts["tables"]:
        print(
            "fixed-width lines: {}, widest {} of {}".format(
                len(facts["fixed"]), widest, usable
            )
        )
    else:
        print("fixed-width lines: none, prose only")
    for number, width in over_lines:
        print("  OVER line {}: {} columns, {} too many".format(
            number, width, width - usable))
    for number, width in facts["tables"]:
        state = "OVER" if width > usable else "fits"
        print("  table at line {}: about {} columns drawn, {}".format(
            number, width, state))
    for number, width in facts["long_tokens"]:
        print("  long token line {}: {} columns, will break mid-token".format(
            number, width))
    over_rows = facts["rows"] - row_budget
    if over_rows > 0:
        print("rows: about {}, {} over one screen; it scrolls".format(
            facts["rows"], over_rows))
    else:
        print("rows: about {}, within one screen".format(facts["rows"]))

    if over_lines or over_tables:
        print("result: DOES NOT FIT the columns")
        return 1
    print("result: fits the columns")
    return 0


def window_size(device):
    """Rows and columns of a terminal device, or None."""
    try:
        handle = os.open(device, os.O_RDONLY | os.O_NOCTTY | os.O_NONBLOCK)
    except OSError:
        return None
    try:
        packed = fcntl.ioctl(handle, termios.TIOCGWINSZ, b"\0" * 8)
    except OSError:
        return None
    finally:
        os.close(handle)
    rows, columns = struct.unpack("HHHH", packed)[:2]
    return (rows, columns) if rows and columns else None


def process_info(pid):
    """Parent pid, terminal name and command of a process."""
    result = subprocess.run(
        ["ps", "-o", "ppid=,tty=,comm=", "-p", str(pid)],
        capture_output=True,
        text=True,
        check=False,
    )
    parts = result.stdout.split(None, 2)
    if len(parts) < 2:
        return None
    command = os.path.basename(parts[2].strip()) if len(parts) > 2 else ""
    return int(parts[0]), parts[1], command


def run_grid(_args):
    for stream in (sys.stdout, sys.stderr, sys.stdin):
        if stream.isatty():
            size = os.get_terminal_size(stream.fileno())
            print("columns={} rows={} source=own-terminal".format(
                size.columns, size.lines))
            return 0

    pid = os.getpid()
    for _ in range(16):
        info = process_info(pid)
        if not info:
            break
        parent, terminal, command = info
        if terminal not in ("?", "??", "-"):
            device = "/dev/" + terminal
            size = window_size(device)
            if size:
                print(
                    "columns={} rows={} source=ancestor-terminal "
                    "device={} process={}".format(
                        size[1], size[0], device, command)
                )
                return 0
        if parent <= 1:
            break
        pid = parent

    print("no terminal found; a tool shell's 80x24 is not a measurement")
    return 1


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Check a draft reply against a phone terminal grid."
    )
    commands = parser.add_subparsers(dest="command", required=True)

    grid = commands.add_parser(
        "grid", help="report the size of the terminal showing this session"
    )
    grid.set_defaults(run=run_grid)

    check = commands.add_parser(
        "check", help="measure a Markdown draft in display columns"
    )
    check.add_argument("file", help="draft file, or - for standard input")
    check.add_argument("--columns", type=int, help="terminal columns")
    check.add_argument("--rows", type=int, help="rows that count as one screen")
    check.add_argument(
        "--gutter",
        type=int,
        default=DEFAULT_GUTTER,
        help="columns the agent's interface indents a reply (default 2)",
    )
    check.set_defaults(run=run_check)

    args = parser.parse_args(argv)
    return args.run(args)


if __name__ == "__main__":
    sys.exit(main())
