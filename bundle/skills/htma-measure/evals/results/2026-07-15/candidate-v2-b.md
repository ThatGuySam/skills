## H12-C06

- `Tease:` The community-price comparables put this order near USD 1,300, below the USD 1,500 decision line.
- `Lede:` A judgmental 90% range is **USD 1,230 to USD 1,500**, centered on **USD 1,290**; approve at the threshold, but confirm that community pricing applies.
- `Why it matters:` Full retail would exceed the threshold, while both decision-relevant paid comparables are below it.
- `Go deeper:` The estimate treats pickup and community pricing as part of the target, not as optional discounts.

**Date:** Not supplied in the packet.  
**Scope:** Likely amount paid for 300 simple outdoor yard signs from a local printer, with pickup and local/community treatment.

### Question made precise

- **Decision:** Whether a USD 1,500 allowance is sufficient.
- **Quantity / unit / horizon:** Total paid amount, USD, for this order.
- **Estimate mode:** Amount likely paid.
- **Cost of being wrong:** A low estimate creates a budget shortfall; a high estimate could cause an otherwise affordable order to be rejected.

### Short answer and decision

The central estimate is **USD 1,290**, with a **90% interval of USD 1,230 to USD 1,500**. The central estimate is USD 210 below the threshold, and the upper bound reaches but does not exceed it. Approve a USD 1,500 allowance if the printer confirms community treatment; if that treatment is unavailable, the USD 1,800 to USD 2,400 retail anchor becomes relevant and the decision changes.

### Priors, assumptions, and inference

| Item | Value | Role |
| --- | ---: | --- |
| Public retail anchor | USD 6-8/sign, or USD 1,800-2,400 for 300 | Packet fact; wrong target mode for the central estimate, but an important failure scenario |
| Prior nonprofit paid order | USD 4.10/sign plus USD 25 setup; USD 1,255 if applied to 300 | Packet fact plus arithmetic; strongest lower paid-quote anchor |
| Recent larger same-channel order | USD 4.35/sign, setup waived; USD 1,305 if applied to 300 | Packet fact plus arithmetic; strong paid-channel anchor, with quantity transfer uncertainty |
| Pickup and community treatment remain available | No delivery charge; paid-channel pricing applies | Bounded assumption from the requested scope |

### Decomposition

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 300 signs | USD 1,230 | USD 1,275 | USD 1,470 | USD 4.10, 4.25, and 4.90 per sign; central blends the two paid anchors and high adds a transfer buffer |
| Setup | USD 0 | USD 15 | USD 30 | Waived and USD 25 are observed; USD 30 is a small upper stress allowance |
| **Total** | **USD 1,230** | **USD 1,290** | **USD 1,500** | Rounded component sum |

### Calibration and value of information

This is a judgmental 90% interval, not a statistical confidence interval. Its low bound includes the prior USD 4.10 rate with setup waived; its high bound allows paid-channel pricing to worsen materially while staying distinct from public retail. The top uncertainty is whether the 300-sign order actually receives the same channel treatment. The highest-value next measurement is one written quote showing unit price and setup. Stop measuring once a scope-matched total at or below USD 1,500 is confirmed.

### What would move the estimate

- **Up:** Community pricing is denied, the signs are not comparable, or setup exceeds the observed pattern.
- **Down:** The USD 4.10 rate applies and setup is waived.
- **Recommendation:** Carry USD 1,500 and confirm the community-priced total before ordering.

### Source

- H12 sanitized prompt packet, case H12-C06.

### HTMA_RESULT

```json
{
  "quantity": "likely amount paid for 300 simple outdoor event yard signs",
  "unit": "USD",
  "low_90": 1230,
  "central": 1290,
  "high_90": 1500,
  "confidence": "90%",
  "decision_threshold": 1500,
  "threshold_implication": "The central estimate is below the threshold and the 90% upper bound reaches it; approve a USD 1,500 allowance if community pricing is confirmed.",
  "top_uncertainty_driver": "whether the 300-sign order receives the same local/community pricing treatment as the paid comparables",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "amount likely paid after local/community treatment with pickup",
  "next_measurement_step": "Obtain a written 300-sign quote showing the community unit rate and any setup charge."
}
```

## H12-C07

- `Tease:` An official permit fee cannot be responsibly priced without the jurisdiction, permit type, and effective schedule.
- `Lede:` **No numeric estimate is responsible; do not enter a confirmed fee in the budget today.**
- `Why it matters:` The missing identifiers determine which official fee applies.
- `Go deeper:` Ask for the identifiers, then read the matching official schedule.

**Date:** Not supplied in the packet.  
**Scope:** Current official city-permit filing fee only; no market or locally adjusted substitute.

### Question made precise

