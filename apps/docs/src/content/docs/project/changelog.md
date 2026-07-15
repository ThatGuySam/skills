---
title: Changelog
description: Public changes to the skills, distribution metadata, and documentation.
---

## 2026-07-15

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

- Changed Claude’s plugin source to the same marketplace repository.
- Removed the second GitHub SSH clone requirement.
- Documented the complete two-command Codex installation.

### 0.1.0

- Published the standalone `htma-measure` skill.
- Added Codex, Claude Code, and portable plugin manifests.
- Added the calibrated memo template, method map, output rubric, and local paid-quote adjustment.
- Sanitized personal and workspace-specific markers for public use.
