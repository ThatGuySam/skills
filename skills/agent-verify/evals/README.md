# Agent Verify smoke test

This directory holds a synthetic structural smoke test for `scripts/check_receipt.py`, the skill's optional receipt checker. It is not a behavioral audit of the skill's judgment, and the fixture artifact and results are synthetic, not a real agent trial.

## Replay

```sh
python3 scripts/check_receipt.py evals/fixtures/valid-receipt.json
python3 scripts/check_receipt.py evals/fixtures/tampered-receipt.json
```

`valid-receipt.json` references `fixtures/sample-output.txt` with its actual SHA-256 hash and exits `0`. `tampered-receipt.json` points at the same file with a corrupted hash and exits `1` with `artifact worker-output hash mismatch`, demonstrating that the checker catches evidence tampering rather than trusting a receipt's claims.

See [evidence records](../references/evidence.md) for the full receipt format and what the checker does and does not establish.
