# H13-C01

- `Tease:` The pickup quote is estimable even without an approval threshold.
- `Lede:` Likely paid quote: **USD 80–120**, with a **USD 100** central estimate and 90% confidence conditional on the supplied synthetic ranges.
- `Why it matters:` The missing threshold prevents an action comparison, not the estimate itself.
- `Go deeper:` The range is the sum of the fixed-quantity print and setup ranges.

**Date:** 2026-07-15  
**Scope:** One pickup print run of 100 simple one-page handouts.

## Question Made Precise

- **Quantity / unit / horizon:** Likely paid pickup quote, USD per 100-handout print run.
- **Estimate mode:** Paid quote.
- **Decision threshold:** None supplied; no approval action can be inferred.
- **Cost of being wrong:** Not specified in the packet.

## Estimate, Priors, And Decomposition

The packet confirms the quantity, scope, turnaround, and pickup; its only price anchors are synthetic. The central values below are midpoint assumptions, not observed quotes.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 100 handouts | 60 | 75 | 90 | USD 0.60–0.90 each; midpoint USD 0.75 |
| One-time setup | 20 | 25 | 30 | Supplied synthetic range; midpoint |
| **Total quote** | **80** | **100** | **120** | Component sums |

**Calibrated range:** USD 80–120 at 90% confidence, conditional on treating the packet ranges as calibrated bounds. The per-handout rate is the top uncertainty driver.

## Value Of Information And Recommendation

The highest-value next measurement is one binding pickup quote separating unit price and setup. A quote below USD 0.60 per handout or setup outside USD 20–30 would move the estimate; once a binding total is received, further estimation stops mattering. Use USD 100 as the central planning estimate, but make no approve/reject recommendation until a threshold is supplied.

**Source:** H13-C01 synthetic planning anchors only.

## HTMA_RESULT

```json
{
  "quantity": "likely paid pickup quote for printing 100 simple one-page handouts",
  "unit": "USD per 100-handout print run",
  "low_90": 80,
  "central": 100,
  "high_90": 120,
  "confidence": "90%",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available because no decision threshold was supplied.",
  "top_uncertainty_driver": "per-handout price within the supplied USD 0.60 to USD 0.90 range",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid pickup quote",
  "next_measurement_step": "Obtain one binding pickup quote that itemizes the per-handout price and setup charge."
}
```

# H13-C02

- `Tease:` No responsible official-fee estimate is possible without the issuing jurisdiction and effective schedule.
- `Lede:` **Blocked:** the numeric fee must remain unknown.
- `Why it matters:` Official fees are direct-source facts; applying another place or year's schedule would answer a different question.
- `Go deeper:` Supply the jurisdiction and effective period, then consult its official fee schedule.

**Date:** 2026-07-15  
**Scope:** The official renewal fee only; no vendor quote or planning allowance.

## Question Made Precise

- **Quantity / unit / horizon:** Current official standard sidewalk-use permit renewal fee, USD per renewal, for the applicable current period.
- **Estimate mode:** Official/public benchmark.
- **Decision threshold:** None supplied.
- **Missing identifiers:** City or issuing jurisdiction, plus fee-schedule year/effective period.

## Evidence And Blocked Decomposition

The packet confirms only the permit type and official-fee target. It also confirms that jurisdiction and schedule year are absent and browsing is prohibited. A low/central/high decomposition would therefore fabricate an official value.

| Component | Low | Central | High | Why blocked |
| --- | ---: | ---: | ---: | --- |
| Official renewal fee | — | — | — | Issuer and effective schedule are unidentified |

## Value Of Information And Recommendation

First obtain the city or issuing jurisdiction; then obtain the applicable fee-schedule year or effective date. Those inputs unlock a direct lookup of the matching official schedule. Stop measuring once that schedule unambiguously lists the standard renewal fee. Do not provide a numeric fee before then.

**Source:** H13-C02 packet facts only; no external lookup performed.

## HTMA_RESULT

```json
{
  "quantity": "current official renewal fee for a standard sidewalk-use permit",
  "unit": "USD per renewal",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not estimated",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available, and the official fee cannot be identified without the jurisdiction and effective period.",
  "top_uncertainty_driver": "unidentified issuing jurisdiction and applicable fee schedule",
  "estimate_status": "needs_identifier",
  "blocking_missing_inputs": [
    "city or issuing jurisdiction",
    "applicable fee-schedule year or effective period"
  ],
  "assumed_target": "official/public benchmark: standard sidewalk-use permit renewal fee",
  "next_measurement_step": "Ask for the city or issuing jurisdiction and applicable effective period, then read that issuer's official fee schedule."
}
```

