---
title: Verification
description: Recorded migration evaluations, distribution checks, and remaining limits.
---

Checked 2026-09-26. Six synthetic migrations and eight generated-skill response
probes passed. This demonstrates portable instruction behavior in Work Mode,
not live GPT parity or native execution in every destination.

## Behavioral evidence

Each migration used a fresh agent given the source configuration and migration
skill. Another fresh agent received only the resulting skill and task inputs.
The grading requirements were withheld from both runners. An independent
reviewer compared the retained artifacts and responses with those requirements.

| Case | Demonstrated result |
| --- | --- |
| Instruction-only meeting brief | Preserved headings, word/question limits, explicit owners, and request for missing notes. |
| Missing knowledge | Copied the available policy accurately, cited it, and kept the missing fee unknown. |
| Actions | Preserved the operation/auth/error contract and returned an unsent draft without inventing a connector or reservation. |
| Conflicting instructions | Preserved both incompatible formats and asked which controls before producing a summary. |
| Strict JSON | Returned exact valid and invalid objects with the required keys, values, and JSON types. |
| Unavailable image capability | Preserved PNG requirements, labeled the text fallback, and made no image or Mac-installation claim. |

No conversion failure was found in these six cases. Missing integrations and
unresolved source conflicts correctly remain partial or blocked. The run
exposed a verification gap in the earlier guidance: conversion inspection and
execution of the generated workflow needed separate evidence. The revised
instructions require expected requirements and retained observed outputs.

Two reruns using the revised guidance completed their own separate execution
checks: three meeting-brief cases and eight strict-JSON cases, all passing.
Those additional cases include missing input, invalid types, decimals, zero,
negative values, and integer arithmetic beyond JavaScript's safe integer range.
Their evidence is retained alongside the baseline, for eight conversions and
19 observed responses in total. This small sample is not a reliability rate.

The [evaluation set and run procedure](https://github.com/ThatGuySam/skills/tree/feat/migrate-cgpt/evals/migrate-cgpt)
include synthetic fixtures, generated files, response bytes, hashes, and the
independent assessment. The replay checker checks recorded evidence; it does
not call a model. Baseline reports predate the separate response runs, so their
then-unrun notes are retained as history. The September 17 single migration
trial did not execute its generated workflow; the new suite adds that evidence.

## Installation and structural checks

The official skill validator passes for all five canonical skills. Claude Code
2.1.283 strict marketplace and plugin-manifest validation pass with no warnings
or errors. Codex 0.154.0-alpha.3 has no `plugin validate` command; its read-only
app-server `plugin/read` loads all five skills from the repository marketplace.
That loader result is distinct from automatic activation or a personal install.

Skills CLI 1.7.0 installs only `migrate-cgpt` into a clean disposable Codex project
from the local candidate checkout. The installed files match the canonical
source byte-for-byte. This checks project packaging, not remote-default-branch
availability or installation on the user's Mac or ChatGPT account.

## Documentation gate

The documented Bun setup, three documentation tests, and Astro build pass.
The build emits 37 pages and all three `llms*.txt` files with the changed
migration content. The original docs-spec checker passes 11 checks with zero
warnings or failures. It was recovered through its documented installation
layout, not replaced with a substitute. See `apps/docs/README.md` for setup and
the evaluation validation record for its pinned source and checksum.

No documentation deployment was performed. Existing build notices about
deprecated Markdown processor options and the missing custom 404 entry are
nonfatal and outside this migration change.

## Limits

One run per case is a smoke evaluation, not a reliability estimate. The runner's
exact model and effort were not exposed by spawn results. Some probes shared
an agent context and were instructed to act independently. Explicit invocation
does not test automatic trigger selection, including nearby unrelated requests.

Live Actions, authentication, 401/409/timeout handling, original-GPT before/after
parity, hosted migration, native ChatGPT/Mac execution, and production image
generation remain untested. Error rules were inspected in the generated Action
contract; only the unavailable-integration fallback was executed. A supplied
OpenAPI extract is not a working service or a full OpenAPI conformance test.
