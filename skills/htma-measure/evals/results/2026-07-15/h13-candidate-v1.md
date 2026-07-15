## H13-C01

- **Tease:** The missing decision threshold does not prevent estimating the fixed print order.
- **Lede:** The likely paid pickup quote is **USD 80–120**, with a **USD 100** central estimate and 90% confidence conditional on the supplied synthetic anchors.
- **Why it matters:** This supports quote planning, but no approve/reject comparison is available without a threshold.
- **Go deeper:** The estimate is the 100-copy variable charge plus one-time setup.

**Date:** 2026-07-15  
**Scope:** One pickup order for 100 simple one-page handouts; quantity, scope, turnaround, and pickup are fixed.

### Question Made Precise

- **Quantity / unit / horizon:** Likely paid pickup quote, USD per 100-handout order, for this order.
- **Estimate mode:** Paid quote.
- **Decision threshold:** Not supplied.
- **Cost of being wrong:** No specific consequence was supplied; the estimate can inform planning but cannot trigger an action rule.

### Priors And Decomposition

The only priors are the synthetic case anchors. As a bounded assumption, their endpoints serve as 90% component bounds and their midpoints as central values.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 100 handouts | USD 60 | USD 75 | USD 90 | USD 0.60 / 0.75 / 0.90 × 100 |
| Setup | USD 20 | USD 25 | USD 30 | Supplied setup anchor |
| **Total quote** | **USD 80** | **USD 100** | **USD 120** | Additive total |

### Calibration, Value Of Information, And Recommendation

The 90% interval is USD 80–120, conditional on the supplied two-component scope. The per-handout price is the largest uncertainty driver. An itemized printer quote for exactly 100 handouts would replace both uncertain inputs; further measurement stops mattering once that quote confirms the per-copy and setup charges. Higher unit or setup charges move the total up; lower charges move it down. Use USD 100 as the planning center and USD 120 as the high-end allowance. Because no threshold was supplied, make no approval claim.

**Source:** `cases/h13-state-transitions.md`, H13-C01 synthetic planning anchors.

### HTMA_RESULT

```json
{
  "quantity": "likely paid pickup quote for 100 simple one-page handouts",
  "unit": "USD per 100-handout pickup order",
  "low_90": 80,
  "central": 100,
  "high_90": 120,
  "confidence": "90%, conditional on the supplied synthetic anchors",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available because no decision threshold was supplied.",
  "top_uncertainty_driver": "per-handout price",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid pickup quote",
  "next_measurement_step": "Obtain one itemized pickup quote for exactly 100 handouts that separates the per-copy charge and setup."
}
```

## H13-C02

- **Tease:** An official permit fee cannot be responsibly inferred without its governing jurisdiction and effective schedule.
- **Lede:** No numeric range is supportable; the city or jurisdiction and fee-schedule year or effective period are required first.
- **Why it matters:** A vendor-style estimate or local discount would answer the wrong question because the target is the official fee.
- **Go deeper:** Identify the governing schedule, then read its renewal-fee entry directly.

**Date:** 2026-07-15  
**Scope:** Current official renewal fee for one standard sidewalk-use permit; vendor quotes and planning allowances are out of scope.

### Question Made Precise

- **Quantity / unit / horizon:** Official renewal fee, USD per permit renewal, for the applicable current schedule.
- **Estimate mode:** Official/public benchmark.
- **Decision threshold:** Not supplied.
- **Blocking inputs:** City or jurisdiction; fee-schedule year or effective period.

### Priors And Decomposition

No fee anchor or governing schedule is supplied, and browsing is prohibited. Numeric decomposition would therefore fabricate an official value.

| Required element | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Governing jurisdiction | — | — | — | Missing identifier |
| Applicable fee schedule | — | — | — | Missing year/effective period |
| Official renewal-fee line | — | — | — | Cannot be selected until both inputs are known |

### Calibration, Value Of Information, And Recommendation

No confidence interval is assigned. The highest-value information is the city or jurisdiction, followed by the applicable fee-schedule year or effective date. Those inputs unlock a direct official-schedule lookup; the verified schedule could move the answer in either direction, so no directional estimate is justified. Stop measuring once the matching official schedule yields the standard sidewalk-use permit renewal fee. Request the missing identifiers, then perform that lookup. No action comparison is available because no decision threshold was supplied.

**Source:** `cases/h13-state-transitions.md`, H13-C02.

### HTMA_RESULT

```json
{
  "quantity": "current official renewal fee for a standard sidewalk-use permit",
  "unit": "USD per permit renewal",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not assigned",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available, and the official fee cannot be identified until the jurisdiction and effective schedule are supplied.",
  "top_uncertainty_driver": "the unidentified governing jurisdiction and fee schedule",
  "estimate_status": "needs_identifier",
  "blocking_missing_inputs": [
    "city or jurisdiction",
    "applicable fee-schedule year or effective period"
  ],
  "assumed_target": "official renewal fee",
  "next_measurement_step": "Provide the city or jurisdiction and applicable fee-schedule year or effective period, then read the renewal fee from the matching official schedule."
}
```

