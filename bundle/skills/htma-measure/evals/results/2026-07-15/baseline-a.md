## H12-C01

- `Tease:` The stated print job is likely to clear the USD 325 no-shop threshold.
- `Lede:` Estimate a USD 235 likely paid local pickup quote, with a 90% range of USD 200 to USD 292.
- `Why it matters:` The whole calibrated range is below the approval threshold; the remaining risk is nonlinear small-run pricing or an unlisted charge.
- `Go deeper:` The estimate scales the two recent local quotes and preserves the larger-quantity quote total as the conservative high case.

**Date:** Not provided in the case packet.  
**Scope:** 200 full-color one-page flyers plus 80 simple badges for one evening event, five-business-day turnaround, local pickup, no delivery.

### Question and decision

- **Decision:** Approve without further shopping if the likely paid quote is below USD 325.
- **Quantity / unit / horizon:** One vendor quote, USD, for this event order.
- **Estimate mode:** Likely paid local nonprofit quote.
- **Cost of being wrong:** Underestimation can create a budget overrun; overestimation causes unnecessary shopping.

### Priors and decomposition

**Confirmed anchors:** 250 similar flyers were quoted at USD 174; 100 badges at USD 118; pickup avoids USD 30 to USD 45 delivery. **Inference:** central values scale those quotes to 200 and 80 units; low values allow a discounted or bundled local quote, while high values retain the larger-order quoted amounts to cover nonlinearity.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| 200 flyers | 125 | 140 | 174 | Central is the rounded USD 139.20 proportional anchor |
| 80 badges | 75 | 95 | 118 | Central is the rounded USD 94.40 proportional anchor |
| Delivery | 0 | 0 | 0 | Local pickup |
| **Paid quote** | **200** | **235** | **292** | Component roll-up |

### Calibration, value of information, and recommendation

The calibrated 90% interval is **USD 200 to USD 292**, conditional on the stated standard scope. It is wholly below USD 325, so approve without more shopping. The top uncertainty is how the printer handles smaller-quantity setup and bundling. The highest-value measurement is one written combined pickup quote confirming that basic setup is included; further measurement stops mattering once that quote is at or below USD 325.

**Would move the estimate:** A waived setup or bundle discount moves it down; a minimum-run or separate badge setup charge moves it up.

**Source:** Sanitized case packet, H12-C01; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid local quote for 200 flyers and 80 badges",
  "unit": "USD per event order",
  "low_90": 200,
  "central": 235,
  "high_90": 292,
  "confidence": "90%",
  "decision_threshold": 325,
  "threshold_implication": "The full estimated range is below USD 325, so approve without further shopping.",
  "top_uncertainty_driver": "nonlinear small-run setup and bundling treatment",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local pickup quote for the stated nonprofit print scope",
  "next_measurement_step": "Request one written combined 200-flyer and 80-badge pickup quote confirming basic setup is included."
}
```

## H12-C02

- `Tease:` A simple nonprofit AV bundle is likely under USD 500, but the upper range crosses the cap.
- `Lede:` Estimate a USD 415 likely paid quote, with a 90% range of USD 300 to USD 540.
- `Why it matters:` The central case supports the USD 500 budget, while a high-end vendor can still exceed it.
- `Go deeper:` The paid range applies the packet's 10% to 20% nonprofit/pickup reduction to the full-market component bundle.

**Date:** Not provided in the case packet.  
**Scope:** Projector, small screen, one powered speaker, one wireless microphone, and one hour of basic setup for a half-day local meetup with pickup/dropoff.

### Question and decision

- **Decision:** Determine whether a USD 500 cap is sufficient for the stated bundle.
- **Quantity / unit / horizon:** One paid vendor quote, USD, for the half-day meetup.
- **Estimate mode:** Likely paid local nonprofit quote.
- **Cost of being wrong:** Underestimation can leave the meetup without required AV; overestimation ties up budget unnecessarily.

### Priors and decomposition

The equipment and labor ranges and the 10% to 20% nonprofit/pickup treatment are **confirmed packet anchors**. The central case uses component midpoints and a 15% reduction; the low and high cases pair the favorable and unfavorable ends respectively.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Projector + screen | 180 | 220 | 260 | Stated usual quote range |
| Speaker + microphone | 75 | 108 | 140 | Stated usual quote range |
| One hour setup | 120 | 160 | 200 | Stated usual quote range |
| Full-market subtotal | 375 | 488 | 600 | Component roll-up |
| Nonprofit/pickup treatment | -75 | -73 | -60 | 20%, 15%, and 10% reductions |
| **Likely paid quote** | **300** | **415** | **540** | Rounded roll-up |

### Calibration, value of information, and recommendation

The calibrated 90% interval is **USD 300 to USD 540**. The USD 415 central estimate is below the USD 500 threshold, but the interval overlaps it; plan on the bundle being affordable, then obtain a combined quote before committing. The top uncertainty is whether setup labor is bundled or discounted. A single all-in written quote has the highest value of information. Stop measuring when a vendor confirms the full scope at or below USD 500, or confirms it cannot meet that cap.

**Would move the estimate:** Waived or bundled setup moves it down; separate minimum labor or weaker nonprofit treatment moves it up.

**Source:** Sanitized case packet, H12-C02; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid local AV bundle quote",
  "unit": "USD per half-day meetup",
  "low_90": 300,
  "central": 415,
  "high_90": 540,
  "confidence": "90%",
  "decision_threshold": 500,
  "threshold_implication": "The central estimate is below USD 500, but the 90% range overlaps the threshold; obtain an all-in bundle quote before committing.",
  "top_uncertainty_driver": "whether setup labor is bundled and receives nonprofit treatment",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local nonprofit pickup quote for the stated simple AV scope",
  "next_measurement_step": "Request one all-in written quote covering every listed item, setup labor, and nonprofit/pickup treatment."
}
```