- **Decision:** Whether an official numeric fee can be entered into the budget today.
- **Quantity / unit / horizon:** Filing fee, USD, for the currently effective schedule.
- **Decision threshold:** No numeric threshold supplied; the required standard is an official applicable value.
- **Estimate mode:** Official/public benchmark.

### Short answer, evidence, and blocked decomposition

The packet states that the fee depends on jurisdiction and effective date, but supplies no city, permit type, or fee-schedule year. Those are selection keys, not variables that can be responsibly averaged. A numeric low, central, or high value would therefore be fabricated.

| Required element | Status | Why it blocks the number |
| --- | --- | --- |
| City / jurisdiction | Missing | Selects the governing schedule |
| Permit type | Missing | Selects the applicable fee entry |
| Effective date or schedule year | Missing | Selects the effective version |

### Calibration and value of information

Numeric confidence is not applicable while the official fee cannot be identified. The highest-value step is to obtain all three selection keys and then consult the matching official schedule. Any generic price range has no decision value. Stop once the exact applicable line and effective period are confirmed.

### Recommendation

Ask for the city, permit type, and effective date or schedule year. Until then, leave the budget fee unconfirmed rather than inserting a guessed allowance.

### Source

- H12 sanitized prompt packet, case H12-C07.

### HTMA_RESULT

```json
{
  "quantity": "current official city-permit filing fee",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not applicable (blocked)",
  "decision_threshold": null,
  "threshold_implication": "No official numeric fee can be entered into the budget until the applicable schedule entry is identified.",
  "top_uncertainty_driver": "the unidentified jurisdiction, permit classification, and effective schedule",
  "estimate_status": "needs_identifier",
  "blocking_missing_inputs": [
    "city or jurisdiction",
    "permit type",
    "effective date or fee-schedule year"
  ],
  "assumed_target": "official/public benchmark filing fee",
  "next_measurement_step": "Obtain the city, permit type, and effective date, then read the matching official fee schedule."
}
```

## H12-C08

- `Tease:` “Booth cost” currently names several different quantities, none tied to an identifiable conference package.
- `Lede:` **Ask a follow-up question; a single range would mix incompatible target modes.**
- `Why it matters:` Public price, negotiated quote, budget allowance, and actual paid amount require different evidence.
- `Go deeper:` Identify the target mode and package before estimating.

**Date:** Not supplied in the packet.  
**Scope:** A booth at an unspecified 2026 regional tech conference.

### Question made precise

- **Decision:** Whether to ask a follow-up or give a range.
- **Quantity / unit / horizon:** Booth cost, USD, in 2026; the target quantity is ambiguous.
- **Decision threshold:** None supplied.
- **Estimate mode:** Ambiguous.

### Short answer, evidence, and blocked decomposition

No defensible numeric range is available. The requester has not selected public market price, likely negotiated paid quote, budget allowance, or actual paid amount, and has not identified the conference, booth size, sponsor tier, or city.

| Possible target | Evidence needed before estimating |
| --- | --- |
| Public market price | Identified conference and public package/tier |
| Likely paid negotiated quote | Identified package plus the relevant negotiated quote context |
| Budget allowance | Identified package and the desired planning target |
| Amount actually paid | The relevant payment record |

These branches cannot be combined into one calibrated decomposition without hiding the target ambiguity.

### Calibration and value of information

Numeric confidence is not applicable. The target mode is the first and highest-value clarification; conference and package identifiers come next. Stop clarifying once one mode, conference, and package are named—then produce the range or retrieve the actual appropriate to that mode.

### Recommendation

Ask: “Do you want public list price, a likely negotiated quote, a planning allowance, or an actual paid amount—and for which conference, city, booth size, and sponsor tier?”

### Source

- H12 sanitized prompt packet, case H12-C08.

### HTMA_RESULT

```json
{
  "quantity": "cost of a booth at a 2026 regional tech conference",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not applicable (needs clarification)",
  "decision_threshold": null,
  "threshold_implication": "Ask a follow-up; no action comparison or defensible range is available until the target mode and package are specified.",
  "top_uncertainty_driver": "the unresolved target mode and unidentified conference package",
  "estimate_status": "needs_clarification",
  "blocking_missing_inputs": [
    "target mode: public market price, likely paid negotiated quote, budget allowance, or actual paid amount",
    "conference name and city",
    "booth size or sponsor tier"
  ],
  "assumed_target": null,
  "next_measurement_step": "Ask the requester to select the target mode and name the conference, city, booth size, and sponsor tier."
}
```

## H12-C09

