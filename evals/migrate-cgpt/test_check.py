"""Regression checks for recorded evidence, including optimized Python runs."""
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from check import ROOT, ValidationError, digest, meeting_brief, strict_total


class OutputContractTests(unittest.TestCase):
    def test_question_limit_across_markdown_lists(self):
        base = "## Decisions\nApproved.\n## Owners\nUnassigned\n## Open questions\n"
        for marker in ("-", "*", "+", "1.", "1)"):
            questions = [f"{marker} What is item {i}?" for i in range(3)]
            with self.subTest(marker=marker):
                meeting_brief(base + "\n".join(questions[:2]))
                with self.assertRaises(ValidationError):
                    meeting_brief(base + "\n".join(questions))
        with self.assertRaises(ValidationError):
            meeting_brief(base + "Date? Budget? Venue?")

    def test_brief_headings_and_word_limit(self):
        invalid = [
            "## Decisions\nApproved.",
            "## Owners\nUnassigned\n## Decisions\nApproved.\n## Open questions\nNone.",
            "## Decisions\n" + "word " * 100 + "\n## Owners\nUnassigned\n## Open questions\nNone.",
        ]
        for response in invalid:
            with self.subTest(response=response), self.assertRaises(ValidationError):
                meeting_brief(response)

    def test_valid_and_invalid_results(self):
        strict_total('{"status":"ok","total_cents":375}', "ok", 375)
        strict_total('{"status":"invalid","total_cents":null}', "invalid", None)
        strict_total('{"status":"ok","total_cents":0}', "ok", 0)

    def test_rejects_contract_violations(self):
        invalid = [
            '```json\n{"status":"ok","total_cents":375}\n```',
            '{"status":"ok","total_cents":375} Done.',
            '{"status":"ok","total_cents":"375"}',
            '{"status":"ok","total_cents":true}',
            '{"status":"ok","total_cents":375.0}',
            '{"status":"ok","total_cents":374}',
            '{"status":"ok","total_cents":null}',
            '{"status":"wrong","total_cents":375}',
            '{"status":"ok","total_cents":375,"extra":1}',
            '{"status":"ok","total_cents":0,"total_cents":375}',
            '[]',
            'null',
            '{"status":"ok"}',
        ]
        for response in invalid:
            with self.subTest(response=response), self.assertRaises(ValueError):
                strict_total(response, "ok", 375)
        with self.assertRaises(ValidationError):
            strict_total('{"status":"invalid","total_cents":0}', "invalid", None)