## H12-C03

- `Tease:` A responsible coffee-and-snacks allowance fits comfortably below USD 120.
- `Lede:` Estimate a USD 84 central allowance, with a 90% planning range of USD 63 to USD 104 including 15% contingency.
- `Why it matters:` Even the high planning case remains below the threshold.
- `Go deeper:` The allowance combines the stated coffee, snack, and add-on anchors, then applies the requested attendance contingency.

**Date:** Not provided in the case packet.  
**Scope:** Coffee and light snacks for a 12-person Saturday workshop; this is a planning allowance, not an invoice forecast.

### Question and decision

- **Decision:** Determine whether USD 120 is enough to reserve for refreshments.
- **Quantity / unit / horizon:** Refreshment budget allowance, USD, for one workshop.
- **Estimate mode:** Budget allowance.
- **Cost of being wrong:** Too little risks inadequate refreshments; too much unnecessarily reserves funds.

### Priors and decomposition

All price ranges and the 15% contingency are **confirmed packet anchors**. Central component values use range midpoints rounded to whole dollars; totals are rounded after applying contingency.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Coffee box | 19 | 22 | 24 | Serves about 10 to 12 |
| Snack portions | 24 | 36 | 48 | 12 attendees at USD 2 to USD 4 each |
| Fruit or water add-on | 12 | 15 | 18 | Stated range |
| Subtotal | 55 | 73 | 90 | Component roll-up |
| 15% contingency | 8 | 11 | 14 | Rounded |
| **Planning allowance** | **63** | **84** | **104** | Rounded roll-up |

### Calibration, value of information, and recommendation

The calibrated 90% planning interval is **USD 63 to USD 104**, with a **USD 84** central allowance. The entire interval is below USD 120, so the threshold is adequate; reserving about USD 105 covers the high planning case. The top uncertainty is final attendance and snack selection. Confirming headcount and the actual menu is the highest-value next measurement. Stop measuring once the priced order plus contingency remains below USD 120.

**Would move the estimate:** More attendees or an additional coffee box moves it up; lower-cost snacks or omitting the add-on moves it down.

**Source:** Sanitized case packet, H12-C03; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "coffee and light-snack budget allowance",
  "unit": "USD per 12-person workshop",
  "low_90": 63,
  "central": 84,
  "high_90": 104,
  "confidence": "90%",
  "decision_threshold": 120,
  "threshold_implication": "The full planning range is below USD 120, so the threshold is sufficient.",
  "top_uncertainty_driver": "final attendance and snack selection",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "responsible planning allowance rather than exact paid invoice",
  "next_measurement_step": "Confirm final headcount and price the selected coffee, snack, and add-on order."
}
```

## H12-C04

- `Tease:` The observed cancellation rate does not trigger overbooking, but the sample is too small to rule out a rate above 0.20.
- `Lede:` Estimate a 0.133 central cancellation probability, with a 90% interval of 0.061 to 0.266.
- `Why it matters:` The central estimate is below the action threshold, while the calibrated interval crosses it.
- `Go deeper:` With no predictors, the last 30 comparable meetings provide the relevant base rate; uncertainty is dominated by sample size.

**Date:** Not provided in the case packet.  
**Scope:** The true cancellation probability for the next cohort of meetings comparable to the last 30.

### Question and decision

- **Decision:** Overbook or add standby slots only if the central cancellation estimate exceeds 0.20.
- **Quantity / unit / horizon:** True cancellation probability, from 0 to 1, for the next similar cohort.
- **Estimate mode:** Empirical small-sample probability estimate.
- **Cost of being wrong:** Underestimation can leave unused slots; overestimation can create excess attendance commitments.

### Priors and decomposition

**Confirmed facts:** 4 of 30 comparable meetings were canceled and no other predictors are known. **Inference:** 4/30 = 0.133 is the central base rate. A 90% Wilson score interval supplies calibrated sampling bounds without pretending the observed rate is exact.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Observed-rate anchor | 0.133 | 0.133 | 0.133 | 4 / 30 |
| Sampling uncertainty | -0.072 | 0 | +0.133 | 90% Wilson bounds |
| **True cancellation probability** | **0.061** | **0.133** | **0.266** | Roll-up |

### Calibration, value of information, and recommendation

The 90% interval is **0.061 to 0.266**. Because the **0.133** central estimate is below 0.20, the stated rule does not call for overbooking or standby slots. The interval overlaps 0.20, so the evidence does not establish that the true rate is below the threshold. The highest-value measurement is more outcomes from genuinely comparable meetings; unrelated predictors have no stated basis. Recompute after the next cohort and stop when the 90% interval lies wholly on one side of 0.20.

**Would move the estimate:** A higher cancellation share in new comparable meetings moves it up; a sustained lower share moves it down.

**Source:** Sanitized case packet, H12-C04; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "true cancellation probability for the next similar cohort",
  "unit": "probability from 0 to 1",
  "low_90": 0.061,
  "central": 0.133,
  "high_90": 0.266,
  "confidence": "90%",
  "decision_threshold": 0.2,
  "threshold_implication": "The central estimate is below 0.20, so the stated rule does not trigger overbooking or standby slots; the interval still overlaps the threshold.",
  "top_uncertainty_driver": "binomial sampling uncertainty from only 30 comparable meetings",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "true cancellation probability for meetings comparable to the last 30",
  "next_measurement_step": "Record cancellation outcomes for the next comparable cohort and recompute the 90% interval."
}
```

