#!/usr/bin/env python3
"""Score HTMA interval estimate JSONL outputs against a private actuals CSV."""

from __future__ import annotations

import argparse
import csv
import json
import statistics
from pathlib import Path
from typing import Any


def load_actuals(path: Path) -> dict[str, float]:
    with path.open("r", encoding="utf-8", newline="") as file:
        return {row["id"]: float(row["actual"]) for row in csv.DictReader(file)}


def load_estimates(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            for key in ("id", "low_90", "central", "high_90"):
                if key not in row:
                    raise ValueError(f"{path}:{line_number} missing {key}")
            rows.append(row)
    return rows


def score(candidate: str, estimates: list[dict[str, Any]], actuals: dict[str, float]) -> dict[str, Any]:
    scored = []
    for row in estimates:
        actual = actuals[row["id"]]
        low = float(row["low_90"])
        central = float(row["central"])
        high = float(row["high_90"])
        if not low <= central <= high:
            raise ValueError(f"{candidate}:{row['id']} violates low <= central <= high")
        scored.append(
            {
                "covered": low <= actual <= high,
                "miss_low": actual < low,
                "miss_high": actual > high,
                "ape": abs(central - actual) / abs(actual),
                "signed": (central - actual) / abs(actual),
                "width": (high - low) / abs(actual),
            }
        )
    return {
        "candidate": candidate,
        "coverage_count": sum(item["covered"] for item in scored),
        "n": len(scored),
        "coverage": sum(item["covered"] for item in scored) / len(scored),
        "median_ape": statistics.median(item["ape"] for item in scored),
        "mean_ape": statistics.mean(item["ape"] for item in scored),
        "mean_signed": statistics.mean(item["signed"] for item in scored),
        "mean_width": statistics.mean(item["width"] for item in scored),
        "miss_low": sum(item["miss_low"] for item in scored),
        "miss_high": sum(item["miss_high"] for item in scored),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--actuals", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("estimate_jsonl", nargs="+", type=Path)
    args = parser.parse_args()

    actuals = load_actuals(args.actuals)
    rows = []
    for path in args.estimate_jsonl:
        rows.append(score(path.stem, load_estimates(path), actuals))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8", newline="") as file:
        fieldnames = [
            "candidate",
            "coverage_count",
            "n",
            "coverage",
            "median_ape",
            "mean_ape",
            "mean_signed",
            "mean_width",
            "miss_low",
            "miss_high",
        ]
        writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
