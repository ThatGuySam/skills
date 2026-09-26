#!/usr/bin/env python3
"""Check retained artifacts and response constraints, without rerunning a model."""

import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def strict_total(text, status, total):
    """Reject wrappers, duplicate/extra keys, wrong JSON types, and wrong values."""
    def unique(pairs):
        result = {}
        for key, value in pairs:
            assert key not in result, f"duplicate JSON key: {key}"
            result[key] = value
        return result

    value = json.loads(text, object_pairs_hook=unique)
    assert isinstance(value, dict) and set(value) == {"status", "total_cents"}
    assert value["status"] == status
    actual = value["total_cents"]
    assert actual is None if total is None else type(actual) is int and actual == total


def meeting_brief(text):
    """Check the recorded Markdown briefs; content still needs semantic review."""
    headings = re.findall(r"^#{1,6}\s+(.+)$", text, re.M)
    assert headings == ["Decisions", "Owners", "Open questions"]
    assert len(text.split()) <= 100
    questions = re.split(r"^#{1,6}\s+Open questions\s*$", text, flags=re.M)[1]
    items = re.findall(r"^\s*(?:[-*+]|\d+[.)])\s+", questions, re.M)
    assert max(len(items), questions.count("?")) <= 2


def check(run_dir):
    run = json.loads((run_dir / "run.json").read_text())
    expected = json.loads((ROOT / "expected.json").read_text())
    ids = [case["id"] for case in run["cases"]]
    assert len(set(ids)) == len(ids), "duplicate case"
    if run.get("scope", "full") == "full":
        assert set(ids) == set(expected), "incomplete suite"
    checked_files = checked_responses = 0
    for case in run["cases"]:
        case_id = case["id"]
        assert case_id in expected
        fixture_path = ROOT / "fixtures" / f"{case_id}.json"
        assert digest(fixture_path) == case["fixture_sha256"], "fixture changed after run"
        fixture = json.loads(fixture_path.read_text())
        folder = run_dir / case_id
        files = case["files"]
        assert "SKILL.md" in files
        for target, info in files.items():
            assert not Path(target).is_absolute() and ".." not in Path(target).parts
            artifact = folder / info["artifact"]
            assert artifact.resolve().is_relative_to(folder.resolve())
            assert digest(artifact) == info["sha256"], f"changed artifact: {artifact}"
            checked_files += 1
        skill = (folder / files["SKILL.md"]["artifact"]).read_text()
        for link in re.findall(r"\]\(([^)]+)\)", skill):
            if not re.match(r"[a-z]+:|#", link):
                assert link.split("#")[0] in files, f"missing resource: {link}"
        assert set(case["responses"]) == {probe["id"] for probe in fixture["probes"]}
        for probe_id, sha in case["responses"].items():
            response = folder / "responses" / f"{probe_id}.txt"
            assert digest(response) == sha, f"changed response: {response}"
            assert response.read_text().strip(), "empty response"
            checked_responses += 1
        if case_id == "instruction-only":
            response = (folder / "responses/normal.txt").read_text()
            meeting_brief(response)
        elif case_id == "missing-knowledge":
            assert not any(Path(path).name == "fees-2026.csv" for path in files)
            supplied = fixture["source"]["knowledge_files"][0]["content"]
            assert (folder / "references/policy-v3.md").read_text() == supplied
        elif case_id == "actions":
            saved = json.loads((folder / "references/inventory.openapi.json").read_text())
            assert saved == fixture["source"]["actions"][0]
            response = (folder / "responses/unavailable-action.txt").read_text()
            payloads = re.findall(r"```json\s*(.*?)\s*```", response, re.S)
            assert len(payloads) == 1
            assert json.loads(payloads[0]) == {"sku": "TEST_SKU_A", "quantity": 2}
        elif case_id == "strict-output":
            strict_total((folder / "responses/valid.txt").read_text(), "ok", 375)
            strict_total((folder / "responses/invalid.txt").read_text(), "invalid", None)
    print(f"PASS: {len(ids)} cases, {checked_files} retained files, "
          f"{checked_responses} response hashes and applicable exact constraints.")
    revised_path = run_dir / "revised.json"
    if revised_path.exists():
        revised = json.loads(revised_path.read_text())
        for relative, sha in revised["artifacts"].items():
            artifact = run_dir / relative
            assert artifact.resolve().is_relative_to(run_dir.resolve())
            assert digest(artifact) == sha, f"changed rerun artifact: {relative}"
        folder = run_dir / "revised/strict-output/evidence"
        cases = json.loads((folder / "expectations.json").read_text())["cases"]
        for case in cases:
            strict_total((folder / "responses" / f"{case['id']}.txt").read_text(),
                         case["expected"]["status"], case["expected"]["total_cents"])
        briefs = json.loads((run_dir / "revised/instruction-only/evidence/observed.json").read_text())
        for brief in briefs:
            if brief["id"] != "missing-input":
                meeting_brief(brief["response"])
        print(f"PASS: 2 revised conversions, {len(cases) + len(briefs)} recorded responses.")
    print("This rechecks recorded evidence; it does not invoke models or grade semantic behavior.")


if __name__ == "__main__":
    check(Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "results/2026-09-26")
