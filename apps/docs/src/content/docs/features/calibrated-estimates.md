---
title: Calibrated estimates
description: Produce low, central, and high estimates tied to explicit confidence and, when supplied, a decision threshold.
sidebar:
  badge:
    text: Available
    variant: tip
---

A calibrated estimate includes a central value, low and high bounds, and a confidence statement. When the user supplies a decision threshold, the skill compares the range with it. Missing required facts produce an explicit blocked state.


## Behavior

1. The user supplies an uncertain quantity and the decision it informs.
2. The agent identifies the unit, time horizon, threshold, and cost of being wrong.
3. The agent classifies the target mode: paid quote, market value, budget allowance, amount likely paid, official benchmark, or ambiguous.
4. The agent breaks the quantity into smaller uncertain components.
5. The agent assigns low, central, and high values to each component and explains their basis.
6. The agent calibrates the rolled-up interval and states its confidence.
7. When a threshold exists, the agent compares the final interval with it.
8. The memo states the action implication or explicitly withholds that comparison, then names the largest remaining uncertainty.

The agent does not return only a point estimate.

## Inputs & outputs

**Inputs**

- decision statement;
- quantity of interest;
- unit;
- time horizon;
- optional decision threshold;
- cost of being wrong;
- evidence, source links, files, observations, and constraints; and
- optional requested confidence level.

**Outputs**

- calibrated range;
- central estimate;
- confidence statement;
- decomposition table;
- threshold implication or an explicit no-comparison state;
- top uncertainty driver;
- recommendation; and
- structured `HTMA_RESULT` appendix.

## States & edge cases

| State | Behavior |
| --- | --- |
| Complete evidence | Return a calibrated memo with `estimate_status: "estimated"`. |
| Ambiguous target or unsafe missing input | Ask for the smallest clarification that unlocks a responsible range. |
| Threshold absent but range estimable | Return the range, keep `decision_threshold` null, and withhold an action comparison. |
| Missing identifier | Keep numeric fields null and return `needs_identifier`. |
| Missing effective period | Keep numeric fields null and return `needs_effective_period`. |
| Current authoritative lookup required | Return `lookup_required` until the source is refreshed. |
| Private actual missing | Return `not_estimable`, name it in `blocking_missing_inputs`, and ask the user for the record. |
| Inputs too weak for a range | Return `not_estimable` and the next measurement step. |
| Range crosses the threshold | Explain the decision sensitivity instead of forcing a yes/no recommendation. |
| Monte Carlo requested too early | Decompose and calibrate inputs before simulation. |

## Data shape

```ts
type EstimateContext = {
  decision: string
  quantity: string
  unit: string
  timeHorizon: string
  decisionThreshold: number | string | null
  costOfBeingWrong: string
  estimateMode:
    | "paid quote"
    | "market value"
    | "budget allowance"
    | "amount likely paid"
    | "official/public benchmark"
    | "ambiguous"
  evidence: EvidenceItem[]
}

type ComponentRange = {
  component: string
  low: number
  central: number
  high: number
  confidence: string
  basis: string
  whatWouldTighten: string
}
```

## Decisions

- **2026-07-11. Intervals are mandatory.** A central value without bounds hides the uncertainty the skill exists to expose.
- **2026-07-11. Missing required inputs produce nulls.** Nulls prevent missing inputs from appearing as measured values.
- **2026-07-15. A missing threshold blocks the action comparison, not every estimate.** Responsible ranges may proceed with an explicit null threshold.

## Open questions

None for the current release.
