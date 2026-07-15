---
title: Problems Measure solves
description: Documented estimation and decision pains that HTMA Measure turns into calibrated, source-backed next steps.
---

- `Tease:` Reach for Measure when a decision needs more than a confident-sounding number.
- `Lede:` HTMA Measure turns documented estimation pains—missing quotes, hidden work, thin evidence, ambiguous prices, and endless research—into explicit ranges, assumptions, thresholds, and next measurements.
- `Why it matters:` The cited sources support ranges, decomposition, comparable cases, uncertainty disclosure, and decision-aware evidence gathering in their respective domains.
- `Go deeper:` Match your pain below, copy the closest prompt, and replace every bracketed field with real context.

These are researched scenario patterns, not quotations or claims that the skill eliminates forecasting error. The prompts are templates; bracketed fields are intentionally unfilled, and none of the examples below presents a measured result.

## The pains at a glance

| What people are stuck on | What Measure is designed to do |
| --- | --- |
| “I need a budget before I can get quotes.” | Classify the target as a planning allowance, build an early range from the available scope and comparable work, and name what would tighten it. |
| “Can you just give me one number?” | Return low, central, and high values with confidence, assumptions, and the decision risk hidden by a point estimate. |
| “We have never done this before, and the estimate keeps missing little things.” | Decompose the work, use relevant reference classes, make exclusions visible, and widen weak bounds. |
| “The website lists one price, but that is not necessarily what we will pay.” | Separate public price, budget allowance, likely quote, and actual paid amount instead of answering the wrong cost question precisely. |
| “We only have a handful of observations.” | Use the sample without pretending it is conclusive, preserve a wider interval, and identify whether another observation could change the decision. |
| “Should we spend another week researching this?” | Rank unknowns by value of information and stop when more evidence is unlikely to change the action. |
| “Which assumption is making the answer swing?” | Decompose and sensitivity-rank the inputs so the next measurement targets the decision’s real uncertainty driver. |
| “Should we plan around the average or a safer number?” | Tie the range to a threshold and the asymmetric cost of being too high or too low. |
| “The answer depends on a current or private fact I have not supplied.” | Return a structured blocker or lookup requirement rather than fabricate a range. |

## Copyable starting points

### Budget before quotes exist

```text
Use $htma-measure to create a planning allowance for [project] before vendor quotes are available.

Decision: [approve discovery, reserve budget, reduce scope, or defer].
Time horizon: [period or milestone].
Threshold: [amount that changes the decision].
Available evidence: [scope, comparable work, rates, constraints, and prior actuals].
Treat the result as a budget allowance, not a promised quote.
```

### One confident number is hiding the risk

```text
Use $htma-measure to replace this point estimate with a calibrated range.

Decision: [action the estimate informs].
Point estimate and basis: [current estimate and how it was produced].
Show low, central, and high values, confidence, assumptions, exclusions,
and the conditions most likely to move the result.
```

### Unfamiliar work keeps losing hidden parts

```text
Use $htma-measure to estimate [cost, effort, or duration] for this unfamiliar project.

Decompose the work before estimating it. Use comparable projects where they are relevant,
state how this project differs, and keep facts separate from inference.
Decision threshold: [budget, date, or return that changes the action].
```

### Public price is not the same target as likely paid price

```text
Use $htma-measure to estimate the likely paid quote for [deliverable].

Distinguish public list price, budget allowance, and likely transaction price.
Context: [buyer type, scope, location, timing, pickup or delivery, and known eligibility].
Treat any unconfirmed discount as a labeled scenario, not a fact, and keep the range wide enough to include a no-discount outcome.
```

### Only a small sample is available

```text
Use $htma-measure to update the estimate from these [N] observations.

State the prior or reference class, show what the sample changes, and keep the interval
wide enough for the remaining uncertainty. Tell me whether collecting [next N]
observations could change [decision] at [threshold].
```

### Research needs a stopping rule

```text
Use $htma-measure to decide whether we should research [unknown] further or act now.

Decision: [action].
Threshold: [result that changes the action].
Rank the remaining unknowns by value of information, propose the cheapest credible
next measurement, and stop when more evidence is unlikely to change the decision.
```

### The cost of being wrong is asymmetric

```text
Use $htma-measure to estimate [quantity] for [decision].

Being too low would cause [consequence]. Being too high would cause [consequence].
Show the calibrated range and explain which planning value fits that risk,
rather than defaulting to the central estimate.
```

## What the research supports

The evidence supports the underlying problems and methods. It does not establish that this particular skill eliminates bias or guarantees accurate forecasts.

- The UK Infrastructure and Projects Authority’s [Cost Estimating Guidance](https://www.gov.uk/government/publications/cost-estimating-guidance/cost-estimating-guidance) says estimates evolve with scope and maturity, should be presented as ranges, should document assumptions and exclusions, and can create false confidence when sophisticated methods are applied to immature data.
- The U.S. Government Accountability Office’s [Cost Estimating and Assessment Guide](https://www.gao.gov/products/gao-20-195g) treats work breakdown, assumptions, source data, sensitivity, risk, uncertainty, and updates from actual costs as parts of a reliable estimate.
- Homes England’s [reference-class forecasting guidance](https://www.gov.uk/government/publications/optimism-bias-and-contingency-at-homes-england/optimism-bias-and-contingency-at-homes-england-accessible-version) describes systematic optimism and the use of comparable project outcomes to create an outside-view range.
- Experimental work on [unpacking multifaceted tasks](https://doi.org/10.1016/j.jesp.2003.11.001) found that prompting people to enumerate components produced longer and, in two experiments, less biased completion-time estimates.
- NIST’s [confidence-interval guidance](https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm) explains why limited data increases uncertainty rather than making a point estimate conclusive.
- The ISPOR task force’s [value-of-information guidance](https://pmc.ncbi.nlm.nih.gov/articles/PMC7373630/) compares the expected benefit of reducing uncertainty with the cost of acquiring more information.
- The U.S. Bureau of Labor Statistics’ [Producer Price Index concepts](https://www.bls.gov/opub/hom/ppi/concepts.htm) distinguish meaningful transaction prices—including buyer, terms, discounts, premiums, rebates, and allowances—from list prices.
- Forecasting research on [asymmetric loss](https://doi.org/10.1016/j.ijforecast.2009.12.015) shows that the appropriate point forecast depends on the relative cost of overprediction and underprediction.

## When Measure is not the answer

Use an authoritative lookup for an exact current value. Supply the real record when the answer is a private actual. If the identifier, jurisdiction, effective period, or target quantity is missing, let the skill return a blocked state instead of asking it to make the output look complete.
