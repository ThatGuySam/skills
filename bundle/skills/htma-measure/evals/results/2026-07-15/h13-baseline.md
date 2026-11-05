# H13 Baseline Acceptance Memos

## H13-C01 — Estimable Without A Threshold

- `Tease:` The missing decision threshold does not prevent estimating the fixed print order.
- `Lede:` The likely paid pickup quote is **USD 80–120**, with a **USD 100** central estimate at 90% confidence; no approve/reject implication is available without a threshold.
- `Why it matters:` This range supports budgeting now while keeping the missing action rule explicit.
- `Go deeper:` The per-handout price is the main uncertainty; a written printer quote would replace the estimate.

**Date:** 2026-07-15  
**Scope:** One pickup order for 100 simple one-page handouts; estimate mode is **likely paid quote**.

### Question And Threshold

- **Decision:** Budget for the fixed order.
- **Quantity / unit / horizon:** Total USD for this one 100-handout pickup order.
- **Decision threshold:** Not supplied; this limits the action implication, not the estimability of the quantity.
- **Cost of being wrong:** Underbudgeting could block the order; overbudgeting ties up funds.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** 100 handouts; USD 0.60–0.90 each; USD 20–30 setup; scope, turnaround, and pickup are fixed. **Assumption:** Midpoints are reasonable central values. **Inference:** No additional discount or fee is added beyond the supplied paid-quote anchors.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Printing | USD 60 | USD 75 | USD 90 | 100 × supplied unit-price range |
| Setup | USD 20 | USD 25 | USD 30 | Supplied setup range |
| **Total** | **USD 80** | **USD 100** | **USD 120** | Component sum |

The 90% interval is **USD 80–120**. It is bounded by the supplied synthetic planning anchors, not observed vendor data; the unit-price spread drives three times as much total spread as setup.

### Value Of Information And Recommendation

A written all-in pickup quote has the highest value of information and would directly replace both inputs. The estimate moves up or down with the quoted unit price or setup fee. Stop measuring once an itemized, scope-matched quote is received. Use **USD 100** as the working estimate and **USD 120** as the upper budget bound; obtain a threshold before making an approve/reject decision.

**Source:** H13-C01 synthetic packet anchors only.

### HTMA_RESULT

```json
{
  "quantity": "likely paid pickup quote for 100 simple one-page handouts",
  "unit": "USD per 100-handout pickup order",
  "low_90": 80,
  "central": 100,
  "high_90": 120,
  "confidence": "90%",
  "decision_threshold": null,
  "threshold_implication": "The quantity is estimable, but no approve/reject action can be inferred because no decision threshold was supplied.",
  "top_uncertainty_driver": "per-handout paid price within the supplied USD 0.60 to USD 0.90 range",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid quote",
  "next_measurement_step": "Obtain one written all-in pickup quote itemizing the per-handout price and setup fee."
}
```

## H13-C02 — Missing Jurisdiction And Effective Period

- `Tease:` An official permit fee cannot be identified without its jurisdiction and effective fee schedule.
- `Lede:` No responsible numeric range is available; the result is blocked before lookup.
- `Why it matters:` Official fees are source-specific facts and must not be inferred from unrelated jurisdictions or discounted like vendor quotes.
- `Go deeper:` Identify the city or jurisdiction and effective schedule period, then read the matching official fee schedule.

**Date:** 2026-07-15  
**Scope:** Official renewal fee for one standard sidewalk-use permit; estimate mode is **official fee**.

### Question And Threshold

- **Decision:** Determine the official amount due for renewal.
- **Quantity / unit / horizon:** Official currency amount per permit renewal for the current applicable period; currency is unspecified.
- **Decision threshold:** Not supplied.
- **Cost of being wrong:** Using another jurisdiction or schedule could produce an invalid renewal amount.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** The city, jurisdiction, and fee-schedule year are missing; browsing is prohibited. **Assumption:** None is safe. **Inference:** Neither a point estimate nor interval can be tied to the requested official fee.

