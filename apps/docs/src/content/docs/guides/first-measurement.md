---
title: Your first measurement
description: Write a decision-ready HTMA Measure prompt and understand the memo it returns.
---

After installation, ask your agent to use `htma-measure`. Clients that support explicit skill selectors expose the skill by name; the examples here use `$htma-measure`.

## Start with the decision

A strong prompt supplies six pieces of context:

1. **Decision:** what action depends on the estimate?
2. **Quantity:** what exactly is being estimated?
3. **Unit:** dollars, hours, percentage points, users, incidents, or another unit?
4. **Time horizon:** per month, over one year, by a launch date, or for a one-time purchase?
5. **Threshold:** what result changes the decision?
6. **Evidence:** what facts, files, URLs, quotes, or observations are already available?

## Minimal prompt

```text
Use $htma-measure to estimate the total implementation cost of this project.

Decision: approve or defer the project.
Quantity: total implementation cost in USD.
Time horizon: implementation through production launch.
Decision threshold: approve if the 90% high bound is below $75,000.
Available evidence: the attached scope, two vendor rates, and our last three project actuals.
```

## What the agent does

The skill:

1. clarifies any missing decision inputs;
2. classifies the estimate mode;
3. gathers local context before external research;
4. separates confirmed facts from assumptions and inference;
5. decomposes the quantity into low / central / high components;
6. calibrates the final interval;
7. compares it with the threshold;
8. ranks the next useful measurement; and
9. returns a written memo plus `HTMA_RESULT` JSON.

## Read the short answer first

A useful short answer looks like this structure:

```text
Calibrated range: $48,000–$82,000 (90%)
Central estimate: $63,000
Decision implication: the interval crosses the $75,000 approval threshold.
Next measurement: obtain a fixed quote for data migration, the largest uncertainty driver.
```

Those numbers are only a format example, not a real estimate. Your memo’s values must come from your supplied evidence and traceable sources.

## If key inputs are missing

The skill does not fabricate a range. It returns null numeric fields and a status such as:

- `needs_clarification`
- `needs_identifier`
- `needs_effective_period`
- `lookup_required`
- `not_estimable`

Use `blocking_missing_inputs` and `next_measurement_step` to unlock the estimate.

## Improve the result

If the first interval is too wide, do not ask the agent to “be more precise.” Ask it to rank the evidence that would reduce decision-relevant uncertainty:

```text
Using the current memo, rank the remaining unknowns by value of information.
Tell me which single measurement is most likely to change the decision and when further research stops mattering.
```
