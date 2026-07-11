# HTMA Method Map

Use this reference to select the smallest technique that can reduce decision-relevant uncertainty.

| Situation | Primary technique | Optional companion skill |
| --- | --- | --- |
| Vague request, unclear threshold | Clarify the decision and threshold | `htma-clarify-decision` |
| Fuzzy total cost, budget, effort, or revenue | Decompose into uncertain components | `htma-decompose-estimate` |
| Point estimate without confidence | Calibrate interval bounds | `htma-calibrated-ranges` |
| Few observations but no large dataset | Use small samples and reference classes | `htma-small-samples` |
| Too many possible research paths | Rank value of information | `htma-value-of-information` |
| Need uncertainty rollup | Simulate calibrated components | `htma-monte-carlo` |
| Actuals arrived after an estimate | Compare forecast with outcome | `htma-calibration-review` |

Companion skills are optional. Apply the primary technique directly when they are unavailable.

Default sequence for a full memo:

1. Clarify the decision.
2. Gather priors and local context.
3. Decompose.
4. Calibrate ranges.
5. Use small samples/reference classes if relevant.
6. Rank value of information.
7. Simulate only if the input ranges are credible.
8. Write and verify the memo.
