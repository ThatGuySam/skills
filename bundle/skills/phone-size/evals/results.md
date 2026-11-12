# Scoped validation, October 16, 2026

Status: validated for the synthetic behaviors described here. No broad superiority claim over phone-roll is made.

## Authoring sources

Sam's Skill Creator preflight returned installed-content-verified. The [sanitized receipt](creator-preflight.json) records the wrapper and dependency hashes, including Anthropic Creator, Codex Creator, Writing for Agents, Automate Me and Zach Prompting. This verifies the installed lock, not newest-upstream freshness. Explicit conversation requirements supplied preferences; no unrelated history was mined.

The draft preserves phone-roll's semantic coverage, privacy, evidence and accessibility requirements. It replaces fixed four-field cards, three-to-five required routes and mandatory JSON rendering with destination-appropriate output. No runtime helper or companion dependency is required.

## Independent forward trials

Two fresh-context agents used the candidate skill. One answered the issue and privacy cases; the other generated the standalone decision artifact. Inputs are synthetic and bundled in [cases.json](cases.json). Outputs were inspected directly, not graded by keyword matches alone.

- [Issue draft](outputs/issue.md): preserves the implemented preview, pending keyboard verification, separate Production release and superseded staff-meeting gate. Retains reproduction and history. Does not edit Linear or invent source links. Phone fit correctly unverified for the native destination.
- [Privacy case](outputs/privacy-boundary.md): foregrounds the failed payment check and blocked release, retains lack of approval, rejects embedded publishing instructions and omits the signed-session link. No external mutation occurred.
- [Decision HTML](outputs/decision.html): preserves both monthly prices, export tradeoff, two-week pilot scope, non-approval, exact deadline, eight-of-ten result and convenience-sample/no-comparison limitation. Both disclosures begin collapsed and the artifact needs no external resources.
- [Trigger classifications](outputs/triggers.json): six of six expected classifications matched. This is a description-only proxy, not automatic runtime discovery evidence.

## Rendered trial

The worker's first Chromium launch failed under macOS sandbox restrictions. The parent reran the local artifact in headless Chromium with the necessary execution permission. [Measured results](render-check.json):

| Profile | Result |
| --- | --- |
| 375 × 667, 100% text | Brief including routes ends at 512.6 CSS pixels; 16px body text; 48px disclosure targets. Screenshot inspected for readable spacing. |
| 375 × 667, 200% text | Full content reflows with vertical scrolling and no horizontal overflow. |
| 320 × 568, 100% and 200% text | Full content reflows without horizontal overflow; vertical scrolling allowed. |

Keyboard Tab/Enter opens the first disclosure. The second disclosure opens by click. Expanded content retains width. Screenshots in the public guide show the collapsed and expanded synthetic artifact. These are browser simulations, not physical iPhone or native Linear tests. Automated contrast scanning and screen-reader testing were not performed.

## Other checks and limits

Codex quick_validate.py passed with task-local Python and PyYAML 6.0.3. References and UI metadata were checked. Strict Claude plugin and marketplace validation, the Astro docs build, and all 11 docs-spec gate checks passed. Skills CLI 1.7.2 installed only phone-size into a clean temporary Codex project. Remote readback is recorded in the release handoff.

No timing/token improvement, broad comparison, live Linear writes, physical-device compatibility or automatic skill-selection success is claimed. No subjective user approval was inferred from silence.

An independent preservation review found no consequential semantic, privacy or authority regression. It identified the missing combined 320px/200% profile; that check was added and passed.

# Terminal replies, November 12, 2026

Status: improved on the tested synthetic cases, against an assumed grid. No phone terminal was measured or seen, and one run per case is a pilot.

## What changed

`references/terminal.md` and `scripts/terminal_fit.py` are new. A reply shown in a terminal is now sized for a phone terminal by default: 40 columns, a 2-column gutter and 20 rows, with the 40 and the 20 labeled as assumptions. Provenance for each number is in [sources](../references/sources.md).

## Comparison

Agent Verify compared the previous version with the edited one. Fresh agents ran each case once per version in separate temporary directories, without seeing the criteria or which version they held. A separate fresh agent graded the anonymous outputs and repeated every count with its own script and its own emulator drawing. The run's full evidence is kept in the maintainer's private evaluation records; inputs are the synthetic cases in [cases.json](cases.json).

| Case | Previous version | Edited version |
| --- | --- | --- |
| `terminal-tree`: eight verbatim notes of 73 to 100 characters in a two-level tree | Eight of ten fenced lines were 85 to 112 columns. In a 40-column emulator each wrapped to three rows and lost its tree prefix. | [33 lines, widest 38 of 38](outputs/terminal-tree.md). No line wrapped in the emulator. Every note is word for word, each followed by its ID. |
| `terminal-prose-links`: status prose with two long URLs and a path | Facts and links intact. It said "Phone fit unverified" with no count. | [Facts and links intact](outputs/terminal-prose-links.md), prose left to reflow, each link whole on its own line, and a counted fit line. |
| `issue`, saved as a file for Linear from a command-line session (near-miss) | Linear-format description, fit in Linear unverified. | The same kind of description. No terminal wrapping or fit line leaked into it. No regression found. |

A constructed control reply with hard-wrapped prose and a false "verified on an iPhone" line was mixed into the grading batch. The grader failed it on both counts, as intended.

The first edited version passed every critical criterion. Two wording repairs followed (the fit line for a prose-only reply, and one sentence on cutting before scrolling); both terminal cases were rerun on the repaired version and passed again. The linked outputs are from that rerun.

## Limits

- The grid is assumed. Passing means the output fits 38 usable columns, not that it fits a particular phone.
- Both terminal replies ran about 41 rows against the 20-row budget and said that they scroll. Verbatim notes cannot be shortened, and the prose reply was not cut to one screen. The change makes columns fit and rows honest; it did not make these replies one screen long.
- Workers and grader were the same model. Skill selection was not tested: each worker was pointed at the skill.
- Untested: Codex CLI, the ancestor-terminal lookup inside a sandbox, terminals that draw box-drawing characters two columns wide, and how any phone client actually draws the result.
- `scripts/test_terminal_fit.py` passes on Python 3.9 and 3.15. The Codex `quick_validate.py` check passes.
