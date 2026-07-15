# Original HTMA Evaluation Program

- `Tease:` The current skill grew through measured changes.
- `Lede:` From May 21 through May 29, 2026, twelve protocol-locked experiments tested calibration, output structure, evidence hygiene, target ambiguity, stale sources, follow-up behavior, nonnumeric results, human usefulness, and a candidate skill pack.
- `Why it matters:` The experiments support the current production contract, but most raw prompts, outputs, answer keys, and per-case scores were intentionally sealed. Aggregate history is evidence of prior work, not a rerunnable modern baseline.
- `Go deeper:` The original generic standard-library graders are preserved in `src/`; the portable H12-derived regression runner lives two levels above this archive.

## Provenance

- Source workspace: private research repository, May 2026.
- Canonical evaluation period: May 26-29, 2026.
- H12 public protocol/results commit in the source repository: `3235bf7a`.
- Port date: July 15, 2026.
- Port boundary: generic graders and aggregate findings only. Private cases, actuals, source ledgers, raw model outputs, mappings, per-case scores, client/project details, and human score sheets were not transferred.

The original program did not preserve a reusable model-output launcher or exact H1-H10 agent-launch commands. Model outputs came from instruction-isolated native agents. The portable runner added in this repository closes that reproducibility gap for future comparisons.

## Aggregate Results

| Experiment | Status | Aggregate result |
| --- | --- | --- |
| H1 local-domain holdout | Supported | The production adjustment reduced mean absolute central error from 41.1% to 23.4% versus ablation, with 8/8 interval coverage in both arms. |
| H2 structured output | Supported | The structured arm produced 8/8 parseable results and 8/8 coverage. |
| H3 evidence hygiene | Supported | Mean memo-rubric score rose from 53.1% to 68.8% without numeric degradation. |
| H4 public-rate guardrail | Supported | No local-discount bleed appeared on official/public benchmark estimates. |
| H5 independent agent rater | Supported | The rater preferred the evidence-hygiene memo in 6/6 blinded pairs. |
| H6 broad public market values | Supported | The web-enabled arm covered 16/16 public values with no local-discount bleed. |
| H7 ambiguous target mode | Supported | The production skill scored 100% on the rubric with zero silent target choices. |
| H8 no-web stale sources | Supported | The production skill covered 15/16 values, flagged freshness and lookup needs in 16/16, and had zero overconfidence misses. |
| H9 follow-up narrowing | Supported | Mean rubric score was 93.1%; all 12 cases used the clarification and 10/10 scorable ranges narrowed. |
| H10 nonnumeric result contract | Supported | Parse, blocker recall, and actionability were 100%; deterministic downstream reuse rose from 0% to 100% without false precision. |
| H11 human-panel validation | Awaiting humans | The blinded packet was prepared, but no real human score sheets were collected. |
| H12 current-versus-next A/B | No promotion evidence | Both arms passed structural and safety gates. Production had 4.6% mean absolute central error versus 9.9% for the candidate pack. |

## What Survived

The production skill retained these changes:

1. target-mode classification before estimation;
2. a local paid-quote adjustment only when local/community paid cost is decision-relevant;
3. a public-rate guardrail for official, statutory, and current published values;
4. explicit separation of confirmed facts, assumptions, and inference;
5. a human-readable memo plus machine-readable `HTMA_RESULT` appendix; and
6. explicit blocker status, missing-input, assumed-target, and next-step fields for responsible nonnumeric results.

## Preserved Graders

The scripts in `src/` use only the Python standard library:

- `score_estimates.py` — interval coverage, central error, bias, and width;
- `validate_structured_output.py` — parse and schema conformance;
- `score_memo_rubric.py` — memo-quality rubric aggregation;
- `prepare_blinded_pairs.py` and `score_blind_rater.py` — blinded A/B preparation and scoring;
- `score_ambiguity_rubric.py` — target-ambiguity behavior;
- `score_stale_source.py` — no-web freshness behavior and numeric calibration;
- `score_followup_narrowing.py` — two-turn clarification and narrowing;
- `score_nonnumeric_contract.py` — blocked-result parsing, recall, actionability, and false precision.

They are historical utilities with their original CLI contracts. New runs should prefer the portable runner and scorer in `evals/scripts/` unless reproducing a specific archived protocol.

## Evidence Limits

- H5 used one independent agent rater, not humans.
- H6 tested web-enabled public lookup, not no-web calibration.
- H7-H10 used instruction isolation, not an operating-system privacy sandbox.
- H11 remains incomplete until at least three humans return ratings.
- The visible H12-derived regression set is no longer a sealed holdout.
- Immediate memo scoring cannot prove long-run 90% calibration; that requires realized outcomes collected over time.
