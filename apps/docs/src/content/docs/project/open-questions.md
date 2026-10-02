---
title: Open questions & decisions
description: Open questions and dated decisions about the skills, bundle, and documentation.
---

These questions concern the collection and shared packaging. None currently blocks installation or use. Revisit them when evidence warrants a change, then record the decision and date.

## Open questions

Questions to revisit with evidence:

- Does Andrej Explain improve comprehension or review accuracy compared with an ordinary explanation prompt? Initial forward-use checks do not answer this.
- Which video rendering and narration workflow should be supported beyond the portable fallback?

- Should the repository publish automated cross-client installation tests on every release?
- What evidence should be required before a workflow becomes a new public skill?
- Should the other HTMA companion skills become public packages, or remain optional internal tools?
- Which calibration-review metrics are useful enough to standardize across real measurement memos?

## Decided

### 2026-07-11. Publish one standalone skill first

The public repository ships `htma-measure` without requiring the rest of the HTMA suite. This keeps installation portable and makes the core workflow independently useful.

### 2026-07-11. Keep the local paid-quote method public

The local nonprofit/community adjustment remains part of the public skill because it corrects a repeatable reference-class error while clearly excluding official fees and statutory rates.

### 2026-07-11. Use public identity and noreply commits

Repository metadata uses `ThatGuySam`; commits use the GitHub noreply address rather than exposing a configured personal email.

### 2026-07-11. Use same-repository plugin sources

Claude installs the plugin from the already-cloned marketplace. This avoids requiring public users to configure GitHub SSH.

### 2026-07-11. Make the entire documentation site public

The docs Worker serves static assets directly. There is no authentication Worker, private-route manifest, login secret, or gated `llms-full.txt`.

### 2026-07-15. Use Sam as the Claude bundle namespace

The marketplace keeps its stable `htma-measure` install key so existing installations continue to resolve. The plugin manifest uses `sam` as the collection namespace, so bundled Claude Code skills appear as `/sam:<skill>`.

### 2026-10-02. Publish Andrej Explain as a bounded workflow

Name the skill `andrej-explain`. Keep format selection and factual fidelity in the core; load media and STE details conditionally. Do not require paid narration, a learning database, or strict STE for ordinary explanation. Merge the two research threads into one public research memo and retain evidence limits.
