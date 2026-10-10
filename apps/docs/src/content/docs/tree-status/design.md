---
title: Sam’s Tree and Status Design
description: Agreed behavior and validation criteria for two proposed tree skills.
---

This design records the creator’s requirements, confirmed on October 10, 2026. The implementation follows this contract. See [verification](/tree-status/verification/) for observed checks and their limits.

## Purpose

Make large amounts of work easy to scan and understand. `sams-tree` produces scannable trees for arbitrary subjects. `sams-status` presents project and work status using relevant work sources, including available trackers.

The reference image establishes a file-style tree as the starting visual direction. Its project-specific labels, statuses, and issue references are examples, not universal requirements or verified current project facts.

## Skill Responsibilities

`sams-tree` owns the shared presentation defaults for arbitrary subjects: familiar names and groupings, at most three displayed levels, collapsed non-relevant branches, and up to three simple grouping suggestions. A request for more detail can override the default depth and expansion.

`sams-status` applies that presentation to current project work and adds source discovery, work statuses, brief parent summaries, and freshness judgments.

## Confirmed Behavior

- Use known or easily inferred groupings and names by default. Preserve the reader’s familiarity with the material.
- Suggest up to three new groupings separately, by name only. Keep the names very simple and choose those most helpful to the person prompting.
- For products, software, and interactive interfaces, orient the status tree around user navigation and the screens the user experiences.
- When that structure is unavailable, use the team’s familiar internal organization, such as its existing project and task hierarchy in a work tracker.
- Prefer the hierarchy the reader is most likely to recognize and encounter regularly.
- Default status scope runs from the task level most relevant to the conversation up to the current project. Leave the project implied rather than displaying it as a level. Show no more than three levels beneath it.
- Collapse non-relevant branches by default. Expand them when the user asks for more.
- Compress deeper familiar paths with `->`, preserving existing names and their order. For example, `Settings -> Billing` is a hypothetical combined path label, not a measured project fact.

## Status Vocabulary

Use these four status labels:

- ⚪️ Not started
- 🟡 In progress
- 🔵 Needs Info
- 🟢 Done

Infer Done from the conversation and current phase. Depending on that context, Done can mean available on dev, ready for review, or in production under trunk-based delivery with good CI. These are contextual examples, not universal prerequisites. Do not silently equate phase completion with production delivery or invent supporting evidence.

Use Needs Info for missing or unresolved status information so the user can supply details or point to a source.

Parent branches may summarize their children, always very briefly. Use Done when all relevant child work is done for the phase, Not started when none has begun, and In progress for mixed progress. Use Needs Info when an unresolved input or evidence gap prevents a reliable branch summary. Collapsed children still matter to that summary.

Add 🐌 when the agent judges an item likely to be stale. This is a freshness marker alongside the work status, not a fifth status. The judgment is an inference from available context, not a claim of independently verified staleness.

## Inputs and Outputs

`sams-tree` takes the subject and material supplied or established in the conversation. `sams-status` additionally uses relevant accessible work sources. Automatically inspect relevant connected trackers within the current project, starting with sources linked to the active work. If access is unavailable, use available material and state the gap. Reading status does not authorize changing tasks.

Output a copyable plain-text file-style tree using branch characters such as `├──` and `└──`. Keep names and annotations short. Place helpful tracker IDs beside the corresponding items, with clickable source links below the tree. Keep URLs outside the tree. Use only real source IDs and links.

## States and Edge Cases

When source hierarchies are deeper than the default view, combine known intermediate names with `->`. Keep the current project implied. Collapse non-relevant branches without presenting their children as absent or complete.

Missing access or unresolved evidence calls for Needs Info on affected status judgments. Known facts and supported inferences may still appear. A likely-stale judgment adds 🐌 without erasing the work status. Never convert missing evidence into Not started or Done.

## Data Shape

The output has named items arranged in a hierarchy. Status trees additionally communicate work state. Items can carry a source reference, a collapsed state, and, for status output, a work status and separate likely-stale marker. A serialized schema or rendering script is not required by the user-facing contract.

## Validation Criteria

Evaluate observable behavior with clearly labeled synthetic fixtures before publication:

- An arbitrary subject uses familiar groupings, at most three displayed levels by default, and up to three simple proposed grouping names outside the tree.
- A deep hierarchy preserves familiar names and order using `->` while keeping the project outside the displayed levels.
- A product task set follows known navigation and screens. A task set without that structure uses the team’s familiar work hierarchy.
- Non-relevant branches remain collapsed until requested, and brief parent summaries account for hidden child work.
- Done changes appropriately with the stated phase without inventing delivery evidence. Missing information uses Needs Info.
- Likely stale information carries 🐌 alongside its work status. Freshness claims remain grounded in available context.
- Relevant tracker discovery stays within the current project. Access gaps remain visible, and no task mutations occur.
- Helpful IDs map to real source references supplied by the fixture, with clickable links outside the tree.

These criteria define the checks; observed outcomes and remaining limits are recorded in [verification](/tree-status/verification/).

## Progress

- Completed: all four interview rounds, terminology capture, and consolidated design docs.
- Completed: creator confirmed the consolidated design and authorized implementation and deployment.
- Delivery and validation: see [verification](/tree-status/verification/).

See the [glossary](/tree-status/glossary/) for settled terms and [open questions](/project/open-questions/) for unresolved decisions.
