# TodoMVC Repository UX Audit

## SBC4

- `Tease:` Editing and identifying task controls need attention before visual polish.
- `Lede:` A source-only review found three implementation risks in the JavaScript ES6 example: pointer-only edit activation, incomplete control names, and session-only task storage.
- `Why it matters:` These affect task editing, assistive-technology use, and expectations about retaining work. TodoMVC is an educational comparison project, so recommendations should preserve its example scope.
- `Go deeper:` Findings below cite the inspected commit and separate source conclusions from browser checks still needed.

## Scope and Evidence

Date: 2026-09-14. Target: [tastejs/todomvc](https://github.com/tastejs/todomvc), commit `ff43b02e59dfa604386bb382034b2cd07c2bcd8a`. Scope: `examples/javascript-es6`, create, complete, edit, and delete a todo. Intended user: a person trying the browser example, including keyboard and assistive-technology users. Evidence mode: artifact-limited repository review. Inspected root and example READMEs, package scripts, source templates, event bindings, controller, store, app entrypoint, and CSS. No AGENTS.md was found in the checked-out scope. No target dependencies were installed or executed; no live page, browser viewport, accessibility tree, screenshot, or runtime timings were captured.

The example documents `npm run dev` (webpack server) and `npm run build`; package scripts also provide a static `serve` command. These were identified, not run. The root README describes framework comparison and distinguishes maintained examples from historical examples; this review does not characterize every TodoMVC implementation.

Dependency versions and wrapper fingerprints: [skill-versions.json](skill-versions.json). Installed content passed preflight before the review; the ending receipt comparison is recorded in [evaluation-results.json](evaluation-results.json).

## Findings

### 1. Editing Has No Keyboard Entry Path in the Inspected Source

**High severity; high source confidence; source-inferred.** A keyboard user trying to rename an existing todo encounters an edit action registered only for `dblclick` on `li label`. The label is not a focusable button. Enter and Escape handlers apply after the edit field already exists, so they do not provide entry into editing.

Evidence: [`src/view.js`, lines 152–154 and 161–183](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/view.js#L152); [`src/template.js`, lines 18–25](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/template.js#L18). The page itself teaches double-click editing in [`src/index.html`, line 39](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/index.html#L39). A scoped source search found no alternate edit-entry binding.

Impact: the core edit task appears unavailable to keyboard-only users. [WCAG 2.2 SC 2.1.1, Level A](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) calls for keyboard operation of functionality. This is a source-based risk against that requirement, not a completed conformance determination.

Recommendation: provide a named, keyboard-operable edit action while retaining double-click as an optional shortcut. Acceptance check: create a task, enter edit mode using only the keyboard, save with Enter, cancel with Escape, and verify sensible focus afterward in a browser.

### 2. Task Controls Lack Explicit, Task-Specific Names

**High severity; high source confidence; source-inferred.** The row checkbox has no associated label or ARIA name; the adjacent label neither wraps it nor references an ID. The delete button has no text or ARIA name in the template. The bulk-toggle label references `toggle-all`, while its input has only a class, not a matching ID.

Evidence: [`src/template.js`, lines 21–23](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/template.js#L21); [`src/index.html`, lines 17–18](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/index.html#L17). The generated CSS supplies a visual delete symbol, which does not communicate a task-specific action name by itself.

Impact: people using an accessibility tree may struggle to identify which task will be completed or deleted. [WCAG 2.2 SC 4.1.2, Level A](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) requires programmatically determinable component names and roles. Actual computed names, including generated-content handling, remain untested.

Recommendation: associate each task title with its checkbox, give delete buttons explicit names incorporating the task title, and connect the bulk label to its input. Acceptance check: inspect the accessibility tree and use a screen reader to distinguish and activate controls for two differently named todos.

### 3. Retention Expectations Are Unclear for Session-Only Storage

**Medium severity; high source confidence, uncertain user expectation; source-inferred.** Storage is a module-level object initialized empty and rewritten as JSON in memory. The app creates a new Store on load. The example README documents in-memory storage, but the inspected page offers no equivalent warning to someone entering tasks.

Evidence: [`src/store.js`, lines 1–29 and 83–110](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/store.js#L1); [`src/app.js`, lines 16–26](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/app.js#L16); [`src/index.html`, lines 10–42](https://github.com/tastejs/todomvc/blob/ff43b02e59dfa604386bb382034b2cd07c2bcd8a/examples/javascript-es6/src/index.html#L10).

Impact: a person treating this demo as a real list may lose entered tasks on a full reload. This is a retention expectation concern, not an assertion that a teaching example must become a production task manager.

Recommendation: make temporary storage clear in the example UI; choose persistent storage only if retention is part of the example's intended behavior. Acceptance check: enter a task and fully reload the page, then verify that actual behavior matches the stated retention promise.

## Lens Dispositions and Limits

| Lens | Disposition | Evidence and Limit |
| --- | --- | --- |
| Base audit | Reviewed | Source paths traced for add, toggle, edit/save/cancel, delete, empty visibility, and retention. Successful runtime task completion is unverified. |
| Accessibility | Reviewed, source only | Template semantics and edit bindings examined; findings 1 and 2. Focus, keyboard traversal, contrast, zoom, and assistive-technology behavior remain unverified. |
| HIG | Reviewed, transferable principles only | Data entry and control/recovery prompts applied. Relevant installed references: accessibility, entering-data, buttons, undo-and-redo. Findings are grounded in source evidence and reviewer judgment; no native Apple compliance claim or Apple numeric requirement is made. |
| Motion | Blocked for runtime review | Compiled CSS contains transitions; no playback or reduced-motion interaction was available. No timing, easing, or animation defect is asserted. |
| Performance | Not applicable to this bounded pass | No delay was observed because no runtime was used; no performance investigation was requested. |
| Core Web Vitals | Not applicable | No metric-specific measurement or reference needed; no scores or regressions asserted. |

## Strengths and Next Actions

Preserve the small task surface and contextual `Clear completed` visibility. Source evidence shows whitespace-only new items are rejected (`controller.js:56–63`), completion updates the checkbox state (`view.js:12–22`), and editing supports Enter save and Escape cancellation after entry (`view.js:161–183`). These are implementation strengths, not claims that browser interaction passed.

First verify keyboard editing and control names in a browser, then address those paths. Next test and clarify retention. Keep motion and performance conclusions pending real observations. The main unverified user hypothesis is whether visitors treat this historical example as a disposable demo or a usable task list. No aggregate UX score, participant result, or business-impact estimate was generated.

The HIG dependency's broad severity and aesthetic defaults were not adopted: the wrapper's task-impact rubric governs this report. No disagreement between evidence sources requires resolution beyond the remaining browser checks.
