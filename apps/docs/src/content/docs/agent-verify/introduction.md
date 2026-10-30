---
title: Agent Verify
description: Verify agent or skill behavior with isolated subagents, artifact checks, and independent QA.
---

Agent Verify produces evidence of what an agent or skill actually does and whether a change helps. A valid outcome may be no improvement, a regression, or insufficient evidence — it reports what it finds rather than confirming a wanted result.

## Install

```sh
npx skills add thatguysam/skills --skill agent-verify
```

Use `$agent-verify` in Codex, `/agent-verify` for a standalone Claude Code installation, or `/sam:agent-verify` through the collection bundle.

The skill works independently of any particular repo or skill creator. It needs a runtime that can spawn fresh subagents for independent trials; without that, it still runs the checks available and labels sequential/self-review limitations. The optional receipt checker (`scripts/check_receipt.py`) requires Python 3.9+, has no network access, and writes no files.

## Behavior

Agent Verify runs in one of three modes. **Verify** assesses an existing output or runs a skill on representative tasks, establishing scoped behavior rather than improvement over an absent baseline. **Compare** evaluates frozen versions against each other, or a skill against no skill, holding external inputs, tools, model, and settings constant across the pair. **Progressive audit** starts with cheap deterministic checks and escalates only unresolved judgments to a stronger approved model within a declared budget; it can wrap either verify or compare.

Before running trials, the coordinator records the question, success criteria, critical failures, case selection, baseline, provider/model settings per role, and side-effect boundaries. It dispatches fresh, blinded workers and QA so the author of a change is not the sole judge of its own output — QA inspects the actual artifact, not just a worker's summary of what it did.

## Inputs & outputs

Provide the target skill or agent, the mode, and any baseline to compare against. Agent Verify returns one scoped verdict — **meets checked criteria**, **improved on tested cases**, **mixed**, **regressed**, **no demonstrated improvement**, or **inconclusive** — naming the baseline, model/settings, trial count, decisive evidence, and untested branches. It links an evidence directory rather than asserting an unlogged result.

## States & edge cases

A critical failure blocks acceptance even when other scores improve; missing mandatory evidence is reported as unknown, not as a pass. One run per cell is labeled a pilot, not a generalizable result. When subagents aren't available, Agent Verify runs the checks it can and says so rather than silently grading its own work.

## Data shape

`SKILL.md` holds the mode selection and execution/reporting sequence. `references/` carries conditional detail: [comparison design](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/comparison.md) for matched baselines, [progressive audit](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/progressive-audit.md) for the escalation ladder, [QA roles and grading](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/qa.md), [evidence records](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/evidence.md), [research basis](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/research-basis.md), and [model providers](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/model-providers.md) for OpenAI/Google routing presets. `scripts/check_receipt.py` validates a run's receipt structure and artifact hashes; it does not judge behavioral quality.

See [verification](/agent-verify/verification/) for what has actually been checked about this skill.
