---
title: Motivation
description: Why an agent needs a decision-first measurement workflow instead of another estimation prompt.
---

HTMA Measure helps an agent estimate a range that can support a decision. It records the evidence, assumptions, confidence, and conditions for stopping research.

An estimate needs evidence for its bounds and enough detail for someone to revise it when new information arrives.

## The problem

Two common approaches fail in opposite ways:

- **A quick point estimate** is cheap but hides the uncertainty that controls the decision.
- **Open-ended research** collects more facts but often lacks a threshold, source hierarchy, or stopping rule.

Neither approach necessarily helps someone choose an action. Simulation can compound the problem by making weak assumptions look precise.

## The mental model

Measurement is valuable when it changes a decision. The workflow therefore begins with the decision and target quantity, uses a threshold when one is available, decomposes uncertainty, and buys information only where it can change the action.

The range should reflect what the evidence can support.

## Key design decisions

- **Decision context before research.** Identify the target and use its threshold when available. Clarify ambiguity that prevents a responsible estimate; a missing threshold alone need not block a useful range.
- **Ranges before simulation.** Establish defensible input ranges before running Monte Carlo. Simulation cannot justify weak inputs.
- **Sources in the memo.** Label facts, assumptions, and inference. This adds length but lets the reader check the estimate.
- **Prose and JSON together.** Explain the estimate in prose and provide JSON for reuse. Keep the two consistent.
- **Missing inputs stay missing.** When evidence cannot support a range, return null numeric fields and explain the blocker.

## Alternatives considered

- **A single reusable prompt.** Too easy for an agent to skip thresholds, source grading, or verification.
- **A calculator-only tool.** Reliable arithmetic, but no judgment about target mode, evidence quality, or decision relevance.
- **A simulation-first workflow.** Precise output cannot rescue uncalibrated inputs.
- **A full HTMA suite as a hard dependency.** Requiring companion skills would limit where this skill works. They remain optional.

## Non-goals

HTMA Measure is not:

- a guarantee that uncertain forecasts become accurate;
- a replacement for authoritative current data;
- a license to infer private financial facts;
- a full statistical software package; or
- a substitute for reviewing sources and assumptions.