| Required component | Low | Central | High | Blocker |
| --- | ---: | ---: | ---: | --- |
| Jurisdiction-specific renewal fee | — | — | — | City or jurisdiction missing |
| Effective official schedule | — | — | — | Fee-schedule year/effective period missing |
| **Official total** | **—** | **—** | **—** | No matching official source can be selected |

No confidence interval is reported because numeric bounds would be fabricated.

### Value Of Information And Recommendation

The jurisdiction identifier has the highest value because it determines which authority and currency apply; the effective period then selects the valid schedule. Either input could change the fee completely. Stop measuring once both are supplied and the matching official schedule is obtained. Do not budget or pay from an inferred fee.

**Source:** H13-C02 packet facts only; no official fee source was supplied.

### HTMA_RESULT

```json
{
  "quantity": "current official renewal fee for one standard sidewalk-use permit",
  "unit": "currency units per permit renewal; currency unspecified",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": null,
  "threshold_implication": "No official fee or threshold comparison is possible until the jurisdiction and effective fee-schedule period are identified.",
  "top_uncertainty_driver": "missing city or jurisdiction, followed by the applicable fee-schedule period",
  "estimate_status": "needs_identifier",
  "blocking_missing_inputs": [
    "city or jurisdiction",
    "applicable fee-schedule year or effective period"
  ],
  "assumed_target": "official fee",
  "next_measurement_step": "Get the city or jurisdiction and applicable fee-schedule period, then look up the matching official renewal-fee schedule."
}
```

## H13-C03 — Current Official Value Requires Lookup

- `Tease:` A memory-based number cannot satisfy a one-cent accuracy requirement for a current official rate.
- `Lede:` No numeric estimate is responsible without the official 2026 source; an authorized lookup is required.
- `Why it matters:` A one-cent-per-mile error would violate the reimbursement policy's accuracy requirement.
- `Go deeper:` Retrieve the official 2026 publication and record its applicable rate and effective date.

**Date:** 2026-07-15  
**Scope:** Exact official 2026 federal mileage reimbursement rate; estimate mode is **official/public benchmark**.

### Question And Threshold

- **Decision:** Set the reimbursement policy's per-mile rate.
- **Quantity / unit / horizon:** USD per mile for 2026.
- **Decision threshold:** Maximum acceptable error is USD 0.01 per mile.
- **Cost of being wrong:** A rate off by more than one cent per mile fails the policy requirement and misstates reimbursements.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** The target and year are clear; no source document is supplied; browsing is prohibited. **Assumption:** None is safe under the stated tolerance. **Inference:** Recall cannot establish an exact current official fact to the required precision.

| Required component | Low | Central | High | Blocker |
| --- | ---: | ---: | ---: | --- |
| Official 2026 rate | — | — | — | Current official source unavailable |
| Effective-date check | — | — | — | Source document unavailable |
| **Policy rate** | **—** | **—** | **—** | Accuracy requirement cannot be verified |

No interval is reported: any numeric value would be an unverified official claim.

### Value Of Information And Recommendation

The official 2026 source has decisive value of information because it directly resolves the rate and whether an effective-date distinction applies. Any verified value would move the result from blocked to exact. Stop once the official publication is retrieved and the rate is transcribed and checked to USD 0.01 per mile. Keep the policy rate unset until then.

**Source:** H13-C03 packet facts only; no official rate source was supplied.

### HTMA_RESULT

```json
{
  "quantity": "exact official 2026 federal mileage reimbursement rate",
  "unit": "USD per mile",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": "maximum acceptable error of USD 0.01 per mile",
  "threshold_implication": "The accuracy threshold cannot be met from memory; the policy rate must remain unset pending an official lookup.",
  "top_uncertainty_driver": "the unavailable official 2026 rate publication and its effective-date details",
  "estimate_status": "lookup_required",
  "blocking_missing_inputs": [
    "official 2026 federal mileage-rate source or permission to look it up"
  ],
  "assumed_target": "official/public benchmark",
  "next_measurement_step": "Retrieve the official 2026 rate publication and verify the applicable value and effective date to USD 0.01 per mile."
}
```

## H13-C04 — Unavailable Private Actual

