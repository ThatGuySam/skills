---
title: Open questions & decisions
description: The genuine unknowns and dated decisions governing the public skills, shared bundle, and documentation.
---

- `Tease:` No unresolved question blocks the current collection.
- `Lede:` Open questions stay visible so future contributors do not turn guesses into collection policy.
- `Why it matters:` Separating collection-level choices from one skill's roadmap keeps shared packaging honest and stable.
- `Go deeper:` Revisit these questions only with evidence, and move resolved choices into dated decisions.

## Open questions

No question blocks installation or use of either published skill or the current marketplace bundle.

Questions to revisit with evidence:

- Should the repository publish automated cross-client installation tests on every release?
- What evidence should be required before a workflow becomes a new public skill?
- Should the other HTMA companion skills become public packages, or remain optional internal accelerators?
- Which calibration-review metrics are useful enough to standardize across real measurement memos?

## Decided

### 2026-07-11 — Publish one standalone skill first

The public repository ships `htma-measure` without requiring the rest of the HTMA suite. This keeps installation portable and makes the core workflow independently useful.

### 2026-07-11 — Keep the local paid-quote method public

The local nonprofit/community adjustment remains part of the public skill because it corrects a repeatable reference-class error while clearly excluding official fees and statutory rates.

### 2026-07-11 — Use public identity and noreply commits

Repository metadata uses `ThatGuySam`; commits use the GitHub noreply address rather than exposing a configured personal email.

### 2026-07-11 — Use same-repository plugin sources

Claude installs the plugin from the already-cloned marketplace. This avoids requiring public users to configure GitHub SSH.

### 2026-07-11 — Make the entire documentation site public

The docs Worker serves static assets directly. There is no authentication Worker, private-route manifest, login secret, or gated `llms-full.txt`.

### 2026-07-15 — Use Sam as the Claude bundle namespace

The marketplace keeps its stable `htma-measure` install key so existing installations continue to resolve. The plugin manifest uses `sam` as the collection namespace, so bundled Claude Code skills appear as `/sam:<skill>`.
