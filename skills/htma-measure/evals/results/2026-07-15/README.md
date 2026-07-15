# HTMA Measure Baseline — July 15, 2026

- `Tease:` The current skill clears every structural and safety gate.
- `Lede:` On the ten-case H12-derived regression, the unchanged production skill produced 10/10 parseable and status-correct outputs, 10/10 target clarity, zero privacy failures, and 6/6 numeric interval coverage. Its main visible weakness was response burden.
- `Why it matters:` This is the frozen before-score for the Zach Prompting candidate. Both arms must use the same cases, deterministic scorer, no-web policy, and native-agent execution pattern.
- `Go deeper:` See `baseline-summary.json` for exact aggregates, `baseline-run.json` for provenance, and the two Markdown shards for raw outputs.

## Aggregate Baseline

| Metric | Result |
| --- | ---: |
| Parse validity | 10/10 |
| Allowed status | 10/10 |
| Correct numeric/blocked status | 10/10 |
| Target-mode clarity | 10/10 |
| Privacy failures | 0 |
| Numeric 90% coverage | 6/6 |
| Mean absolute central error | 6.55% |
| Mean signed bias | -4.16% |
| Mean interval width / actual | 0.576x |
| Evidence proxy | 85% |
| Value-of-information proxy | 100% |
| Burden proxy | 65% |
| Mean words per case | 468.3 |

## Interpretation

The production contract is already strong on structure, estimate status, target selection, privacy, and interval coverage. A candidate should not trade away any of those gates. The clearest opportunity in this run is lower burden, but the Zach-generated candidate was not written from these results and does not target verbosity directly.

This is a transparent regression result, not a fresh sealed holdout. The case key is visible in the repository, and generation used instruction-isolated native agents rather than a hard operating-system sandbox. The collaboration runtime did not expose an exact model identifier or sampling settings, so those fields are recorded as unavailable instead of guessed.

## Comparison Rule

Keep a candidate only if it preserves all critical gates and shows a useful aggregate gain or passes a targeted acceptance test for its declared behavior. Do not claim a general quality improvement from a one-run tie, model variance, or a change-directed test alone.
