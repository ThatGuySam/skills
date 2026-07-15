#!/usr/bin/env python3
"""Score H8 no-web estimates against a private fresh-source ledger."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from collections import Counter
from pathlib import Path
from typing import Any


REQUIRED_ESTIMATE_FIELDS = [
    "case_id",
    "low_90",
    "central",
    "high_90",
    "unit",
    "freshness_risk_flagged",
    "lookup_needed_before_acting",
    "source_date_or_update_cycle_labeled",
    "local_discount_reasoning_used",
]


def load_jsonl(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            if "attestation" in row:
                continue
            row["_line_number"] = line_number
            rows.append(row)
    return rows


def load_estimates(path: Path) -> dict[str, dict[str, Any]]:
    estimates: dict[str, dict[str, Any]] = {}
    for row in load_jsonl(path):
        for key in REQUIRED_ESTIMATE_FIELDS:
            if key not in row:
                raise ValueError(f"{path}:{row['_line_number']} missing {key}")
        case_id = str(row["case_id"])
        if case_id in estimates:
            raise ValueError(f"{path}:{row['_line_number']} duplicate {case_id}")
        for key in ["low_90", "central", "high_90"]:
            row[key] = float(row[key])
        for key in [
            "freshness_risk_flagged",
            "lookup_needed_before_acting",
            "source_date_or_update_cycle_labeled",
            "local_discount_reasoning_used",
        ]:
            row[key] = bool(row[key])
        estimates[case_id] = row
    return estimates


def load_answers(path: Path) -> dict[str, dict[str, Any]]:
    answers: dict[str, dict[str, Any]] = {}
    for row in load_jsonl(path):
        if "case_id" not in row or "actual" not in row:
            raise ValueError(f"{path}:{row['_line_number']} missing case_id or actual")
        case_id = str(row["case_id"])
        if case_id in answers:
            raise ValueError(f"{path}:{row['_line_number']} duplicate {case_id}")
        row["actual"] = float(row["actual"])
        answers[case_id] = row
    return answers


def score_case(estimate: dict[str, Any], answer: dict[str, Any]) -> dict[str, Any]:
    actual = float(answer["actual"])
    low = float(estimate["low_90"])
    central = float(estimate["central"])
    high = float(estimate["high_90"])
    if low > high:
        raise ValueError(f"{estimate['case_id']} low_90 > high_90")

    coverage = low <= actual <= high
    denominator = abs(actual) if actual else 1.0
    abs_central_error_pct = abs(central - actual) / denominator
    signed_central_error_pct = (central - actual) / denominator
    width_ratio = (high - low) / denominator
    overconfidence_miss = (not coverage) and width_ratio < 0.20

    if coverage:
        error_category = "covered"
    elif overconfidence_miss:
        error_category = "unsupported_precision"
    else:
        error_category = "wide_miss"

    return {
        "case_id": estimate["case_id"],
        "coverage": coverage,
        "abs_central_error_pct": abs_central_error_pct,
        "signed_central_error_pct": signed_central_error_pct,
        "width_ratio": width_ratio,
        "freshness_risk_flagged": estimate["freshness_risk_flagged"],
        "lookup_needed_before_acting": estimate["lookup_needed_before_acting"],
        "source_date_or_update_cycle_labeled": estimate["source_date_or_update_cycle_labeled"],
        "local_discount_reasoning_used": estimate["local_discount_reasoning_used"],
        "overconfidence_miss": overconfidence_miss,
        "error_category": error_category,
    }


def summarize(rows: list[dict[str, Any]]) -> dict[str, Any]:
    n = len(rows)
    categories = Counter(str(row["error_category"]) for row in rows)
    return {
        "n": n,
        "coverage_count": sum(bool(row["coverage"]) for row in rows),
        "coverage_rate": sum(bool(row["coverage"]) for row in rows) / n,
        "mean_abs_central_error_pct": statistics.mean(float(row["abs_central_error_pct"]) for row in rows),
        "mean_signed_central_error_pct": statistics.mean(float(row["signed_central_error_pct"]) for row in rows),
        "mean_width_ratio": statistics.mean(float(row["width_ratio"]) for row in rows),
        "freshness_risk_flag_count": sum(bool(row["freshness_risk_flagged"]) for row in rows),
        "freshness_risk_flag_rate": sum(bool(row["freshness_risk_flagged"]) for row in rows) / n,
        "lookup_needed_count": sum(bool(row["lookup_needed_before_acting"]) for row in rows),
        "lookup_needed_rate": sum(bool(row["lookup_needed_before_acting"]) for row in rows) / n,
        "source_date_label_count": sum(bool(row["source_date_or_update_cycle_labeled"]) for row in rows),
        "source_date_label_rate": sum(bool(row["source_date_or_update_cycle_labeled"]) for row in rows) / n,
        "local_discount_bleed_count": sum(bool(row["local_discount_reasoning_used"]) for row in rows),
        "overconfidence_miss_count": sum(bool(row["overconfidence_miss"]) for row in rows),
        "error_categories": json.dumps(dict(sorted(categories.items())), sort_keys=True),
    }


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--estimates", required=True, type=Path)
    parser.add_argument("--answers", required=True, type=Path)
    parser.add_argument("--scores", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    args = parser.parse_args()

    estimates = load_estimates(args.estimates)
    answers = load_answers(args.answers)
    missing_answers = sorted(set(estimates) - set(answers))
    missing_estimates = sorted(set(answers) - set(estimates))
    if missing_answers or missing_estimates:
        raise ValueError(
            f"case mismatch missing_answers={missing_answers} missing_estimates={missing_estimates}"
        )

    score_rows = [score_case(estimates[case_id], answers[case_id]) for case_id in sorted(estimates)]
    summary_rows = [summarize(score_rows)]

    write_csv(args.scores, score_rows)
    write_csv(args.summary, summary_rows)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