## H13-C03

- **Tease:** The target and year are clear, but the required current official value cannot be supplied from memory to cent-level accuracy.
- **Lede:** A current official-source lookup is required; no numeric estimate is responsible under the no-browsing constraint.
- **Why it matters:** The reimbursement policy permits at most USD 0.01 per-mile error.
- **Go deeper:** Verify the 2026 value in the issuing authority's official source before setting the policy rate.

**Date:** 2026-07-15  
**Scope:** Exact official 2026 federal mileage reimbursement rate, in USD per mile.

### Question Made Precise

- **Decision:** Set the reimbursement policy to the verified official 2026 rate.
- **Estimate mode:** Official/public benchmark.
- **Required accuracy:** Within USD 0.01 per mile.
- **Decision threshold:** No rate/action threshold was supplied; the accuracy tolerance is a verification requirement.

### Priors And Decomposition

No source document or numeric anchor is supplied, and browsing is prohibited. Memory is not a traceable current official source, so decomposing or ranging the value would create false precision.

| Required element | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Official 2026 rate | — | — | — | Direct current lookup unavailable |
| Cent-level verification | — | — | — | Cannot be completed without the official source |

### Calibration, Value Of Information, And Recommendation

No interval is assigned. The sole high-value step is a direct lookup of the official 2026 source and verification of the value to USD 0.01 per mile. That evidence would determine, rather than merely move, the answer; stop once the official source and effective 2026 rate are confirmed. Do not use a remembered or estimated rate for the reimbursement policy.

**Source:** `cases/h13-state-transitions.md`, H13-C03; no official rate source was supplied.

### HTMA_RESULT

```json
{
  "quantity": "exact official 2026 federal mileage reimbursement rate",
  "unit": "USD per mile",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not assigned",
  "decision_threshold": null,
  "threshold_implication": "No rate/action threshold was supplied; the USD 0.01-per-mile accuracy requirement makes an official lookup mandatory.",
  "top_uncertainty_driver": "absence of a verified current official 2026 source",
  "estimate_status": "lookup_required",
  "blocking_missing_inputs": [
    "verified official source for the 2026 federal mileage reimbursement rate"
  ],
  "assumed_target": "official 2026 federal mileage reimbursement rate",
  "next_measurement_step": "Look up the rate in the issuing federal authority's official 2026 source and verify it to USD 0.01 per mile."
}
```

## H13-C04

- **Tease:** A private amount actually paid is a record lookup, not a population estimate.
- **Lede:** The amount is not estimable from the supplied facts; the private bill, insurance statement, and payment evidence are required.
- **Why it matters:** Substituting an average would not establish the requester's reimbursable actual.
- **Go deeper:** Use the private records to reconcile patient responsibility with payment.

**Date:** 2026-07-15  
**Scope:** The requester's actual payment for one medical bill, in USD; population averages are excluded.

### Question Made Precise

- **Decision:** Determine the private actual for reimbursement.
- **Estimate mode:** Amount actually paid.
- **Decision threshold:** Not supplied.
- **Blocking inputs:** The bill and insurance statement are unavailable; no billed amount, adjustment, deductible state, copay, provider, or service code is supplied.

### Priors And Decomposition

There are no case-specific numeric anchors. The personal actual depends on unavailable private facts, so a numeric decomposition would not identify what the requester paid.

| Required element | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Billed amount and adjustments | — | — | — | Private records unavailable |
| Insurance and patient-responsibility details | — | — | — | Private records unavailable |
| Actual payment | — | — | — | No payment evidence supplied |

### Calibration, Value Of Information, And Recommendation

No interval is assigned. The top uncertainty is the unavailable private actual-payment record. Ask the requester for the bill, insurance statement, and evidence of the payment; these records determine the answer, while more general research has no decision value. Stop once the records reconcile the amount personally paid. Do not substitute a population average.

**Source:** `cases/h13-state-transitions.md`, H13-C04.

### HTMA_RESULT

```json
{
  "quantity": "amount the requester personally paid for the medical bill",
  "unit": "USD per medical bill",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not assigned",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available; reimbursement requires the unavailable private actual rather than an estimate.",
  "top_uncertainty_driver": "unavailable private billing and payment records",
  "estimate_status": "not_estimable",
  "blocking_missing_inputs": [
    "medical bill",
    "insurance statement",
    "evidence of the amount personally paid"
  ],
  "assumed_target": "private actual amount personally paid",
  "next_measurement_step": "Ask the requester for the bill, insurance statement, and payment evidence, then reconcile the amount personally paid."
}
```

## H13-C05

- **Tease:** The supplied allowance remains below the approval threshold even at the high end.
- **Lede:** Plan for **USD 82.50–126.50**, centered at **USD 104.50**; **approve**, because the high end is USD 13.50 below the USD 140 threshold.
- **Why it matters:** The decision rule is satisfied across the calibrated planning interval.
- **Go deeper:** Attendance-driven food and drink cost is the main uncertainty.

