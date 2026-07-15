# H12-C01

- `Tease:` The supplied local comparables put this pickup order comfortably below the approval threshold.
- `Lede:` A 90% calibrated likely-paid range is **USD 200–280**, centered on **USD 234**; approve without further shopping under the stated USD 325 rule.
- `Why it matters:` Both calibrated bounds are below the threshold, so more price research has little decision value.
- `Go deeper:` The main residual uncertainty is whether smaller quantities trigger minimum or setup pricing.

**Date:** Not supplied in the packet.  
**Scope:** One pickup order for 200 full-color one-page flyers and 80 simple badges, with a five-business-day turnaround. Estimate mode: **likely paid local quote**.

## Decision frame

- **Quantity / unit / horizon:** Total quote, USD, for this one event order.
- **Threshold:** USD 325; below it, approve without further shopping.
- **Cost of error:** An estimate that is too low could approve an unexpectedly costly order; one that is too high could trigger needless shopping.

## Evidence, assumptions, and decomposition

**Confirmed anchors:** USD 174 for 250 similar flyers; USD 118 for 100 simple badges; pickup avoids the usual USD 30–45 delivery charge. **Inference:** Straight prorating gives USD 139.20 for flyers and USD 94.40 for badges, or USD 233.60 total. The interval allows for community treatment on the low side and non-linear minimum/setup pricing on the high side; neither adjustment is a confirmed quote.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 200 flyers | 120 | 139 | 165 | Prorated recent local flyer quote, then calibrated for discount/minimum risk |
| 80 badges | 80 | 95 | 115 | Prorated recent local badge quote, then calibrated for discount/minimum risk |
| Delivery | 0 | 0 | 0 | Local pickup |
| **Likely paid quote** | **200** | **234** | **280** | Component sum; rounded |

## Calibrated range and value of information

The **USD 200–280** interval is a 90% judgmental interval, with moderate confidence because the anchors are recent and local but not at the exact quantities. The highest-value measurement would be one all-in quote for the exact quantities; it would mainly reveal minimum/setup effects. It would not change the approval decision unless it exceeded USD 325, so further shopping should stop once an all-in quote is at or below that threshold.

**Would move up:** quantity minimums, setup charges, or materially different stock/finishing. **Would move down:** an explicit community discount or bundled setup waiver.

## Recommendation

Approve without further shopping on the supplied rule; request the exact all-in pickup quote only to finalize the payable amount.

## Sources

- Sanitized prompt packet, Case H12-C01; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for 200 flyers and 80 badges",
  "unit": "USD per event order",
  "low_90": 200,
  "central": 234,
  "high_90": 280,
  "confidence": "90% interval; moderate confidence",
  "decision_threshold": 325,
  "threshold_implication": "The full calibrated range is below USD 325, so approve without further shopping.",
  "top_uncertainty_driver": "non-linear minimum or setup pricing at the requested quantities",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local pickup quote",
  "next_measurement_step": "Ask the local printer for one all-in quote for exactly 200 flyers and 80 badges with pickup."
}
```

# H12-C02

- `Tease:` The likely bundled quote centers below USD 500, but the calibrated upper tail crosses it.
- `Lede:` A 90% likely-paid range is **USD 300–540**, centered on **USD 415**; get one capped bundle quote before committing.
- `Why it matters:` The central case clears the threshold, while a high component mix with only a light discount does not.
- `Go deeper:` The combined equipment and labor bundle price is the decision-critical unknown.

**Date:** Not supplied in the packet.  
**Scope:** One half-day nonprofit meetup bundle: projector, small screen, powered speaker, one wireless microphone, and one hour of basic setup help, with local pickup/dropoff. Estimate mode: **likely paid local quote**.

## Decision frame

- **Quantity / unit / horizon:** Total quote, USD, for one half-day meetup.
- **Threshold:** USD 500.
- **Cost of error:** Underestimation could commit the meetup above budget; overestimation could cause unnecessary shopping or scope cuts.

## Evidence, assumptions, and decomposition

**Confirmed anchors:** The three full-market component ranges total USD 375–600. Local nonprofit/pickup treatment often trims 10%–20%. **Inference:** The central scenario uses component midpoints and a 15% reduction; the low and high scenarios pair the stated range endpoints with 20% and 10% reductions respectively.

| Scenario | Projector + screen | Speaker + mic | Setup help | Full-market subtotal | Treatment | Likely paid |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Low | 180 | 75 | 120 | 375 | -20% | 300 |
| Central | 220 | 108 | 160 | 488 | -15% | 415 |
| High | 260 | 140 | 200 | 600 | -10% | 540 |

## Calibrated range and value of information

The **USD 300–540** range is a 90% judgmental interval with moderate confidence. It explicitly preserves both the full-market anchor and the likely paid-quote adjustment. The highest-value next measurement is a written all-in bundle quote: it directly resolves whether the total is above USD 500. Stop measuring if the quote is USD 500 or less; if it is higher, compare one alternative or simplify the component driving the overage.

**Would move up:** high-end choices across multiple components or only a 10% bundle reduction. **Would move down:** low-end components plus the full 20% nonprofit/pickup treatment.

## Recommendation

Plan around USD 415, but do not assume the threshold is secure: obtain one all-in quote or a not-to-exceed USD 500 commitment.

## Sources

- Sanitized prompt packet, Case H12-C02; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for the meetup AV and setup bundle",
  "unit": "USD per half-day meetup",
  "low_90": 300,
  "central": 415,
  "high_90": 540,
  "confidence": "90% interval; moderate confidence",
  "decision_threshold": 500,
  "threshold_implication": "The central estimate is below USD 500, but the calibrated range crosses it; obtain a capped all-in quote before committing.",
  "top_uncertainty_driver": "the all-in bundle price after nonprofit and pickup treatment",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local nonprofit pickup quote",
  "next_measurement_step": "Request one written all-in bundle quote with a USD 500 not-to-exceed target."
}
```

