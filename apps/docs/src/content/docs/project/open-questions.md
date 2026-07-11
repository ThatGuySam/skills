---
title: Open questions & decisions
description: The genuine unknowns and dated decisions governing the public skill and documentation.
---

## Open questions

No question blocks installation or use of the current `htma-measure` release.

Questions to revisit with evidence:

- Should the other HTMA companion skills become public packages, or remain optional internal accelerators?
- Which calibration-review metrics are useful enough to standardize across real measurement memos?
- Should the repository publish automated cross-client installation tests on every release?

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