# H13-C03

- `Tease:` The target is clear, but the exact current official value requires a direct lookup.
- `Lede:` **Lookup required:** no numeric rate can be supplied under the no-browsing constraint.
- `Why it matters:` The policy requires USD 0.01-per-mile accuracy, so a remembered value is not adequate evidence.
- `Go deeper:` Verify the rate in the official 2026 source before setting policy.

**Date:** 2026-07-15  
**Scope:** Exact official 2026 federal mileage reimbursement rate for the policy.

## Question Made Precise

- **Quantity / unit / horizon:** Exact official rate, USD per mile, for 2026.
- **Estimate mode:** Official/public benchmark.
- **Decision threshold:** No action threshold supplied; required accuracy is USD 0.01 per mile.
- **Cost of being wrong:** The proposed rate would not meet the policy's stated accuracy requirement.

## Evidence And Blocked Decomposition

The packet supplies the target, year, and accuracy requirement, but no source document; browsing is prohibited. This is a published official fact, not a quantity that should be inferred or locally adjusted.

| Component | Low | Central | High | Why blocked |
| --- | ---: | ---: | ---: | --- |
| Official 2026 rate | — | — | — | Current direct source is unavailable in this packet |

## Value Of Information And Recommendation

The decisive measurement is the official 2026 rate notice. Any verified rate in that source would set the result directly; stop once the applicable rate is confirmed to USD 0.01 per mile. Leave the policy value unset until that lookup is completed.

**Source:** H13-C03 packet facts only; no external lookup performed.

## HTMA_RESULT

```json
{
  "quantity": "exact official 2026 federal mileage reimbursement rate",
  "unit": "USD per mile",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not estimated",
  "decision_threshold": null,
  "threshold_implication": "No policy value should be set until an official source confirms the rate to the required USD 0.01 per mile accuracy.",
  "top_uncertainty_driver": "the unavailable current official 2026 source value",
  "estimate_status": "lookup_required",
  "blocking_missing_inputs": [
    "official 2026 source value unavailable under the no-browsing constraint"
  ],
  "assumed_target": "official/public benchmark: exact 2026 federal mileage reimbursement rate",
  "next_measurement_step": "Read the official federal 2026 mileage-rate notice and record the applicable rate to USD 0.01 per mile."
}
```

# H13-C04

- `Tease:` A private amount actually paid cannot be reconstructed from absent records.
- `Lede:` **Not estimable:** the bill and insurance/payment evidence are required.
- `Why it matters:` A population average would not establish the requester's reimbursable actual.
- `Go deeper:` Obtain the private bill and statement or payment record.

**Date:** 2026-07-15  
**Scope:** The requester's actual payment for one medical bill, not an average or planning allowance.

## Question Made Precise

- **Quantity / unit / horizon:** Actual amount personally paid, USD for the specific bill.
- **Estimate mode:** Amount actually paid.
- **Decision threshold:** None supplied.
- **Missing private facts:** Bill, insurance statement, and payment evidence; no billed amount, adjustment, deductible state, copay, provider, or service code is available.

## Evidence And Blocked Decomposition

The packet establishes that the necessary private records and claim details are unavailable. Because reimbursement depends on the personal actual, no reference-class range would answer the question.

| Component | Low | Central | High | Why blocked |
| --- | ---: | ---: | ---: | --- |
| Requester's actual payment | — | — | — | Private bill and insurance/payment records are unavailable |

## Value Of Information And Recommendation

The bill plus insurance statement and proof of payment have decisive value: they replace estimation with the actual reimbursable amount. Stop once those records reconcile the requester-paid total. Do not substitute a population average.

**Source:** H13-C04 packet facts only; no private record supplied.

## HTMA_RESULT

```json
{
  "quantity": "amount the requester personally paid for the medical bill",
  "unit": "USD for the specific bill",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not estimated",
  "decision_threshold": null,
  "threshold_implication": "No reimbursement amount can be established until the requester's private actual-payment records are supplied.",
  "top_uncertainty_driver": "missing private bill and insurance/payment records",
  "estimate_status": "not_estimable",
  "blocking_missing_inputs": [
    "the requester's bill",
    "insurance statement and proof of the amount personally paid"
  ],
  "assumed_target": "amount actually paid by the requester for the specific medical bill",
  "next_measurement_step": "Ask the requester for the bill, insurance statement, and payment record showing the personally paid amount."
}
```

# H13-C05

