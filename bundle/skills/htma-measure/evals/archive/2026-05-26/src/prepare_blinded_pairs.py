#!/usr/bin/env python3
"""Prepare blinded A/B memo pairs for H5 independent-rater validation."""

from __future__ import annotations

import argparse
import csv
import json
import random
from pathlib import Path
from typing import Any


def load_cases(path: Path) -> dict[str, dict[str, Any]]:
    cases: dict[str, dict[str, Any]] = {}
    with path.open("r", encoding="utf-8") as file:
        for line in file:
            if not line.strip():
                continue
            row = json.loads(line)
            cases[str(row["id"])] = row
    return cases


def load_outputs(path: Path) -> dict[str, dict[str, Any]]:
    rows: dict[str, dict[str, Any]] = {}
    with path.open("r", encoding="utf-8") as file:
        for line in file:
            if not line.strip():
                continue
            row = json.loads(line)
            rows[str(row["id"])] = row
    return rows


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cases", required=True, type=Path)
    parser.add_argument("--current", required=True, type=Path)
    parser.add_argument("--research-augmented", required=True, type=Path)
    parser.add_argument("--packet-output", required=True, type=Path)
    parser.add_argument("--mapping-output", required=True, type=Path)
    parser.add_argument("--seed", type=int, default=20260526)
    args = parser.parse_args()

    rng = random.Random(args.seed)
    cases = load_cases(args.cases)
    current = load_outputs(args.current)
    augmented = load_outputs(args.research_augmented)

    packet_rows: list[dict[str, Any]] = []
    mapping_rows: list[dict[str, Any]] = []
    for case_id in sorted(cases):
        if case_id not in current or case_id not in augmented:
            raise ValueError(f"missing output for {case_id}")
        labels = ["current", "research_augmented"]
        rng.shuffle(labels)
        by_variant = {"current": current[case_id], "research_augmented": augmented[case_id]}
        memo_a = by_variant[labels[0]]
        memo_b = by_variant[labels[1]]
        pair_id = f"pair-{len(packet_rows) + 1:02d}"
        packet_rows.append(
            {
                "pair_id": pair_id,
                "case_id": case_id,
                "prompt": cases[case_id]["prompt"],
                "memo_a": memo_a["memo"],
                "memo_b": memo_b["memo"],
            }
        )
        mapping_rows.append(
            {
                "pair_id": pair_id,
                "case_id": case_id,
                "A": labels[0],
                "B": labels[1],
            }
        )

    args.packet_output.parent.mkdir(parents=True, exist_ok=True)
    with args.packet_output.open("w", encoding="utf-8") as file:
        for row in packet_rows:
            file.write(json.dumps(row, ensure_ascii=False) + "\n")

    args.mapping_output.parent.mkdir(parents=True, exist_ok=True)
    with args.mapping_output.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=["pair_id", "case_id", "A", "B"], lineterminator="\n")
        writer.writeheader()
        writer.writerows(mapping_rows)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
