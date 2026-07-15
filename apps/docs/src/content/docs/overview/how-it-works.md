---
title: How it works
description: The end-to-end HTMA Measure workflow from decision threshold to the next useful measurement.
---

- `Tease:` Make the quantity precise before making the number precise.
- `Lede:` HTMA Measure selects the target, builds evidence, decomposes uncertainty, calibrates a range, and connects it to an action only when the decision context supports one.
- `Why it matters:` Missing identifiers, current sources, or private facts should block false precision; a missing threshold alone should not erase an otherwise useful range.
- `Go deeper:` Follow the seven-stage workflow below.

HTMA Measure follows a decision-first sequence.

## 1. Make the question precise

The agent identifies:

- the decision;
- the quantity of interest;
- the unit;
- the time horizon;
- the decision threshold; and
- the cost of being wrong.

If a required identifier, period, jurisdiction, current source, or private fact is missing, the workflow stops and names the blocker. A missing threshold alone does not stop an otherwise responsible range; it leaves the action comparison unavailable.

## 2. Choose the estimate mode

The same noun can refer to different quantities. “Cost” might mean:

- a vendor’s public market price;
- a budget allowance;
- the amount likely paid;
- an official fee;
- a statutory rate; or
- an ambiguous target that needs clarification.

The mode determines which evidence and adjustments are legitimate.

## 3. Build and rank evidence

The agent starts with available local context, then uses direct sources, reference classes, and comparable cases. Each source is judged against the target for quality and freshness.

Confirmed facts stay separate from assumptions and inference.

## 4. Decompose and calibrate

The quantity is broken into smaller components with low, central, and high values. Weak bounds are widened rather than hidden behind precision.

Monte Carlo simulation is optional and only follows credible, calibrated inputs.

## 5. Connect the range to the decision

When a threshold exists, the final interval is compared with it and the memo explains what action follows. Without one, the threshold stays null and the memo makes no approve/reject claim.

## 6. Measure only what matters next

The value-of-information section ranks remaining uncertainties by their ability to change the decision. It names the next useful measurement and the point at which further research stops mattering.

## 7. Return prose and structured data

The result is a readable memo plus an `HTMA_RESULT` JSON appendix for scoring, automation, or later calibration review.
