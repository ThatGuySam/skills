"""Tests for terminal_fit.py. Run: python3 -m unittest discover -s scripts"""

import contextlib
import io
import os
import tempfile
import unittest

import terminal_fit


class DisplayWidthTest(unittest.TestCase):
    def test_plain_text_counts_one_column_per_character(self):
        self.assertEqual(terminal_fit.display_width("abc def"), 7)

    def test_tree_connectors_count_one_column_each(self):
        self.assertEqual(terminal_fit.display_width("│   ├── "), 8)

    def test_emoji_counts_two_columns(self):
        self.assertEqual(terminal_fit.display_width("🔴 P0"), 5)

    def test_symbol_with_emoji_selector_counts_two_columns(self):
        self.assertEqual(terminal_fit.display_width("🏷️ x"), 4)
        self.assertEqual(terminal_fit.display_width("❤️"), 2)

    def test_joined_emoji_sequence_counts_as_one_emoji(self):
        family = "\U0001F468‍\U0001F469‍\U0001F467"
        self.assertEqual(terminal_fit.display_width(family), 2)

    def test_skin_tone_adds_no_columns(self):
        self.assertEqual(terminal_fit.display_width("\U0001F44D\U0001F3FD"), 2)

    def test_wide_cjk_counts_two_columns(self):
        self.assertEqual(terminal_fit.display_width("日本"), 4)

    def test_combining_mark_adds_no_columns(self):
        self.assertEqual(terminal_fit.display_width("é"), 1)

    def test_arrow_counts_one_column(self):
        self.assertEqual(terminal_fit.display_width("→ T-135"), 7)


class MeasureTest(unittest.TestCase):
    def test_fenced_lines_are_fixed_and_fence_markers_take_no_rows(self):
        facts = terminal_fit.measure("```text\nabc\n```\n", 40, 2)
        self.assertEqual(facts["fixed"], [(2, 3)])
        self.assertEqual(facts["rows"], 1)

    def test_prose_wraps_at_word_breaks(self):
        line = " ".join(["word"] * 16)  # 79 columns
        facts = terminal_fit.measure(line, 40, 2)
        self.assertEqual(facts["fixed"], [])
        self.assertEqual(facts["rows"], 3)

    def test_long_token_in_prose_is_reported(self):
        url = "https://example.com/" + "a" * 40
        facts = terminal_fit.measure("See " + url, 40, 2)
        self.assertEqual(facts["long_tokens"], [(1, 60)])

    def test_table_width_uses_the_widest_cell_of_each_column(self):
        table = "| a | bbbb |\n| --- | --- |\n| cccccc | d |\n"
        facts = terminal_fit.measure(table, 40, 2)
        self.assertEqual(facts["tables"], [(1, 6 + 4 + 3 * 2 + 1)])


class CheckCommandTest(unittest.TestCase):
    def run_check(self, text, *extra):
        with tempfile.NamedTemporaryFile(
            "w", suffix=".md", delete=False, encoding="utf-8"
        ) as handle:
            handle.write(text)
        self.addCleanup(os.unlink, handle.name)
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            status = terminal_fit.main(["check", *extra, handle.name])
        return status, output.getvalue()

    def setUp(self):
        for name in ("PHONE_SIZE_COLUMNS", "PHONE_SIZE_ROWS"):
            if name in os.environ:
                self.addCleanup(os.environ.__setitem__, name, os.environ[name])
                del os.environ[name]

    def test_narrow_tree_fits_the_assumed_grid(self):
        status, output = self.run_check("```text\n├── 🔴 P0\n└── 🟠 P1\n```\n")
        self.assertEqual(status, 0)
        self.assertIn("assumed default, not measured", output)
        self.assertIn("result: fits the columns", output)

    def test_wide_fenced_line_fails_and_names_the_line(self):
        status, output = self.run_check("```text\n" + "x" * 39 + "\n```\n")
        self.assertEqual(status, 1)
        self.assertIn("OVER line 2: 39 columns, 1 too many", output)

    def test_measured_columns_replace_the_default(self):
        status, output = self.run_check(
            "```text\n" + "x" * 39 + "\n```\n", "--columns", "57"
        )
        self.assertEqual(status, 0)
        self.assertIn("57 columns - 2 gutter = 55 usable", output)

    def test_environment_grid_is_named_as_the_source(self):
        os.environ["PHONE_SIZE_COLUMNS"] = "50"
        self.addCleanup(os.environ.pop, "PHONE_SIZE_COLUMNS", None)
        status, output = self.run_check("short\n")
        self.assertEqual(status, 0)
        self.assertIn("50 columns", output)
        self.assertIn("PHONE_SIZE_COLUMNS", output)
        self.assertIn("fixed-width lines: none, prose only", output)

    def test_rows_over_budget_are_reported_without_failing(self):
        status, output = self.run_check("line\n" * 30)
        self.assertEqual(status, 0)
        self.assertIn("10 over one screen", output)


if __name__ == "__main__":
    unittest.main()
