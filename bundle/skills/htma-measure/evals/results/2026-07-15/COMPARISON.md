# Zach Prompting Comparison — July 15, 2026

- `Tease:` The rewrite improved state handling, not estimation accuracy.
- `Lede:` The adopted V2 candidate preserved every H12 structural, status, target, privacy, and coverage gate; improved the H13 state-transition suite from 4/6 to 6/6; and reduced the burden proxy. Numeric center error and the evidence proxy moved slightly worse, so this is a targeted contract improvement rather than a universal quality win.
- `Why it matters:` A missing decision threshold no longer forces a needless refusal or invented threshold when the range itself is responsible. Missing identifiers, current sources, ambiguous targets, and unavailable private actuals still block numeric output.
- `Go deeper:` Exact aggregates are in `comparison-summary.json` and `h13-summary.json`; provenance and hashes are in `comparison-run.json`; raw arms are stored beside this report.

## Decision

Adopt candidate V2.

Status: `validated` for estimate-state transitions on these transparent suites. General estimate-quality improvement remains unproven without repeated runs and a fresh sealed holdout.

## H12 Broad Regression

| Metric | Baseline | V1 | Adopted V2 | V2 vs baseline |
| --- | ---: | ---: | ---: | ---: |
| Parse validity | 10/10 | 10/10 | 10/10 | tied |
| Allowed status | 10/10 | 10/10 | 10/10 | tied |
| Correct numeric/blocked status | 10/10 | 9/10 | 10/10 | tied |
| Target-mode clarity | 10/10 | 10/10 | 10/10 | tied |
| Privacy failures | 0 | 0 | 0 | tied |
| Numeric 90% coverage | 6/6 | 6/6 | 6/6 | tied |
| Mean absolute central error | 6.55% | 6.93% | 6.91% | 0.36 points worse |
| Mean signed bias | -4.16% | -4.53% | -4.78% | 0.62 points more negative |
| Mean width / actual | 0.576x | 0.530x | 0.540x | 6.1% narrower |
| Evidence proxy | 85% | 100% | 80% | 5 points worse |
| Value-of-information proxy | 100% | 100% | 100% | tied |
| Burden proxy | 65% | 70% | 75% | 10 points better |
| Mean words per case | 468.3 | 465.9 | 452.5 | 15.8 fewer |

V1 overloaded `lookup_required` for one unavailable private actual. V2 added one abstract status boundary—external current value versus unavailable private fact—and restored status correctness without changing the estimate workflow.

The V2 numeric differences are within the original H12 tolerance and are not evidence that its estimates are more accurate. Width and burden improved, while central error, bias, and the lexical evidence proxy worsened slightly. One run per arm cannot separate prompt effect from model variance.

## H13 Change-Directed Acceptance

| Metric | Baseline | V1 | Adopted V2 |
| --- | ---: | ---: | ---: |
| Parse validity | 6/6 | 6/6 | 6/6 |
| Internally consistent state | 6/6 | 6/6 | 6/6 |
| Expected status | 6/6 | 6/6 | 6/6 |
| Expected blocker | 6/6 | 6/6 | 6/6 |
| Threshold semantics | 4/6 | 6/6 | 6/6 |
| Full case pass | 4/6 | 6/6 | 6/6 |

The baseline incorrectly reused `decision_threshold` for an accuracy requirement and a required private record in two blocked cases. Both candidates kept those concepts out of the threshold field. They also estimated the fully specified synthetic print range without inventing an approval threshold.

H13 was designed from the candidate's declared change map after the blind rewrite. It is a targeted acceptance test, not independent evidence of broad generalization. Its synthetic anchors are clearly labeled and do not represent real vendor data.

## Zach Prompting Change Map

Preserved:

- estimate-mode classification;
- local paid-quote and official/public-rate logic;
- decomposition, calibration, source, and value-of-information workflow;
- memo plus `HTMA_RESULT` output shape;
- existing status enum, privacy boundary, and companion-skill portability.

Clarified:

- ask only when a missing input makes a responsible range unsafe;
- `estimated` requires numeric bounds and no blockers;
- blocked statuses require null numerics, blockers, and an executable next step;
- `lookup_required` is for named current external values, while an unavailable private actual is `not_estimable`;
- a missing threshold leaves the threshold null and withholds action comparison instead of suppressing an otherwise responsible range;
- the memo template's null-valued example now uses a blocked status instead of contradictory `estimated` state.

Not changed:

- numeric calibration methods;
- local discount assumptions;
- interval confidence semantics;
- source rankings;
- memo section requirements.

## Eval Changes Still Needed

1. Repeat each arm across multiple runs with an exact model snapshot and exposed sampling settings. The V1/V2 swings show that one-shot comparisons are noisy.
2. Keep a fresh sealed holdout outside Git for any claim that a future prompt is generally better. H12 and H13 are transparent regression suites.
3. Add deterministic schema checks for field types and prose/JSON reconciliation; current scorers focus on aggregate behavior.
4. Replace or supplement lexical evidence and burden proxies with blinded human or semantic ratings. H11 still awaits real human score sheets.
5. Track realized outcomes longitudinally before claiming that nominal 90% intervals are empirically calibrated.

## Limitations

- Native collaboration agents were instruction-isolated, not OS-sandboxed.
- The collaboration API did not expose exact model identifiers, effort, temperature, seed, token use, or cost.
- H12 has ten cases and H13 has six; both are too small for a universal prompt-quality claim.
- The candidate was authored blind to cases and keys, but H13 was derived from its declared behavior and V2 was debugged on a visible H12 failure.
- Raw outputs are preserved for audit, but aggregate conclusions should not be treated as a sealed benchmark result.
