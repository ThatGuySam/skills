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
  stopWhen: string
}
```

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
