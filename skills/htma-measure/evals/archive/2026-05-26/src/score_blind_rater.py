#!/usr/bin/env python3
"""Score H5 blind rater choices against the private A/B variant mapping."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any


RUBRIC_FIELDS = [
    "quantity_framing",
    "source_inference_labeling",
    "source_quality",
    "decomposition",
    "calibrated_uncertainty",
    "voi",
    "decision_usefulness",
    "structured_result_consistency",
]


def load_mapping(path: Path) -> dict[str, dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as file:
        return {row["pair_id"]: {"A": row["A"], "B": row["B"], "case_id": row["case_id"]} for row in csv.DictReader(file)}


def load_ratings(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            for key in ("pair_id", "winner", "scores_a", "scores_b", "reason_codes"):
                if key not in row:
                    raise ValueError(f"{path}:{line_number} missing {key}")
            rows.append(row)
    return rows


def score_rows(
    mapping: dict[str, dict[str, str]], ratings: list[dict[str, Any]]
) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
    detail: list[dict[str, Any]] = []
    aggregate: dict[str, dict[str, Any]] = {
        "current": {"candidate": "current", "wins": 0, "losses": 0, "ties": 0, "score_total": 0.0, "n": 0},
        "research_augmented": {
            "candidate": "research_augmented",
            "wins": 0,
            "losses": 0,
            "ties": 0,
            "score_total": 0.0,
            "n": 0,
        },
    }
    reason_counts: dict[str, int] = {}

    for rating in ratings:
        pair_id = rating["pair_id"]
        pair_mapping = mapping[pair_id]
        label_to_variant = {"A": pair_mapping["A"], "B": pair_mapping["B"]}
        scores_by_label = {"A": rating["scores_a"], "B": rating["scores_b"]}
        total_by_label = {
            label: sum(float(scores.get(field, 0)) for field in RUBRIC_FIELDS)
            for label, scores in scores_by_label.items()
        }
        winner_label = str(rating["winner"]).upper()
        winner_variant = "tie" if winner_label == "TIE" else label_to_variant[winner_label]
        for label, variant in label_to_variant.items():
            candidate = aggregate[variant]
            candidate["score_total"] += total_by_label[label]
            candidate["n"] += 1
            if winner_variant == "tie":
                candidate["ties"] += 1
            elif winner_variant == variant:
                candidate["wins"] += 1
            else:
                candidate["losses"] += 1
        for reason in rating["reason_codes"]:
            reason_counts[str(reason)] = reason_counts.get(str(reason), 0) + 1
        detail.append(
            {
                "pair_id": pair_id,
                "case_id": pair_mapping["case_id"],
                "winner_variant": winner_variant,
                "a_variant": pair_mapping["A"],
                "b_variant": pair_mapping["B"],
                "a_total": total_by_label["A"],
                "b_total": total_by_label["B"],
                "reason_codes": ";".join(rating["reason_codes"]),
            }
        )

    summary = []
    for candidate in aggregate.values():
        n = candidate["n"]
        summary.append(
            {
                **candidate,
                "mean_score": candidate["score_total"] / n if n else 0,
                "mean_score_pct": candidate["score_total"] / (n * len(RUBRIC_FIELDS) * 2) if n else 0,
            }
        )
    reasons = [{"reason_code": key, "count": value} for key, value in sorted(reason_counts.items())]
    return detail, summary, reasons


def write_csv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mapping", required=True, type=Path)
    parser.add_argument("--ratings", required=True, type=Path)
    parser.add_argument("--detail-output", required=True, type=Path)
    parser.add_argument("--summary-output", required=True, type=Path)
    parser.add_argument("--reason-output", required=True, type=Path)
    args = parser.parse_args()

    detail, summary, reasons = score_rows(load_mapping(args.mapping), load_ratings(args.ratings))
    write_csv(
        args.detail_output,
        detail,
        ["pair_id", "case_id", "winner_variant", "a_variant", "b_variant", "a_total", "b_total", "reason_codes"],
    )
    write_csv(
        args.summary_output,
        summary,
        ["candidate", "wins", "losses", "ties", "score_total", "n", "mean_score", "mean_score_pct"],
    )
    write_csv(args.reason_output, reasons, ["reason_code", "count"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
