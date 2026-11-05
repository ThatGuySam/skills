---
title: Agent Verify reference
description: Requirements, installation options, modes including the improvement loop, verdicts, edge cases, and package layout for Agent Verify.
---

Agent Verify uses fresh subagents to verify code, skills, prompts, documents, and agent behavior, and to compare before/after improvements. It is independently installable and has no HTMA dependency. Comparisons start with a practical user benefit and a shortfall or uncertainty the test can resolve. A valid outcome may be no improvement, a regression, or insufficient evidence.

## Requirements

The skill works independently of any particular repo or skill creator. It needs a runtime that can spawn fresh subagents for independent trials; without that, it still runs useful checks and returns an inconclusive independent-verification verdict. Self-review cannot satisfy the subagent requirement. The optional helpers, `scripts/check_receipt.py` and `scripts/score_loop.py`, require Python 3.9+, have no network access, and write no files.

## Global Codex Installation

For a global Codex copy installation:

```sh
npx skills add ThatGuySam/skills --skill agent-verify --agent codex --global --copy
```

This copy consumes the canonical source independently. Update or reinstall it after source changes.
Check `$agent-verify` in the target Codex app. If an existing Codex process does not discover the installation, restart Codex and check again. See OpenAI's [skill installation and reload guidance](https://learn.chatgpt.com/docs/build-skills).

## Canonical source

The canonical maintained source is [`skills/agent-verify/` in this public repository](https://github.com/ThatGuySam/skills/tree/main/skills/agent-verify). Runtime installations, local links and forwarding entrypoints consume that package; they are not separate authoring sources.

## Behavior

Agent Verify runs in one of four modes. **Verify** checks new or existing artifacts against their requirements, or runs a skill on representative tasks, establishing scoped behavior rather than improvement over an absent baseline. **Compare** evaluates frozen versions against each other, or a skill against no skill, holding external inputs, tools, model, and settings constant across the pair. **Progressive audit** starts with cheap deterministic checks and escalates only unresolved judgments to a stronger approved model within a declared budget; it can wrap either verify or compare. The **improvement loop** improves a prompt, skill, or instruction in red-green-refactor rounds, described below.

Before running trials, the coordinator records the question, success criteria, critical failures, case selection, baseline, provider/model settings per role, and side-effect boundaries. It dispatches fresh, blinded workers and QA so the author of a change is not the sole judge of its own output — QA inspects the actual artifact, not just a worker's summary of what it did.

Compare mode separates regression checks from cases that can reveal a useful improvement. Easy passes and a small secondary-score increase do not establish practical value. Required conditions cannot be averaged away by unrelated strengths. A convenience decision threshold is labeled as a judgment, rather than presented as a research-established optimum.

New or changed interpretive graders run focused valid, defective and unknown-evidence controls before their decisions are trusted. Preference judges also check ties and ordering. Failed controls invalidate the affected verdicts until bounded repair and retesting, or leave the result unknown. Human preference claims need actual submitted labels; model agreement is not a substitute.

The task setup matches real use. A one-request-at-a-time system receives one case per fresh context unless batching equivalence has been checked. Development cases remain separate from confirmation, and task counts remain separate from generation attempts and reviewer votes.

## Improvement loop

The loop starts with error analysis on development cases and freezes ten binary criteria drawn from observed failures and the user's requirements. A trial's score is the number of criteria passed. A failed critical criterion caps the reported score at 4/10; keep decisions also track the uncapped count, so fixing one of several critical failures still shows progress.

- **Red.** Editing begins only after the unchanged artifact scores ≤6/10 on a dev case in at least 2 of 3 fresh trials, with the failing criteria named. A capable baseline ends the loop with no demonstrated headroom; failures are never manufactured.
- **Green.** Each round makes one change aimed at a named failing criterion. The change is kept only if it raises the dev-case mean, lowers no case, breaks no previously passing criterion, and adds no critical failure. If a fix exposes a requirement the old prompt met only by accident, the next round may add that requirement explicitly as a linked change.
- **Refactor.** After a kept change, a pruning pass removes duplication and wording tied to specific cases, and is kept only if no score drops.
- **Stop.** The loop ends when every dev case reaches ≥9 with no critical failure, after five rounds, or when two consecutive rounds each gain less than 1 point once every still-failing criterion has been tried or recorded as not fixable in the prompt.
- **Confirm.** Holdout cases the editor never saw decide whether the gain carries over.

These are Sam's default constants, not research-established optima; user-supplied values override them. `scripts/score_loop.py` applies the arithmetic to recorded QA statuses and refuses a ledger that records rounds without a proven red. The [research memo](/research/prompt-improvement-loops-2026-11-05/) covers the sources and tools.

## Inputs & outputs

Provide the target skill or agent, the mode, and any baseline to compare against. Agent Verify returns one scoped verdict — **meets checked criteria**, **improved on tested cases**, **mixed**, **regressed**, **no demonstrated improvement**, or **inconclusive** — naming the baseline, model/settings, trial count, decisive evidence, and untested branches. It links an evidence directory rather than asserting an unlogged result.

## States & edge cases

A critical failure blocks acceptance even when other scores improve; missing mandatory evidence is reported as unknown, not as a pass. One run per cell is labeled a pilot, not a generalizable result. When subagents are unavailable, Agent Verify runs useful checks and reports independent verification as inconclusive.

## Data shape

`SKILL.md` holds the mode selection and execution/reporting sequence. `references/` carries conditional detail: [improvement design](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/improvement.md) for useful outcomes and discriminating cases, [improvement loop](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/improvement-loop.md) for red-green-refactor rounds, [comparison design](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/comparison.md) for matched baselines, [progressive audit](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/progressive-audit.md) for the escalation ladder, [QA roles and grading](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/qa.md), [evidence records](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/evidence.md), [research basis](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/research-basis.md), and [model providers](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/references/model-providers.md) for OpenAI/Google routing presets. `scripts/check_receipt.py` validates a run's receipt structure and artifact hashes, and `scripts/score_loop.py` scores an improvement-loop ledger; neither judges behavioral quality.
