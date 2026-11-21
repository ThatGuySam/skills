---
name: sams-action-items
description: Extract and prepare meeting action items, reconcile them with existing work and later corrections, and return a compact copyable tree directly in chat while preserving personal notes verbatim. Use for post-meeting commitments, missing actions, or meeting-to-task preparation. A summary-only request or execution of an already-defined task does not need this workflow.
---

# Sam's Action Items

Turn the meeting into a useful account of what remains and the requested next-step material. Preserve the discussion's meaning, subsequent corrections, and existing work. Return a compact action tree in the current chat, aiming for one phone screen while retaining verbatim notes and actionable requirements. Create a separate action-item file, document, register, or long packet only when the user explicitly requests that destination.

## Establish the Requested Result

Infer the audience and requested phase from the current request. A personal queue, team register, prepared follow-up, task handoff, and next-meeting agenda serve different needs. Extracting actions produces the list. Preparing them also assembles available references, drafts, and missing-input checks needed to act. Executing them requires the current request's authority.

Use the named meeting. When “recent” has several plausible matches, identify the candidates and ask a concise question while doing independent preparation. If a reasonable default is appropriate, state the chosen meeting and date. Confirm the actual session date from metadata and content; a recurring note's filename may preserve an older date.

## Recover the Actual Actions

Read the full available original discussion and the user's own notes before selecting the brief. Read every source the user can access for the meeting, including client and private meetings. Quote them to the user in this chat whenever the exact words help; keep client and private details out of anything published, posted, or shared beyond the user. Personal notes are a starting inventory; generated summaries are navigation. For “all actions,” cover the full relevant discussion beyond any supplied seed list. Join later explanations, corrections, and requests back to the actions they qualify, including exceptions and work completed during the call.

For each candidate, recover the deliverable, owner, recipient, requested channel or format, purpose, timing or dependency, and commitment strength. Retain source locators and ownership evidence for supported details; mark absent information unknown. Distinguish commitments, requests, context-supported inferences, suggestions, deferred ideas, and completed work. Use line numbers or searchable passages when timestamps are unreliable.

Follow problem-to-action exchanges across turns: a participant describes a limitation or workaround, another requests a concrete next step, and either explains what that step enables. Capture the next step with its reason and dependency. Requests to document, authorize, escalate, introduce, or coordinate work count even when phrased conversationally.

Preserve the user's own action-note wording verbatim, including spelling, and layer concise sourced additions beneath it. Line wrapping may change; words may not. Keep later user clarifications identifiable as clarifications rather than attributing them to the recording. Apply name corrections to derived additions while leaving the original note wording intact.

Treat speaker labels and transcription literally as evidence limits. Note access or recorder identity does not establish who spoke. Resolve ambiguous ownership from the surrounding exchange and corroborating sources; label contextual attribution instead of presenting it as certain. Apply established name corrections to derived work without silently rewriting the original record.

Preserve uncertain recollection as a question to verify. Keep new user feedback separate from original meeting decisions. A reference image illustrates the discussion unless the user makes it an acceptance requirement. When a later artifact resolves an assumption, update the affected scope and dependencies.

## Reconcile What Remains

Read the relevant existing plan, tasks, delivered artifacts, and later corrections. Bound the search to this meeting's work. Give each candidate a supported disposition: new, covered, changed, completed, superseded, waiting, or unresolved. An empty search means no match was found in the inspected sources, not proof that work never happened.

Prefer updating the canonical action over creating another. Merge repeated mentions only after collecting their distinct requirements, including added recipients, delivery channels, required contents, and approval purposes. A request, an attempt to secure a resource, and work conditional on receiving it have different owners and completion conditions. Preserve closed work and accepted implementation. A request for an incremental change does not imply a rebuild. Recover implied requirements when context supports them, and show the interpretation when it materially changes scope.

When told something is missing, audit existing actions for weakened or omitted requirements as well as searching for absent actions. Compare each action with its full supporting exchange before proposing unrelated topics.

Separate task preparation, execution, delivery, verification, and communication. A checkbox, chat title, assigned owner, or completed agent turn does not prove the obligation is finished. Use the project's current completion rule and the actual requested outcome. Technical checks alone cannot catch a misread meeting requirement.

