---
title: Motivation
description: Why an agent needs a decision-first measurement workflow instead of another estimation prompt.
---

A general-purpose agent can always produce a number. The hard part is producing a range that is honest enough to use and structured enough to improve.

## The problem

Two common approaches fail in opposite ways:

- **A quick point estimate** is cheap but hides the uncertainty that controls the decision.
- **Open-ended research** collects more facts but often lacks a threshold, source hierarchy, or stopping rule.

Both can create confident output without decision value. A third failure—simulation laundering—adds mathematical machinery to weak assumptions and makes the result look more trustworthy than it is.

## The mental model

Measurement is valuable when it changes a decision. The workflow therefore begins with the decision threshold, decomposes the uncertain quantity, and buys information only where it can change the action.

A range is not an admission of failure. It is the honest shape of the available knowledge.

## Key design decisions

- **Decision before research.** A threshold determines which uncertainty matters. (Consequence: vague prompts sometimes require clarification before browsing.)
- **Ranges before simulation.** Calibrated inputs carry the real epistemic work. (Consequence: the skill refuses decorative Monte Carlo output.)
- **Source provenance in the memo.** Facts, assumptions, and inference remain distinguishable. (Consequence: the memo is longer than a bare answer.)
- **A structured appendix, not a structured substitute.** JSON supports reuse while the prose preserves reasoning. (Consequence: every output has two representations to keep aligned.)
- **Missing inputs stay missing.** Blocked estimates use null numeric fields and an explicit status. (Consequence: the workflow sometimes declines to estimate.)

## Alternatives considered

- **A single reusable prompt.** Too easy for an agent to skip thresholds, source grading, or verification.
- **A calculator-only tool.** Reliable arithmetic, but no judgment about target mode, evidence quality, or decision relevance.
- **A simulation-first workflow.** Precise output cannot rescue uncalibrated inputs.
- **A full HTMA suite as a hard dependency.** More power, but worse portability. Companion skills remain optional.

## Non-goals

HTMA Measure is not:

- a guarantee that uncertain forecasts become accurate;
- a replacement for authoritative current data;
- a license to infer private financial facts;
- a full statistical software package; or
- a substitute for reviewing sources and assumptions.