- `Tease:` A private amount actually paid cannot be reconstructed from population averages.
- `Lede:` No numeric estimate is responsible; reimbursement requires the requester's bill and payment or insurance records.
- `Why it matters:` Substituting a typical cost could overpay or underpay the requester.
- `Go deeper:` Read the bill alongside the insurance statement and proof of payment.

**Date:** 2026-07-15  
**Scope:** The requester's personal amount paid for one medical bill; estimate mode is **private actual amount paid**.

### Question And Threshold

- **Decision:** Determine the reimbursable documented personal payment.
- **Quantity / unit / horizon:** Currency amount personally paid for the bill; currency is unspecified.
- **Decision threshold:** The documented actual amount is required for reimbursement.
- **Cost of being wrong:** An inferred amount would create an inaccurate reimbursement.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** The bill and insurance statement are unavailable; no billed amount, adjustment, deductible state, copay, provider, or service code was supplied. **Assumption:** None is safe. **Inference:** A reference class cannot identify this private actual.

| Required component | Low | Central | High | Blocker |
| --- | ---: | ---: | ---: | --- |
| Billed and allowed amounts | — | — | — | Bill and insurance statement unavailable |
| Insurer payment and adjustments | — | — | — | Insurance statement unavailable |
| Requester payment | — | — | — | Payment record unavailable |
| **Actual personally paid** | **—** | **—** | **—** | Private records required |

No interval is reported because a range would not establish the actual reimbursable payment.

### Value Of Information And Recommendation

Proof of payment matched to the bill has the highest value; the insurance statement explains adjustments and remaining patient responsibility. These records could move the result to any documented amount. Stop once the records reconcile the bill to the requester's payment. Do not use a population average; request the private documents through an appropriate secure channel.

**Source:** H13-C04 packet facts only; no private records were supplied.

### HTMA_RESULT

```json
{
  "quantity": "requester's documented personal payment for the medical bill",
  "unit": "currency amount paid; currency unspecified",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": "documented actual payment required for reimbursement",
  "threshold_implication": "A reimbursement amount cannot be set from an estimate; it requires the private actual documented in the requester's records.",
  "top_uncertainty_driver": "unavailable bill, insurance statement, and proof of payment",
  "estimate_status": "not_estimable",
  "blocking_missing_inputs": [
    "medical bill",
    "insurance statement",
    "proof of the requester's payment"
  ],
  "assumed_target": "private actual amount paid",
  "next_measurement_step": "Securely obtain and reconcile the bill, insurance statement, and proof of payment."
}
```

## H13-C05 — Estimated With A Real Threshold

- `Tease:` The supplied snack allowance remains below the approval ceiling even at the high end.
- `Lede:` Budget **USD 82.50–126.50**, central **USD 104.50**, at 90% confidence; approve because the high end is below USD 140.
- `Why it matters:` The threshold test leaves USD 13.50 of headroom at the high end.
- `Go deeper:` Per-attendee food and drink cost drives nearly all uncertainty.

**Date:** 2026-07-15  
**Scope:** Simple snacks for one 20-person workshop, including fixed supplies and 10% contingency; estimate mode is **planning allowance**.

### Question And Threshold

- **Decision:** Approve the snack allowance if its high end is at or below USD 140.
- **Quantity / unit / horizon:** Total USD for one 20-person workshop.
- **Decision threshold:** USD 140.
- **Cost of being wrong:** A low allowance risks insufficient snacks; an unnecessarily high allowance reserves excess budget.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** Food and drink cost USD 3–5 per attendee; fixed supplies cost USD 15; add 10% contingency. **Assumption:** USD 4 per attendee is the central midpoint, and contingency applies to the subtotal. **Inference:** No other cost category is added.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Food and drink | USD 60.00 | USD 80.00 | USD 100.00 | 20 × USD 3 / 4 / 5 |
| Fixed supplies | USD 15.00 | USD 15.00 | USD 15.00 | Supplied fixed amount |
| Subtotal | USD 75.00 | USD 95.00 | USD 115.00 | Component sum |
| 10% contingency | USD 7.50 | USD 9.50 | USD 11.50 | 10% of subtotal |
| **Planning allowance** | **USD 82.50** | **USD 104.50** | **USD 126.50** | Subtotal plus contingency |

