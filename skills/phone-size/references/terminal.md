# Size a terminal reply for a phone

A terminal is a fixed grid of character cells. Prose reflows to fit it. Fenced blocks, trees, tables and long unbroken tokens do not: a line one column too wide wraps mid-branch or runs off the side. On a phone the grid is narrow, so those are the parts to size.

## When this applies

Use this when the reply itself is drawn by a terminal: you are answering in a command-line agent session such as Claude Code or Codex CLI, or printing text the reader watches in a shell. A desktop, web or IDE chat that renders Markdown in a proportional font is not a terminal; use [destination guidance](destinations.md) there.

Size only what the terminal displays. Content bound for another app, such as an issue description, an email or an HTML file, keeps that app's format even when you show its draft in the session.

## Assume the phone

You can tell that output goes to a terminal. You usually cannot tell that the reader is holding a phone. So treat every terminal reply this skill shapes as read on a phone, and pick the grid from the first of these that exists:

1. What the user says now: "I'm at my desk", "use the full width", or a size.
2. A phone terminal size the user has recorded, in `PHONE_SIZE_COLUMNS` and `PHONE_SIZE_ROWS` or in their agent instructions or memory.
3. A live measurement that you know comes from a phone client.
4. The assumed grid below.

A live measurement from a desktop window does not widen the grid, because the same session is often read later from the phone. A live measurement narrower than the grid you chose always wins.

## The grid

| | Assumed | Basis |
| --- | --- | --- |
| Terminal columns | 40 | Assumption. By arithmetic, not measurement: a phone 375 points wide or more shows at least 40 columns at text sizes up to 15 points, taking a monospace cell as 0.6 of the text size and ignoring padding. |
| Reply gutter | 2 | Measured: Claude Code 2.1 indents reply text and fenced blocks by 2 columns. Assumed for other interfaces. |
| Usable columns | 38 | Columns minus gutter. |
| Rows in one screen | 20 | Assumption, not derived from a measurement. It stands for what is left for the reply in portrait once the keyboard and the agent's prompt and status rows are showing. |

No phone terminal was measured for these numbers. Replace them with a real reading when one exists: in a shell tab on the phone, at the usual text size, `stty size` prints rows then columns.

Columns are a hard limit for anything that does not reflow. Rows are a budget: 20 rows at 38 columns hold roughly 80 to 100 words of prose. The terminal leaves the reader at the end of the reply, so every row past one screen costs a scroll back up. When a draft runs over, first cut what is yours to cut. Required wording may exceed the rows. It may never exceed the columns.

## Measure when you can

Inside an agent's tool call, `tput cols`, `$COLUMNS` and `stty size` describe the tool's pipe, not the reader's screen. Measured in a Claude Code tool shell on a 77-column terminal: `tput cols` printed 80, `$COLUMNS` was 0, and `stty size` failed with "stdin isn't a terminal". Treat 80 by 24 from a tool shell as no measurement.

`python3 scripts/terminal_fit.py grid` reads the terminal of the nearest ancestor process that has one, which is the agent session's own. It returned the true 77 by 67 in that test, on macOS. It is untested in a sandbox that hides parent processes or terminal devices; when it finds nothing it says so.

That size belongs to whichever client is showing the session at that moment. Call it a phone measurement only when the client is identified as a phone. A multiplexer may tell you: under Rex, `rex block call size` returns the grid and its owning client, and `rex client inspect <owner>` returns that client's platform. Without that, use the smaller of the measurement and the grid you chose.

## Fit what does not reflow

- **Count display columns, not characters.** An emoji or a CJK character takes 2 columns. A symbol followed by the emoji variation selector, and a joined emoji sequence, count 2; terminals disagree about those and 2 is the safe count. Box-drawing characters and arrows take 1. Combining marks take 0.
- **Prose:** write ordinary paragraphs and list items and let the terminal wrap them. Do not insert line breaks to pre-wrap prose; a hard-wrapped paragraph breaks raggedly at any narrower width.
- **Fenced blocks:** every line fits the usable columns.
- **Code, commands, diffs and logs** that the reader will copy or compare stay exact. Never re-wrap them to fit. Say that the block is wider than the phone grid.
- **Tables:** a drawn table needs the widest cell of each column plus 3 columns per column plus 1. If that exceeds the usable columns, write each row as a short record instead: a label line, then one `name: value` line per field.
- **URLs and paths:** keep each long one whole, on a line of its own, outside any fence or tree. It will break across rows, but alone it disturbs nothing else. Never shorten a URL with an ellipsis. Prefer a path relative to the project root when that still identifies the file.

## Trees

Keep the tree's own format; this only makes it fit.

Each level costs 4 columns and a marker costs 3, so at 38 usable columns a second-level row has 27 columns of text and a third-level row has 23. Prefer two levels. Keep a third only for short labels; otherwise give each top group its own small tree under a plain heading line.

When a label is yours to word, shorten it to one row. When it is a quote, a personal note or any wording that must survive, keep every word and wrap it:

- Break only between words.
- On each continuation row, copy the row's prefix but replace its own connector: `├── ` becomes `│   `, and `└── ` becomes four spaces. Ancestor `│` columns stay where they are, so no branch is cut. The text then starts under the row's marker.
- Keep an ID whole with its arrow. Put it at the end of the last row, or on a continuation row of its own.

A synthetic example, 35 columns at its widest:

```text
Site review · May 4
├── 🔴 Urgent
│   └── 🎗️ Move the description
│       under the player and turn
│       the button into a ribbon
│       → T-128
└── 🟠 Next
    ├── 🧭 Put search in the header
    │   → T-130
    └── 📱 Make the donate button
        easier to tap on mobile
        → T-131
```

## Check, then say what you checked

Save the draft reply to a file and run the script bundled in this skill's directory:

```sh
python3 scripts/terminal_fit.py check draft.md
```

Pass `--columns` and `--rows` for a stated or measured grid, or `-` to read standard input. It subtracts the gutter, reports the widest fixed-width line, names each line or table that is over, flags long tokens, and estimates rows. Exit status 1 means a fixed-width line does not fit: fix the named lines and rerun until it exits 0.

Counting columns is not seeing the screen. End the reply with one short line that says which you did, in place of "Phone fit unverified":

- Assumed grid, with the counts the script printed. For the tree above: `Fit: counted, 35 of 38 columns, 12 rows; assumed 40-column phone terminal, not seen.`
- Recorded or measured phone grid: name it in place of the assumption, as in `Fit: counted, W of U columns, N rows; your recorded C-column phone terminal, not seen.` with the real numbers.
- Nothing fixed-width in the reply: say `prose only` in place of the column count.
- Over the rows: add `It scrolls.` and keep the brief at the top.
- Not counted, because the script could not run: `Phone fit unverified.`

Claim that the fit was seen only after inspecting a screenshot or capture from the phone client itself.
