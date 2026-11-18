---
title: Sam's Action Items reference
description: How the skill recovers, reconciles, and presents meeting actions, and the output modes it supports.
---

## Workflow

1. **Find the meeting.** Use the meeting named in the request. If "recent" matches several, it names the candidates and asks. It confirms the real date from the meeting's metadata and content.
2. **Recover the actions.** It reads the full discussion and your own notes. For each action it records the deliverable, owner, recipient, channel, purpose, timing, and how firm the commitment is. Missing details are marked unknown. It follows a problem raised in one turn to the next step agreed in a later turn.
3. **Reconcile.** It checks existing plans, tasks, and later corrections, and gives each action a status: new, covered, changed, completed, superseded, waiting, or unresolved.
4. **Present.** One copyable tree per meeting, at most two levels deep, with a marker on every row. A short caveat goes under a tree only when something important is uncertain. Source links go outside the code block.

## Rules it keeps

- Your own action-note wording is never changed. Additions go beneath it.
- Speaker labels are evidence, not proof of who spoke.
- A checkbox or a finished agent turn does not prove an action is done.
- Facts it can look up are looked up before it asks you anything.
- Making or preparing a list never authorizes sending, publishing, or creating remote tasks.

## Output modes

The default is the tree in chat. These modes apply only when you ask for them by name:

| Mode | Output |
| --- | --- |
| Personal queue | Your next steps first; waiting-on-others kept separate. |
| Prepared follow-up packet | Each action with the resources, drafts, or lookups needed to act. |
| Team register or plan update | Stable IDs, owners, dispositions, and what changed since last time. |
| Agent handoff | Grouped prompts other agents can run on their own, with sources and a completion check. |
| Next-meeting agenda | Delivered outcomes, open requests, and decisions that need the group. |

The skill's [`references/output-modes.md`](https://github.com/ThatGuySam/skills/blob/main/skills/sams-action-items/references/output-modes.md) has the details.
