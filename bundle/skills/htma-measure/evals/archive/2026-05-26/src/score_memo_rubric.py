#!/usr/bin/env python3
"""Score H3 HTMA memo outputs with a deterministic text-rubric proxy."""

from __future__ import annotations

import argparse
import csv
import json
import re
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


def load_rows(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            for key in ("id", "variant", "low_90", "central", "high_90", "unit", "memo"):
                if key not in row:
                    raise ValueError(f"{path}:{line_number} missing {key}")
            low = float(row["low_90"])
            central = float(row["central"])
            high = float(row["high_90"])
            if not low <= central <= high:
                raise ValueError(f"{path}:{line_number} violates low <= central <= high")
            rows.append(row)
    return rows


def keyword_score(text: str, groups: list[list[str]]) -> int:
    text_lower = text.lower()
    hits = 0
    for group in groups:
        if any(term in text_lower for term in group):
            hits += 1
    if hits >= len(groups):
        return 2
    if hits:
        return 1
    return 0


def structured_result_score(row: dict[str, Any]) -> int:
    memo = str(row["memo"])
    if "HTMA_RESULT" not in memo:
        return 0
    match = re.search(r"```json\s*(\{.*?\})\s*```", memo, flags=re.DOTALL)
    if not match:
        return 1
    try:
        result = json.loads(match.group(1))
    except json.JSONDecodeError:
        return 1
    score = 0
    for key in ("low_90", "central", "high_90"):
        if key in result and abs(float(result[key]) - float(row[key])) <= max(1e-9, abs(float(row[key])) * 0.001):
            score += 1
    if str(result.get("unit", "")).lower() == str(row["unit"]).lower():
        score += 1
    if score >= 4:
        return 2
    return 1


def score_row(row: dict[str, Any]) -> dict[str, Any]:
    memo = str(row["memo"])
    scores = {
        "quantity_framing": keyword_score(
            memo,
            [
                ["quantity"],
                ["unit"],
                ["time horizon", "timeframe", "term"],
                ["threshold"],
                ["cost of being wrong", "wrong-cost", "wrong cost"],
            ],
        ),
        "source_inference_labeling": keyword_score(
            memo,
            [
                ["confirmed", "prompt fact", "given fact"],
                ["assumption", "assume"],
                ["inference", "infer", "estimated"],
            ],
        ),
        "source_quality": keyword_score(
            memo,
            [
                ["source quality", "source class", "source"],
                ["freshness", "current", "official"],
                ["direct", "public", "published", "local"],
            ],
        ),
        "decomposition": keyword_score(
            memo,
            [
                ["decomposition", "component"],
                ["low"],
                ["central"],
                ["high"],
            ],
        ),
        "calibrated_uncertainty": keyword_score(
            memo,
            [
                ["90%", "90 percent"],
                ["calibrated"],
                ["uncertainty", "bounds", "interval"],
                ["discount", "official", "public-rate", "public rate", "paid-quote", "paid quote"],
            ],
        ),
        "voi": keyword_score(
            memo,
            [
                ["value of information", "voi"],
                ["measure", "check", "ask"],
                ["decision impact", "would change", "move the estimate"],
                ["stop", "no further", "not worth"],
            ],
        ),
        "decision_usefulness": keyword_score(
            memo,
            [
                ["recommendation", "recommend"],
                ["decision", "action"],
                ["threshold"],
                ["if "],
            ],
        ),
        "structured_result_consistency": structured_result_score(row),
    }
    total = sum(scores.values())
    return {
        "candidate": row["variant"],
        "id": row["id"],
        **scores,
        "total": total,
        "max_total": len(RUBRIC_FIELDS) * 2,
    }


def summarize(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_candidate: dict[str, list[dict[str, Any]]] = {}
    for row in rows:
        by_candidate.setdefault(str(row["candidate"]), []).append(row)

    summary = []
    for candidate, items in sorted(by_candidate.items()):
        record: dict[str, Any] = {"candidate": candidate, "n": len(items)}
        for field in RUBRIC_FIELDS:
            record[field] = sum(float(item[field]) for item in items) / len(items)
        record["mean_total"] = sum(float(item["total"]) for item in items) / len(items)
        record["mean_total_pct"] = record["mean_total"] / (len(RUBRIC_FIELDS) * 2)
        summary.append(record)
    return summary


def write_csv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--detail-output", required=True, type=Path)
    parser.add_argument("--summary-output", required=True, type=Path)
    parser.add_argument("jsonl", nargs="+", type=Path)
    args = parser.parse_args()

    scored = []
    for path in args.jsonl:
        scored.extend(score_row(row) for row in load_rows(path))

    write_csv(
        args.detail_output,
        scored,
        ["candidate", "id", *RUBRIC_FIELDS, "total", "max_total"],
    )
    write_csv(
        args.summary_output,
        summarize(scored),
        ["candidate", "n", *RUBRIC_FIELDS, "mean_total", "mean_total_pct"],
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
