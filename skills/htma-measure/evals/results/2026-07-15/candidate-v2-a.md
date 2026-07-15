## H12-C01

- `Tease:` The pickup quote is likely to clear the approval threshold.
- `Lede:` Estimated likely paid quote: **USD 210–295 (90%)**, central **USD 235**; the full range is below the **USD 325** threshold.
- `Why it matters:` This supports approval without more shopping while retaining room for small-order minimums.
- `Go deeper:` The center comes from quantity-scaling the two recent local quotes; the bounds allow community/bundle treatment on the low side and weak quantity scaling on the high side.

**Date:** Not supplied in the packet.  
**Scope:** One local-pickup order of 200 full-color one-page flyers and 80 simple badges, with five-business-day turnaround. Estimate mode: **likely paid local quote**.

### Question and decision

- Quantity/unit: total vendor quote, USD per order.
- Threshold: USD 325; approve without further shopping if the likely paid quote is below it.
- Cost of error: estimating low could approve an over-threshold quote; estimating high could trigger unnecessary shopping.

### Priors, decomposition, and calibrated range

The strongest anchors are the packet's recent local quotes. Straight quantity scaling gives USD 139.20 for flyers and USD 94.40 for badges, or USD 233.60 total. Public/full-market pricing is not supplied; the conservative non-discounted proxy is the full USD 292 total of the two reference orders at their larger quantities. Pickup makes delivery USD 0 rather than USD 30–45.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 200 flyers | 125 | 140 | 174 | Scaled flyer anchor; low allows a modest community/bundle concession, high retains the full 250-unit quote |
| 80 badges | 85 | 95 | 118 | Scaled badge anchor; same treatment |
| Delivery | 0 | 0 | 0 | Local pickup |
| **Total** | **210** | **235** | **292** | Rounded final high bound to USD 295 |

The **USD 210–295 90% modeling interval** is wider than straight scaling because minimum-order and bundling behavior are unknown. It still stress-tests a discounted local paid scenario.

### Value of information and recommendation

The top uncertainty is whether the printer scales both items by quantity or applies order minimums/bundling. One bundled written quote would collapse nearly all decision uncertainty. Stop measuring if that quote is at or below USD 325; otherwise shop once more. On the current evidence, **approve without further shopping**, subject to the actual quote remaining below the stated threshold.

**Would move up:** minimum charges that hold either item near its larger reference-order price.  
**Would move down:** an explicit nonprofit or bundle concession.  
**Source:** H12 sanitized prompt packet, Case H12-C01; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for 200 sponsor flyers and 80 name badges",
  "unit": "USD per order",
  "low_90": 210,
  "central": 235,
  "high_90": 295,
  "confidence": "90%",
  "decision_threshold": 325,
  "threshold_implication": "The entire estimated range is below USD 325, so approve without further shopping if the actual quote remains below the threshold.",
  "top_uncertainty_driver": "small-order minimums versus bundle or community treatment",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local bundled quote for the stated quantities, turnaround, and pickup terms",
  "next_measurement_step": "obtain one bundled written quote itemizing flyers, badges, and any setup charge"
}
```

## H12-C02

- `Tease:` A nonprofit pickup bundle is likely below USD 500, but the high end can cross it.
- `Lede:` Estimated likely paid quote: **USD 300–540 (90%)**, central **USD 415**; the center is USD 85 below the threshold.
- `Why it matters:` A normal nonprofit bundle fits, while light discounting on high-end component quotes may not.
- `Go deeper:` The paid range applies the packet's 10%–20% nonprofit/pickup treatment to the full-market component bundle.

**Date:** Not supplied in the packet.  
**Scope:** Projector, small screen, powered speaker, one wireless microphone, and one hour of basic setup for one half-day local meetup. Estimate mode: **likely paid local quote**.

### Question and decision

- Quantity/unit: total bundled vendor quote, USD per meetup.
- Threshold: USD 500.
- Cost of error: estimating low risks a budget overrun; estimating high could reject an otherwise acceptable bundle.

### Priors, decomposition, and calibrated range

| Component | Low | Central | High | Source quality / basis |
| --- | ---: | ---: | ---: | --- |
| Projector + small screen | 180 | 220 | 260 | Packet quote range |
| Speaker + wireless mic | 75 | 108 | 140 | Packet quote range; midpoint rounded |
| One hour setup | 120 | 160 | 200 | Packet quote range |
| **Full-market subtotal** | **375** | **488** | **600** | Component sum |
| Nonprofit/pickup treatment | -75 | -73 | -60 | 20% low, 15% center, 10% high |
| **Likely paid bundle** | **300** | **415** | **540** | Rounded to whole USD |

This is a **90% modeling interval** based directly on supplied component ranges and the supplied discount range. The range is broad because the components may be quoted near the same end and the setup line may or may not bundle efficiently.

### Value of information and recommendation

The highest-value measurement is one bundled local nonprofit quote; it directly resolves the only important uncertainty because the interval crosses USD 500. A quote at or below USD 500 ends the decision. The central estimate supports proceeding, but **require a bundled cap or actual quote of USD 500 or less before approval**.

**Would move up:** components quoted at their high ends with only a 10% trim.  
**Would move down:** low-end equipment rates plus the full 20% treatment.  
**Source:** H12 sanitized prompt packet, Case H12-C02; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for the stated meetup AV bundle and setup help",
  "unit": "USD per meetup",
  "low_90": 300,
  "central": 415,
  "high_90": 540,
  "confidence": "90%",
  "decision_threshold": 500,
  "threshold_implication": "The central estimate is below USD 500 but the upper bound crosses it; proceed only with a bundled quote or cap at or below USD 500.",
  "top_uncertainty_driver": "where the bundled component quotes land and whether the nonprofit pickup trim is 10% or 20%",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid bundled quote after local nonprofit and pickup treatment",
  "next_measurement_step": "request one bundled nonprofit quote with the setup-help line item and a USD 500 cap"
}
```

