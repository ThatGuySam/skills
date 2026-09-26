"""Exercise rejection cases for the recorded raw-JSON output contract."""
import unittest

from check import meeting_brief, strict_total


class OutputContractTests(unittest.TestCase):
    def test_question_limit_across_markdown_lists(self):
        base = "## Decisions\nApproved.\n## Owners\nUnassigned\n## Open questions\n"
        for marker in ("-", "*", "+", "1.", "1)"):
            questions = [f"{marker} What is item {i}?" for i in range(3)]
            with self.subTest(marker=marker):
                meeting_brief(base + "\n".join(questions[:2]))
                with self.assertRaises(AssertionError):
                    meeting_brief(base + "\n".join(questions))
        with self.assertRaises(AssertionError):
            meeting_brief(base + "Date? Budget? Venue?")

    def test_valid_and_invalid_results(self):
        strict_total('{"status":"ok","total_cents":375}', "ok", 375)
        strict_total('{"status":"invalid","total_cents":null}', "invalid", None)

    def test_rejects_contract_violations(self):
        invalid = [
            '```json\n{"status":"ok","total_cents":375}\n```',
            '{"status":"ok","total_cents":375} Done.',
            '{"status":"ok","total_cents":"375"}',
            '{"status":"ok","total_cents":true}',
            '{"status":"ok","total_cents":375.0}',
            '{"status":"ok","total_cents":374}',
            '{"status":"ok","total_cents":375,"extra":1}',
            '{"status":"ok","total_cents":0,"total_cents":375}',
            '[]',
        ]
        for response in invalid:
            with self.subTest(response=response), self.assertRaises((AssertionError, ValueError)):
                strict_total(response, "ok", 375)


if __name__ == "__main__":
    unittest.main()
