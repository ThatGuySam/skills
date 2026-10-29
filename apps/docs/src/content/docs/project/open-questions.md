---
title: Open questions & decisions
description: Open questions and dated decisions about the skills, bundle, and documentation.
---

These questions concern the collection and shared packaging. None currently blocks installation or use. Revisit them when evidence warrants a change, then record the decision and date.

## Open questions

### Sam's Env

The initial two review questions are settled below. Unknown provider permissions remain explicit gaps; they do not justify invented values.

Questions to revisit with evidence:

- Does Andrej Explain improve comprehension or review accuracy compared with an ordinary explanation prompt? Initial forward-use checks do not answer this.
- Which video rendering and narration workflow should be supported beyond the portable fallback?
- Does Sam's Gen Writing catch scaled-content and fabricated-author risks more reliably than an unassisted prompt? The smoke scenarios have not been run.

- Should the repository publish automated cross-client installation tests on every release?
- What evidence should be required before a workflow becomes a new public skill?
- Should the other HTMA companion skills become public packages, or remain optional internal tools?
- Which calibration-review metrics are useful enough to standardize across real measurement memos?

## Decided

### 2026-10-10. Familiar Trees and Contextual Status

The creator confirmed the [tree and status design](/tree-status/design/). Sam's Tree owns shared presentation defaults. Sam's Status adds project-scoped discovery and contextual work statuses. Both install independently through bundled copies of the same tree-format reference. The interview has no unresolved requirements.

### 2026-10-09. Adopt Static @env-spec Comments

Use standard type, requiredness, sensitivity, and documentation annotations inside comments while retaining ordinary dotenv assignments. The requested zero-dependency checker validates a documented static subset. It rejects unsupported features instead of claiming full Varlock compatibility. File-input restrictions remain unchanged.


### 2026-10-09. Restrict Existing Env Inputs

Inspect code and configuration to discover variables. Read existing env content only from Git-tracked `.env.example` files. Never inspect actual `.env` or `.env.local` files. The implementation uses committed regular-file blobs to avoid local overrides and symlink targets. Git tracking is an input restriction, not proof that a file contains no secrets.

### 2026-10-09. Use Pragmatic Comment Detail

Use the amount of guidance useful for each variable: exact doc URLs, dashboard/admin links, single-line operations, non-obvious possible values, and other practical details. Avoid fixed comment quotas and repeated boilerplate. The [research](/research/concise-env-example-writing-2026-10-09/) separates these user decisions from outside recommendations.


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

### 2026-10-07. Publish Sam's Gen Writing with public sources only

Name the skill `sams-gen-writing`. Ground it in Google's public Search Central pages and paraphrased, linked Search Off the Record episodes so it works without a private transcript corpus. Treat podcast remarks as commentary below formal policy, and mark older human-supervision framing as superseded.
