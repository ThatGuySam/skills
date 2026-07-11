---
title: Introduction
description: What HTMA Measure does, why calibrated ranges matter, and what the skill produces.
---

HTMA Measure is a portable agent skill for estimating uncertain quantities when a decision depends on the answer. It works for project costs, budgets, vendor quotes, rates, risks, ROI, market size, revenue, and similar questions where a precise-looking guess would be misleading.

The skill converts a vague question into a measurement memo with:

- a precise decision and threshold;
- an explicit quantity, unit, and time horizon;
- confirmed facts separated from assumptions and inference;
- a low / central / high decomposition;
- a calibrated confidence interval;
- the uncertainty most worth reducing next;
- a recommendation tied to the decision; and
- a machine-readable `HTMA_RESULT` JSON appendix.

## The key difference

HTMA Measure does not ask, “What number sounds plausible?” It asks, “What range is defensible, what decision changes across that range, and what evidence is worth buying next?”

That distinction prevents three common failures:

1. **False precision:** a single number disguises uncertainty.
2. **Research without a stopping rule:** the agent gathers easy facts that cannot change the decision.
3. **Simulation laundering:** Monte Carlo output makes weak assumptions look rigorous.

## What HTMA means here

The workflow draws on decision-focused measurement and calibrated estimation ideas popularized by Douglas W. Hubbard’s *How to Measure Anything*. This repository is an independent implementation and is not affiliated with or endorsed by the author or publisher.

## Start using it

- [Install the skill](/guides/installation/).
- [Run your first measurement](/guides/first-measurement/).
- [See prompt recipes](/guides/prompt-recipes/).
- [Inspect the complete output contract](/reference/output-contract/).