## H12-C05

- `Tease:` The simple 45-minute edit and caption cleanup is likely to stay below USD 350.
- `Lede:` Estimate a USD 260 likely paid quote, with a 90% range of USD 225 to USD 295.
- `Why it matters:` The full estimated range clears the decision threshold, assuming caption cleanup starts from an existing draft.
- `Go deeper:` Two recent simple-edit quotes anchor the edit; the stated per-minute caption rate is added separately.

**Date:** Not provided in the case packet.  
**Scope:** One usable-audio 45-minute talk recording, trimmed MP4, and cleaned-up caption file, without fancy motion graphics.

### Question and decision

- **Decision:** Determine whether the likely paid local freelance quote is below USD 350.
- **Quantity / unit / horizon:** One project quote, USD, for the stated deliverables.
- **Estimate mode:** Likely paid local freelance quote.
- **Cost of being wrong:** Underestimation can cause a budget overrun or delay; overestimation can cause needless shopping.

### Priors and decomposition

**Confirmed anchors:** USD 90 for a 20-minute simple edit, USD 240 for a 60-minute simple edit, and USD 1 to USD 2 per finished minute for caption cleanup when a transcript exists. **Inference:** a 45-minute base edit falls between roughly USD 180 and USD 203 by per-minute scaling. The recent quotes are treated as paid-quote comparables; no additional discount is stated. The caption range assumes an existing draft to clean up.

| Component | Low | Central | High | Basis |
| --- | ---: | ---: | ---: | --- |
| Base edit + MP4 packaging | 180 | 192 | 205 | Scaled between recent simple-edit anchors, rounded |
| Caption cleanup | 45 | 68 | 90 | 45 minutes at USD 1 to USD 2 per minute |
| **Likely paid quote** | **225** | **260** | **295** | Rounded component roll-up |

### Calibration, value of information, and recommendation

The calibrated 90% interval is **USD 225 to USD 295**. It is wholly below USD 350, so the quote is likely acceptable if the editor confirms the simple scope. The top uncertainty is the condition of the caption draft and any project minimum or revision expectation. The highest-value measurement is a fixed all-in quote after the editor sees a short source and caption sample. Further estimating stops mattering once that quote covers both deliverables at or below USD 350.

**Would move the estimate:** Missing or poor caption source material moves it up; straightforward captions or bundled relationship pricing moves it down.

**Source:** Sanitized case packet, H12-C05; no external sources used.

### HTMA_RESULT

```json
{
  "quantity": "likely paid local freelance video-editing quote",
  "unit": "USD per 45-minute talk project",
  "low_90": 225,
  "central": 260,
  "high_90": 295,
  "confidence": "90%",
  "decision_threshold": 350,
  "threshold_implication": "The full estimated range is below USD 350, so the quote is likely acceptable if the stated simple scope is confirmed.",
  "top_uncertainty_driver": "caption-draft condition and editor project minimum or revision expectations",
  "estimate_status": "estimated",
  "blocking_missing_inputs": [],
  "assumed_target": "likely paid local freelance quote with an existing caption draft to clean up",
  "next_measurement_step": "Send the editor a short source and caption sample and request one fixed quote covering the trimmed MP4 and cleaned caption file."
}
```
