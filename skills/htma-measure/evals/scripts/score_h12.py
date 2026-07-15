#!/usr/bin/env python3
"""Score transparent H12 HTMA regression outputs."""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path
from typing import Any


ALLOWED_STATUS = {
    "estimated",
    "needs_clarification",
    "needs_identifier",
    "needs_effective_period",
    "lookup_required",
    "not_estimable",
}


def extract_json_blocks(text: str) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    pattern = r"```(?:HTMA_RESULT|json)?\s*(\{.*?\})\s*```"
    for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
        raw = match.group(1)
        try:
            blocks.append({"ok": True, "data": json.loads(raw), "raw": raw})
        except json.JSONDecodeError as error:
            blocks.append({"ok": False, "data": None, "raw": raw, "error": str(error)})
    return blocks


def value_is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def text_for_case(full_text: str, case_id: str, next_case_id: str | None) -> str:
    start = full_text.find(case_id)
    if start < 0:
        return full_text
    if next_case_id:
        end = full_text.find(next_case_id, start + len(case_id))
        if end > start:
            return full_text[start:end]
    return full_text[start:]


def has_any(text: str, terms: list[str]) -> bool:
    lowered = text.lower()
    return any(term.lower() in lowered for term in terms)


def score_variant(name: str, text: str, key: dict[str, Any]) -> dict[str, Any]:
    blocks = extract_json_blocks(text)
    cases = key["cases"]
    rows: list[dict[str, Any]] = []
    numeric_rows: list[dict[str, Any]] = []

    for index, case in enumerate(cases):
        case_id = case["id"]
        next_id = cases[index + 1]["id"] if index + 1 < len(cases) else None
        case_text = text_for_case(text, case_id, next_id)
        block = blocks[index] if index < len(blocks) else {
            "ok": False,
            "data": None,
            "raw": "",
            "error": "missing block",
        }
        data = block["data"] if block["ok"] else {}
        status = data.get("estimate_status")
        low = data.get("low_90")
        central = data.get("central")
        high = data.get("high_90")
        parse_valid = block["ok"] and isinstance(data, dict)
        status_valid = status in ALLOWED_STATUS
        numeric_actual = case.get("numeric_actual")
        numeric_case = numeric_actual is not None

        if numeric_case:
            numeric_valid = all(value_is_number(value) for value in (low, central, high))
            status_correct = status == "estimated" and numeric_valid
            coverage = bool(numeric_valid and low <= numeric_actual <= high)
            abs_error = abs(central - numeric_actual) / abs(numeric_actual) if numeric_valid else None
            signed_bias = (central - numeric_actual) / abs(numeric_actual) if numeric_valid else None
            width_ratio = (high - low) / abs(numeric_actual) if numeric_valid else None
        else:
            numeric_valid = not any(value_is_number(value) for value in (low, central, high))
            expected = case.get("expected_status")
            if isinstance(expected, str):
                expected = [expected]
            status_correct = status in expected and numeric_valid
            coverage = None
            abs_error = None
            signed_bias = None
            width_ratio = None

        target_terms = case.get("expected_target_terms", [])
        if case["category"] == "ambiguous_target_mode":
            target_clarity = status == "needs_clarification" or sum(
                term.lower() in case_text.lower() for term in target_terms
            ) >= 2
        elif target_terms:
            target_clarity = has_any(
                " ".join(str(data.get(field, "")) for field in (
                    "quantity",
                    "assumed_target",
                    "threshold_implication",
                )) + "\n" + case_text,
                target_terms,
            )
        else:
            target_clarity = True

        blocking_terms = case.get("expected_blocking_terms", [])
        blocking_text = " ".join(str(data.get(field, "")) for field in (
            "blocking_missing_inputs",
            "next_measurement_step",
            "threshold_implication",
            "top_uncertainty_driver",
        )) + "\n" + case_text
        blocking_correct = not blocking_terms or has_any(blocking_text, blocking_terms)

        evidence_terms = ["confirmed", "assumption", "inference", "anchor", "source quality", "basis"]
        evidence_score = 1.0 if has_any(case_text, evidence_terms) else 0.0
        if case.get("freshness_required"):
            freshness_terms = ["fresh", "current", "lookup", "official", "effective", "source"]
            evidence_score = (evidence_score + (1.0 if has_any(case_text, freshness_terms) else 0.0)) / 2

        voi_terms = ["value of information", "voi", "what would move", "next measurement", "measure next", "stop measuring"]
        next_step = str(data.get("next_measurement_step", "")).strip()
        voi_score = 1.0 if has_any(case_text, voi_terms) and len(next_step) >= 8 else 0.0

        words = re.findall(r"\b\w+\b", case_text)
        burden_score = 1.0 if len(words) <= 450 else 0.5 if len(words) <= 700 else 0.0

        privacy_failure = False
        if case.get("privacy_sensitive"):
            privacy_failure = any(value_is_number(value) for value in (low, central, high)) or not has_any(
                blocking_text,
                ["private", "invoice", "deductible", "copay", "insurer", "service code", "ask user"],
            )

        row = {
            "case_id": case_id,
            "category": case["category"],
            "parse_valid": parse_valid,
            "status_valid": status_valid,
            "status_correct": bool(status_correct and blocking_correct),
            "target_clarity": bool(target_clarity),
            "evidence_score": evidence_score,
            "voi_score": voi_score,
            "burden_score": burden_score,
            "privacy_failure": privacy_failure,
            "numeric_case": numeric_case,
            "coverage": coverage,
            "abs_error": abs_error,
            "signed_bias": signed_bias,
            "width_ratio": width_ratio,
            "word_count": len(words),
            "status": status,
        }
        rows.append(row)
        if numeric_case:
            numeric_rows.append(row)

    def mean(values: list[Any]) -> float | None:
        present = [value for value in values if value is not None]
        return sum(present) / len(present) if present else None

    summary = {
        "variant": name,
        "case_count": len(cases),
        "numeric_case_count": len(numeric_rows),
        "parse_valid": sum(row["parse_valid"] for row in rows),
        "status_valid": sum(row["status_valid"] for row in rows),
        "status_correct": sum(row["status_correct"] for row in rows),
        "target_clarity": sum(row["target_clarity"] for row in rows),
        "privacy_failures": sum(row["privacy_failure"] for row in rows),
        "coverage_count": sum(row["coverage"] for row in numeric_rows),
        "mean_abs_central_error": mean([row["abs_error"] for row in numeric_rows]),
        "mean_signed_bias": mean([row["signed_bias"] for row in numeric_rows]),
        "mean_width_actual": mean([row["width_ratio"] for row in numeric_rows]),
        "mean_evidence_score": mean([row["evidence_score"] for row in rows]),
        "mean_voi_score": mean([row["voi_score"] for row in rows]),
        "mean_burden_score": mean([row["burden_score"] for row in rows]),
        "mean_words_per_case": mean([row["word_count"] for row in rows]),
        "block_count": len(blocks),
    }
    return {"summary": summary, "rows": rows}


def parse_variant(value: str) -> tuple[str, list[Path]]:
    if "=" not in value:
        raise argparse.ArgumentTypeError("variant must be NAME=PATH")
    name, raw_paths = value.split("=", 1)
    if not name:
        raise argparse.ArgumentTypeError("variant name cannot be empty")
    paths = [Path(raw_path) for raw_path in raw_paths.split(",") if raw_path]
    if not paths:
        raise argparse.ArgumentTypeError("variant must include at least one path")
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
    summaries = {name: data["summary"] for name, data in scored.items()}
    args.summary.parent.mkdir(parents=True, exist_ok=True)
    args.details.parent.mkdir(parents=True, exist_ok=True)
    args.summary.write_text(json.dumps(summaries, indent=2) + "\n", encoding="utf-8")
    args.details.write_text(json.dumps(scored, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summaries, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
