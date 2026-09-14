---
title: Sam UX Audit
description: Audit websites and GitHub repositories using locked review skills and observable evidence.
---

Sam UX Audit combines a portable audit method with version-locked accessibility, HIG, motion, performance, and Core Web Vitals skills. It produces one prioritized report with evidence, confidence, and acceptance checks.

## Install

```sh
npx skills add thatguysam/skills --skill sam-ux-audit
```

Use `$sam-ux-audit` in Codex, `/sam-ux-audit` for a standalone Claude Code installation, or `/sam:sam-ux-audit` through the collection bundle.

On first use, the agent runs `npm ci --ignore-scripts` and `npm run skills:install` from the installed skill directory. Node 18+, npm, Git, and source-network access are needed for a cold install. Browser tooling is separate; repository review can use local files or read-only GitHub access. The skill uses no private workspace paths or credentials.

## Behavior

A website audit follows a concrete user journey and inspects relevant states and interactions. Repository mode pins a commit, reads the project's instructions and user-facing code, and cites file lines. It distinguishes source risks from browser-tested failures. Backend-only repositories receive an applicable developer-journey review or an explicit explanation that no visual target exists.

Normal audits restore the existing lock. An explicit update request resolves newer upstream revisions once, reviews changes, and freezes the set for that audit. It does not edit or deploy the audited product.

## Inputs & outputs

Provide a URL or GitHub repository, the intended user/task if known, and any constraints. The output contains scope, per-lens coverage, findings with evidence and acceptance checks, strengths, unresolved hypotheses, and a version receipt. Screenshots support appearance claims; source code alone cannot establish runtime focus, contrast, timing, or successful task completion.

## States & edge cases

Missing browser access produces an artifact-limited review, not a claim of a completed live audit. Missing or modified dependencies fail preflight. No-motion and backend-only targets do not trigger invented animation problems or web performance scores. The agent resolves disagreements using actual task evidence and current standards.

## Data shape

`package.json` declares five upstream skills; `package-lock.json` pins the installer; `skills-lock.json` records exact commits and content hashes. Disposable dependencies live under `.runtime/skills/`. `skill-versions.json` records wrapper fingerprints and installed integrities for the report. Updates are explicit; third-party instructions remain unchanged.

See [verification](/sam-ux-audit/verification/) for the actual smoke checks and limits.
