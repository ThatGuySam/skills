---
title: About this collection
description: Which skills Sam publishes and the requirements for adding one.
---

Sam publishes skills he uses in his own work. Each has a specific task, an independent installation path, and recorded verification limits. Install one skill for a particular workflow or the bundle for the full collection.

## Requirements for publication

A skill belongs here when it is:

- used in real work;
- specific enough for an agent to trigger reliably;
- independently useful and honest about optional dependencies;
- portable outside Sam's private workspace;
- free of private information and fabricated evidence;
- documented with real installation and usage examples; and
- validated on representative tasks with limitations recorded.

## Current skills

<!-- skills:start:about-catalog -->
| Skill | Use it for | Guide |
| --- | --- | --- |
| Phone Size | Condense tasks, decisions, research, and updates into a phone-screen brief with supporting detail. | [phone-size](/phone-size/introduction/) |
| Sam's Tree | Organize notes and other material into familiar, scannable trees. | [sams-tree](/tree-status/introduction/) |
| Sam's Status | Show project work as a status tree with sources, progress, and missing information. | [sams-status](/tree-status/introduction/) |
| Sam's Env | Draft environment examples with setup links, value guidance, annotation checks, and consistent spacing. | [sams-env](/env-example/introduction/) |
| Andrej Explain | Explain complex material and agent work through useful text, diagrams, HTML, or video. | [andrej-explain](/andrej-explain/introduction/) |
| Migrate Custom GPTs | Back up GPT workflows privately and convert them to portable skills while tracking migration gaps. | [migrate-cgpt](/migrate-cgpt/introduction/) |
| Sales Research | Research sales decisions and draft buyer communication using relevant practitioner sources. | [sales-research](/sales-research/introduction/) |
| Sam's Gen Writing | Draft, review, or plan AI-assisted pages using Google's published Search guidance. | [sams-gen-writing](/sams-gen-writing/introduction/) |
| Sam's Skill Creator | Create and improve agent skills with locked authoring sources and behavioral validation. | [sams-skill-creator](/sams-skill-creator/introduction/) |
| Sam UX Audit | Audit websites and repository UX with locked review dependencies and evidence-backed findings. | [sam-ux-audit](/sam-ux-audit/introduction/) |
| Zach Prompting | Improve prompts and agent instructions while preserving their intent and safeguards. | [zach-prompting](/zach-prompting/introduction/) |
| HTMA Measure | Estimate uncertain quantities with ranges, sources, and decision recommendations. | [htma-measure](/overview/introduction/) |
<!-- skills:end:about-catalog -->

Each skill remains canonical in its own `skills/<name>/` directory. Collection packaging points to those directories instead of copying their instructions.

## Names you will see

- **Repository:** `ThatGuySam/skills`
<!-- skills:start:about-names -->
Standalone skills: `phone-size`, `sams-tree`, `sams-status`, `sams-env`, `andrej-explain`, `migrate-cgpt`, `sales-research`, `sams-gen-writing`, `sams-skill-creator`, `sam-ux-audit`, `zach-prompting`, `htma-measure`.
<!-- skills:end:about-names -->
- **Marketplace:** `thatguysam-skills`
- **Stable plugin install key:** `htma-measure@thatguysam-skills`
- **Claude Code bundle namespace:** `/sam:<skill>`

The install key is retained so existing marketplace users keep working. The `sam` namespace is the human-facing prefix for skills inside the collection.

## Publishing contract

The public repository, this site, and the machine-readable corpus should describe the same collection. A change is not presented as shipped until its source is committed, its relevant checks pass, and the deployed content is verified.
