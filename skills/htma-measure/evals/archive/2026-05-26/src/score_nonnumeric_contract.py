#!/usr/bin/env python3
"""Score H10 nonnumeric result-contract outputs."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from pathlib import Path
from typing import Any


BASE_FIELDS = [
    "case_id",
    "quantity",
    "unit",
    "low_90",
    "central",
    "high_90",
    "confidence",
    "decision_threshold",
    "threshold_implication",
    "top_uncertainty_driver",
    "memo",
]
EXTENDED_FIELDS = [
    "estimate_status",
    "blocking_missing_inputs",
    "assumed_target",
    "next_measurement_step",
]
VALID_STATUSES = {
    "estimated",
    "needs_clarification",
    "needs_identifier",
    "needs_effective_period",
    "lookup_required",
    "not_estimable",
}
CATEGORY_KEYWORDS = {
    "specific_identifier": [
        "identifier",
        "product",
        "tier",
        "filing",
        "jurisdiction",
        "venue",
        "institution",
        "service",
        "applicant",
        "series",
        "ticket",
        "plan",
        "seat",
        "credential",
    ],
    "effective_period": [
        "effective",
        "period",
        "year",
        "tax year",
        "date",
        "release",
        "month",
        "term",
    ],
    "jurisdiction_geography": [
        "jurisdiction",
        "state",
        "city",
        "geography",
        "location",
        "fee schedule",
    ],
    "sensitive_private_actual": [
        "private",
        "plan",
        "deductible",
        "provider",
        "bill",
        "personal",
        "out-of-pocket",
    ],
}


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


def text_for(row: dict[str, Any], fields: list[str]) -> str:
    chunks: list[str] = []
    for field in fields:
        value = row.get(field)
        if isinstance(value, list):
            chunks.extend(str(item) for item in value)
        elif value is not None:
            chunks.append(str(value))
    return " ".join(chunks).lower()


def mentions_category(row: dict[str, Any], category: str, fields: list[str]) -> bool:
    haystack = text_for(row, fields)
    return any(keyword in haystack for keyword in CATEGORY_KEYWORDS[category])


def has_numeric_range(row: dict[str, Any]) -> bool:
    return any(row.get(field) is not None for field in ["low_90", "central", "high_90"])


def is_actionable(row: dict[str, Any], *, extended: bool) -> bool:
    fields = ["threshold_implication", "top_uncertainty_driver", "memo"]
    if extended:
        fields.append("next_measurement_step")
    haystack = text_for(row, fields)
    action_words = [
        "provide",
        "specify",
        "identify",
        "name",
        "verify",
        "look up",
        "lookup",
        "need",
        "needs",
        "required",
        "missing",
        "ask",
    ]
    return any(word in haystack for word in action_words)


def score_row(case: dict[str, Any], row: dict[str, Any], variant: str) -> dict[str, Any]:
    extended = variant == "extended"
    expected_category = str(case["expected_missing_category"])
    expected_status = str(case.get("expected_status", ""))

    parse_success = all(field in row for field in BASE_FIELDS)
    if extended:
        parse_success = parse_success and all(field in row for field in EXTENDED_FIELDS)

    false_precision = has_numeric_range(row)
    if extended:
        status = str(row.get("estimate_status", ""))
        status_valid = status in VALID_STATUSES
        status_matches = status == expected_status if expected_status else status in VALID_STATUSES
        blocking_recall = (
            status_valid
            and status != "estimated"
            and mentions_category(row, expected_category, ["estimate_status", "blocking_missing_inputs"])
        )
        downstream_reuse = (
            status_valid
            and isinstance(row.get("blocking_missing_inputs"), list)
            and bool(row.get("blocking_missing_inputs"))
            and bool(row.get("next_measurement_step"))
            and not false_precision
        )
    else:
        status = ""
        status_valid = False
        status_matches = False
        blocking_recall = mentions_category(
            row,
            expected_category,
            ["top_uncertainty_driver", "threshold_implication", "memo"],
        )
        downstream_reuse = False

    actionability = is_actionable(row, extended=extended)
    memo_useful = blocking_recall and actionability and not false_precision

    return {
        "case_id": case["case_id"],
        "variant": variant,
        "expected_missing_category": expected_category,
        "parse_success": parse_success,
        "blocking_reason_recall": blocking_recall,
        "actionability": actionability,
        "false_precision": false_precision,
        "downstream_reuse": downstream_reuse,
        "memo_useful": memo_useful,
        "status_valid": status_valid,
        "status_matches_expected": status_matches,
    }


def summarize(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    summaries: list[dict[str, Any]] = []
    for variant in sorted({str(row["variant"]) for row in rows}):
        subset = [row for row in rows if row["variant"] == variant]
        n = len(subset)
        summaries.append(
            {
                "variant": variant,
                "n": n,
                "parse_success_rate": statistics.mean(bool(row["parse_success"]) for row in subset),
                "blocking_reason_recall_rate": statistics.mean(
                    bool(row["blocking_reason_recall"]) for row in subset
                ),
                "actionability_rate": statistics.mean(bool(row["actionability"]) for row in subset),
                "false_precision_count": sum(bool(row["false_precision"]) for row in subset),
                "downstream_reuse_rate": statistics.mean(bool(row["downstream_reuse"]) for row in subset),
                "memo_useful_rate": statistics.mean(bool(row["memo_useful"]) for row in subset),
                "status_valid_rate": statistics.mean(bool(row["status_valid"]) for row in subset),
                "status_matches_expected_rate": statistics.mean(
                    bool(row["status_matches_expected"]) for row in subset
                ),
            }
        )
    return summaries


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
    parser.add_argument("--extended", required=True, type=Path)
    parser.add_argument("--scores", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    args = parser.parse_args()

    cases = index_rows(args.cases, ["case_id", "expected_missing_category"])
    current = index_rows(args.current, BASE_FIELDS)
    extended = index_rows(args.extended, BASE_FIELDS + EXTENDED_FIELDS)
    if set(cases) != set(current) or set(cases) != set(extended):
        raise ValueError(
            f"case mismatch cases={sorted(cases)} current={sorted(current)} extended={sorted(extended)}"
        )

    score_rows: list[dict[str, Any]] = []
    for case_id in sorted(cases):
        score_rows.append(score_row(cases[case_id], current[case_id], "current"))
        score_rows.append(score_row(cases[case_id], extended[case_id], "extended"))

    summary_rows = summarize(score_rows)
    write_csv(args.scores, score_rows)
    write_csv(args.summary, summary_rows)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
