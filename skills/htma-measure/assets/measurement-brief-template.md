# [Topic] Calibrated Measurement Brief

- `Tease:` [One-line relevance hook.]
- `Lede:` [Main estimate with range, confidence, and decision implication.]
- `Why it matters:`
  - [Decision consequence.]
  - [Uncertainty consequence.]
  - [What this memo helps decide.]
- `Go deeper:`
  - Question made precise -- §1
  - Decomposition -- §4
  - Value of information -- §6

**Date:** [YYYY-MM-DD]
**Scope:** [What is and is not being estimated.]

## 1. Question Made Precise

- Decision:
- Quantity of interest:
- Unit:
- Time horizon:
- Decision threshold:
- Cost of being wrong:
- Estimate mode:

## 2. Short Answer

- Calibrated range:
- Central estimate:
- Confidence:
- Decision implication:

## 3. Priors And Sources

| Source / Anchor | Value | Source quality | Notes |
| --- | ---: | --- | --- |

## 4. Decomposition

| Component | Low | Central | High | Confidence | Basis | What would tighten |
| --- | ---: | ---: | ---: | --- | --- | --- |

## 5. Calibrated Range

[Explain bounds, equivalent-bet check, and why this is not a point estimate.]

## 6. Value Of Information

| Rank | Uncertainty | Why it matters | Measurement | Decision impact |
| ---: | --- | --- | --- | --- |

## 7. What Would Move The Estimate

- Move up:
- Move down:
- No longer decision-relevant if:

## 8. Recommendation

[Connect the estimate to the decision.]

## Sources

- [Direct source links and local file references.]

## HTMA_RESULT

```json
{
  "quantity": "[quantity of interest]",
  "unit": "[unit]",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "90%",
  "decision_threshold": null,
  "threshold_implication": "[above/below/overlaps threshold and action implication]",
  "top_uncertainty_driver": "[largest remaining uncertainty]",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": null,
  "next_measurement_step": "[specific input or source lookup]"
}
```
