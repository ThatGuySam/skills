#!/usr/bin/env python3
"""Validate structured HTMA JSONL outputs before aggregate scoring."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any


SCHEMAS = {
    "estimate": {
        "id",
        "low_90",
        "central",
        "high_90",
        "unit",
        "confidence",
        "assumptions",
        "rationale",
        "uncertainty_drivers",
    },
    "memo": {
        "id",
        "variant",
        "low_90",
        "central",
        "high_90",
        "unit",
        "memo",
    },
}


def load_case_ids(path: Path) -> set[str]:
    ids: set[str] = set()
    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            row = json.loads(line)
            if "id" not in row:
                raise ValueError(f"{path}:{line_number} missing id")
            ids.add(str(row["id"]))
    return ids


def validate_row(row: dict[str, Any], required_keys: set[str]) -> list[str]:
    errors: list[str] = []
    missing = sorted(required_keys - row.keys())
    if missing:
        errors.append(f"missing:{','.join(missing)}")
        return errors

    try:
        low = float(row["low_90"])
        central = float(row["central"])
        high = float(row["high_90"])
    except (TypeError, ValueError):
        errors.append("numeric_fields_not_floatable")
        return errors

    if not low <= central <= high:
        errors.append("range_order_violation")

    text_keys = [key for key in ("assumptions", "rationale", "uncertainty_drivers", "memo") if key in required_keys]
    for key in text_keys:
        value = row[key]
        if not isinstance(value, (str, list)):
            errors.append(f"{key}_not_string_or_list")
        elif not value:
            errors.append(f"{key}_empty")

    return errors


def validate_output(path: Path, case_ids: set[str], required_keys: set[str]) -> dict[str, Any]:
    seen: set[str] = set()
    valid_rows = 0
    invalid_rows = 0
    duplicate_rows = 0
    json_errors = 0

    with path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if not line.strip():
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                json_errors += 1
                invalid_rows += 1
                continue

            row_id = str(row.get("id", f"line-{line_number}"))
            if row_id in seen:
                duplicate_rows += 1
            seen.add(row_id)

            errors = validate_row(row, required_keys)
            if errors:
                invalid_rows += 1
            else:
                valid_rows += 1

    expected = len(case_ids)
    missing_ids = sorted(case_ids - seen)
    unexpected_ids = sorted(seen - case_ids)
    parse_success = valid_rows == expected and not missing_ids and not unexpected_ids and duplicate_rows == 0

    return {
        "candidate": path.stem,
        "expected_cases": expected,
        "valid_rows": valid_rows,
        "invalid_rows": invalid_rows,
        "json_errors": json_errors,
        "duplicate_rows": duplicate_rows,
        "missing_ids": len(missing_ids),
        "unexpected_ids": len(unexpected_ids),
        "parse_success": int(parse_success),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cases", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--schema", choices=sorted(SCHEMAS), default="estimate")
    parser.add_argument("jsonl", nargs="+", type=Path)
    args = parser.parse_args()

    case_ids = load_case_ids(args.cases)
    rows = [validate_output(path, case_ids, SCHEMAS[args.schema]) for path in args.jsonl]

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8", newline="") as file:
        fieldnames = [
            "candidate",
            "expected_cases",
            "valid_rows",
            "invalid_rows",
            "json_errors",
            "duplicate_rows",
            "missing_ids",
            "unexpected_ids",
            "parse_success",
        ]
        writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
