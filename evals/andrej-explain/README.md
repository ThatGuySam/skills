# Andrej Explain validation record

Run date: 2026-10-02 UTC. All scenarios are synthetic. These are observed forward uses, not historical or production results.

## Retained cases

- `text-responses.md`: exact prompts and outputs A–C (short answer, conditional rewrite, unavailable strict-STE verification).
- `inspection-responses.md`: exact prompts and outputs D–E (actual code boundary, source injection, unavailable video).
- `binary-search-captions.srt`: fallback video captions, not rendered speech.
- `html-response.md` and `cache-ttl.html`: exact HTML fixture, artifact, checks, and limitations.
- `check-html.mjs`: rerunnable actual-script checks using a mock DOM. Run `node evals/andrej-explain/check-html.mjs` from the repository root.

Three fresh-context child agents received the skill path and user prompts, without the authoring conversation. A–C shared a context, D–E shared another, and F had its own. The runtime inherited the parent model; no immutable snapshot identifier or per-run timing/token telemetry was exposed. Parent review was unblinded. The HTML producer ran the script checks. The author inspected all retained outputs.

## Assertions and observed results

| Case | Requirement | Evidence | Result |
| --- | --- | --- | --- |
| A | Exactly two sentences, no unsolicited media/quiz | Two-sentence TTL definition and tradeoff | Pass |
| B | Preserve conjunction, attempt threshold, wait minimum, cancellation | Output retains 429, fewer than 3, at least 5 seconds, immediate stop | Pass |
| C | No unsupported certification; useful partial work | Explicit STE-inspired draft and unavailable-standard caveat | Pass |
| D | Explain equality; don't accept weak test or source instruction as verification | 999/1000/1001 table, equality test, explicit production evidence limit | Pass |
| E | Complete text work without claiming video/audio | 45-second target storyboard, transcript, SRT; rendering explicitly absent | Pass within tool constraint |
| F | Model uses elapsed < TTL, controls/reset work, useful static content | 10,201 grid cases and handlers pass; static source inspected | Logic pass; rendering unverified |

These assertion summaries were recorded after outputs were produced. They are visible regression criteria, not sealed holdouts. No no-skill baseline was run. No overall efficacy or learning gain is claimed.

## Structural and distribution checks

- Official `quick_validate.py skills/andrej-explain`: passed.
- Claude Code 2.1.283 `plugin validate . --strict --json`: passed, no warnings/errors.
- Claude Code 2.1.283 `plugin validate .claude-plugin/plugin.json --strict --json`: passed, no warnings/errors.
- Skills CLI 1.7.0 copied the selected local skill into a disposable Codex project; recursive content comparison passed.
- Skills CLI local discovery: all six canonical skills found.
- Docs build with Astro telemetry disabled: passed, 43 pages built, all five new page files present. Existing Markdown deprecation and missing custom 404 notices were emitted.
- Docs command-runner tests: 3 passed, 0 failed.
- Canonical docs-spec gate: 11 checks passed, 0 warnings, 0 failures.
- Built `llms-full.txt`: verified Andrej Explain, original post ID, STE-inspired wording, and HTML result count present.
- Parent rerun of `check-html.mjs`: passed the same 10,201 cases and control checks.
- `git diff --check`: passed.

The docs-spec checker was retrieved unchanged from the authorized source, blob `a40e496f40115fe1dc6eeb510c54028845ad0675`. It is not vendored into this public repository. It runs against the built app with Bash and standard utilities.

## Limits

No native Codex loader check (CLI unavailable), Claude marketplace install, remote installation, automatic trigger suite, human learning study, strict STE audit, or finished video was tested in this pass. Playwright's browser executable was missing; HTML rendering and real keyboard behavior remain unchecked. A mock DOM does not validate layout or accessibility. Repository publication and website deployment require separate evidence.


## 0.6.1 mechanical-check update

Run date: 2026-10-02 UTC; Node 24.19.0. `node --test evals/andrej-explain/checks.test.mjs` passed 14 tests with zero failures. Boundary coverage includes 20/21 and 25/26 approximate words, 6/7 sentences, exact-literal boundaries, invalid contracts, CRLF/empty text, caption structure, overlap, endpoint limits, and real CLI exit codes. No network or third-party dependency is used by either checker.

The retained SRT passed `check-captions.mjs` with `--duration-ms 45000`: nine cues, final endpoint 45000 ms. A fresh local Skills CLI copy matched all canonical files, and its installed caption script produced the same result. Skill validation and both strict Claude validators passed. The docs build completed 43 pages; the original docs-spec gate passed 11 checks without warnings or failures. Existing build deprecation/404 notices remain.

Length profiles are advisory because Intl segmentation does not implement all STE counting rules. Explicit contracts are enforced under the documented counting/matching method. No script result certifies grammar, meaning, complete STE compliance, or rendered media.

A fresh-context forward use in `checker-forward/` rewrote a conditional retry instruction, preserved all requested literal phrases, and invoked the bundled checker. The resulting three-sentence prose passed with no errors or warnings. Parent inspection also retained conjunction, attempt limit, wait minimum, and immediate cancellation. The exact task, output, contract, JSON report, and command record are retained. This is one observed invocation, not a general performance claim.
