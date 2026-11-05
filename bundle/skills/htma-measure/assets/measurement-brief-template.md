# [Topic] measurement brief

[Summarize the estimate, range, confidence, and decision implication. State the main uncertainty and what this memo helps decide.]

**Date:** [YYYY-MM-DD]
**Scope:** [What is and is not being estimated.]

## 1. Question made precise

- Decision:
- Quantity of interest:
- Unit:
- Time horizon:
- Decision threshold:
- Cost of being wrong:
- Estimate mode:

## 2. Short answer

- Calibrated range:
- Central estimate:
- Confidence:
- Decision implication:

## 3. Priors and sources

| Source / Anchor | Value | Source quality | Notes |
| --- | ---: | --- | --- |

## 4. Decomposition

| Component | Low | Central | High | Confidence | Basis | What would tighten |
| --- | ---: | ---: | ---: | --- | --- | --- |

## 5. Calibrated range

[Explain bounds, equivalent-bet check, and why this is not a point estimate.]

## 6. Value of information

| Rank | Uncertainty | Why it matters | Measurement | Decision impact |
| ---: | --- | --- | --- | --- |

## 7. What would move the estimate

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
  "threshold_implication": "[no action comparison until the threshold is supplied]",
  "top_uncertainty_driver": "[largest remaining uncertainty]",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": ["[required input]"],
  "assumed_target": null,
  "next_measurement_step": "[specific input or source lookup]"
}
```