# H12-C03

- `Tease:` A responsible refreshment allowance stays below the USD 120 ceiling even after contingency.
- `Lede:` Use a 90% planning range of **USD 63–104**, centered on **USD 84**; a practical rounded budget line is USD 85.
- `Why it matters:` The supplied 15% contingency already covers modest attendance movement without consuming the threshold.
- `Go deeper:` Snack quantity and final attendance drive most of the remaining spread.

**Date:** Not supplied in the packet.  
**Scope:** Coffee, snack portions, and one fruit-or-water add-on for one 12-person Saturday workshop. Estimate mode: **budget allowance**, not an exact invoice.

## Decision frame

- **Quantity / unit / horizon:** Planning allowance, USD, for this workshop.
- **Threshold:** USD 120.
- **Cost of error:** Too little allowance risks shortages or last-minute spend; too much unnecessarily reserves budget.

## Evidence, assumptions, and decomposition

**Confirmed anchors:** Coffee USD 19–24; snacks USD 2–4 per attendee; fruit or water USD 12–18; 15% contingency for a possible one-to-three-person attendance shift. **Assumption:** The allowance includes one fruit-or-water add-on. **Inference:** Midpoints form the central case, then the stated contingency is applied.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Coffee box | 19.0 | 21.5 | 24.0 | Supplied range |
| 12 snack portions | 24.0 | 36.0 | 48.0 | USD 2–4 × 12 |
| Fruit or water add-on | 12.0 | 15.0 | 18.0 | Supplied range |
| Subtotal | 55.0 | 72.5 | 90.0 | Component sum |
| 15% contingency | 8.3 | 10.9 | 13.5 | Supplied contingency |
| **Allowance** | **63.3** | **83.4** | **103.5** | Rounded in the final estimate |

## Calibrated range and value of information

The rounded **USD 63–104** range is a 90% planning interval with moderate-high confidence under the stated menu. Final headcount and whether the add-on is wanted are the most useful remaining measurements. Because the entire range is below USD 120, stop measuring once those two choices are confirmed; exact vendor pricing is not decision-relevant unless it pushes the basket above the threshold.

**Would move up:** attendance near the high end of the expected shift or USD 4 snack portions. **Would move down:** fewer attendees, USD 2 portions, or omitting the add-on.

## Recommendation

Enter **USD 85** as the working allowance. It is below the threshold, while the USD 104 high case leaves a visible reserve.

## Sources

