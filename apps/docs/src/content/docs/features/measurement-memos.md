---
title: Measurement memos
description: Return a durable written analysis and a matching HTMA_RESULT JSON appendix.
sidebar:
  badge:
    text: Available
    variant: tip
---

The measurement memo makes an estimate reviewable by a human and reusable by software.

## Behavior

1. The memo opens with a compact relevance summary.
2. It makes the question precise and presents the short answer.
3. It records priors and sources with quality notes.
4. It decomposes the quantity into components.
5. It explains the calibrated range rather than merely printing it.
6. It ranks uncertainties by value of information.
7. It states what would move the estimate up or down.
8. It connects the estimate to the decision.
9. It ends with valid JSON whose numeric and status fields match the prose.

The JSON is an appendix. It never replaces the reasoning unless the user explicitly requests JSON-only output.

## Inputs & outputs

**Inputs**

- a completed estimate context;
- evidence and source provenance;
- component ranges;
- threshold comparison; and
- remaining uncertainties.

**Outputs**

A Markdown memo with:

- relevance summary;
- date and scope;
- precise question;
- short answer;
- priors and sources;
- decomposition;
- calibrated range;
- value of information;
- recommendation;
- source list; and
- `HTMA_RESULT`.

The bundled template lives at `assets/measurement-brief-template.md`.

## States & edge cases

| State | Behavior |
| --- | --- |
| Estimated | Numeric fields contain the final range and central estimate. |
| Blocked | Numeric fields are null; status and missing inputs explain why. |
| Mixed units | The memo stops and normalizes units before rolling up components. |
| JSON parse failure | The output fails verification and must be corrected. |
| Prose/JSON mismatch | The output fails verification and must be reconciled. |
| Sensitive input | Omit it or use `[ask user]` unless inclusion is explicitly authorized. |
| Source unavailable | Mark the claim unverified or return a lookup-required status. |

## Data shape

```ts
type EstimateStatus =
  | "estimated"
  | "needs_clarification"
  | "needs_identifier"
  | "needs_effective_period"
  | "lookup_required"
  | "not_estimable"

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
  estimate_status: EstimateStatus
  blocking_missing_inputs: string[]
  assumed_target: string | null
  next_measurement_step: string
}
```

## Decisions

- **2026-07-11 — Prose and JSON ship together.** Humans need reasoning; automation needs stable fields.
- **2026-07-11 — The template includes every output-contract field.** A partial appendix is not a valid memo.

## Open questions

None for the current release.
