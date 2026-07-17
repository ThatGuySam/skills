---
title: Data model
description: The entities that connect decisions, evidence, component ranges, uncertainty, and the final HTMA_RESULT.
---

The skill is Markdown-driven, but its output follows a stable conceptual model.

## Decision context

```ts
type DecisionContext = {
  decision: string
  quantity: string
  unit: string
  timeHorizon: string
  threshold: number | string | null
  costOfBeingWrong: string
  estimateMode: string
}
```

## Evidence

```ts
type Evidence = {
  label: string
  value: number | string
  sourceUrl?: string
  observedAt?: string
  classification: "confirmed" | "assumption" | "inference"
  quality: "high" | "medium" | "low"
  freshness: "current" | "aging" | "stale" | "unknown"
}
```

## Decomposition

```ts
type ComponentEstimate = {
  component: string
  low: number
  central: number
  high: number
  confidence: string
  basis: string
  whatWouldTighten: string
}
```

## Remaining uncertainty

```ts
type MeasurementCandidate = {
  uncertainty: string
  measurement: string
  costOrEffort: string
  expectedDecisionImpact: string
  scoreStatus: "scored" | "needs-input"
  expectedDecisionValue: number | null
  missingInputs: string[]
  stopWhen: string
}
```

`expectedDecisionValue` is numeric only when the required chance, cost-of-error, information-quality, and measurement-cost inputs are supplied. Otherwise it remains `null`, `scoreStatus` is `needs-input`, and `missingInputs` explains what would unlock the calculation.

## Result relationships

```text
Decision context
      │
      ├── Evidence ──> Component estimates
      │                    │
      │                    └──> Calibrated interval
      │                               │
      └── Threshold ──────────────────┤
                                      ├──> Decision implication
Remaining uncertainty ────────────────┘
              │
              └──> Next measurement step

All sections ──> Written memo + HTMA_RESULT
```

The written memo preserves reasoning and provenance. `HTMA_RESULT` preserves stable fields for scoring, automation, and later calibration review.
