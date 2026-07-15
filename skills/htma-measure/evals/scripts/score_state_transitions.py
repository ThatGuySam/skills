#!/usr/bin/env python3
"""Score H13 estimate-versus-block state transitions."""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path
from typing import Any


def extract_blocks(text: str) -> list[dict[str, Any] | None]:
    pattern = r"```(?:HTMA_RESULT|json)?\s*(\{.*?\})\s*```"
    blocks: list[dict[str, Any] | None] = []
    for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
        try:
            blocks.append(json.loads(match.group(1)))
        except json.JSONDecodeError:
            blocks.append(None)
    return blocks


def is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def has_any(value: Any, terms: list[str]) -> bool:
    lowered = str(value).lower()
    return any(term.lower() in lowered for term in terms)


def score_variant(name: str, text: str, key: dict[str, Any]) -> dict[str, Any]:
    blocks = extract_blocks(text)
    rows: list[dict[str, Any]] = []
    for index, case in enumerate(key["cases"]):
        data = blocks[index] if index < len(blocks) and blocks[index] is not None else {}
        numerics = [data.get(field) for field in ("low_90", "central", "high_90")]
        numeric_complete = all(is_number(value) for value in numerics)
        numeric_null = all(value is None for value in numerics)
        ordered = numeric_complete and numerics[0] <= numerics[1] <= numerics[2]
        blockers = data.get("blocking_missing_inputs")
        blockers_empty = isinstance(blockers, list) and not blockers
        blockers_present = isinstance(blockers, list) and bool(blockers)
        next_step_present = bool(str(data.get("next_measurement_step", "")).strip())
        status = data.get("estimate_status")
        expected_state = case["expected_state"]

        if expected_state == "estimated":
            state_consistent = status == "estimated" and ordered and blockers_empty
        else:
            state_consistent = status != "estimated" and numeric_null and blockers_present and next_step_present

        status_expected = status in case["expected_status"]
        blocker_expected = not case.get("blocking_terms") or has_any(
            [blockers, data.get("next_measurement_step"), data.get("top_uncertainty_driver")],
            case["blocking_terms"],
        )

        threshold = data.get("decision_threshold")
        implication = data.get("threshold_implication", "")
        if case["threshold_state"] == "present":
            threshold_consistent = is_number(threshold) and has_any(implication, ["threshold", "below", "above", "overlap", "approve"])
        else:
            lowered_implication = str(implication).lower()
            if expected_state == "estimated":
                absence_is_explicit = has_any(
                    lowered_implication,
                    ["no", "cannot", "without", "not supplied", "not applicable", "unavailable"],
                ) and has_any(lowered_implication, ["threshold", "action", "comparison"])
                threshold_consistent = threshold is None and absence_is_explicit
            else:
                threshold_consistent = threshold is None and bool(lowered_implication.strip())

        rows.append(
            {
                "case_id": case["id"],
                "parse_valid": bool(data),
                "expected_state": expected_state,
                "status": status,
                "state_consistent": state_consistent,
                "status_expected": status_expected,
                "blocker_expected": blocker_expected,
                "threshold_consistent": threshold_consistent,
                "passed": bool(data) and state_consistent and status_expected and blocker_expected and threshold_consistent,
            }
        )

    summary = {
        "variant": name,
        "case_count": len(rows),
        "parse_valid": sum(row["parse_valid"] for row in rows),
        "state_consistent": sum(row["state_consistent"] for row in rows),
        "status_expected": sum(row["status_expected"] for row in rows),
        "blocker_expected": sum(row["blocker_expected"] for row in rows),
        "threshold_consistent": sum(row["threshold_consistent"] for row in rows),
        "passed": sum(row["passed"] for row in rows),
    }
    return {"summary": summary, "rows": rows}


def parse_variant(value: str) -> tuple[str, list[Path]]:
    if "=" not in value:
        raise argparse.ArgumentTypeError("variant must be NAME=PATH[,PATH]")
    name, raw_paths = value.split("=", 1)
    paths = [Path(raw) for raw in raw_paths.split(",") if raw]
    if not name or not paths:
        raise argparse.ArgumentTypeError("variant must be NAME=PATH[,PATH]")
    return name, paths


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--key", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    parser.add_argument("--details", required=True, type=Path)
    parser.add_argument("variants", nargs="+", type=parse_variant)
    args = parser.parse_args()

    key = json.loads(args.key.read_text(encoding="utf-8"))
    scored = {
        name: score_variant(
            name,
            "\n\n".join(path.read_text(encoding="utf-8") for path in paths),
            key,
        )
        for name, paths in args.variants
    }
    summaries = {name: result["summary"] for name, result in scored.items()}
    args.summary.parent.mkdir(parents=True, exist_ok=True)
    args.details.parent.mkdir(parents=True, exist_ok=True)
    args.summary.write_text(json.dumps(summaries, indent=2) + "\n", encoding="utf-8")
    args.details.write_text(json.dumps(scored, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summaries, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