## H12-C03

- `Tease:` A USD 85 planning allowance should cover the stated workshop refreshments.
- `Lede:` Estimated budget allowance: **USD 63–104 (90%)**, central **USD 83**; even the high bound is below the **USD 120** threshold.
- `Why it matters:` The allowance includes the requested 15% contingency for modest attendance movement.
- `Go deeper:` Coffee, per-person snacks, and the add-on are summed first; contingency is then applied to the whole basket.

**Date:** Not supplied in the packet.  
**Scope:** Coffee and light snacks for one 12-person Saturday workshop. Estimate mode: **budget allowance**, not an invoice forecast.

### Question and decision

- Quantity/unit: planning allowance, USD per workshop.
- Threshold: USD 120.
- Cost of error: estimating low risks insufficient refreshments; estimating high ties up unnecessary budget.

### Priors, decomposition, and calibrated range

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Coffee box | 19.00 | 21.50 | 24.00 | Packet range for roughly 10–12 servings |
| Pastries/snacks for 12 | 24.00 | 36.00 | 48.00 | USD 2–4 per attendee |
| Fruit or water add-on | 12.00 | 15.00 | 18.00 | Packet range |
| **Subtotal** | **55.00** | **72.50** | **90.00** | Sum |
| 15% contingency | 8.25 | 10.88 | 13.50 | Packet instruction |
| **Allowance** | **63.25** | **83.38** | **103.50** | Reported as USD 63 / 83 / 104 |

The **USD 63–104 90% planning interval** reflects the supplied purchase ranges and contingency. The bounds are arithmetic planning scenarios, not claims about an exact future receipt.

### Value of information and recommendation

Final headcount is the top uncertainty, but it is low-value to measure further because the contingency already covers the stated 1–3-person shift and the high bound remains USD 16 below the threshold. Stop measuring unless attendance or the refreshment scope changes materially. **Set an allowance of about USD 85; no threshold-driven cut is needed.**

**Would move up:** attendance beyond the contemplated shift or choosing both fruit and water rather than one add-on.  
**Would move down:** lower-end snack portions or omitting the add-on.  
**Source:** H12 sanitized prompt packet, Case H12-C03; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "budget allowance for coffee and light snacks for a 12-person workshop",
  "unit": "USD per workshop",
  "low_90": 63,
  "central": 83,
  "high_90": 104,
  "confidence": "90%",
  "decision_threshold": 120,
  "threshold_implication": "The entire estimated range is below USD 120, so a central planning allowance of about USD 85 fits the threshold.",
  "top_uncertainty_driver": "final attendance within or beyond the stated 1-to-3-person shift",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "budget allowance for one 12-person workshop including 15% contingency",
  "next_measurement_step": "confirm final attendance only if it moves beyond the stated 1-to-3-person uncertainty"
}
```

## H12-C04

- `Tease:` The observed cancellation rate is below the action threshold, but 30 meetings leave meaningful uncertainty.
- `Lede:` Estimated true cancellation probability: **0.061–0.266 (90% Wilson interval)**, central **0.133**; the stated central-estimate rule does not trigger overbooking.
- `Why it matters:` The interval crosses 0.20, so the current no-action result is not strong evidence that the true rate is below the threshold.
- `Go deeper:` Four cancellations among 30 comparable meetings supply the numerator, denominator, and sampling uncertainty; no other predictors are assumed.

**Date:** Not supplied in the packet.  
**Scope:** True cancellation probability for the next cohort of meetings assumed comparable to the observed 30. Estimate mode: **small-sample rate estimate**.

### Question and decision

- Quantity/unit: cancellation probability, from 0 to 1, per comparable meeting.
- Threshold: 0.20; overbook or add standby slots only if the central estimate is above it.
- Cost of error: a low estimate can leave capacity unused after cancellations; a high estimate can create excess attendance risk.

### Priors, decomposition, and calibrated range

| Evidence / quantity | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Observed cancellations | — | 4 | — | Packet count |
| Comparable meetings | — | 30 | — | Packet count |
| Observed rate | — | 0.133 | — | 4 / 30 |
| True-rate interval | 0.061 | 0.133 | 0.266 | 90% Wilson score interval |

The observed proportion is the central estimate. A Wilson interval is used because the sample is small and a symmetric normal interval would be poorly calibrated near zero. This assumes the next cohort is exchangeable with the last 30 and that the cancellation process is stable.

### Value of information and recommendation

Sample size is the top uncertainty. Recording more comparable outcomes is the highest-value next measurement; stop once the interval lies wholly on one side of 0.20, or if the decision policy intentionally continues to depend only on the central estimate. Under the supplied rule, **do not overbook or add standby slots now**, because 0.133 is below 0.20; retain the caveat that the 90% interval crosses the threshold.

**Would move up:** a higher cancellation share in additional comparable meetings.  
**Would move down:** a sustained lower cancellation share in additional comparable meetings.  
**Source:** H12 sanitized prompt packet, Case H12-C04; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "true cancellation probability for the next cohort of similar outreach meetings",
  "unit": "probability from 0 to 1",
  "low_90": 0.061,
  "central": 0.133,
  "high_90": 0.266,
  "confidence": "90% Wilson score interval",
  "decision_threshold": 0.2,
  "threshold_implication": "The central estimate of 0.133 is below 0.20, so the stated rule does not trigger overbooking or standby slots, although the interval crosses the threshold.",
  "top_uncertainty_driver": "sampling uncertainty from only 30 comparable meetings",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "true cancellation probability assuming the next cohort is exchangeable with the 30 observed meetings",
  "next_measurement_step": "record additional comparable meeting outcomes and recompute the interval until it lies on one side of 0.20"
}
```

