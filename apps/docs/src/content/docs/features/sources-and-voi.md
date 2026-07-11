---
title: Sources & value of information
description: Rank evidence quality, freshness, and the next measurement by its ability to change the decision.
sidebar:
  badge:
    text: Available
    variant: tip
---

Source collection is not the goal. The skill gathers and measures information only when it improves the estimate or changes the action.

## Behavior

1. The agent gathers available local context before web research.
2. Direct evidence, official sources, reference classes, and comparable cases are listed separately.
3. Every source is judged against the exact estimate target for quality and freshness.
4. Facts are distinguished from assumptions and inference.
5. Remaining uncertainties are ranked by their decision impact.
6. The agent proposes the cheapest credible next measurement.
7. Research stops when additional evidence cannot change the decision.

For local nonprofit, community, or relationship-priced work, the agent models both full-market pricing and plausible paid-quote pricing. It never applies that adjustment to official fees, statutory rates, or current public benchmarks.

## Inputs & outputs

**Inputs**

- estimate target and mode;
- decision threshold;
- available sources and observations;
- source dates and provenance;
- reference classes;
- remaining uncertainties; and
- cost or effort of additional measurements.

**Outputs**

- source/anchor table;
- source-quality and freshness notes;
- confirmed fact / assumption / inference separation;
- ranked value-of-information table;
- top uncertainty driver;
- next measurement step; and
- stopping rule.

## States & edge cases

| State | Behavior |
| --- | --- |
| Fresh direct source | Use it as a confirmed anchor. |
| Indirect comparable | Use it as a reference class and label the inference. |
| Stale source | Refresh it or weaken confidence. |
| Conflicting sources | Preserve the disagreement and widen the range. |
| Small sample | Update cautiously and keep the interval calibrated to sample size. |
| Sensitive private evidence | Use only when the user explicitly authorizes inclusion. |
| Easy but irrelevant metric | Do not measure it if it cannot change the decision. |
| Discounted local context | Model a realistic paid scenario and stress-test the low bound. |
| Official fee or statutory rate | Use the current official source without local discounting. |

## Data shape

```ts
type EvidenceItem = {
  label: string
  value: number | string
  sourceUrl?: string
  observedAt?: string
  kind: "direct" | "official" | "reference-class" | "assumption" | "inference"
  quality: "high" | "medium" | "low"
  freshness: "current" | "aging" | "stale" | "unknown"
  relevance: string
}

type ValueOfInformationItem = {
  rank: number
  uncertainty: string
  whyItMatters: string
  measurement: string
  expectedDecisionImpact: string
  stopWhen: string
}
```

## Decisions

- **2026-07-11 — Source relevance is target-specific.** A reputable source can still be a weak anchor for the quantity being estimated.
- **2026-07-11 — Research has a stopping rule.** More citations are not automatically more decision value.

## Open questions

None for the current release.
