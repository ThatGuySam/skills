---
title: Behavior and dependency reference
description: Inputs, outputs, source roles, lock files, commands, and runtime boundaries.
---

This page describes the published [skill instructions](https://github.com/ThatGuySam/skills/blob/main/skills/sams-skill-creator/SKILL.md). The [quickstart](/sams-skill-creator/introduction/) covers first use.

## Behavior

The workflow establishes the requested outcome, designs instructions and conditional references, builds one working artifact, and exercises relevant behavior. It can begin with a new workflow, existing draft, focused correction, or review-only request.

The author consults source methods when they help resolve the current decision. Those methods do not become separate mandatory workflows.

| Source | Contribution |
| --- | --- |
| Anthropic Skill Creator | Intent, examples, reusable resources, and evaluation design. |
| Matt Pocock's Writing for Agents | Triggers, information hierarchy, conditional pointers, and completion criteria. |
| Poteto's Automate Me | History and preference evidence when the task requires it. |
| Zach Prompting | Contract preservation, instruction conflicts, and draft review. |
| Codex Skill Creator | Native packaging, metadata, structural validation, and proportionate scaffolding. |
| Poteto runtime support | Relative runtime-mapping references used by the locked methods. |

Source authors retain their licenses and authorship. The bundled Codex snapshot retains its Apache-2.0 license. Inclusion does not imply endorsement.

## Inputs & outputs

| Input | Purpose |
| --- | --- |
| Workflow or existing artifact | Defines behavior to create, improve, or review. |
| Intended tasks and exclusions | Sets triggering conditions and scope. |
| Target runtime and destination | Determines packaging and where files belong. |
| Protected requirements and authorization | Preserves approval rules and action limits. |
| Examples and acceptance checks | Makes success observable. |

The result includes the artifact path, enabled behavior, consequential source contributions or disagreements, a dependency receipt, actual checks, and remaining gaps. Review-only requests return findings without editing the target.

Delivery reports use `validated` for tested behavior, `awaiting-evals` for behavior awaiting trials, `no-change-needed` when no change is required, or `blocked` with a specific dependency gap. Comparative quality claims require comparative evidence.

## States & edge cases

Missing or modified required sources fail preflight. Independent preparation can continue, but a similarly named global skill cannot silently replace a locked source.

Creating a skill does not authorize its future business actions. Authoring a deployment workflow does not authorize deploying a product. A task-specific permission or exception retains its original scope.

Claude-specific evaluation scripts need that runtime and its dependencies. Codex can use supported bounded agents and must identify unavailable measurements. Structural checks, authoring trials, runtime discovery, and downstream execution are separate claims.

## Data shape

| File or directory | Contract |
| --- | --- |
| `package.json` | Declared sources, commands, and private installation destination. |
| `package-lock.json` | Pinned dependency installer. |
| `skills-lock.json` | Source commits and content integrity. |
| `.runtime/skills/` | Private restored source copies. |
| `.sources/codex-creator/` | Bundled Codex snapshot and original license. |
| `.sources/origins.json` | Bundled-source provenance. |
| `references/` | Composition boundaries, dependency operations, and validation choices. |
| `evals/` | Synthetic fixtures and historical evaluation evidence. |

The preflight JSON receipt contains `checkedAt`, `wrapper`, `lockSha256`, `manager`, `status`, and `skills`. It proves installed content matches the lock, not that upstream has no newer version or that behavior is correct.

## Commands

Run these in the installed `sams-skill-creator` directory:

| Command | Effect |
| --- | --- |
| `npm ci --ignore-scripts` | Restores the pinned installer. |
| `npm run skills:install` | Restores sources using the frozen skill lock. |
| `npm run preflight --silent` | Checks integrity and prints a JSON receipt. |
| `npm test` | Runs dependency-integrity tests. |
| `npm run skills:list` | Lists declared dependencies. |
| `npm run skills:outdated --silent` | Checks freshness without changing pins. Unavailable checks remain unknown. |
| `npm run skills:update` | Resolves upstream updates and changes the lock and installed sources. |

## Refresh dependencies

Normal runs keep verified pins. A requested refresh preserves the previous source set, checks updates, reviews changed guidance, and freezes the accepted set before authoring.

`skills:update` does not automatically replace the bundled Codex snapshot from the host. That refresh requires inspection, source replacement, provenance recording, and relocking. See [dependency operations](https://github.com/ThatGuySam/skills/blob/main/skills/sams-skill-creator/references/dependencies.md) for the full sequence and rollback procedure.

Freshness applies at the recorded check time. No scheduled update is installed.