class RecordedEvidenceTests(unittest.TestCase):
    """Only disposable copies are mutated; test the actual CLI in both modes."""

    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name) / "eval"
        shutil.copytree(ROOT, self.root, ignore=shutil.ignore_patterns("__pycache__"))
        self.run_dir = self.root / "results/2026-09-26"
        self.run_path = self.run_dir / "run.json"
        self.run = json.loads(self.run_path.read_text())

    def case(self, case_id):
        return next(case for case in self.run["cases"] if case["id"] == case_id)

    def write_run(self):
        self.run_path.write_text(json.dumps(self.run))

    def change_response(self, case_id, probe_id, text):
        path = self.run_dir / case_id / "responses" / f"{probe_id}.txt"
        path.write_text(text)
        self.case(case_id)["responses"][probe_id] = digest(path)
        self.write_run()

    def change_artifact(self, case_id, target, text):
        info = self.case(case_id)["files"][target]
        path = self.run_dir / case_id / info["artifact"]
        path.write_text(text)
        info["sha256"] = digest(path)
        self.write_run()

    def check_cli(self, failure=None):
        for mode in ([], ["-O"]):
            with self.subTest(mode="optimized" if mode else "normal"):
                result = subprocess.run(
                    [sys.executable, *mode, str(self.root / "check.py"), str(self.run_dir)],
                    capture_output=True, text=True, check=False,
                )
                if failure is None:
                    self.assertEqual(result.returncode, 0, result.stderr)
                    self.assertIn("PASS: 6 cases, 9 retained files, 8 response hashes", result.stdout)
                    self.assertIn("PASS: 2 revised conversions, 11 recorded responses.", result.stdout)
                else:
                    self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
                    self.assertIn("FAIL: ", result.stderr)
                    self.assertIn(failure, result.stderr)
                    self.assertNotIn("PASS:", result.stdout)

    def test_retained_run_passes(self):
        self.check_cli()

    def test_changed_requirements_fail_with_same_case_ids(self):
        path = self.root / "expected.json"
        requirements = json.loads(path.read_text())
        requirements["actions"][0] = "A different requirement."
        path.write_text(json.dumps(requirements))
        self.check_cli("expected requirements changed")

    def test_missing_requirements_digest_fails(self):
        del self.run["expected_sha256"]
        self.write_run()
        self.check_cli("expected_sha256 is missing")

    def test_fixture_corruption_fails(self):
        with (self.root / "fixtures/actions.json").open("a") as fixture:
            fixture.write("\n")
        self.check_cli("fixture changed after run")

    def test_artifact_corruption_fails(self):
        with (self.run_dir / "actions/generated-skill.txt").open("a") as artifact:
            artifact.write("\nchanged\n")
        self.check_cli("changed artifact")

    def test_response_corruption_fails(self):
        (self.run_dir / "strict-output/responses/valid.txt").write_text("corrupt")
        self.check_cli("changed response")

    def test_revised_artifact_corruption_fails_without_partial_pass(self):
        (self.run_dir / "revised/strict-output/evidence/responses/valid.txt").write_text("corrupt")
        self.check_cli("changed rerun artifact")

    def test_duplicate_case_fails(self):
        self.run["cases"].append(self.run["cases"][0])
        self.write_run()
        self.check_cli("duplicate case")

    def test_missing_case_fails(self):
        self.run["cases"].pop()
        self.write_run()
        self.check_cli("incomplete suite")

    def test_unknown_case_fails(self):
        self.run["scope"] = "partial"
        self.run["cases"][0]["id"] = "unknown-case"
        self.write_run()
        self.check_cli("unknown case")

    def test_missing_skill_fails(self):
        del self.case("actions")["files"]["SKILL.md"]
        self.write_run()
        self.check_cli("missing SKILL.md")

    def test_unsafe_target_paths_fail(self):
        files = self.case("actions")["files"]
        for target in ("../escape.md", str(self.root / "escape.md")):
            with self.subTest(target=target):
                files[target] = files["SKILL.md"]
                self.write_run()
                self.check_cli("unsafe target path")
                del files[target]

    def test_artifact_path_escape_fails(self):
        info = self.case("actions")["files"]["SKILL.md"]
        outside = self.run_dir / "assessment.md"
        symlink = self.run_dir / "actions/outside.txt"
        symlink.symlink_to(outside)
        for artifact in ("../assessment.md", str(outside), "outside.txt"):
            with self.subTest(artifact=artifact):
                info.update(artifact=artifact, sha256=digest(outside))
                self.write_run()
                self.check_cli("artifact outside case folder")

    def test_revised_path_escape_fails(self):
        path = self.run_dir / "revised.json"
        revised = json.loads(path.read_text())
        revised["artifacts"]["../../expected.json"] = digest(self.root / "expected.json")
        path.write_text(json.dumps(revised))
        self.check_cli("rerun artifact outside run folder")

    def test_missing_linked_resource_fails_after_rehash(self):
        self.change_artifact("actions", "SKILL.md", "[Missing](references/missing.md)")
        self.check_cli("missing resource")

    def test_missing_response_fails(self):
        del self.case("actions")["responses"]["unavailable-action"]
        self.write_run()
        self.check_cli("response probe IDs do not match fixture")

    def test_empty_response_fails_after_rehash(self):
        self.change_response("actions", "unavailable-action", "\n ")
        self.check_cli("empty response")

    def test_json_contract_fails_after_rehash(self):
        for response, failure in (
            ('{"status":"ok","total_cents":375.0}', "unexpected total_cents"),
            ('{"status":"ok","total_cents":0,"total_cents":375}', "duplicate JSON key"),
        ):
            with self.subTest(response=response):
                self.change_response("strict-output", "valid", response)
                self.check_cli(failure)

    def test_brief_contract_fails_after_rehash(self):
        self.change_response("instruction-only", "normal", "Wrong headings")
        self.check_cli("brief must have")

    def test_policy_copy_fails_after_rehash(self):
        self.change_artifact("missing-knowledge", "references/policy-v3.md", "Changed policy")
        self.check_cli("copied policy does not match")

    def test_fabricated_missing_knowledge_fails(self):
        path = self.run_dir / "missing-knowledge/fees-2026.csv"
        path.write_text("synthetic,placeholder\n")
        self.case("missing-knowledge")["files"]["fees-2026.csv"] = {
            "artifact": "fees-2026.csv", "sha256": digest(path),
        }
        self.write_run()
        self.check_cli("missing knowledge file must not be fabricated")

    def test_action_schema_fails_after_rehash(self):
        self.change_artifact("actions", "references/inventory.openapi.json", "{}")
        self.check_cli("saved Action schema does not match")

    def test_action_payload_fails_after_rehash(self):
        for response, failure in (
            ("No payload", "must contain one JSON payload"),
            ('```json\n{"sku":"TEST_SKU_A","quantity":3}\n```', "unexpected payload"),
        ):
            with self.subTest(response=response):
                self.change_response("actions", "unavailable-action", response)
                self.check_cli(failure)


if __name__ == "__main__":
    unittest.main()
