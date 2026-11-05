#!/usr/bin/env python3
"""Aggregate H7 ambiguity-rubric rater JSONL outputs."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from collections import defaultdict
from pathlib import Path
from typing import Any


RUBRIC_FIELDS = [
    "ambiguity_detection",
    "clarification_behavior",
    "target_mode_separation",
    "decision_threshold_handling",
    "numeric_restraint",
    "structured_result_consistency",
]

FLAG_FIELDS = [
    "silent_target_choice",
    "local_discount_without_context",
    "public_rate_discounted",
]


def load_rows(path: Path) -> list[dict[str, Any]]:
    rows = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            if "attestation" in row:
                continue
            for key in ["case_id", "variant", *RUBRIC_FIELDS, *FLAG_FIELDS]:
                if key not in row:
                    raise ValueError(f"{path}:{line_number} missing {key}")
            for field in RUBRIC_FIELDS:
                value = int(row[field])
                if value not in {0, 1, 2}:
                    raise ValueError(f"{path}:{line_number} invalid {field}={value}")
                row[field] = value
            for field in FLAG_FIELDS:
                row[field] = bool(row[field])
            rows.append(row)
    return rows


def summarize(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_variant: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        by_variant[str(row["variant"])].append(row)

    summaries = []
    max_score = 2 * len(RUBRIC_FIELDS)
    for variant, items in sorted(by_variant.items()):
        totals = [sum(int(row[field]) for field in RUBRIC_FIELDS) for row in items]
        summary: dict[str, Any] = {
            "variant": variant,
            "n": len(items),
            "mean_score": statistics.mean(totals),
            "mean_score_pct": statistics.mean(totals) / max_score,
            "silent_target_choice_count": sum(row["silent_target_choice"] for row in items),
            "local_discount_without_context_count": sum(row["local_discount_without_context"] for row in items),
            "public_rate_discounted_count": sum(row["public_rate_discounted"] for row in items),
        }
        for field in RUBRIC_FIELDS:
            summary[f"{field}_mean"] = statistics.mean(int(row[field]) for row in items)
        summaries.append(summary)
    return summaries


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ratings", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    args = parser.parse_args()

    rows = load_rows(args.ratings)
    summaries = summarize(rows)

    args.summary.parent.mkdir(parents=True, exist_ok=True)
    with args.summary.open("w", encoding="utf-8", newline="") as file:
        fieldnames = list(summaries[0].keys())
        writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(summaries)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
