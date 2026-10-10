---
title: Tree and Status Verification
description: Observed checks, synthetic evaluation artifacts, and limits for the tree skills.
---

Verification date: October 10, 2026. Synthetic requests test the skill instructions; they do not establish accuracy against any real project's tracker.

## Structural Checks

Both skills passed the skill-creator `quick_validate.py` check for skill structure and frontmatter. Their bundled `tree-format.md` files are byte-identical. Each skill has its own reference and UI metadata, with no required companion skill or connector.

## Forward Evaluation

A fresh evaluator received only Sam's Tree, its reference, and two synthetic requests. It produced an initial course outline, an expanded Geometry follow-up, and a department tree. Review of those three outputs found familiar names, preserved relationships, correct path compression, three displayed levels, collapsed unrelated branches, and no invented statuses or sources.

A second fresh evaluator received only Sam's Status, its reference, and two synthetic requests. It produced a review-phase view, a production-phase view with conflicting tracker snapshots, and an expanded Operations follow-up. Review of those three outputs found phase-relative Done, Needs Info for missing status, source-backed freshness judgments, no age-only stale flag on completed policy work, correct collapsed-parent summaries, and links outside the tree.

The evaluator noted that an unresolved failed deployment has no dedicated status in the four-label vocabulary. It used In progress with a failure qualifier. It also explained that snail markers referred to superseded tracker labels rather than the newer release records. Both choices fit the contract; these remain judgment areas to watch in real use.

Actual outputs are retained in [Sam's Tree evaluation](https://github.com/ThatGuySam/skills/blob/main/skills/sams-tree/evals/observed-2026-10-10.md) and [Sam's Status evaluation](https://github.com/ThatGuySam/skills/blob/main/skills/sams-status/evals/observed-2026-10-10.md).

## Packaging and Docs Checks

- Skills CLI 1.7.0 installed each skill separately into a clean temporary project. All four files in each tested skill package matched its source byte-for-byte; evaluation output records were added afterward.
- The strict Claude plugin and marketplace validators passed. JSON parsing confirmed collection version 0.9.0 and the Codex skills directory.
- The Astro docs build passed and generated the four new pages plus the agent-readable exports.
- The docs-spec gate passed all 11 checks with no warnings or failures.
- Scoped Biome 2.5.15 and oxlint 1.86.0 checks passed after formatting the touched configuration files. The workspace lint wrapper initially failed because its installed tools were incompatible or missing; isolated policy-eligible tools ran the same rules from the release checkout.
- Baseline built-in prek checks passed, and the staged Gitleaks scan found no secrets.

Deployment is a separate delivery step. These local checks do not claim a completed deployment.

## Reproduce

The synthetic requests and pass conditions live under each skill's `evals/requests.md`. Give an evaluator the skill, its reference, and a request without the pass conditions. Retain the output, then assess the conditions separately.

## Limits

These are bounded synthetic smoke evaluations, not a cross-model benchmark. Live Linear, Notion, Jira, and Basecamp integration is not exercised. Freshness and phase inference remain judgments that depend on the quality of available evidence.
