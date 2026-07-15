# HTMA Measure

- `Tease:` Turn “we need a number” into a range you can make a decision with.
- `Lede:` HTMA Measure is a portable agent skill for uncertain costs, budgets, rates, risks, ROI, market size, and other quantities where a precise-looking guess would be misleading.
- `Why it matters:` The skill makes the target explicit, separates facts from assumptions, calibrates the range, connects it to a threshold, and identifies the next evidence worth collecting.
- `Go deeper:` Install the skill, choose the pain that matches your situation, and let [`SKILL.md`](SKILL.md) remain the canonical agent workflow.

This README is the human guide. [`SKILL.md`](SKILL.md) is the canonical instruction and output contract agents load.

## When it helps

| Common pain | How Measure responds |
| --- | --- |
| You need a budget before quotes exist. | Produces a planning range from the available scope, comparable work, and explicit assumptions. |
| Someone wants one number despite meaningful uncertainty. | Returns low, central, and high values with confidence and decision risk. |
| The project is unfamiliar or keeps losing hidden work. | Decomposes the total, uses relevant reference classes, and makes exclusions visible. |
| “Cost” could mean list price, budget allowance, quote, or paid amount. | Classifies the estimate mode before choosing evidence or making adjustments. |
| You have only a few observations. | Uses the sample cautiously, keeps wider bounds, and says what another observation could improve. |
| Research keeps expanding without resolving the decision. | Ranks unknowns by value of information and gives the work a stopping rule. |
| Underestimating and overestimating have different consequences. | Connects the range to a threshold and the cost of being wrong. |
| A current lookup or private actual is missing. | Returns a structured blocker rather than inventing a number. |

Read the source-backed [Problems Measure solves](https://skills.samcarlton.com/overview/problems-it-solves/) guide for the research basis and more prompt templates.

## Install

Install only this skill with the open Skills CLI:

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Or install Sam’s complete collection:

<details>
<summary><b>Codex</b></summary>

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add htma-measure@thatguysam-skills
```

Use `$htma-measure` after installation.

</details>

<details>
<summary><b>Claude Code</b></summary>

```text
/plugin marketplace add thatguysam/skills
/plugin install htma-measure@thatguysam-skills
```

Use `/sam:htma-measure` from the collection or `/htma-measure` from a standalone installation.

</details>

## Example prompts

### Budget before quotes

```text
Use $htma-measure to create a planning allowance for [project] before quotes are available.
Decision: [approve discovery, reserve budget, reduce scope, or defer].
Threshold: [amount that changes the decision].
Available evidence: [scope, rates, comparable work, constraints, and prior actuals].
```

### Unfamiliar work

```text
Use $htma-measure to estimate [cost, effort, or duration] for this unfamiliar project.
Decompose the work, use relevant comparable cases, show assumptions and exclusions,
and tell me which unknown is most likely to change [decision].
```

### A small sample

```text
Use $htma-measure to update this estimate from the attached [N] observations.
Keep the interval calibrated to the sample size and tell me whether collecting
[next N] observations could change the decision at [threshold].
```

### Stop researching or keep going

```text
Use $htma-measure to decide whether more research on [unknown] is worth it.
Rank the next measurements by value of information and stop when more evidence
is unlikely to change [decision] at [threshold].
```

## What it returns

The skill produces a readable Markdown measurement memo with:

- a precise quantity, unit, time horizon, and estimate mode;
- confirmed facts separated from assumptions and inference;
- a low / central / high decomposition and calibrated interval;
- a threshold implication when a real threshold exists;
- the largest remaining uncertainty and next measurement step; and
- a matching `HTMA_RESULT` JSON appendix for scoring or reuse.

## Boundaries

HTMA Measure does not guarantee forecast accuracy, replace authoritative current data, infer inaccessible private facts, or make weak inputs rigorous by running a simulation. Missing facts stay missing, and every external claim in a completed estimate should have traceable provenance.

## More

- [Full documentation](https://skills.samcarlton.com/overview/introduction/)
- [Problems Measure solves](https://skills.samcarlton.com/overview/problems-it-solves/)
- [Prompt recipes](https://skills.samcarlton.com/guides/prompt-recipes/)
- [Canonical agent workflow](SKILL.md)
- [Evaluation suite](evals/README.md)
