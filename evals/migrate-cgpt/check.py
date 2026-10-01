#!/usr/bin/env python3
"""Check retained artifacts and response constraints, without rerunning a model."""

import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


class ValidationError(ValueError):
    """Recorded evidence failed an integrity or output-contract check."""


def require(condition, message):
    """Keep validation active even when Python runs with optimization enabled."""
    if not condition:
        raise ValidationError(message)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def strict_total(text, status, total):
    """Reject wrappers, duplicate/extra keys, wrong JSON types, and wrong values."""
    def unique(pairs):
        result = {}
        for key, value in pairs:
            require(key not in result, f"duplicate JSON key: {key}")
            result[key] = value
        return result

    value = json.loads(text, object_pairs_hook=unique)
    require(isinstance(value, dict) and set(value) == {"status", "total_cents"},
            "response must contain only status and total_cents")
    require(value["status"] == status, f"unexpected status: {value['status']!r}")
    actual = value["total_cents"]
    require(actual is None if total is None else type(actual) is int and actual == total,
            f"unexpected total_cents type or value: {actual!r}")


def meeting_brief(text):
    """Check the recorded Markdown briefs; content still needs semantic review."""
    headings = re.findall(r"^#{1,6}\s+(.+)$", text, re.M)
    require(headings == ["Decisions", "Owners", "Open questions"],
            "brief must have Decisions, Owners, Open questions headings in order")
    require(len(text.split()) <= 100, "brief exceeds 100 words")
    questions = re.split(r"^#{1,6}\s+Open questions\s*$", text, flags=re.M)[1]
    items = re.findall(r"^\s*(?:[-*+]|\d+[.)])\s+", questions, re.M)
    require(max(len(items), questions.count("?")) <= 2,
            "brief exceeds two open questions")


def check(run_dir):
    run = json.loads((run_dir / "run.json").read_text())
    expected_path = ROOT / "expected.json"
    require(digest(expected_path) == run.get("expected_sha256"),
            "expected requirements changed or expected_sha256 is missing")
    expected = json.loads(expected_path.read_text())
    ids = [case["id"] for case in run["cases"]]
    require(len(set(ids)) == len(ids), "duplicate case")
    if run.get("scope", "full") == "full":
        require(set(ids) == set(expected), "incomplete suite")
    checked_files = checked_responses = 0
    for case in run["cases"]:
        case_id = case["id"]
        require(case_id in expected, f"unknown case: {case_id}")
        fixture_path = ROOT / "fixtures" / f"{case_id}.json"
        require(digest(fixture_path) == case["fixture_sha256"],
                f"fixture changed after run: {case_id}")
        fixture = json.loads(fixture_path.read_text())
        folder = run_dir / case_id
        files = case["files"]
        require("SKILL.md" in files, f"missing SKILL.md: {case_id}")
        for target, info in files.items():
            require(not Path(target).is_absolute() and ".." not in Path(target).parts,
                    f"unsafe target path: {target}")
            artifact = folder / info["artifact"]
            require(artifact.resolve().is_relative_to(folder.resolve()),
                    f"artifact outside case folder: {info['artifact']}")
            require(digest(artifact) == info["sha256"], f"changed artifact: {artifact}")
            checked_files += 1
        skill = (folder / files["SKILL.md"]["artifact"]).read_text()
        for link in re.findall(r"\]\(([^)]+)\)", skill):
            if not re.match(r"[a-z]+:|#", link):
                require(link.split("#")[0] in files, f"missing resource: {link}")
        require(set(case["responses"]) == {probe["id"] for probe in fixture["probes"]},
                f"response probe IDs do not match fixture: {case_id}")
        for probe_id, sha in case["responses"].items():
            response = folder / "responses" / f"{probe_id}.txt"
            require(digest(response) == sha, f"changed response: {response}")
            require(response.read_text().strip(), f"empty response: {response}")
            checked_responses += 1
        if case_id == "instruction-only":
            response = (folder / "responses/normal.txt").read_text()
            meeting_brief(response)
        elif case_id == "missing-knowledge":
            require(not any(Path(path).name == "fees-2026.csv" for path in files),
                    "missing knowledge file must not be fabricated: fees-2026.csv")
            supplied = fixture["source"]["knowledge_files"][0]["content"]
            require((folder / "references/policy-v3.md").read_text() == supplied,
                    "copied policy does not match supplied knowledge")
        elif case_id == "actions":
            saved = json.loads((folder / "references/inventory.openapi.json").read_text())
            require(saved == fixture["source"]["actions"][0],
                    "saved Action schema does not match fixture")
            response = (folder / "responses/unavailable-action.txt").read_text()
            payloads = re.findall(r"```json\s*(.*?)\s*```", response, re.S)
            require(len(payloads) == 1, "Action response must contain one JSON payload")
            require(json.loads(payloads[0]) == {"sku": "TEST_SKU_A", "quantity": 2},
                    "Action response has an unexpected payload")
        elif case_id == "strict-output":
            strict_total((folder / "responses/valid.txt").read_text(), "ok", 375)
            strict_total((folder / "responses/invalid.txt").read_text(), "invalid", None)
    revised_count = None
    revised_path = run_dir / "revised.json"
    if revised_path.exists():
        revised = json.loads(revised_path.read_text())
        for relative, sha in revised["artifacts"].items():
            artifact = run_dir / relative
            require(artifact.resolve().is_relative_to(run_dir.resolve()),
                    f"rerun artifact outside run folder: {relative}")
            require(digest(artifact) == sha, f"changed rerun artifact: {relative}")
        folder = run_dir / "revised/strict-output/evidence"
        cases = json.loads((folder / "expectations.json").read_text())["cases"]
        for case in cases:
            strict_total((folder / "responses" / f"{case['id']}.txt").read_text(),
                         case["expected"]["status"], case["expected"]["total_cents"])
        briefs = json.loads((run_dir / "revised/instruction-only/evidence/observed.json").read_text())
        for brief in briefs:
            if brief["id"] != "missing-input":
                meeting_brief(brief["response"])
        revised_count = len(cases) + len(briefs)
    print(f"PASS: {len(ids)} cases, {checked_files} retained files, "
          f"{checked_responses} response hashes and applicable exact constraints.")
    if revised_count is not None:
        print(f"PASS: 2 revised conversions, {revised_count} recorded responses.")
    print("This rechecks recorded evidence; it does not invoke models or grade semantic behavior.")


if __name__ == "__main__":
    try:
        check(Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "results/2026-09-26")
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        sys.exit(1)
