---
name: htma-measure
description: Creates HTMA-style calibrated measurement memos with decision threshold, decomposition, ranges, sources, and value-of-information. Use for estimates of cost, budget, rates, risk, ROI, market size, or uncertain quantities.
---

# HTMA Measure

## Workflow

1. Define the decision, quantity, unit, time horizon, threshold, and cost of being wrong. If any are unclear, clarify them before estimating.
2. Classify the estimate mode before estimating: paid quote, market value, budget allowance, amount likely paid, official/public benchmark, or ambiguous.
3. Gather local context before web research. Reuse existing repo memos when relevant.
4. Build priors from direct evidence, reference classes, and comparable cases. Mark confirmed facts separately from assumptions and inference.
5. Rank source quality and freshness against the estimate target before relying on a source.
6. For local nonprofit, community event, or small local-vendor estimates, model both:
   - public or full-market pricing
   - likely paid-quote pricing after community discount, simplified scope, local pickup/handling, bundling, or nonprofit treatment
7. For official fees, statutory rates, public benchmark schedules, or current published market prices, prioritize source freshness and do not apply a local paid-quote adjustment.
8. For vendor quote or paid-cost estimates, anchor the central estimate to the decision-relevant paid scenario rather than defaulting to an undiscounted corporate or retail rate.
9. Decompose the estimate into smaller components with low / central / high ranges.
10. Calibrate the range and state the confidence level. Widen weak bounds rather than expressing false precision.
11. Use small samples or reference classes when a few observations can materially reduce uncertainty.
12. Before finalizing, ask whether the low bound still allows for materially discounted local pricing when that context is explicit.
13. Rank remaining uncertainty by value of information before doing more research. Say what evidence would move the estimate and when further measurement would stop mattering.
14. Use Monte Carlo simulation only after inputs are decomposed and calibrated.
15. Produce a durable memo using `assets/measurement-brief-template.md`.

Optional companion skills can help with decision clarification, decomposition, calibrated ranges, small samples, value of information, Monte Carlo simulation, and calibration review. The workflow above must still work when those companion skills are unavailable.

## Output Contract

Produce a Markdown memo with:

- compact relevance summary
- date and scope
- question made precise
- short answer with range and central estimate
- decision threshold and action implication
- priors / sources
- decomposition table
- calibrated confidence interval
- value-of-information section
- what would move the estimate
- source links and local file references
- final `HTMA_RESULT` fenced JSON block for scoring/reuse:
  - `quantity`
  - `unit`
  - `low_90`
  - `central`
  - `high_90`
  - `confidence`
  - `decision_threshold`
  - `threshold_implication`
  - `top_uncertainty_driver`
  - `estimate_status`: `estimated`, `needs_clarification`, `needs_identifier`, `needs_effective_period`, `lookup_required`, or `not_estimable`
  - `blocking_missing_inputs`: array of missing inputs; empty when `estimate_status` is `estimated`
  - `assumed_target`: target-mode phrase, or `null` when no target is safe to assume
  - `next_measurement_step`: specific input or source lookup that would most improve or unlock the estimate

When a responsible numeric range is not available because a required identifier, effective period, jurisdiction, current source refresh, or private fact is missing, keep `low_90`, `central`, and `high_90` as `null` and use the nonnumeric status fields to explain the blocker. Do not fabricate a range just to satisfy the JSON block.

Keep the JSON block as an appendix to the memo. Do not replace the memo with JSON-only output unless explicitly requested.

## Resources

- Read `references/method-map.md` when selecting which HTMA technique applies.
- Read `references/output-rubric.md` before finalizing a memo.
- Read `references/local-paid-quote-adjustment.md` when an estimate involves local nonprofit/community vendors or the gap between public rates and likely paid quotes.
- Use `assets/measurement-brief-template.md` for durable research or decision memos.

## Stop Conditions

- Do not provide only a point estimate.
- Do not continue external research before identifying the decision threshold.
- Do not run Monte Carlo simulation on raw guesses.
- Do not present inferred ranges as confirmed facts.
- Do not let public-rate anchors crowd out a plausible local paid-quote floor.
- Do not discount official fees, statutory rates, or public benchmark prices as if they were local vendor quotes.
- If the estimate depends on sensitive personal or financial data, use `[ask user]` unless the user explicitly authorizes inclusion.

## Verification

Before finalizing, confirm:

- [ ] The decision threshold and action implication are explicit.
- [ ] Facts, assumptions, and inference are distinguishable.
- [ ] The low / central / high values use consistent units and reconcile with the final interval.
- [ ] The stated confidence matches the reported bounds.
- [ ] Every current or external factual claim has traceable provenance.
- [ ] The top uncertainty driver and next measurement step could change or unlock the decision.
- [ ] Sensitive information is omitted or explicitly authorized.
- [ ] The `HTMA_RESULT` JSON is valid and matches the prose.
