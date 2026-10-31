---
title: Agent Verify
description: Measure useful agent improvements with discriminating cases, tested graders, isolated trials, and independent QA.
---

Agent Verify produces evidence of what an agent or skill actually does and whether a change helps. Comparisons start with a practical user benefit and a shortfall or uncertainty the test can resolve. A valid outcome may be no improvement, a regression, or insufficient evidence.

The canonical maintained source is [`skills/agent-verify/` in this public repository](https://github.com/ThatGuySam/skills/tree/main/skills/agent-verify). Runtime installations, local links and forwarding entrypoints consume that package; they are not separate authoring sources.

## Install

```sh
npx skills add thatguysam/skills --skill agent-verify
```

Use `$agent-verify` in Codex, `/agent-verify` for a standalone Claude Code installation, or `/sam:agent-verify` through the collection bundle.

The skill works independently of any particular repo or skill creator. It needs a runtime that can spawn fresh subagents for independent trials; without that, it still runs the checks available and labels sequential/self-review limitations. The optional receipt checker (`scripts/check_receipt.py`) requires Python 3.9+, has no network access, and writes no files.

## Behavior

Agent Verify runs in one of three modes. **Verify** assesses an existing output or runs a skill on representative tasks, establishing scoped behavior rather than improvement over an absent baseline. **Compare** evaluates frozen versions against each other, or a skill against no skill, holding external inputs, tools, model, and settings constant across the pair. **Progressive audit** starts with cheap deterministic checks and escalates only unresolved judgments to a stronger approved model within a declared budget; it can wrap either verify or compare.

Before running trials, the coordinator records the question, success criteria, critical failures, case selection, baseline, provider/model settings per role, and side-effect boundaries. It dispatches fresh, blinded workers and QA so the author of a change is not the sole judge of its own output — QA inspects the actual artifact, not just a worker's summary of what it did.

Compare mode separates regression checks from cases that can reveal a useful improvement. Easy passes and a small secondary-score increase do not establish practical value. Required conditions cannot be averaged away by unrelated strengths. A convenience decision threshold is labeled as a judgment, rather than presented as a research-established optimum.

New or changed interpretive graders run focused valid, defective and unknown-evidence controls before their decisions are trusted. Preference judges also check ties and ordering. Failed controls invalidate the affected verdicts until bounded repair and retesting, or leave the result unknown. Human preference claims need actual submitted labels; model agreement is not a substitute.

The task setup matches real use. A one-request-at-a-time system receives one case per fresh context unless batching equivalence has been checked. Development cases remain separate from confirmation, and task counts remain separate from generation attempts and reviewer votes.

## Inputs & outputs

Provide the target skill or agent, the mode, and any baseline to compare against. Agent Verify returns one scoped verdict — **meets checked criteria**, **improved on tested cases**, **mixed**, **regressed**, **no demonstrated improvement**, or **inconclusive** — naming the baseline, model/settings, trial count, decisive evidence, and untested branches. It links an evidence directory rather than asserting an unlogged result.

## States & edge cases

A critical failure blocks acceptance even when other scores improve; missing mandatory evidence is reported as unknown, not as a pass. One run per cell is labeled a pilot, not a generalizable result. When subagents aren't available, Agent Verify runs the checks it can and says so rather than silently grading its own work.

## Data shape

`SKILL.md` holds the mode selection and execution/reporting sequence. `references/` carries conditional detail: [improvement design](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/improvement.md) for useful outcomes and discriminating cases, [comparison design](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/comparison.md) for matched baselines, [progressive audit](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/progressive-audit.md) for the escalation ladder, [QA roles and grading](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/qa.md), [evidence records](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/evidence.md), [research basis](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/research-basis.md), and [model providers](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/model-providers.md) for OpenAI/Google routing presets. `scripts/check_receipt.py` validates a run's receipt structure and artifact hashes; it does not judge behavioral quality.

See [verification](/agent-verify/verification/) for what has actually been checked about this skill.