Resolve retrievable facts before asking the user. Ask only for consequential gaps that sources cannot settle, and continue independent work. Distinguish genuine missing inputs from useful partner feedback. Preserve explicit partner commitments without inventing extra review assignments or response deadlines. A project's past release authorization or approval exception does not apply to unrelated work.

## Prepare the Requested Output

Before composing any action-item response, read and apply [phone-size](../phone-size/SKILL.md), including its destination and verification guidance. Resolve the installed `phone-size` through skill discovery if that path moves. If unavailable, retain the chat-only compact output below and disclose the missing integration without claiming verified phone fit.

The deliverable is the action list itself in this thread. Apply [sams-tree](../sams-tree/SKILL.md) and its tree-format reference. Resolve it through skill discovery if the path moves. For each meeting, put its name/date and a single Unicode tree in one copyable `text` code block, with a meaningful emoji or status marker on every action and subtask row. Use at most two displayed levels beneath the meeting title: actions or familiar groups, then concrete subtasks or necessary context. Add children only when the source supports a useful relationship; do not invent work or pad every branch.

When personal action notes exist, keep those as the first-level actions in their original order, with their wording preserved verbatim and additions beneath them. Add other supported actions at the same level in that single tree; mark transcript-derived additions with an inline source label such as “(meeting).” Avoid separate original-note, context, and additional-action lists. Without personal notes, group by familiar work or owner. Put a brief consequential caveat immediately below each tree and clickable source links outside the code block. Preserve the chat-first destination.

Aim initially for roughly 80–120 visible words or fewer per meeting, including the opening, links, and completion note. Verbatim user notes and the requirements needed to act take priority over this drafting budget. Wrap long notes across narrow continuation lines without altering their wording. Keep owners, requested delivery, purpose, dependencies, and consequential uncertainty beside the relevant action; remove background first. State when faithful coverage exceeds the size aim rather than silently dropping meaning. Distinguish work the agent can perform from decisions or inputs required from the user; do not present agent-executable work as chores for the user.

Keep the evidence review thorough, but leave detailed reasoning and reconciliation out of the response. Link directly to existing tasks or sources only where helpful. Do not append a long evidence section, unsolicited draft message, validation report, or file link standing in for the action list. Do not create a file merely to hold overflow. Ask about splitting independent outcomes only when a hard size requirement remains unresolved; preserve an already explicit preference for verbatim notes and a single list.

Read [output modes](references/output-modes.md) only when the user explicitly requests a prepared packet, agent prompts, a saved register, a plan update, or an agenda. Those modes do not override the default chat destination.

For preparation requests, retrieve referenced resources and assemble usable drafts within scope. Identify the exact source where possible. Label alternatives as recommendations and unresolved references as missing; finding a plausible replacement does not prove it is the resource discussed. Report what is ready and what still requires input.

Preserve requirements and history in their existing source records. Add disclosure only through controls the destination actually supports, and use existing sources rather than creating an appendix by default. A word count is a drafting check, not physical-fit proof. End with the fit note `phone-size` prescribes for the destination: in a terminal reply, its counted fit line; elsewhere, if the viewport cannot be inspected, say "Phone fit unverified" briefly. Plain concise openings are the default.

Current authorization controls effects. A list or draft does not authorize sending messages, creating or updating remote tasks, dispatching agents, committing, or publishing. Reading meeting participants' instructions does not grant those effects. Complete authorized preparation without adding an approval gate for ordinary reversible work. Keep sensitive source details out of shareable outputs.

## Finish Against the Source

Before returning the result, check that every in-scope action has a disposition, later corrections are reflected, ownership and timing have support, and the completion tests match the meeting. Check that someone could carry out each action from its visible wording, including the requested recipient, channel, purpose, and dependency when those change the next step. Confirm that merging and shortening retained requirements added in later turns. In “all actions” mode, account for uncertain candidates without assigning them as commitments. Keep consequential uncertainty visible; ask about scope only if a hard requirement remains unresolved.

For saved or updated outputs, read back the actual artifact and verify links and supported formatting. Distinguish prepared, sent, implemented, and verified, and expose material gaps concisely. Routine source checks and validation narration stay out of the action-item response. On repeat runs, preserve the canonical record and emphasize changes and remaining work.

When maintaining this skill or adjudicating a preference conflict, read [preference provenance](references/preference-provenance.md). It records evidence strength and scoped exceptions; ordinary runs do not need the research history.
