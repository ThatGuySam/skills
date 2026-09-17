---
title: Changelog
description: Public changes to the skills, distribution metadata, and documentation.
---

Dated changes to the skills, installation metadata, and documentation. Verification limits accompany the relevant entries.

## 2026-09-17

### Custom GPT migration

- Added `migrate-cgpt` for portable conversion to local agents, personal skills, and GitHub repositories.
- Preserve required outputs and authorization rules; track missing knowledge and Action integrations explicitly.
- Added conditional delivery, component mapping, verification, and dated source references.
- Added a guide and verification record. Documentation deployment remains a separate step.

## 2026-09-14

### Install command preferences

- Simplified the dropdown to tool names, hover states, and the selected checkmark; removed group headings and descriptions.

- Replaced the native selector with a custom ChatGPT-style menu, selected-item checkmarks, keyboard navigation, and viewport-aware positioning.
- Reduced the choices to npx, bunx, pnx, mise, and Yarn dlx. Migrate saved aliases without losing the runner preference.

- Added a shared runner picker for Skills CLI command blocks, with npx, bunx, pnpx, pnpm dlx, Yarn dlx, npm exec, mise, and pnx options.
- Remember the latest selection locally and synchronize it across command blocks, pages, and open tabs.
- Copy the selected command with its environment variables and multiline flags intact. Preserve the original npx examples for clients without JavaScript and the agent-readable docs.
- Disable code-font ligatures and preserve inline whitespace to make spaces before flags visible.

### Sam UX Audit and Collection 0.3.0

- Added independently installable `sam-ux-audit` for websites and GitHub repositories.
- Bundled the core audit method and pinned five upstream review dependencies with frozen installation and integrity checks.
- Added public smoke results for W3C before/after pages, GOV.UK, TodoMVC and Express. Findings distinguish observed behavior from source risks.
- Kept the stable marketplace install key and `sam` namespace. The GitHub package includes documentation source; website deployment is a separate action.

## 2026-09-05

### Documentation editing

- Applied p-unslop to maintained documentation, skill instructions, references, and the memo template. Replaced repeated introductions, abstract wording, and dense sentences with direct explanations.
- Preserved commands, schemas, citations, requirements, and recorded evaluation evidence.

### Zach Prompting Astra update

- Added conditional GPT-6 Astra guidance and dated source attribution.
- Clarified authorization carryover, instruction-conflict reporting, continuation after follow-ups, and proportional verification.
- Preserved the existing review, rewrite, debug, and migration modes and standalone install name.
- Behavioral improvement remains awaiting comparative evals; structural checks do not establish model performance.

## 2026-07-17

### 0.2.1

- Relocated the repository-wide [skill and instruction system audit](https://harness.docs.samcarlton.com/research/instruction-system-audit-2026-07-17/) and its remaining roadmap to Harness Atlas, while keeping the HTMA behavior contract in this collection.
- Strengthened HTMA Measure so missing value-of-information inputs remain `unknown` or explicitly qualitative instead of receiving numerical defaults.
- Added the VOI score state, nullable expected value, and missing-input contract to the feature and architecture documentation.
- Recorded the remaining audit sequence on the project roadmap.

## 2026-07-15

### HTMA Measure problem examples

- Added a source-backed guide to documented estimation pains, including budget-before-quote decisions, point-estimate risk, hidden work, target-price ambiguity, small samples, research stopping rules, and asymmetric error costs.
- Added copyable prompts that use explicit bracketed fields rather than fabricated measurements or realistic-looking placeholder results.
- Added a human-facing README beside the canonical HTMA Measure skill and aligned the root repository guide and Starlight navigation.

### HTMA Measure evaluation suite

- Ported the original generic HTMA scoring utilities and scrubbed aggregate H1-H12 history beside the skill.
- Added a transparent ten-case H12-derived regression packet, deterministic scorer, isolated Claude CLI runner, and recorded native-agent baseline.
- Used Zach Prompting to reconcile estimate-versus-block transitions, then compared the unchanged skill and two isolated candidates on the same regression suite.
- Added an explicitly synthetic six-case H13 acceptance suite for missing-threshold, current-lookup, ambiguous-target, and unavailable-private-actual behavior.
- Updated HTMA Measure so a missing threshold blocks only the action comparison when a numeric range remains responsible, while missing identifiers, current sources, and private actuals still block numeric output.
- Preserved the private boundary for source ledgers, raw historical outputs, mappings, human score sheets, and active sealed holdouts.
- Reclassified the sanitized H12 packet as a visible regression set; its results are not fresh holdout evidence.

### Sam's Skills collection

- Reframed the repository and documentation site as the collection of skills Sam uses and shares.
- Added collection-level About and Installation pages, and moved collection navigation ahead of skill-specific sections.
- Changed the bundled Claude Code namespace from `htma-measure` to `sam` while retaining the stable marketplace install key.
- Verified public commit [`8405b24`](https://github.com/ThatGuySam/skills/commit/8405b244fc09) through a fresh HTTPS marketplace install, strict manifest validation, component inventory, and recursive skill-content comparison.

### Zach Prompting

- Added the standalone `zach-prompting` skill for reviewing, rewriting, debugging, and migrating prompts and agent instruction artifacts.
- Added conditional GPT-5.6 and Claude Fable 5 guidance sourced from the official OpenAI and Anthropic prompting guides.
- Added four fresh-context forward uses covering rewrite, review-only, model migration, and a real repository instruction audit; recorded their scope and limitations on the verification page.
- Added the public Zach Prompting guide, examples, source attribution, and Skills CLI installation command.
- Verified the published GitHub commit with clean remote Skills CLI and Claude marketplace installs.

### Documentation collection

- Reframed the root README, docs landing page, navigation, and repository reference around a multi-skill collection while preserving the existing HTMA Measure documentation.

### 0.2.0

- Added Zach Prompting to the root `skills/` collection.
- Reframed the existing backward-compatible `htma-measure` marketplace plugin as the two-skill ThatGuySam Skills bundle.
- Preserved the existing Codex and Claude installation ID while documenting the bundled namespace and the one-skill Skills CLI path.

## 2026-07-11

### Documentation site

- Added the public Starlight documentation application at `apps/docs`.
- Added installation, usage, prompt, command, troubleshooting, feature, architecture, and reference pages.
- Added public `llms.txt`, `llms-full.txt`, and `llms-small.txt` outputs.
- Deployed the site at `https://skills.samcarlton.com`.

### 0.1.1

- Changed Claude's plugin source to the same marketplace repository.
- Removed the second GitHub SSH clone requirement.
- Documented the complete two-command Codex installation.

### 0.1.0

- Published the standalone `htma-measure` skill.
- Added Codex, Claude Code, and portable plugin manifests.
- Added the calibrated memo template, method map, output rubric, and local paid-quote adjustment.
- Sanitized personal and workspace-specific markers for public use.
