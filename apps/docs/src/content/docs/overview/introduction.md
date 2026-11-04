---
title: HTMA Measure
description: What HTMA Measure does, why calibrated ranges matter, and what the skill produces.
---

```bash
npx skills add ThatGuySam/skills --skill htma-measure
```

```text title="Example prompt" wrap
Use $htma-measure to set a planning allowance for this project before quotes arrive. Give me a calibrated range and the uncertainty worth checking first.
```

## Why use it

**A defensible range for an uncertain number, tied to the decision it affects.**

- **Use it when:** a decision depends on a cost, budget, rate, risk, ROI, or market size you can't pin down yet.
- **You get:** a measurement memo with low, central, and high values, the assumptions behind them, and the evidence worth collecting next.
- **Limit:** a range is only as good as its inputs. It shows which assumptions drive the answer rather than hiding them behind a single number.

Invoke it as `$htma-measure` in Codex, `/htma-measure` in Claude Code, or `/sam:htma-measure` with the collection bundle.

## What the memo contains

- a precise decision and threshold;
- an explicit quantity, unit, and time horizon;
- confirmed facts separated from assumptions and inference;
- a low / central / high decomposition;
- a calibrated confidence interval;
- the uncertainty most worth reducing next;
- a recommendation tied to the decision; and
- a machine-readable `HTMA_RESULT` JSON appendix.

## Go deeper

- [Installation](/guides/installation/): agent-specific, global, and bundle installs.
- [Your first measurement](/guides/first-measurement/): a guided first run.
- [Prompt recipes](/guides/prompt-recipes/): prompts for common estimates.
- [Problems it solves](/overview/problems-it-solves/): the estimation failures it targets.
- [Output contract](/reference/output-contract/): the complete memo and JSON format.

## What HTMA means here

The workflow draws on decision-focused measurement and calibrated estimation ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. This repository is an independent implementation and is not affiliated with or endorsed by the author or publisher.
