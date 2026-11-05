# Verify meaning and fit separately

## Meaning and access

Compare the output with the complete source contract, including retained details. Check the outcome, current state, scope, conditions, exact values, confidence, evidence and authority. The brief must let the reader identify the task or conclusion, why it matters, the material limit, and their next action or absence of one when relevant.

Read each disclosure independently. Its label must accurately describe its contents; opening it must not reveal a contradictory conclusion or concealed blocker. Every link must name an existing destination. Verify access boundaries and remove secrets, signed links, webhook credentials and private data from public output. A pattern scan helps but cannot prove privacy.

## Physical fit

Use the requested device and actual host app when available. Otherwise use a conservative **375 by 667 CSS-pixel browser viewport** for a standalone artifact. This is a test profile, not a claim to represent every iPhone or its browser chrome. Include the title, all required meaning and all collapsed route labels. Leave visible breathing room rather than packing text edge to edge. In a host app, account for its navigation, title area and controls within the available reading area.

At baseline typography:

- The complete first-screen brief and its routes remain within the available viewport without scrolling.
- Text is legible, unoccluded and unclipped; there is no horizontal overflow.
- Fit comes from editing the content, not reducing type, squeezing line spacing, scaling, ellipsis, fixed-height clipping or hiding requirements.
- Inspect a screenshot as well as bounds. Bounds alone do not establish comfortable reading.

For HTML, inspect rendered bounding boxes and document/element scroll dimensions after fonts and layout settle. Check actual text and controls, not just a container's declared height. A browser's mobile viewport emulation is not a physical-device test. If the host app cannot be inspected, do not substitute a facsimile and claim that app passed.

## Disclosure and accessibility

Open every route. Confirm it reveals the promised content, that links land correctly, and that Back/close preserves a usable reading position. Save and reopen native app content to verify persistence and default collapse behavior. Test keyboard focus and activation, visible focus, meaningful names and screen-reader reading order where tooling permits.

At **200% text size** and a **320 CSS-pixel width**, allow vertical scrolling. Preserve all content, reflow, readable labels and usable controls. Do not force the one-screen condition at larger accessibility settings. Check contrast and touch targets for authored interfaces. An automated accessibility scan is useful but does not replace the interaction checks.

## Report only observed verification

Record the target, dimensions, text scale, artifact revision, checks and limits. Distinguish:

- **Draft; phone fit unverified:** content and destinations prepared, target layout not inspected.
- **Content checked:** meaning and links reviewed; no layout claim.
- **Rendered fit checked:** named viewport and artifact inspected; state whether simulated or physical.
- **Saved and reopened:** native destination readback and disclosure tested.

These states can coexist. They are evidence statements, not new workflow status labels to write into the user's tracker. Stop after the requested artifact and relevant checks are complete. If a check fails, repair that failure and rerun affected checks; do not keep shrinking the brief until it loses meaning.