**Date:** 2026-07-15  
**Scope:** Simple snacks for one 20-person workshop, including fixed supplies and 10% contingency.

### Question Made Precise

- **Quantity / unit / horizon:** Planning allowance, USD per workshop, for this 20-person workshop.
- **Estimate mode:** Budget allowance.
- **Decision threshold:** USD 140; approve if the high end is at or below it.
- **Cost of being wrong:** A high end above USD 140 would fail the supplied approval rule.

### Priors And Decomposition

The only priors are the synthetic case anchors. As a bounded assumption, the per-attendee endpoints serve as 90% bounds and the midpoint as the central value.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Food and drink | USD 60.00 | USD 80.00 | USD 100.00 | 20 × USD 3 / 4 / 5 |
| Fixed supplies | USD 15.00 | USD 15.00 | USD 15.00 | Supplied fixed amount |
| Subtotal | USD 75.00 | USD 95.00 | USD 115.00 | Additive subtotal |
| 10% contingency | USD 7.50 | USD 9.50 | USD 11.50 | 10% of subtotal |
| **Planning allowance** | **USD 82.50** | **USD 104.50** | **USD 126.50** | Subtotal plus contingency |

### Calibration, Value Of Information, And Recommendation

The 90% planning interval is USD 82.50–126.50, conditional on the supplied anchors and 20-person scope. The per-attendee food and drink price is the top uncertainty driver. A specific 20-person snack price would tighten the interval; it would change the decision only if it raised the high-end all-in allowance above USD 140. Stop measuring once a supported high-end allowance remains at or below USD 140. Approve with a USD 126.50 high-end allowance.

**Source:** `cases/h13-state-transitions.md`, H13-C05 synthetic planning anchors and decision rule.

### HTMA_RESULT

```json
{
  "quantity": "planning allowance for simple snacks for a 20-person workshop",
  "unit": "USD per workshop",
  "low_90": 82.5,
  "central": 104.5,
  "high_90": 126.5,
  "confidence": "90%, conditional on the supplied synthetic anchors",
  "decision_threshold": 140,
  "threshold_implication": "Approve: the USD 126.50 high end is USD 13.50 below the USD 140 threshold.",
  "top_uncertainty_driver": "food and drink cost per attendee",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "planning allowance",
  "next_measurement_step": "Obtain a specific food-and-drink price for 20 attendees and recompute the 10%-contingency high end."
}
```

## H13-C06

- **Tease:** “Booth cost” is not one safe quantity until the conference and price mode are defined.
- **Lede:** No numeric answer is responsible because the target could be posted price, negotiated quote, planning allowance, or a private amount already paid.
- **Why it matters:** Choosing one mode would silently answer a materially different question.
- **Go deeper:** Define the target and booth identity before seeking a schedule, quote, or private actual.

**Date:** 2026-07-15  
**Scope:** Cost of one booth at an unspecified regional conference.

### Question Made Precise

- **Quantity / unit / horizon:** Booth cost, potentially USD per booth; the applicable year is missing.
- **Estimate mode:** Ambiguous.
- **Decision threshold:** Not supplied.
- **Blocking inputs:** Conference, city, booth size, sponsor tier, year, and target mode.

### Priors And Decomposition

No numeric anchors are supplied, browsing is prohibited, and neither the offering nor the intended quantity is identified. A numeric decomposition would mix incompatible targets.

| Required element | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Target mode | — | — | — | Posted price, negotiated quote, allowance, or amount paid not selected |
| Conference and city | — | — | — | Missing identifiers |
| Booth size and sponsor tier | — | — | — | Missing scope |
| Applicable year | — | — | — | Missing effective period |

### Calibration, Value Of Information, And Recommendation

No interval is assigned. Clarifying the target mode has the highest value because it determines which evidence counts; identifying the conference, city, booth size, sponsor tier, and year then unlocks the matching schedule, quote, or private record. Any of those inputs could determine a different value, so no directional estimate is justified. Stop measuring once the selected mode and full booth identity yield one matching source. Request all blocking inputs before estimating; no action comparison is available without a threshold.

**Source:** `cases/h13-state-transitions.md`, H13-C06.

### HTMA_RESULT

```json
{
  "quantity": "cost of a booth at a regional conference",
  "unit": "USD per booth",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not assigned",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available, and the target quantity is not yet safe to assume.",
  "top_uncertainty_driver": "ambiguous estimate mode and unidentified booth offering",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": [
    "target mode: posted market price, likely negotiated quote, budget allowance, or amount already paid",
    "conference",
    "city",
    "booth size",
    "sponsor tier",
    "year"
  ],
  "assumed_target": null,
  "next_measurement_step": "Specify the target mode, conference, city, booth size, sponsor tier, and year, then obtain the one source matching that definition."
}
```
