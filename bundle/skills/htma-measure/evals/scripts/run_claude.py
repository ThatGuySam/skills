#!/usr/bin/env python3
"""Run an HTMA case packet through Claude with tools disabled."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import tempfile
from datetime import UTC, datetime
from pathlib import Path


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def read_bundle(skill_dir: Path) -> str:
    paths = [skill_dir / "SKILL.md"]
    paths.extend(sorted((skill_dir / "references").glob("*.md")))
    paths.extend(sorted((skill_dir / "assets").glob("*.md")))
    missing = [path for path in paths if not path.is_file()]
    if missing:
        raise FileNotFoundError(f"missing skill files: {missing}")

    sections = []
    for path in paths:
        relative = path.relative_to(skill_dir)
        sections.append(f"<skill-file path=\"{relative}\">\n{path.read_text(encoding='utf-8')}\n</skill-file>")
    return "\n\n".join(sections)


def cli_version() -> str:
    completed = subprocess.run(
        ["claude", "--version"],
        check=True,
        capture_output=True,
        text=True,
    )
    return completed.stdout.strip()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill-dir", required=True, type=Path)
    parser.add_argument("--cases", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--model", default="sonnet")
    parser.add_argument("--effort", choices=["low", "medium", "high", "xhigh", "max"], default="high")
    parser.add_argument("--max-budget-usd", type=float, default=4.0)
    args = parser.parse_args()

    skill_dir = args.skill_dir.resolve()
    case_path = args.cases.resolve()
    output_path = args.output.resolve()
    bundle = read_bundle(skill_dir)
    cases = case_path.read_text(encoding="utf-8")
    system_prompt = f"""You are the estimator under evaluation.

Follow the supplied HTMA Measure skill exactly. Treat its files as authoritative instructions. You have no tools, web access, local-file access, prior outputs, or answer key. Use only facts in the case packet. Produce one memo per case in packet order, retain each case ID as a Markdown heading, and end every memo with exactly one fenced HTMA_RESULT JSON object. Do not discuss the evaluation.

<skill-bundle>
{bundle}
</skill-bundle>
"""

    command = [
        "claude",
        "--print",
        "--model",
        args.model,
        "--effort",
        args.effort,
        "--tools",
        "",
        "--disable-slash-commands",
        "--no-session-persistence",
        "--permission-mode",
        "dontAsk",
        "--output-format",
        "text",
        "--max-budget-usd",
        str(args.max_budget_usd),
        "--system-prompt",
        system_prompt,
    ]

    started = datetime.now(UTC)
    with tempfile.TemporaryDirectory(prefix="htma-eval-") as temp_dir:
        completed = subprocess.run(
            command,
            cwd=temp_dir,
            input=cases,
            capture_output=True,
            text=True,
        )
    finished = datetime.now(UTC)

    if completed.returncode != 0:
        raise RuntimeError(
            f"Claude exited {completed.returncode}: "
            f"stdout={completed.stdout.strip()!r} stderr={completed.stderr.strip()!r}"
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(completed.stdout.rstrip() + "\n", encoding="utf-8")
    metadata = {
        "provider": "anthropic",
        "runner": "claude-code-cli",
        "cli_version": cli_version(),
        "model_argument": args.model,
        "effort": args.effort,
        "tools": [],
        "started_at": started.isoformat(),
        "finished_at": finished.isoformat(),
        "duration_seconds": (finished - started).total_seconds(),
        "skill_bundle_sha256": sha256_text(bundle),
        "case_packet_sha256": sha256_text(cases),
        "output_sha256": sha256_text(completed.stdout.rstrip() + "\n"),
    }
    output_path.with_suffix(".run.json").write_text(
        json.dumps(metadata, indent=2) + "\n",
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
