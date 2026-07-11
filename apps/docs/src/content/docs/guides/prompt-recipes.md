---
title: Prompt recipes
description: Copyable prompts for cost, vendor quote, ROI, risk, market-size, and small-sample estimates.
---

Use these as starting points. Replace bracketed text with real context.

## Project budget

```text
Use $htma-measure to estimate [project]’s total cost through [milestone].

Decision: [approve, reduce scope, or defer].
Unit: USD.
Time horizon: [dates].
Decision threshold: [amount or range that changes the action].
Available evidence: [scope, rates, prior actuals, quotes, constraints].
Separate confirmed facts, assumptions, and inference.
```

## Likely vendor quote

```text
Use $htma-measure to estimate the likely paid quote for [deliverable].

Estimate mode: amount likely paid, not abstract national list price.
Context: [local vendor, nonprofit/community relationship, pickup, bundled scope, or discounts].
Decision threshold: [maximum acceptable quote].
Show both full-market and plausible paid-quote scenarios.
```

## ROI

```text
Use $htma-measure to estimate the 12-month ROI of [initiative].

Decision: proceed only if the 90% interval is mostly above [required return].
Decompose implementation cost, operating cost, adoption, benefit per user, and timing.
Name the assumption with the highest value of information.
```

## Operational risk

```text
Use $htma-measure to estimate the annual probability and expected impact of [risk].

Decision: choose between [mitigation A], [mitigation B], or accepting the risk.
Threshold: mitigate if expected annual loss exceeds [amount].
Use direct incident evidence and an explicit reference class.
Do not infer confidential facts that are not supplied.
```

## Market size

```text
Use $htma-measure to estimate the serviceable market for [product] in [geography] over [period].

Decision: enter the market only if the 90% low bound exceeds [threshold].
Decompose eligible customers, reachability, conversion, price, and retention.
Use current direct sources and show where inference begins.
```

## Small sample

```text
Use $htma-measure to update this estimate from the attached [N] observations.

State the prior, explain what the sample changes, and keep the interval calibrated for the sample size.
Tell me whether collecting [next N] observations could change the decision.
```

## Blocked lookup

```text
Use $htma-measure for this question, but do not guess if an identifier, jurisdiction, effective period, current lookup, or private fact is missing.
Return a nonnumeric HTMA_RESULT status and the exact next input needed.
```