The 90% interval is **USD 82.50–126.50**. Its high end is **USD 13.50 below** the USD 140 threshold.

### Value Of Information And Recommendation

A scope-matched cart total or supplier quote for 20 attendees has the highest value and would tighten the variable-cost range. The estimate moves up or down with per-attendee food and drink cost; fixed supplies do not drive uncertainty. Stop measuring if a current total including supplies and contingency remains at or below USD 140. **Approve** the allowance under the stated rule.

**Source:** H13-C05 synthetic packet anchors only.

### HTMA_RESULT

```json
{
  "quantity": "planning allowance for simple snacks for a 20-person workshop",
  "unit": "USD per workshop",
  "low_90": 82.5,
  "central": 104.5,
  "high_90": 126.5,
  "confidence": "90%",
  "decision_threshold": 140,
  "threshold_implication": "Approve: the USD 126.50 high end is USD 13.50 below the USD 140 threshold.",
  "top_uncertainty_driver": "food and drink cost per attendee within the supplied USD 3 to USD 5 range",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "planning allowance",
  "next_measurement_step": "Get a current cart total or supplier quote for food, drink, and supplies for 20 attendees."
}
```

## H13-C06 — Ambiguous Target Remains Blocking

- `Tease:` “Booth cost” is not one safe quantity until the target mode and event are identified.
- `Lede:` No numeric range is responsible because posted price, negotiated quote, budget allowance, and amount already paid are different targets.
- `Why it matters:` Choosing a mode or conference by assumption could answer the wrong decision.
- `Go deeper:` Clarify the target mode first, then identify the conference configuration and year.

**Date:** 2026-07-15  
**Scope:** A booth at an unspecified regional conference; estimate mode is **ambiguous**.

### Question And Threshold

- **Decision:** Not stated; possible targets imply different decisions.
- **Quantity / unit / horizon:** Conference-booth cost in an unspecified currency, configuration, and year.
- **Decision threshold:** Not supplied.
- **Cost of being wrong:** A numeric answer could conflate a posted market price, negotiated quote, planning allowance, or private actual.

### Priors, Decomposition, And Calibration

**Confirmed packet facts:** Conference, city, booth size, sponsor tier, year, and target mode are missing; browsing is prohibited. **Assumption:** No target is safe to select. **Inference:** A shared numeric reference class would not resolve the target mismatch.

| Required component | Low | Central | High | Blocker |
| --- | ---: | ---: | ---: | --- |
| Target quantity | — | — | — | Price, quote, allowance, or actual not selected |
| Event and year | — | — | — | Conference, city, and year missing |
| Booth configuration | — | — | — | Booth size and sponsor tier missing |
| **Booth cost** | **—** | **—** | **—** | Target and identifiers unresolved |

No confidence interval is reported because the target quantity itself remains ambiguous.

### Value Of Information And Recommendation

Clarifying the target mode has the highest value: it determines what evidence and quantity count. Event/year and booth configuration come next and could materially change any price. Stop clarification once the requester selects the target mode and supplies the conference, city, booth size or sponsor tier, and year; only then gather a mode-matched figure. Do not provide a single numeric answer yet.

**Source:** H13-C06 packet facts only; no price source was supplied.

### HTMA_RESULT

```json
{
  "quantity": "cost of a booth at a regional conference; target mode unresolved",
  "unit": "currency amount per booth; currency unspecified",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": null,
  "threshold_implication": "No threshold comparison or numeric estimate is responsible until the target mode and conference configuration are clarified.",
  "top_uncertainty_driver": "unresolved target mode, followed by missing conference, year, booth size, and sponsor tier",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": [
    "target mode: posted market price, likely negotiated quote, budget allowance, or amount already paid",
    "conference and city",
    "booth size or sponsor tier",
    "year"
  ],
  "assumed_target": null,
  "next_measurement_step": "Ask the requester to select the target mode and provide the conference, city, booth size or sponsor tier, and year."
}
```
