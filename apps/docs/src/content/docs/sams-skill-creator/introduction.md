---
title: Install and use Sam's Skill Creator
description: Install the locked authoring workflow and create your first focused agent skill.
---

Sam's Skill Creator turns a repeatable workflow into a portable agent skill. It also improves existing skills and reviews weak triggers or incomplete execution. You receive the artifact, a dependency receipt, and the checks that actually ran.

Use it when you want to **create or improve a skill**. For a standalone prompt review, use [Zach Prompting](/zach-prompting/introduction/). For a business task, use the relevant task skill directly.

## Before you start

You need an agent that supports skills, Node.js 18 or later, npm, Git, and network access to the declared source repositories. Codex structural validation also requires Python 3 and PyYAML. The recorded release checks used Python 3.12 and PyYAML 6.0.3.

Prepare a workflow description, an intended runtime, an output directory, and a concrete result to check. Synthetic examples are enough for a first attempt.

## 1. Install the skill

Install it for Codex in the current project:

```sh
npx skills add ThatGuySam/skills --skill sams-skill-creator --agent codex --copy -y
```

The project installation contains `.agents/skills/sams-skill-creator/SKILL.md`. Add `-g` for a global installation. See [collection installation](/collection/installation/) for other clients and the bundle.

## 2. Restore the locked methods

From the project root, install the skill's dependencies:

```sh
cd .agents/skills/sams-skill-creator
npm ci --ignore-scripts
npm run skills:install
npm run preflight --silent
```

The last command prints a JSON receipt with `status` set to `installed-content-verified` and six dependency entries. Save it with your task evidence. If a command fails, follow [troubleshooting](/sams-skill-creator/verification/#troubleshoot-setup).

These commands belong in the installed skill directory, which has its own `package.json`. Return to your project before starting the agent task.

## 3. Create a review-checklist skill

In Codex, send this prompt:

```text
Use $sams-skill-creator to create a project-local Codex skill named
release-notes-review in .agents/skills/release-notes-review/.

It reviews supplied release notes for the affected user, changed behavior,
migration steps when needed, and evidence for claims. It returns actionable
findings with quoted passages. It does not publish or rewrite the notes.

Include one synthetic fixture with an unsupported speed claim and one with a
breaking change that lacks migration steps. Try the skill on both fixtures.
Report the findings, dependency receipt, and any untested behavior.
```

For a standalone Claude Code installation, use `/sams-skill-creator`. The collection bundle uses `/sam:sams-skill-creator`.

This is an example request, not a recorded evaluation result. The agent should produce `release-notes-review/SKILL.md`, fixtures, trial outputs, and a validation report.

## 4. Check the delivered result

Confirm that the artifact exists at your requested path. One fixture's findings should identify the unsupported speed claim. The other should identify missing migration steps. The trial must leave the supplied notes unchanged.

The report must separate structural validation from actual behavior. A valid `SKILL.md` alone does not prove that the review works. Any required check that could not run must remain an explicit gap.

Continue with [task examples](/sams-skill-creator/examples/), the [behavior and dependency reference](/sams-skill-creator/reference/), or [verification and troubleshooting](/sams-skill-creator/verification/).
