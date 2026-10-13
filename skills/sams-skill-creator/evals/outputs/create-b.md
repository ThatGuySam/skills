---
name: preview-finish
description: Update a finite list of website pages against an accepted reference, preserve protected copy and media, and carry authorized work through deployed preview URLs with desktop and phone verification.
---

# Preview finish

Finish the supplied page list in the named preview environment. A local change is an intermediate result. Completion requires deployed review URLs and evidence for each page, unless a concrete blocker prevents an authorized step.

## Establish the inputs

Read the request, applicable repository instructions, and existing project configuration. Resolve these inputs from supplied material or established session context:

| Input | Required detail |
| --- | --- |
| Pages | Finite list of exact routes or page identifiers and requested changes. |
| Preview | Exact environment, deployment target, and review hostname. |
| Accepted reference | Approved design, screenshot, page, or artifact, with the aspects to reproduce. |
| Protected content | Copy, media, links, metadata, and relationships that must survive the update. |
| Authorization | Allowed writes, delivery operations, target environments, and any standing authorization. |

Use the accepted reference for the requested design decisions. Preserve current copy and media by default, including items the reference omits. If the reference and protected content conflict, keep the protected content and resolve the design around it. Ask only for a missing choice that materially changes the result; continue independent preparation while awaiting it.

An ambiguous deployment target or missing write authorization blocks that mutation. Confirm the exact target before using credentials. Authorization for one environment does not extend to another. Follow existing branch, commit, push, backup, and deployment policy; this skill grants none of those operations.

## Capture the baseline

Create a compact page ledger with one row per requested page. Track its accepted reference, protected content, implementation status, deployed URL, desktop result, phone result, and remaining issue. Keep this ledger in the task's normal evidence location.

Before edits, inspect the source of truth and current rendered pages. Record copy and media identities, destinations, captions, alt text, and meaningful relationships where present. Prefer existing exports or structured data to manual transcription. Capture representative desktop and phone screenshots, and note pre-existing failures with page-specific evidence.

Locate the project's normal editing, deployment, and verification path. Identify shared components that the requested pages use. Preserve unrelated local and remote work. Verify the scoped rollback path before deploying.

This stage is complete when every requested page has an identified source, reference, and preservation baseline. If part of the baseline is inaccessible, record the gap and avoid changes that depend on guessing it.

## Implement the page list

Update the site's authoritative content and code through its established workflow. Reuse existing artwork and media. Keep protected wording and media identities intact unless the user authorizes a specific repair or replacement. Preserve link destinations and media associations as well as visible text.

Work through every page in the ledger. Adapt the accepted layout to both wide and narrow screens. Account for readable text, navigation, focus visibility, control access, image crops, long content, and page-specific interactions.

Shared component edits may affect other routes. Check the directly affected shared behavior and a representative existing route. Expand the check only when evidence identifies a broader risk; avoid turning the finite page assignment into a site-wide redesign.

Run relevant local checks and inspect the diff for protected-content drift and unrelated changes. Restore unintended copy, media, or relationship changes before delivery. If the repository requires incomplete behavior behind a release flag, use its established default-off boundary.

## Deliver to the authorized preview

Carry the verified changes through the authorized delivery path without requesting permission already supplied by the user or applicable standing authorization. Resolve the target, current release baseline, scoped effects, and rollback before writing. Include dependencies needed for the changed pages, and preserve unrelated remote state.

After delivery, reconcile deployed content and code with the intended revision. Open each exact affected preview URL and verify the deployed result. A successful build, upload, or deployment response does not establish that the page renders correctly.

Keep local edits, commits, pushes, deployment, release-flag state, and visitor exposure distinct in the evidence and handoff. Report only states confirmed by tools or inspection.

If production delivery is requested but lacks authorization for the exact target and scope, stop before that production action. Finish all independent implementation, checks, preview delivery already authorized, and release preparation first. Present the concrete prepared change and ask for the missing production authorization, naming the target and effects. Never infer production permission from preview permission or a desire to finish.

## Verify the deployed pages

For every page, use a real browser at desktop and phone-sized viewports. Use project-owned browser isolation and challenge-handling rules. Record the URL, viewport, observed result, and evidence path. Phone emulation is a viewport check; describe it as emulation unless a physical phone was tested.

Verify the requested design against the accepted reference and check:

- Text fits and remains readable; no unintended horizontal overflow, clipping, overlap, or concealed content appears.
- Header, navigation, menus, links, buttons, and page-specific controls work with the available input methods. Check keyboard access and focus for changed controls.
- Images keep the intended subject visible, and copy, media identities, captions, alt text, destinations, and relationships match the preservation baseline.
- Relevant playback, downloads, forms, or other page-specific flows reach their expected result without an unintended live transaction. Use the project's safe test path where available.

Capture current screenshots that show the page context and the changed result. Run required post-deploy health checks and inspect relevant network or console failures. If a check fails, determine whether it existed in the baseline or came from the change. Fix regressions within scope and rerun the affected checks. Use an authorized scoped rollback when required by the project's release policy.

If access, credentials, a browser challenge, or a tool failure blocks verification, retain the available evidence and report the exact unverified pages or interactions. Complete unaffected pages and checks. Never label a blocked or skipped check as passing.

## Close the task

Mark a page complete only after its intended change is deployed, protected content is accounted for, and desktop and phone checks pass. Account for every page before ending the task.

Return a concise handoff with:

- What changed and whether the whole supplied page list is complete.
- Exact browser review links for each affected deployed page, naming the primary preview and every other environment actually changed.
- Observed desktop and phone results, evidence links, and checks not run.
- Confirmed delivery and exposure states, plus any concrete blocker or outstanding authorization.

Use the repository's review-URL rules. If no deployment occurred, say so and give the prepared artifact and blocker instead of presenting a local result as a deployed preview.
