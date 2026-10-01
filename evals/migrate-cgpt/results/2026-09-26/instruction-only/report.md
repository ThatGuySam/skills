# Meeting brief migration

Status: `awaiting-evals`.

The repository files are prepared locally at `skills/meeting-brief/SKILL.md`, relative to this report. File delivery and structural checks passed. Behavioral execution, automatic skill selection, and direct comparison with the original GPT remain unverified. No publication or personal-skill installation was requested or performed.

Invocation: "Brief these meeting notes: [paste notes]."

## Source and destination

The source is the synthetic `instruction-only.json` fixture supplied for this run. Its original instructions remain recoverable at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/instruction-only.json`; the source was not modified. The target is a repository collection at `skills/meeting-brief`, with permission to read supplied files and write files. Source model, source runtime settings, and target executing model were not supplied.

The full migration skill and its destination, component-mapping, and verification references were read. Zach Prompting and Unslop guided the wording. No governing `AGENTS.md` was found along the output path, and the target folder did not contain an existing skill.

## Preserved contract

The skill turns supplied meeting notes into a brief for the requester. It requires the headings `Decisions`, `Owners`, and `Open questions` in exactly that order, with no other sections. The whole brief, including headings, must contain at most 100 words. Owners require explicit names in the notes; otherwise the output must say `Unassigned`. At most two open questions may appear. Browsing is prohibited. Missing notes require a request for notes, with no fabricated brief.

Completion means a brief that satisfies those constraints or, when input is missing, a request for the missing notes. The source contains no special approval boundary, external side effect, or writing style beyond the format and length constraints.

| Component | Destination | Status |
| --- | --- | --- |
| Instructions and output limits | `skills/meeting-brief/SKILL.md` | Preserved |
| Knowledge files | None supplied or required | Intentionally absent |
| Actions | None supplied or required | Intentionally absent |
| Browsing | Explicit prohibition in skill | Preserved |
| Normal and missing-input probes | Test matrix below | Preserved as pending checks |
| Invocation guidance | Frontmatter description and example | Adapted for skill selection |
| Source model and runtime settings | This report | Unknown |

The conversion adds a brief pre-return check of the existing constraints. It makes no optional workflow or capability changes. It introduces no scripts, references, credentials, or runtime dependencies.

## Actual checks

Checks ran against the delivered skill file at the stated destination, using Python assertions and manual inspection.

| Check | Actual result |
| --- | --- |
| File exists and is readable at target path | Pass |
| Frontmatter fences, name, nonempty description | Pass |
| Required heading names and order | Pass in instruction text |
| Required word limit, owner rule, missing-input behavior, browsing prohibition, and question cap | Pass in instruction text |
| Resource links | None required or present |
| Credential-pattern scan | No matches |
| Manual private-data inspection | Only portable workflow instructions and a generic invocation example |
| New scripts | None to execute |
| Behavioral execution | Not run |
| Automatic skill selection | Not run |
| Original GPT comparison | Not available; parity unverified |

The structural check is a small purpose-built assertion check, not an installed runtime's skill validator. Instruction-text assertions do not establish that an agent follows those instructions.

SHA-256 of `skills/meeting-brief/SKILL.md`: `fec893cf7db4dabb7a13db0e18e5f80fa93951d1debac05ce9c42402a7187c94`.

## Pending behavioral checks

| Case | Input | Observable pass condition | Actual result |
| --- | --- | --- | --- |
| Normal | "Brief these notes: We chose the blue prototype. TEST_PERSON_A will send the mockup Friday. Nobody was assigned to test it. We still need a launch date and budget." | Three required headings in order, no extra sections, at most 100 words, blue prototype decision, TEST_PERSON_A owns sending the mockup, testing is Unassigned, at most two questions | Not run |
| Missing input | "Make my meeting brief." | Requests meeting notes instead of producing a brief | Not run |
| Difficult ownership and question cap | "Brief these notes: We approved the green prototype. TEST_PERSON_B attended but accepted no tasks. Someone should review the budget. We need a launch date, a budget, a test plan, and a venue." | Does not assign work to TEST_PERSON_B because attendance is not assignment, uses Unassigned where needed, at most two open questions, at most 100 words with exactly the required headings | Not run |
| Nearby unrelated request | "Write a four-line poem about autumn." | Meeting-brief skill does not take over the unrelated task | Not run |

There are no required knowledge or integration dependencies to test. The next concrete step is to execute these probes with the prepared skill in a fresh context and record outputs and pass or fail results. Local repository preparation is complete; runtime behavior remains the outstanding check before a `ready` claim.
