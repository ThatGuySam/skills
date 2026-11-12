---
title: Prompt recipes
description: Copyable prompts for cost, vendor quote, ROI, risk, market-size, and small-sample estimates.
---

Use these as starting points. Replace bracketed text with real context.

## Project budget

```text
Use $htma-measure to estimate a project’s total cost through a milestone.

Unit: USD.
Separate confirmed facts, assumptions, and inference.
Decision: [approve, reduce scope, or defer]
Time horizon: [dates]
Decision threshold: [amount or range that changes the action]
Available evidence: [scope, rates, prior actuals, quotes, constraints]
Project and milestone: [project], through [milestone]
```

## Likely vendor quote

```text
Use $htma-measure to estimate the likely paid quote for a deliverable.

Estimate mode: amount likely paid, not abstract national list price.
Show both full-market and plausible paid-quote scenarios.
Context: [local vendor, nonprofit/community relationship, pickup, bundled scope, or discounts]
Decision threshold: [maximum acceptable quote]
Deliverable: [deliverable]
```

## ROI

```text
Use $htma-measure to estimate the 12-month ROI of an initiative.

Decompose implementation cost, operating cost, adoption, benefit per user, and timing.
Name the assumption with the highest value of information.
Decision: proceed only if the 90% interval is mostly above [required return]
Initiative: [initiative]
```

## Operational risk

```text
Use $htma-measure to estimate the annual probability and expected impact of a risk.

Use direct incident evidence and an explicit reference class.
Do not infer confidential facts that are not supplied.
Decision: accept the risk, or choose between [mitigation A and mitigation B]
Threshold: mitigate if expected annual loss exceeds [amount]
Risk: [risk]
```

## Market size

```text
Use $htma-measure to estimate the serviceable market for a product.

Decompose eligible customers, reachability, conversion, price, and retention.
Use current direct sources and show where inference begins.
Decision: enter the market only if the 90% low bound exceeds [threshold]
Product, geography, and period: [product] in [geography] over [period]
```

## Small sample

```text
Use $htma-measure to update this estimate from the attached observations.

State the prior, explain what the sample changes, and keep the interval calibrated for the sample size.
Tell me whether collecting more observations could change the decision.
Observations attached, then the next batch I could collect: [N], then [next N]
```

## Blocked lookup

```text
Use $htma-measure for this question, but do not guess if an identifier, jurisdiction, effective period, current lookup, or private fact is missing.
Return a nonnumeric HTMA_RESULT status and the exact next input needed.
```
