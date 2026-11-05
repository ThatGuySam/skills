#!/usr/bin/env python3
"""Score H9 follow-up narrowing outputs against the locked behavior rubric."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from pathlib import Path
from typing import Any


RUBRIC_FIELDS = [
    "clarification_uptake",
    "target_mode_persistence",
    "narrowing_behavior",
    "context_retention",
    "evidence_hygiene",
    "structured_result_consistency",
]

MODE_REQUIRES_NO_LOCAL_DISCOUNT = {"market_value", "official_public_benchmark"}
MODE_REQUIRES_NO_PUBLIC_DISCOUNT = {"official_public_benchmark"}


def load_jsonl(path: Path, *, skip_attestation: bool = True) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            if skip_attestation and "attestation" in row:
                continue
            row["_line_number"] = line_number
            rows.append(row)
    return rows


def index_rows(path: Path, required_fields: list[str]) -> dict[str, dict[str, Any]]:
    indexed: dict[str, dict[str, Any]] = {}
    for row in load_jsonl(path):
        for field in required_fields:
            if field not in row:
                raise ValueError(f"{path}:{row['_line_number']} missing {field}")
        case_id = str(row["case_id"])
        if case_id in indexed:
            raise ValueError(f"{path}:{row['_line_number']} duplicate {case_id}")
        indexed[case_id] = row
    return indexed


def as_float(value: Any) -> float | None:
    if value is None:
        return None
    return float(value)


def numeric_interval(row: dict[str, Any], low_key: str, high_key: str) -> tuple[float, float] | None:
    low = as_float(row.get(low_key))
    high = as_float(row.get(high_key))
    if low is None or high is None or high < low:
        return None
    return (low, high)


def score_case(
    case: dict[str, Any],
    current: dict[str, Any],
    baseline: dict[str, Any],
) -> dict[str, Any]:
    expected_mode = str(case["clarified_target_mode"])
    current_mode = str(current.get("clarified_target_mode", ""))
    mode_matches = current_mode == expected_mode
    repeated_clarification = bool(current.get("repeated_clarification", False))
    wrong_mode_risk = bool(current.get("wrong_mode_risk", False)) or not mode_matches

    local_discount_used = bool(current.get("local_discount_reasoning_used", False))
    public_rate_discounted = bool(current.get("public_rate_discounted", False))
    local_discount_bleed = local_discount_used and expected_mode in MODE_REQUIRES_NO_LOCAL_DISCOUNT
    public_rate_discount_error = public_rate_discounted and expected_mode in MODE_REQUIRES_NO_PUBLIC_DISCOUNT

    current_interval = numeric_interval(current, "low_90", "high_90")
    baseline_interval = numeric_interval(baseline, "overall_low_90", "overall_high_90")
    narrowing_ratio: float | None = None
    narrowed = False
    if current_interval and baseline_interval:
        current_width = current_interval[1] - current_interval[0]
        baseline_width = baseline_interval[1] - baseline_interval[0]
        if baseline_width > 0:
            narrowing_ratio = current_width / baseline_width
            narrowed = narrowing_ratio < 1.0

    clarification_uptake = 2 if mode_matches and not repeated_clarification else 1 if mode_matches else 0
    target_mode_persistence = (
        2
        if mode_matches and not wrong_mode_risk and not local_discount_bleed and not public_rate_discount_error
        else 1
        if mode_matches
        else 0
    )
    if repeated_clarification:
        narrowing_behavior = 0
    elif narrowing_ratio is None:
        narrowing_behavior = 1 if current_interval else 0
    elif narrowing_ratio < 0.75:
        narrowing_behavior = 2
    elif narrowing_ratio < 1.0:
        narrowing_behavior = 1
    else:
        narrowing_behavior = 0

    context_fields_present = sum(
        bool(current.get(field))
        for field in ["restated_target", "unit", "memo"]
    )
    numeric_present = current_interval is not None and as_float(current.get("central")) is not None
    context_retention = 2 if context_fields_present == 3 and numeric_present else 1 if context_fields_present >= 2 else 0

    evidence_flags = [
        bool(current.get("facts_assumptions_inference_labeled", False)),
        bool(current.get("source_or_voi_need_labeled", False)),
    ]
    evidence_hygiene = 2 if all(evidence_flags) else 1 if any(evidence_flags) else 0
    structured_result_consistency = (
        2
        if numeric_present and mode_matches and not wrong_mode_risk
        else 1
        if numeric_present
        else 0
    )

    scores = {
        "clarification_uptake": clarification_uptake,
        "target_mode_persistence": target_mode_persistence,
        "narrowing_behavior": narrowing_behavior,
        "context_retention": context_retention,
        "evidence_hygiene": evidence_hygiene,
        "structured_result_consistency": structured_result_consistency,
    }
    total_score = sum(scores.values())
    max_score = len(RUBRIC_FIELDS) * 2

    return {
        "case_id": case["case_id"],
        "expected_mode": expected_mode,
        "current_mode": current_mode,
        **scores,
        "total_score": total_score,
        "score_pct": total_score / max_score,
        "repeated_clarification": repeated_clarification,
        "wrong_mode": wrong_mode_risk,
        "local_discount_bleed": local_discount_bleed,
        "public_rate_discount_error": public_rate_discount_error,
        "narrowing_scorable": narrowing_ratio is not None,
        "narrowed": narrowed,
        "narrowing_ratio": "" if narrowing_ratio is None else narrowing_ratio,
    }


def summarize(rows: list[dict[str, Any]]) -> dict[str, Any]:
    n = len(rows)
    narrowing_scorable = [row for row in rows if bool(row["narrowing_scorable"])]
    return {
        "n": n,
        "mean_rubric_score": statistics.mean(float(row["total_score"]) for row in rows),
        "mean_rubric_pct": statistics.mean(float(row["score_pct"]) for row in rows),
        "clarification_uptake_2_count": sum(int(row["clarification_uptake"]) == 2 for row in rows),
        "clarification_uptake_2_rate": sum(int(row["clarification_uptake"]) == 2 for row in rows) / n,
        "repeated_clarification_count": sum(bool(row["repeated_clarification"]) for row in rows),
        "wrong_mode_count": sum(bool(row["wrong_mode"]) for row in rows),
        "local_discount_bleed_count": sum(bool(row["local_discount_bleed"]) for row in rows),
        "public_rate_discount_error_count": sum(bool(row["public_rate_discount_error"]) for row in rows),
        "narrowing_scorable_count": len(narrowing_scorable),
        "narrowed_count": sum(bool(row["narrowed"]) for row in narrowing_scorable),
        "narrowed_rate_scorable": (
            sum(bool(row["narrowed"]) for row in narrowing_scorable) / len(narrowing_scorable)
            if narrowing_scorable
            else ""
        ),
        "mean_narrowing_ratio_scorable": (
            statistics.mean(float(row["narrowing_ratio"]) for row in narrowing_scorable)
            if narrowing_scorable
            else ""
        ),
    }


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cases", required=True, type=Path)
    parser.add_argument("--current", required=True, type=Path)
    parser.add_argument("--baseline", required=True, type=Path)
    parser.add_argument("--scores", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    args = parser.parse_args()

    cases = index_rows(args.cases, ["case_id", "clarified_target_mode"])
    current = index_rows(args.current, ["case_id", "clarified_target_mode"])
    baseline = index_rows(args.baseline, ["case_id"])
    if set(cases) != set(current) or set(cases) != set(baseline):
        raise ValueError(
            f"case mismatch cases={sorted(cases)} current={sorted(current)} baseline={sorted(baseline)}"
        )

    score_rows = [score_case(cases[case_id], current[case_id], baseline[case_id]) for case_id in sorted(cases)]
    summary_rows = [summarize(score_rows)]
    write_csv(args.scores, score_rows)
    write_csv(args.summary, summary_rows)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
