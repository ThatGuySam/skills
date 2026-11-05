# H12-C06

- `Tease:` The likely community-paid total is materially below retail pricing.
- `Lede:` Use **USD 1,300** as the central estimate, with a **USD 1,200-1,800 90% interval**; the center is below the USD 1,500 threshold, but the interval overlaps it.
- `Why it matters:` The likely outcome supports approval, while a hard cap still warrants a written quote.
- `Go deeper:` Two local paid-price anchors are more decision-relevant than the public retail range.

**Date:** Not supplied in the case packet  
**Scope:** One pickup order of 300 simple outdoor event yard signs from a local printer; amount likely paid after local/community treatment. Shipping and public-market value are outside scope.

## Decision And Short Answer

- **Decision:** Whether a likely paid amount below USD 1,500 supports approval.
- **Quantity / unit / horizon:** Total amount paid, USD, for this one order.
- **Estimate mode:** Amount likely paid.
- **Cost of being wrong:** Underestimating can breach the approval cap; overestimating can delay a locally affordable order.
- **Answer:** USD 1,300 central; USD 1,200-1,800 at 90% confidence. The likely amount is below the threshold, but the upper tail is not.

## Priors And Decomposition

| Anchor | Value for 300 signs | Status | Relevance |
| --- | ---: | --- | --- |
| Public retail at USD 6-8 each | USD 1,800-2,400 | Confirmed anchor; total calculated | Full-market scenario, not the requested paid target |
| Prior nonprofit economics at USD 4.10 each plus USD 25 setup | USD 1,255 | Scenario calculation | Direct local/community paid anchor |
| Recent larger-order economics at USD 4.35 each, setup waived | USD 1,305 | Scenario calculation | Direct same-channel paid anchor |

| Component | Low | Central | High | Confidence | Basis / what would tighten it |
| --- | ---: | ---: | ---: | --- | --- |
| 300 signs | USD 1,200 | USD 1,300 | USD 1,775 | Medium | Local anchors set the center; public retail sets upper-tail pressure |
| Setup | USD 0 | USD 0 | USD 25 | Medium | One comparable waived it and one charged USD 25 |
| **Total** | **USD 1,200** | **USD 1,300** | **USD 1,800** | **90% interval** | A written all-in quote would collapse most uncertainty |

## Calibration, Value Of Information, And Recommendation

- **Calibration:** The low bound allows slightly better community treatment than the USD 4.10 paid anchor. The high bound reaches the USD 6 retail floor rather than assuming the local adjustment is guaranteed.
- **Top uncertainty / highest-value measurement:** Whether this order receives the same community unit price and setup waiver as the comparables. An all-in written quote can cross the USD 1,500 decision boundary; further retail research is lower value.
- **What moves it:** A waived setup fee or stronger community pricing moves it down; weaker treatment approaching retail moves it up. Measurement stops mattering once an all-in quote is accepted and remains below the cap.
- **Recommendation:** Approve on a likely-cost basis at USD 1,300; if USD 1,500 is a hard ceiling rather than a planning threshold, confirm the all-in quote before committing.

## Sources

- Sanitized H12-C06 case-packet anchors only; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "likely amount paid for 300 simple outdoor event yard signs",
  "unit": "USD",
  "low_90": 1200,
  "central": 1300,
  "high_90": 1800,
  "confidence": "90%",
  "decision_threshold": 1500,
  "threshold_implication": "Central estimate is below the threshold, but the 90% interval overlaps it; approve on likely cost and obtain a written quote if USD 1,500 is a hard cap.",
  "top_uncertainty_driver": "whether the order receives comparable local/community unit pricing and a setup waiver",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "amount likely paid after local/community treatment",
  "next_measurement_step": "Obtain a written all-in quote for 300 signs that confirms the per-sign price and setup fee."
}
```

# H12-C07

- `Tease:` No responsible filing-fee number is available without identifying the governing schedule.
- `Lede:` Keep the estimate numeric fields null; the city, permit type, and effective fee period are required before this can enter the budget as an official fee.
- `Why it matters:` Guessing could put the wrong jurisdiction's or period's fee into today's budget.
- `Go deeper:` The shortest path is identifier collection followed by direct schedule lookup.

**Date:** Not supplied in the case packet  
**Scope:** Current official filing fee for one city permit. No market-price or locally discounted estimate is in scope.

## Decision And Short Answer

- **Decision:** Whether an official numeric fee can be entered into the budget today.
- **Quantity / unit / horizon:** Official filing fee, USD, effective for the relevant current filing period.
- **Estimate mode:** Official/public benchmark.
- **Cost of being wrong:** A budget could encode a fee for the wrong city, permit, or effective period.
- **Answer:** No numeric estimate is responsible. The required identifiers are absent, so ask for them before lookup or budget entry.

## Priors And Decomposition

| Evidence | Status | Implication |
| --- | --- | --- |
| The fee depends on jurisdiction and effective date | Confirmed case fact | A generic local-fee prior cannot establish the official value |
| City, permit type, and fee-schedule year are absent | Confirmed case fact | The governing fee line cannot be identified |
| Browsing is unavailable | Confirmed constraint | The current official schedule cannot be refreshed in this run |

| Required component | Low | Central | High | Confidence | What would tighten it |
| --- | ---: | ---: | ---: | --- | --- |
| City jurisdiction | null | null | null | Not quantified | Supply the city |
| Permit classification | null | null | null | Not quantified | Supply the exact permit type |
| Effective fee period | null | null | null | Not quantified | Supply the filing date or applicable schedule year |
| **Official fee** | **null** | **null** | **null** | **No numeric interval** | Read the identified official schedule |

## Calibration, Value Of Information, And Recommendation

- **Calibration:** A confidence interval would disguise an identification failure, so no low, central, or high value is reported.
- **Top uncertainty / highest-value measurement:** The city and exact permit type unlock the correct schedule; the effective period selects the applicable value. Other research has no decision value until those inputs exist.
- **What moves it:** Only the matching official schedule entry can establish the number. Measurement stops once that entry and its effective period are verified.
- **Recommendation:** Do not enter a numeric official fee today; use a clearly nonnumeric pending item and request the missing identifiers.

## Sources

- Sanitized H12-C07 case packet only; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "current official city permit filing fee",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": null,
  "threshold_implication": "No numeric fee should be entered into the budget until the governing official schedule is identified and verified.",
  "top_uncertainty_driver": "missing city jurisdiction and permit type",
  "estimate_status": "needs_identifier",
  "blocking_missing_inputs": [
    "city jurisdiction",
    "permit type",
    "applicable filing date or fee-schedule year"
  ],
  "assumed_target": "official/public benchmark filing fee",
  "next_measurement_step": "Obtain the city, exact permit type, and applicable date or schedule year, then read the matching official fee schedule."
}
```