## H12-C05

- `Tease:` The simple 45-minute edit and caption cleanup should fit comfortably below USD 350.
- `Lede:` Estimated likely paid quote: **USD 220–310 (90%)**, central **USD 255**; the high bound remains below the decision threshold.
- `Why it matters:` The packet's two simple-edit anchors bracket the runtime, and the caption add-on is directly rateable by finished minute.
- `Go deeper:` The arithmetic anchor is roughly USD 225–293; the final interval is widened for uncertainty in how the freelancer scales between jobs.

**Date:** Not supplied in the packet.  
**Scope:** One usable-audio, 45-minute talk recording; trimmed MP4 plus cleaned caption file; no fancy motion graphics. Estimate mode: **likely paid local freelance quote**.

### Question and decision

- Quantity/unit: total freelance quote, USD per finished talk package.
- Threshold: USD 350.
- Cost of error: estimating low risks a budget overrun; estimating high could prompt unnecessary shopping or scope cuts.

### Priors, decomposition, and calibrated range

At the two supplied edit anchors, the implied runtime rates are USD 4.00–4.50 per finished minute. For 45 minutes, that implies about USD 180–202.50; direct linear interpolation between the 20- and 60-minute quotes gives USD 183.75. Caption cleanup adds USD 45–90.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Simple 45-minute edit | 180 | 185 | 203 | Runtime-rate bracket and interpolation from packet quotes |
| Caption cleanup | 45 | 68 | 90 | USD 1–2 × 45 finished minutes |
| **Arithmetic total** | **225** | **253** | **293** | Component sum; center rounded |
| **Calibrated quote** | **220** | **255** | **310** | Widened for quote-scaling uncertainty |

The **USD 220–310 90% modeling interval** is not an exact-price claim. Usable audio, simple deliverables, and no motion graphics keep the estimate tied to the supplied simple-edit reference class.

### Value of information and recommendation

The top uncertainty is the freelancer's pricing curve between the two observed runtimes, including any fixed project minimum. One scope-confirmed quote would resolve it. Further shopping stops mattering at any acceptable quote of USD 350 or less. **Approve the scope without further shopping if the actual quote stays at or below USD 350.**

**Would move up:** a fixed minimum or caption cleanup priced near USD 2 per minute.  
**Would move down:** pricing near the 60-minute per-minute anchor and captions near USD 1 per minute.  
**Source:** H12 sanitized prompt packet, Case H12-C05; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid quote for a simple 45-minute talk edit and cleaned caption file",
  "unit": "USD per talk package",
  "low_90": 220,
  "central": 255,
  "high_90": 310,
  "confidence": "90%",
  "decision_threshold": 350,
  "threshold_implication": "The entire estimated range is below USD 350, so approve without further shopping if the actual quote stays at or below the threshold.",
  "top_uncertainty_driver": "the freelancer's pricing curve and any fixed minimum between the 20- and 60-minute anchors",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local freelance quote for the stated simple edit and caption scope",
  "next_measurement_step": "obtain one scope-confirmed quote that separates edit and caption-cleanup charges"
}
```
