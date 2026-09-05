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

| Skill | Use it for | Start here |
| --- | --- | --- |
| Zach Prompting | Improve prompts, skills, agent definitions, tool descriptions, and repository instructions without weakening their contract. | [Read the guide](/zach-prompting/introduction/) |
| HTMA Measure | Turn uncertain costs, risks, ROI, market size, and other quantities into estimates with ranges, sources, and recommendations. | [Read the guide](/overview/introduction/) |

Each skill remains canonical in its own `skills/<name>/` directory. Collection packaging points to those directories instead of copying their instructions.

## Names you will see

- **Repository:** `ThatGuySam/skills`
- **Standalone skills:** `zach-prompting` and `htma-measure`
- **Marketplace:** `thatguysam-skills`
- **Stable plugin install key:** `htma-measure@thatguysam-skills`
- **Claude Code bundle namespace:** `/sam:<skill>`

The install key is retained so existing marketplace users keep working. The `sam` namespace is the human-facing prefix for skills inside the collection.

## Publishing contract

The public repository, this site, and the machine-readable corpus should describe the same collection. A change is not presented as shipped until its source is committed, its relevant checks pass, and the deployed content is verified.