# H12-C08

- `Tease:` “Booth cost” mixes several different quantities that cannot safely share one range.
- `Lede:` Ask a follow-up question instead of giving a number: identify the target mode, conference, and package first.
- `Why it matters:` Public price, negotiated paid price, planning allowance, and an actual payment answer different decisions.
- `Go deeper:` The missing conference and tier prevent even a mode-specific 2026 range.

**Date:** Not supplied in the case packet  
**Scope:** A booth at an unspecified 2026 regional tech conference. No conference, booth package, sponsor tier, or location is assumed.

## Decision And Short Answer

- **Decision:** Whether to ask a follow-up question or provide a range.
- **Quantity / unit / horizon:** Conference-booth cost, USD, for a 2026 event; the target quantity itself is unresolved.
- **Estimate mode:** Ambiguous.
- **Cost of being wrong:** A plausible-looking range could answer a different cost question and mislead planning or negotiation.
- **Answer:** Ask a follow-up. A single range is unsafe until target mode and event/package identifiers are supplied.

## Priors And Decomposition

| Possible target mode | Missing basis | Low | Central | High |
| --- | --- | ---: | ---: | ---: |
| Public market price | Conference, booth size or sponsor tier, city | null | null | null |
| Likely negotiated paid quote | Public package plus negotiated treatment | null | null | null |
| Budget allowance | Package plus desired planning coverage | null | null | null |
| Amount actually paid | Invoice or payment record | null | null | null |

No numeric anchor is present in the case packet. Assuming any one branch would change the question rather than measure it.

## Calibration, Value Of Information, And Recommendation

- **Calibration:** Null bounds accurately represent target ambiguity and missing identifiers; an interval would be fabricated.
- **Top uncertainty / highest-value measurement:** First clarify which cost concept is wanted. Then identify the conference and booth/tier; city is a secondary package identifier supplied by the requester.
- **What moves it:** A named 2026 conference package makes public-price lookup possible; negotiated terms or an invoice are additionally required for paid-cost modes. Measurement stops when the selected mode has its direct package or payment evidence.
- **Recommendation:** Ask: “Do you want public price, likely negotiated paid quote, a budget allowance, or an actual paid amount—and for which conference and booth size or sponsor tier?”

## Sources

