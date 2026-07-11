# HTMA Output Rubric

Before finalizing an HTMA memo, verify:

- The decision and action threshold are explicit.
- The quantity, unit, and time horizon are explicit.
- The estimate mode is explicit: paid quote, market value, budget allowance, amount likely paid, official/public benchmark, or ambiguous.
- The short answer includes a range and central estimate.
- Confirmed facts are separated from assumptions and inference.
- The decomposition table has low / central / high values.
- The final range states a confidence level.
- The memo names the top uncertainty driver.
- Official fees, statutory rates, and public benchmark prices use fresh direct sources and are not locally discounted.
- The value-of-information section says what to measure next, what evidence would move the estimate, and when to stop measuring.
- The final recommendation connects the estimate to the decision.
- The memo ends with an `HTMA_RESULT` fenced JSON block, and the numeric fields match the prose estimate.
- Sensitive personal or financial details are omitted or replaced with `[ask user]`.

Common failure modes:

- False precision: exact-looking number without an interval.
- Measurement inversion: spending effort on easy variables that cannot change the decision.
- Base-rate neglect: ignoring comparable cases.
- Inside-view only: relying on narrative plausibility without reference classes.
- Simulation laundering: using Monte Carlo simulation to make weak inputs look rigorous.
- JSON-only answer: returning machine-readable fields without the reasoning memo.
