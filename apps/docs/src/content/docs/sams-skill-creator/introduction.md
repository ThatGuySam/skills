---
title: Sam's Skill Creator
description: Mix version-locked authoring methods into one focused skill-creation workflow.
---

Sam's Skill Creator keeps ownership of one artifact while consulting the methods that help at each decision. It combines Anthropic Skill Creator, Matt Pocock's Writing for Agents, Poteto's Automate Me, and Zach Prompting. Codex-specific packaging uses a separate bundled creator snapshot.

## Install

```sh
npx skills add ThatGuySam/skills --skill sams-skill-creator
```

Use `$sams-skill-creator` in Codex, `/sams-skill-creator` for a standalone Claude Code installation, or `/sam:sams-skill-creator` through the collection bundle. To install globally with the skills CLI, add `-g` to the command.

Ask: “Use $sams-skill-creator to turn this workflow into a skill. Preserve these permissions and define what completion looks like.”

First use requires Node.js 18+, npm, Git, and access to the declared source repositories. From the installed skill directory:

```sh
npm ci --ignore-scripts
npm run skills:install
npm run preflight --silent
```

The Codex structural validator additionally needs Python 3 and PyYAML. A task-local environment avoids altering global Python. This version was checked with Python 3.12 and PyYAML 6.0.3.

## Behavior

The workflow recovers the required outcome, designs instructions and conditional references, builds the artifact, and exercises the relevant behavior. It can enter at an existing draft or a narrow correction. It consults multiple methods within a stage when useful and retains one draft rather than handing the whole job to another skill.

Writing for Agents informs triggers, information hierarchy, and completion criteria. Zach Prompting preserves the user's contract and resolves instruction conflicts. Automate Me contributes preference evidence only when the work depends on how the user operates. Anthropic's creator contributes examples and evaluations; Codex's creator supplies native packaging and proportional validation.

## Inputs & outputs

Provide the workflow or existing skill, intended tasks, target runtime, destination, protected requirements, and available examples. Existing conversation evidence can supply these inputs; the workflow asks only for consequential missing information.

The output is the requested skill or review, relevant supporting files, a source-version receipt, actual validation results, and unresolved limits. A request to author a deployment skill does not authorize deploying a product.

## States & edge cases

Review-only requests produce findings without editing the target. Ordinary skills do not require personal-history mining. Explicit user authorization remains scoped to the action and target. Upstream instructions do not automatically introduce worktrees, pull requests, interviews, or broad evaluation loops.

Missing or edited dependencies fail preflight. Independent preparation may continue, but an unavailable source is not silently replaced by a global skill with the same name. Claude-specific scripts require that runtime; Codex can use supported bounded agents instead and report unavailable measurements.

Normal runs use verified pins. Check freshness with `npm run skills:outdated --silent`; adopt requested updates with `npm run skills:update`, review the changed guidance, and freeze the new set. “Current” applies at the check time. No scheduled update is installed.

## Data shape

`package.json` declares the sources, `package-lock.json` pins the installer, and `skills-lock.json` pins Git commits and content integrity. Runtime copies are private under `.runtime/skills/`; the Codex snapshot and its original license are under `.sources/`. The published package contains no machine-specific dependency paths.

Three bounded authoring/review tasks ran with the mixer and with normal guidance. Both variants satisfied their artifact criteria, so no superiority claim is made. Seven integrity tests and structural validation passed. The generated skills were not exercised against live business systems, and actual automatic discovery remains untested. See the [source and validation record](https://github.com/ThatGuySam/skills/tree/main/skills/sams-skill-creator/evals).