- `Tease:` The workshop snack allowance clears the USD 140 approval ceiling.
- `Lede:` Planning allowance: **USD 82.50–126.50**, central **USD 104.50**; approve because the high end is USD 13.50 below the threshold.
- `Why it matters:` The supplied contingency is already included in every bound.
- `Go deeper:` Food and drink per attendee drives nearly all remaining uncertainty.

**Date:** 2026-07-15  
**Scope:** Simple snacks for one 20-person workshop, including fixed supplies and 10% contingency.

## Question Made Precise

- **Quantity / unit / horizon:** Planning allowance, USD per 20-person workshop.
- **Estimate mode:** Budget allowance.
- **Decision threshold:** USD 140; approve if the high end is at or below it.
- **Cost of being wrong:** Not otherwise specified in the packet.

## Estimate, Priors, And Decomposition

The packet supplies synthetic food/drink and fixed-supply anchors. The USD 4 attendee midpoint is the central assumption; the 10% contingency is applied to each scenario subtotal.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Food and drink | 60.00 | 80.00 | 100.00 | 20 × USD 3/4/5 |
| Fixed supplies | 15.00 | 15.00 | 15.00 | Supplied fixed amount |
| Subtotal | 75.00 | 95.00 | 115.00 | Component sums |
| 10% contingency | 7.50 | 9.50 | 11.50 | 10% of subtotal |
| **Planning allowance** | **82.50** | **104.50** | **126.50** | Subtotal plus contingency |

**Calibrated range:** USD 82.50–126.50 at 90% confidence, conditional on treating the packet's per-attendee range as calibrated bounds. The high end remains below USD 140.

## Value Of Information And Recommendation

The highest-value next measurement is an all-in food-and-drink quote per attendee; a value outside USD 3–5 would move the range. Further measurement stops mattering for approval once the all-in high case is confirmed at or below USD 140. **Approve** the allowance under the stated rule.

**Source:** H13-C05 synthetic planning anchors only.

## HTMA_RESULT

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
  "top_uncertainty_driver": "food-and-drink cost per attendee within the supplied USD 3 to USD 5 range",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "budget allowance for snacks for one 20-person workshop",
  "next_measurement_step": "Obtain an all-in food-and-drink quote per attendee and confirm whether it remains within USD 3 to USD 5."
}
```

# H13-C06

- `Tease:` A single booth-cost number would be unsafe because both the offering and target mode are undefined.
- `Lede:` **Needs clarification:** no numeric range is responsible from this packet.
- `Why it matters:` Posted price, negotiated quote, budget allowance, and amount already paid are different quantities.
- `Go deeper:` Identify the conference package and choose the target mode first.

**Date:** 2026-07-15  
**Scope:** Potential booth cost at an otherwise unidentified regional conference.

## Question Made Precise

- **Quantity / unit / horizon:** Not yet safe to define beyond possible USD per booth.
- **Estimate mode:** Ambiguous among posted market price, likely negotiated quote, budget allowance, and amount already paid.
- **Decision threshold:** None supplied.
- **Missing identifiers:** Conference, city, booth size or sponsor tier, and year.

## Evidence And Blocked Decomposition

The packet provides no numeric anchors and prohibits browsing. More importantly, selecting a target mode or conference package would change the requested quantity rather than merely narrow its range.

| Component | Low | Central | High | Why blocked |
| --- | ---: | ---: | ---: | --- |
| Booth cost | — | — | — | Target mode and conference package are undefined |

## Value Of Information And Recommendation

First ask the requester to choose the target mode and identify the conference/year, city, and booth size or sponsor tier. Those answers determine which price or record should then be measured. Stop when the identified package has the decision-relevant posted price, quote, allowance inputs, or paid record. Do not assume a target or provide a numeric answer now.

**Source:** H13-C06 packet facts only; no external lookup performed.

## HTMA_RESULT

```json
{
  "quantity": "cost of a booth at a regional conference",
  "unit": "USD per booth",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not estimated",
  "decision_threshold": null,
  "threshold_implication": "No action comparison is available, and no numeric estimate is responsible until the target mode and conference package are defined.",
  "top_uncertainty_driver": "undefined target mode and unidentified conference package",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": [
    "target mode: posted market price, likely negotiated quote, budget allowance, or amount already paid",
    "conference and city",
    "booth size or sponsor tier",
    "year"
  ],
  "assumed_target": null,
  "next_measurement_step": "Ask the requester to choose the target mode and provide the conference, city, booth size or sponsor tier, and year."
}
```