- Sanitized H12-C08 case packet only; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "cost of a booth at a 2026 regional tech conference",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": null,
  "threshold_implication": "Ask a follow-up question; no single numeric target or action threshold is defined.",
  "top_uncertainty_driver": "unresolved target mode and unidentified conference package",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": [
    "target mode",
    "conference name",
    "booth size or sponsor tier",
    "city"
  ],
  "assumed_target": null,
  "next_measurement_step": "Ask which target mode is intended and obtain the conference name and booth size or sponsor tier."
}
```

# H12-C09

- `Tease:` A reimbursement request needs the requester's actual private payment record, not a modeled range.
- `Lede:` Report no dollar estimate; the paid amount is an unavailable private fact and guessing would not support reimbursement.
- `Why it matters:` An invented range could create an unsupported reimbursement claim.
- `Go deeper:` A minimally disclosed, redacted proof of payment is the decisive measurement.

**Date:** Not supplied in the case packet  
**Scope:** Amount the requester personally paid last month for one medical invoice. Medical details beyond the paid amount are omitted.

## Decision And Short Answer

- **Decision:** Whether the amount can support a reimbursement request.
- **Quantity / unit / horizon:** Actual personal payment, USD, last month.
- **Estimate mode:** Amount actually paid, not a forecast.
- **Cost of being wrong:** A guessed amount could overstate or understate a private reimbursement claim.
- **Answer:** Not estimable from the supplied facts. Use `[ask user]` and obtain the actual payment evidence; do not provide a dollar range.

## Priors And Decomposition

| Required fact | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Billed amount | null | null | null | Not provided |
| Insurer adjustment | null | null | null | Not provided |
| Deductible, copay, provider type, and service code | null | null | null | Not provided |
| Actual payment shown in the private file | null | null | null | File inaccessible and amount not supplied |
| **Amount personally paid** | **null** | **null** | **null** | **No responsible numeric interval** |

## Calibration, Value Of Information, And Recommendation

- **Calibration:** This is an unobserved actual, so a modeled 90% interval would not be adequate evidence for reimbursement.
- **Top uncertainty / highest-value measurement:** The actual paid line on a receipt or paid invoice resolves the question directly. Estimating insurer mechanics first has lower value once payment proof is available.
- **What moves it:** Only the requester's authorized payment record establishes the amount. Measurement stops when a redacted record shows the paid total.
- **Recommendation:** Do not estimate. Ask the requester for a redacted paid invoice or receipt containing only the amount needed for reimbursement.

## Sources

- Sanitized H12-C09 case packet only; no private file access or external lookup.

## HTMA_RESULT

```json
{
  "quantity": "amount the requester personally paid last month for the medical invoice",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": null,
  "threshold_implication": "No estimate can support reimbursement; use the actual documented payment amount.",
  "top_uncertainty_driver": "unavailable private proof of the actual payment",
  "estimate_status": "not_estimable",
  "blocking_missing_inputs": [
    "actual paid amount from an authorized private invoice or payment record"
  ],
  "assumed_target": "amount actually paid",
  "next_measurement_step": "Ask the requester to provide a redacted paid invoice or receipt showing the actual personal payment."
}
```

# H12-C10

- `Tease:` An unverified memory value is not strong enough for a current official reimbursement policy.
- `Lede:` Keep the rate null and wait for direct official 2026 lookup; the allowed error is only USD 0.05 per mile.
- `Why it matters:` The policy requires a current official value, and the supplied packet contains no source value to verify.
- `Go deeper:` One fresh official source lookup has decisive value; a remembered point estimate does not.

**Date:** Not supplied in the case packet  
**Scope:** Current official federal standard mileage reimbursement rate for 2026, in USD per mile. No local paid-price adjustment applies.

## Decision And Short Answer

- **Decision:** Whether a rate can be adopted in a reimbursement policy now.
- **Quantity / unit / horizon:** Official federal standard mileage reimbursement rate, USD per mile, for 2026.
- **Estimate mode:** Official/public benchmark.
- **Decision threshold / cost of being wrong:** Maximum tolerable error is USD 0.05 per mile; a larger error should delay the policy.
- **Answer:** No responsible numeric value can be supplied from memory under the no-web constraint. Wait for direct source lookup.

## Priors And Decomposition

| Required component | Low | Central | High | Status |
| --- | ---: | ---: | ---: | --- |
| Current official 2026 rate | null | null | null | No source document supplied |
| Verification against USD 0.05-per-mile tolerance | null | null | null | Cannot be established from unverified memory |
| **Policy rate** | **null** | **null** | **null** | **Lookup required** |

## Calibration, Value Of Information, And Recommendation

- **Calibration:** A numeric memory-based interval would lack the freshness and provenance required for an official benchmark. The packet does not establish that any remembered value is within USD 0.05 per mile.
- **Top uncertainty / highest-value measurement:** Absence of a current official 2026 source. Direct lookup can determine both the value and its effective period; no further estimation is useful afterward.
- **What moves it:** A current official source supplies the rate and unlocks the policy. Measurement stops once the value and effective period are verified from that source.
- **Recommendation:** Pause the policy value and perform a direct official-source lookup when browsing or a source document is available.

## Sources

- Sanitized H12-C10 case packet only; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "current 2026 federal standard mileage reimbursement rate",
  "unit": "USD per mile",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not quantified",
  "decision_threshold": 0.05,
  "threshold_implication": "The error cannot be shown to stay within USD 0.05 per mile, so the reimbursement policy should wait for direct official lookup.",
  "top_uncertainty_driver": "absence of a current official 2026 source",
  "estimate_status": "lookup_required",
  "blocking_missing_inputs": [
    "current official 2026 source document"
  ],
  "assumed_target": "official/public benchmark",
  "next_measurement_step": "Look up the current 2026 rate in a direct official source and verify its effective period before adopting the policy."
}
```