- `Tease:` A personal amount actually paid is a private record fact, not a quantity that should be guessed.
- `Lede:` **No dollar range is responsible; use the requester’s redacted payment record for reimbursement.**
- `Why it matters:` An invented estimate cannot substantiate a reimbursement request.
- `Go deeper:` Ask the requester for the record rather than attempting an external lookup.

**Date:** Not supplied in the packet.  
**Scope:** The requester’s actual medical-invoice payment during the intended prior month.

### Question made precise

- **Decision:** Whether an estimated amount can support reimbursement.
- **Quantity / unit / horizon:** Amount personally paid, USD, last month.
- **Decision threshold:** None supplied; reimbursement requires the private actual.
- **Estimate mode:** Amount actually paid.

### Short answer, evidence, and blocked decomposition

The private file is unavailable, and the packet supplies none of the billed amount, insurer adjustment, deductible status, copay, provider type, or service code. More importantly, the requested quantity is the actual payment. Without the invoice or payment record, any dollar interval would be guesswork.

| Element | Status | Consequence |
| --- | --- | --- |
| Private invoice / payment record | Unavailable | The actual paid amount cannot be observed |
| Listed billing and insurance inputs | Not supplied | A reconstruction is also impossible and would still not prove payment |

### Calibration and value of information

Numeric confidence is not applicable. The payment record has overwhelmingly higher decision value than estimating any billing component. Stop as soon as the requester supplies a redacted record showing the patient-paid amount for the intended month.

### Recommendation

Do not submit a guessed reimbursement amount. Ask the requester to provide the relevant redacted invoice and proof of payment, or just the documented patient-paid total.

### Source

- H12 sanitized prompt packet, case H12-C09.

### HTMA_RESULT

```json
{
  "quantity": "amount the requester personally paid for the medical invoice last month",
  "unit": "USD",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not applicable (private actual unavailable)",
  "decision_threshold": null,
  "threshold_implication": "Do not use an estimate for reimbursement; the documented private actual is required.",
  "top_uncertainty_driver": "the unavailable private invoice and payment record",
  "estimate_status": "not_estimable",
  "blocking_missing_inputs": [
    "requester's private invoice or payment record showing the amount actually paid"
  ],
  "assumed_target": "amount actually paid last month",
  "next_measurement_step": "Ask the requester to provide the relevant redacted invoice plus proof of payment, or the documented patient-paid total."
}
```

## H12-C10

- `Tease:` A current official reimbursement rate should not be set from unsourced memory when five cents per mile can change the decision.
- `Lede:` **Do not provide a numeric rate; the policy should wait for a direct 2026 official-source lookup.**
- `Why it matters:` The required error tolerance cannot be demonstrated without the current source.
- `Go deeper:` Retrieve or obtain the authoritative 2026 rate notice.

**Date:** Not supplied in the packet.  
**Scope:** Current official federal standard mileage reimbursement rate for 2026.

### Question made precise

- **Decision:** Whether the value can be adopted in a reimbursement policy now.
- **Quantity / unit / horizon:** Official rate, USD per mile, for 2026.
- **Decision threshold:** Maximum tolerable error of USD 0.05 per mile.
- **Estimate mode:** Official/public benchmark.

### Short answer, evidence, and blocked decomposition

No responsible numeric estimate is available under the no-browsing constraint. The requester supplied no source document, and an official current value is a lookup target rather than a locally adjustable estimate. Unsourced memory cannot establish that error is within USD 0.05 per mile.

| Required element | Status | Consequence |
| --- | --- | --- |
| Authoritative 2026 federal rate source | Unavailable | The official value and its effective period cannot be verified |

### Calibration and value of information

Numeric confidence is not applicable. The direct official notice is the only high-value measurement; estimating components or consulting unrelated comparables cannot improve this decision. Stop once the authoritative 2026 value and effective period are confirmed.

### Recommendation

Pause the policy value. Look up the applicable official 2026 federal publication, or ask the requester to supply it, before entering a rate.

### Source

- H12 sanitized prompt packet, case H12-C10.

### HTMA_RESULT

```json
{
  "quantity": "current official federal standard mileage reimbursement rate for 2026",
  "unit": "USD per mile",
  "low_90": null,
  "central": null,
  "high_90": null,
  "confidence": "not applicable (lookup required)",
  "decision_threshold": 0.05,
  "threshold_implication": "Without a direct official source, error cannot be shown to stay within USD 0.05 per mile, so the policy should wait.",
  "top_uncertainty_driver": "the unavailable authoritative 2026 federal rate source",
  "estimate_status": "lookup_required",
  "blocking_missing_inputs": [
    "current authoritative 2026 federal mileage-rate source"
  ],
  "assumed_target": "official/public benchmark for 2026",
  "next_measurement_step": "Retrieve the applicable official 2026 federal rate publication and verify its value and effective period."
}
```
