---
title: Red-green-refactor for prompts
description: Practitioner techniques, tools, and measurement rules for improving prompts one proven step at a time.
sidebar:
  badge:
    text: Research
    variant: tip
---

Research date: November 5, 2026. Scope: how practitioners improve prompts and agent instructions step by step, which tools they keep using, and what keeps the measured gains honest. The findings shaped Agent Verify's [improvement loop](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/improvement-loop.md).

## Short answer

Treat a prompt like code under test. Read failures first, turn them into binary checks, prove the current prompt fails them, and then change one thing at a time. Keep a change only if it helps without breaking another case, and confirm the final version on cases you never tuned against. Optimizer tools can propose candidates, but they optimize whatever the metric rewards, so the measurement discipline matters more than the search tool.

## Local findings

Agent Verify already required frozen criteria, independent QA, matched baselines, per-case regression reporting, and verdicts that allow no improvement. It had no gate requiring proof of a problem before editing, no one-change-per-round rule, and no stop rule for iterative work. Sam chose the loop's policy in a three-question interview: ten binary checks, a red bar of ≤6/10 reproduced in 2 of 3 trials, and a stop on two sub-1-point rounds, a ≥9 suite, or five rounds.

## What the evidence says

| Finding | Sources | Strength |
| --- | --- | --- |
| Binary pass/fail labels are more consistent than 1–5 or 1–10 scales. Measure gradual progress as counts of binary checks. | [Husain and Shankar, AI Evals FAQ](https://hamel.dev/blog/posts/evals-faq/), September 2026 | Strong practitioner consensus based on teaching and consulting experience |
| Criteria come from error analysis: read outputs, write critiques, then cluster them. Grading outputs changes the criteria people want ("criteria drift"). | [FAQ](https://hamel.dev/blog/posts/evals-faq/); [Shankar et al., UIST 2024](https://arxiv.org/abs/2404.12272) | Peer-reviewed user study plus practitioner reports |
| Confirm the test fails before the change; otherwise it may already pass. | [Simon Willison, Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) | Established software practice; carrying it over to prompts is an inference |
| Run several trials per task, grade outcomes rather than paths, and promote saturated capability evals to regression suites. | [Anthropic, Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), January 9, 2026 | Vendor engineering guidance |
| Compare with paired differences and report uncertainty; small sets cannot detect small effects. | [Miller, Adding Error Bars to Evals](https://arxiv.org/abs/2411.00640), 2024 | Statistical method paper |
| Fix the evaluation set, holdout set, and evaluator before revising. Choose on validation results and report on holdout results. | [Arize](https://arize.com/glossary/prompt-optimization/); [Evidently](https://www.evidentlyai.com/blog/automated-prompt-optimization) | Vendor practitioner posts consistent with standard ML practice |
| Optimized prompts can overfit. Ablating examples and overly specific wording cost little in one reported case. | [Hopman and Parent, LessWrong](https://www.lesswrong.com/posts/bALBxf3yGGx4bvvem/prompt-optimization-can-enable-ai-control-research), September 2025, and comments | Single case; treat it as a check to run, not a guarantee |
| An optimized prompt can do worse than the original on specific inputs. | [OpenAI prompt optimizer guide](https://developers.openai.com/api/docs/guides/prompt-optimizer) | Vendor documentation |

## Tools practitioners use

| Tool | Status checked November 5, 2026 | Best fit |
| --- | --- | --- |
| [promptfoo](https://github.com/promptfoo/promptfoo) | Its README says it is now part of OpenAI and remains MIT-licensed open source. | YAML assertion matrices across prompts, cases, and models; CI regression gates; red-team plugins |
| [DSPy](https://dspy.ai/) with [GEPA](https://dspy.ai/api/optimizers/GEPA/overview/) | Active; GEPA ([Agrawal et al., 2025](https://arxiv.org/abs/2507.19457)) reflects on failure traces and keeps a Pareto set of candidates | Automated search when you have labeled data and a programmatic metric |
| [Inspect AI](https://inspect.aisi.org.uk/) | Active; maintained with the UK AI Security Institute | Agent eval harness with repeated trials, logs, and bridges to Claude Code and Codex |
| [AI Evals skills](https://github.com/ai-evals-course/evals-skills) | Moved from `hamelsmu/evals-skills`, archived August 2026 | Agent skills for error analysis and validating judges against human labels |
| Anthropic Workbench prompt improver and `improve_prompt` API | Retired August 17, 2026 ([release notes](https://platform.claude.com/docs/en/release-notes/overview)) | Do not depend on it |
| OpenAI dataset-backed prompt optimizer and Evals | Read-only since October 31, 2026; shutdown scheduled for November 30, 2026 ([docs](https://developers.openai.com/api/docs/guides/prompt-optimizer)) | Do not depend on it |

Hacker News discussion of DSPy ([2026 thread](https://news.ycombinator.com/item?id=47490365), [2024 thread](https://news.ycombinator.com/item?id=41213561)) is mixed. Commenters agree that optimizers help only once a good automated metric exists. Several people still iterate by hand: they read outputs and edit the prompt. One reported spending "a few tens of dollars" on DSPy evals without improvement. GEPA got specific praise because its prompt changes are easy to inspect.

## What works

- Start from 20–50 real failures, or from a few realistic cases for a pilot, rather than a generic rubric.
- Write narrow binary checks and prefer code checks to an LLM judge whenever code can decide.
- Prove the poor score on the unchanged prompt before editing, and reproduce it, because outputs vary between runs.
- Make one hypothesis-driven change per round and revert any change that regresses a case.
- Simplify after each gain, removing duplication and wording tied to specific cases.
- Keep a holdout set the editor never sees, and make the ship decision on it.

## What to avoid

- Holistic 1–10 judge scores used as the target.
- Changing the checklist mid-loop without rescoring earlier versions.
- Rerunning only the failures until they pass.
- Averaging away a regression on a single case.
- Quoting dev-case facts in the prompt.
- Claiming significance from a handful of trials.
- Relying on retired vendor prompt improvers.

## Limits

Most sources are practitioner guidance, not controlled studies of iterative prompt editing. The default constants (ten checks, ≤6 red, 1-point plateau, five rounds) are Sam's chosen policy, not research-established optima. Third-party roundup and comparison pages written by vendors were excluded as primary evidence.
