---
title: Output contract
description: The required memo sections, HTMA_RESULT fields, statuses, and verification rules.
---

- `Tease:` Prose for judgment, JSON for reuse.
- `Lede:` Every complete result combines a readable measurement memo with a state-consistent `HTMA_RESULT` appendix.
- `Why it matters:` Explicit numeric and blocked states keep automation from mistaking missing inputs for measured values.
- `Go deeper:` Use the memo sections, schema, status semantics, and verification rules below.

Every complete response contains a written memo and an `HTMA_RESULT` JSON appendix.

## Memo sections

1. Compact relevance summary
2. Date and scope
3. Question made precise
4. Short answer
5. Priors and sources
6. Decomposition
7. Calibrated range
8. Value of information
9. What would move the estimate
10. Recommendation
11. Sources
12. `HTMA_RESULT`

## JSON schema

```ts
type HTMAResult = {
  quantity: string
  unit: string
  low_90: number | null
  central: number | null
  high_90: number | null
  confidence: string
  decision_threshold: number | string | null
  threshold_implication: string
  top_uncertainty_driver: string
  estimate_status:
    | "estimated"
    | "needs_clarification"
    | "needs_identifier"
    | "needs_effective_period"
    | "lookup_required"
    | "not_estimable"
  blocking_missing_inputs: string[]
  assumed_target: string | null
  next_measurement_step: string
}
```

## Empty template

This is a schema template, not a measured result:

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
  "blocking_missing_inputs": ["[required missing input]"],
  "assumed_target": null,
  "next_measurement_step": "[specific input or source lookup]"
}
```

## Status semantics

| Status | Meaning |
| --- | --- |
| `estimated` | A responsible numeric interval is available. |
| `needs_clarification` | The decision or target quantity is ambiguous. |
| `needs_identifier` | A required entity, product, case, or account identifier is absent. |
| `needs_effective_period` | The applicable date or time period is missing. |
| `lookup_required` | A named current external value needs a direct-source refresh before estimating. |
| `not_estimable` | Available evidence cannot support a responsible interval, including when the requested private actual is unavailable. |

`estimated` requires numeric `low_90`, `central`, and `high_90` values plus an empty `blocking_missing_inputs` array. A non-estimated status requires null numeric fields, an explicit blocker, and a specific next measurement.

A missing decision threshold does not by itself block a responsible numeric range. In that state, `decision_threshold` remains `null`, the memo withholds an action comparison, and the result identifies threshold collection as decision context rather than fabricating one.

## Verification

A valid result satisfies all of these:

- low ≤ central ≤ high when numeric;
- units are consistent across components and the final range;
- confidence matches the named interval;
- threshold implication matches the numeric range or explicitly withholds comparison when the threshold is absent;
- top uncertainty driver appears in the value-of-information section;
- missing inputs are empty only for an estimated result;
- next measurement is specific enough to execute; and
- JSON parses and agrees with the prose.