- Sanitized prompt packet, Case H12-C03; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "budget allowance for coffee and light snacks for 12 people",
  "unit": "USD per workshop",
  "low_90": 63,
  "central": 84,
  "high_90": 104,
  "confidence": "90% interval; moderate-high confidence",
  "decision_threshold": 120,
  "threshold_implication": "The full calibrated range is below USD 120, so the refreshment plan fits the threshold.",
  "top_uncertainty_driver": "final attendance and snack cost per person",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "planning allowance including one fruit-or-water add-on and 15% contingency",
  "next_measurement_step": "Confirm the final headcount and whether the fruit-or-water add-on is included before ordering."
}
```

# H12-C04

- `Tease:` The observed cancellation rate is below 0.20, but 30 meetings do not rule out a true rate above it.
- `Lede:` Estimate the true cancellation probability at **0.13**, with a 90% calibrated interval of **0.06–0.27**; the stated central-estimate rule does not trigger overbooking.
- `Why it matters:` The interval crosses the action threshold, so the current decision is rule-consistent but not strongly resolved.
- `Go deeper:` Sample size, not model complexity, is the dominant uncertainty because no other predictors are known.

**Date:** Not supplied in the packet.  
**Scope:** Per-meeting cancellation probability for the next cohort of meetings comparable to the 30 observed. Estimate mode: **empirical reference-class risk estimate**.

## Decision frame

- **Quantity / unit / horizon:** True cancellation probability, from 0 to 1, for a meeting in the next similar cohort.
- **Threshold:** 0.20; overbook or add standby slots only if the central estimate is above it.
- **Cost of error:** Underestimation can leave slots unused; overestimation can create avoidable overbooking or standby burden.

## Evidence, assumptions, and decomposition

**Confirmed facts:** 4 of 30 comparable meetings were canceled; no other predictors are known. **Inference:** The observed proportion, 4/30 = 0.133, is the central estimate. An approximate 90% Wilson binomial interval gives about 0.06–0.27 for the underlying probability.

| Quantity | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| True cancellation probability | 0.06 | 0.13 | 0.27 | 4 cancellations in 30 comparable meetings; approximate 90% Wilson interval |

## Calibrated range and value of information

The **0.06–0.27** interval has moderate-low confidence: the reference class is directly comparable, but the sample is small enough that the threshold remains inside the interval. The highest-value measurement is more outcomes from the same kind of meeting, recorded with the same cancellation definition. Recompute after the next comparable cohort; stop collecting for this decision when the interval lies wholly on one side of 0.20 or when operating costs make the threshold irrelevant.

**Would move up:** a higher cancellation proportion in new comparable meetings. **Would move down:** a lower proportion. No additional predictor should be added without observed evidence.

## Recommendation

Do not trigger overbooking or standby slots under the supplied central-estimate rule: 0.13 is below 0.20. Treat that as provisional because the 90% interval crosses the threshold.

## Sources

- Sanitized prompt packet, Case H12-C04; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "true cancellation probability for the next cohort of similar meetings",
  "unit": "probability from 0 to 1",
  "low_90": 0.06,
  "central": 0.13,
  "high_90": 0.27,
  "confidence": "90% interval; moderate-low confidence",
  "decision_threshold": 0.2,
  "threshold_implication": "The central estimate is below 0.20, so the stated rule does not trigger overbooking or standby slots, although the interval crosses the threshold.",
  "top_uncertainty_driver": "only 30 comparable meetings have been observed",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "per-meeting cancellation probability for a comparable future cohort",
  "next_measurement_step": "Record cancellations for the next comparable cohort and recompute the same binomial interval."
}
```

# H12-C05

- `Tease:` The simple-edit comparables put this package below the USD 350 threshold with room to spare.
- `Lede:` A 90% likely-paid range is **USD 225–300**, centered on **USD 260**; approve if the written scope confirms an existing transcript and bounded revisions.
- `Why it matters:` Even the calibrated high case is below the threshold, but caption starting condition can change the scope.
- `Go deeper:` The largest unknown is whether caption cleanup starts from an existing transcript, as the supplied caption rate assumes.

**Date:** Not supplied in the packet.  
**Scope:** One 45-minute talk recording with usable audio, a trimmed MP4, and a cleaned-up caption file; no fancy motion graphics. Estimate mode: **likely paid local freelance quote**.

## Decision frame

- **Quantity / unit / horizon:** Total quote, USD, for this one recording package.
- **Threshold:** USD 350.
- **Cost of error:** Underestimation could approve an under-scoped quote; overestimation could cause needless delay or shopping.

## Evidence, assumptions, and decomposition

**Confirmed anchors:** A 20-minute simple edit was quoted at USD 90; a 60-minute simple edit at USD 240; caption cleanup with an existing transcript is USD 1–2 per finished minute. **Bounded assumption:** An existing transcript or caption draft is available. **Inference:** The two edit anchors imply roughly USD 180–202.50 for 45 minutes when scaled by finished duration; the high case is widened to USD 210 for quote variation. No unsupported local discount is applied.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Simple 45-minute edit | 180 | 192 | 210 | Scaled quote anchors; upper side modestly widened |
| Caption cleanup | 45 | 68 | 90 | USD 1–2 × 45 minutes |
| **Likely paid quote** | **225** | **260** | **300** | Component sum; rounded |

## Calibrated range and value of information

The **USD 225–300** range is a 90% judgmental interval with moderate confidence. The highest-value check is whether a transcript already exists and how many revision rounds the quote includes. Those details could change the scope, but further shopping has low value if an all-in written quote is USD 350 or less. Stop measuring once the deliverables, caption starting point, and revision cap are written into such a quote.

**Would move up:** transcription from scratch, dense corrective edits, or open-ended revisions. **Would move down:** very light trimming and a clean existing caption draft.

## Recommendation

Use USD 260 as the central planning figure and approve an all-in quote at or below USD 350 once the caption input and revision limit are confirmed.

## Sources

- Sanitized prompt packet, Case H12-C05; no external lookup.

## HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for a trimmed 45-minute talk MP4 and cleaned caption file",
  "unit": "USD per recording package",
  "low_90": 225,
  "central": 260,
  "high_90": 300,
  "confidence": "90% interval; moderate confidence",
  "decision_threshold": 350,
  "threshold_implication": "The full calibrated range is below USD 350, so approve once the written scope confirms the caption input and revision limit.",
  "top_uncertainty_driver": "whether caption cleanup starts from an existing transcript or caption draft",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid quote assuming an existing transcript and simple editing scope",
  "next_measurement_step": "Confirm that an existing transcript is supplied and obtain an all-in quote with a stated revision cap."
}
```
