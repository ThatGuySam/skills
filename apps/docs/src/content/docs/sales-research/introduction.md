---
title: Sales Research
description: Install and use a portable skill for evidence-backed sales decisions and buyer communication.
---

Sales Research helps you decide what to ask, recommend, offer, or write next in
a sales conversation. It adapts to consulting, SaaS, enterprise buying, recruiting,
and partnerships. It is most useful when you have real buyer context and an
unclear next step.

## Install with npx

You need Node.js and npm, an agent that supports skills, and network access for
the install. Run this in the project where you want to try it:

```bash
npx skills add ThatGuySam/skills --skill sales-research
```

Follow the installer prompts to choose your agent. This installs one skill at
project scope. You do not need an npm package published under the skill's name:
the Skills CLI reads the GitHub repository.

For a specific agent:

```bash
npx skills add ThatGuySam/skills --skill sales-research --agent codex
```

```bash
npx skills add ThatGuySam/skills --skill sales-research --agent claude-code
```

Add `--global` if you want it across projects. See the
[Skills CLI documentation](https://github.com/vercel-labs/skills#readme) for
supported agents and installation options.

## Confirm it is installed

```bash
npx skills list
```

Start a new agent conversation so it can discover the new skill. Ask it to use
Sales Research and confirm that it can read the practitioner-routing and
selling-is-leading references.

| Installation | Invocation |
| --- | --- |
| Standalone Codex | `$sales-research` |
| Standalone Claude Code | `/sales-research` |
| Claude collection plugin | `/sam:sales-research` |
| Other compatible agents | Ask to use the `sales-research` skill by name |

If the skill is missing, check whether you installed it for the right agent and
project or globally. List remote skills without installing them using:

```bash
npx skills add ThatGuySam/skills --list
```

## Give it useful context

Provide what you sell, the buyer, their actual words, the stage of the conversation,
your constraints, and the decision you need. Mark unknown information as unknown.
Redact private details before sharing prompts or feedback with other testers.

```text
Use $sales-research to draft my reply. I sell [service or product] to [buyer].
They asked: [paste their redacted message]. We are at [stage]. My constraints
are [constraints]. I want to decide [decision]. Give me the reply first, then
explain any assumptions that materially affect it. Draft only.
```

Replace the bracketed fields with your own facts. See
[examples](/sales-research/examples/) for specific situations.

## What to expect

The agent identifies the situation, reads the context you supplied, and selects
one to three relevant practitioners. It checks primary sources when needed,
separates facts from inference, and recommends a next step. A drafting request
returns the draft first. A research request includes supporting source links.

The default communication posture is calm leadership, mutual qualification,
a clear process, and room for either party to decline. A request for free
consulting recommendations should not automatically become a free diagnosis.
A job interview or a SaaS support question needs a different response.

## Requirements and limits

The skill contains instructions and references, with no required scripts,
credentials, CRM connection, private research archive, or companion skill.
Web access helps verify fresh claims. Without it, the agent should work from
provided evidence and disclose the limit.

Installing the skill does not authorize sending messages, changing a CRM,
publishing research, or contacting anyone. Review drafts yourself. Sales results
and advice quality have not been measured for this portable version; see the
[verification and tester guide](/sales-research/verification/).

## Update or remove

Use the [Skills CLI](https://github.com/vercel-labs/skills#readme) to check for
updates or remove the project installation:

```bash
npx skills update
npx skills remove sales-research
```

The update command can update other installed skills too. For a global
installation, use `npx skills remove sales-research --global`.
