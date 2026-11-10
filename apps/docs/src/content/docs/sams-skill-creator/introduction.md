---
title: Sam's Skill Creator
description: Install the locked authoring workflow and create your first focused agent skill.
---

```bash
npx skills add ThatGuySam/skills --skill sams-skill-creator
```

```text title="Example prompt" wrap
Use $sams-skill-creator to turn this workflow into a focused, tested skill: [describe the workflow and one result you can check].
```

## Why use it

**A repeatable workflow becomes a portable skill, with proof of what was tested.**

- **Use it when:** you want to create or improve a skill, or find out why one triggers poorly or stops short.
- **You get:** the skill, a dependency receipt, and an independent Agent Verify verdict from fresh subagents that tried it.
- **Limit:** first use restores locked authoring sources and needs Node.js 18+, npm, and Git. For a standalone prompt review, use [Zach Prompting](/zach-prompting/introduction/).

Invoke it as `$sams-skill-creator` in Codex, `/sams-skill-creator` in Claude Code, or `/sams:skill-creator` with the collection bundle.

<!-- demo:start:sams-skill-creator -->
## See it run

<video src="/demos/sams-skill-creator.mp4" poster="/demos/sams-skill-creator.png" aria-label="Codex running Sam's Skill Creator with the prompt: Use $sams-skill-creator to turn this workflow into a focused skill with clear completion criteria and appropriate validation." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/sams-skill-creator.gif">Watch the Sam's Skill Creator demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/sams-skill-creator/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened, and playback runs at 1.5x.
<!-- demo:end:sams-skill-creator -->

## Go deeper

- [Task examples](/sams-skill-creator/examples/): prompts for creating, improving, and diagnosing skills.
- [Behavior and dependency reference](/sams-skill-creator/reference/): inputs, outputs, commands, and dependency refresh.
- [Verification and troubleshooting](/sams-skill-creator/verification/): validation records and setup fixes.

## Walkthrough: your first skill

### Before you start

You need an agent that supports skills, Node.js 18 or later, npm, Git, and network access to the declared source repositories. Codex structural validation also requires Python 3 and PyYAML. The recorded release checks used Python 3.12 and PyYAML 6.0.3.

Prepare a workflow description, an intended runtime, an output directory, and a concrete result to check. Synthetic examples are enough for a first attempt.

### 1. Install the skill

Install it for Codex in the current project:

```sh
npx skills add ThatGuySam/skills --skill sams-skill-creator --agent codex --copy -y
```

The project installation contains `.agents/skills/sams-skill-creator/SKILL.md`. Add `-g` for a global installation. See [collection installation](/collection/installation/) for other clients and the bundle.

### 2. Restore the locked methods

From the project root, install the skill's dependencies:

```sh
cd .agents/skills/sams-skill-creator
npm ci --ignore-scripts
npm run skills:install
npm run preflight --silent
```

The last command prints a JSON receipt with `status` set to `installed-content-verified` and seven dependency entries. Save it with your task evidence. If a command fails, follow [troubleshooting](/sams-skill-creator/verification/#troubleshoot-setup).

These commands belong in the installed skill directory, which has its own `package.json`. Return to your project before starting the agent task.

### 3. Create a review-checklist skill

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

For a standalone Claude Code installation, use `/sams-skill-creator`. The collection bundle uses `/sams:skill-creator`.

This is an example request, not a recorded evaluation result. The agent should produce `release-notes-review/SKILL.md`, fixtures, trial outputs, and a validation report.

### 4. Check the delivered result

Confirm that the artifact exists at your requested path. One fixture's findings should identify the unsupported speed claim. The other should identify missing migration steps. The trial must leave the supplied notes unchanged.

The report must separate structural validation from actual behavior and include Agent Verify's verdict with its evidence directory. A valid `SKILL.md` alone does not prove that the review works. Any required check that could not run must remain an explicit gap.
