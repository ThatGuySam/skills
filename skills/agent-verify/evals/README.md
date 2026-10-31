# Agent Verify smoke test

This directory holds a synthetic structural smoke test for `scripts/check_receipt.py`, the skill's optional receipt checker. It is not a behavioral audit of the skill's judgment, and the fixture artifact and results are synthetic, not a real agent trial.

## Replay

```sh
python3 scripts/check_receipt.py evals/fixtures/valid-receipt.json
python3 scripts/check_receipt.py evals/fixtures/tampered-receipt.json
```

`valid-receipt.json` references `fixtures/sample-output.txt` with its actual SHA-256 hash and exits `0`. `tampered-receipt.json` points at the same file with a corrupted hash and exits `1` with `artifact worker-output hash mismatch`, demonstrating that the checker catches evidence tampering rather than trusting a receipt's claims.

See [evidence records](../references/evidence.md) for the full receipt format and what the checker does and does not establish.

## Behavioral comparison

The [October 31 comparison summary](2026-10-31-comparison.md) records a bounded actual previous-versus-updated verifier pilot. It is separate from these synthetic receipt fixtures. Raw private task material and worker outputs are not distributed, so the public summary is not a replayable behavioral benchmark.

## Required Subagent Verification

The [required-subagent pilot](2026-10-31-subagent-verification.md) records actual fresh executor and independent QA runs on constructed Python fixtures. It covers new-work verification and a mixed before/after update. This is distinct from comparing versions of Agent Verify itself.

## Standalone Installation

The [installation regression check](2026-10-31-installation.md) records an actual same-process CLI selector check before and after replacing direct checkout links with a standalone copy. It distinguishes runtime discovery from source equality.
