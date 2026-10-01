# Meeting brief migration

Status: `ready` for the requested local repository-file delivery.

The portable skill is at `skills/meeting-brief/SKILL.md` within this directory. The required behavior passed structural review and actual execution in an independent agent. No remote publication, personal installation, or original-GPT change was requested or performed.

Invoke it with: `Use meeting-brief to brief these notes: We chose the blue prototype. TEST_PERSON_A will send the mockup Friday. Nobody was assigned to test it. We still need a launch date and budget.`

## Recovered behavior

The task is to turn supplied meeting notes into a concise brief for the note recipient. The source does not specify a model, audience beyond that use, or runtime settings.

| Requirement | Destination and result |
| --- | --- |
| Exactly Decisions, Owners, Open questions, in that order; no other sections | Preserved in SKILL.md and passed both generated briefs |
| At most 100 words, including headings | Preserved; observed briefs had 26 and 41 words |
| Assign an owner only when explicitly named for the work | Preserved; named assignments retained, unassigned work remained Unassigned |
| At most two open questions | Preserved; both briefs listed two |
| Do not browse | Preserved; the workflow requires only supplied notes |
| With no notes, request them instead of making a brief | Preserved; the generated response requested meeting notes |

The conversion adds the skill frontmatter, an invocation trigger, and a brief final self-check. It does not change the output contract or introduce a new dependency. The generated skill is one workflow and has no bundled scripts, reference files, or assets.

## Component and capability map

| Source component | Status | Destination or reason |
| --- | --- | --- |
| Instructions | Preserved | `skills/meeting-brief/SKILL.md` |
| Knowledge files | None supplied | Empty source list; the instructions require no external knowledge |
| Actions | None supplied | Empty source list; no adapter or authentication needed |
| Probe requests | Adapted | `evidence/inputs.json` and behavioral execution |
| Model and runtime configuration | Unknown | Not supplied; no model-equivalence claim |
| File access | Compatible | Target can read supplied files and write files |
| Browsing | Intentionally excluded | Source expressly forbids it |

The original synthetic fixture remains recoverable at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/instruction-only.json`. Its SHA-256 is `84b599cfa80d04c05edb3eb85944a81c05d3e13c475537919095b86b82097f37`. The generated SKILL.md SHA-256 is `c6bfbc2643317771a05c7d0a871e22c689b931466aaab4c22cbbe825df543d6f`.

## Actual validation

Structural checks ran against the actual destination file. Frontmatter delimiters and the required name and description fields passed. The name matches its directory and uses lowercase hyphen syntax. There are no resource links to resolve and no script execution gate. A credential-pattern scan found no keys, bearer tokens, or private-key markers. Manual review found only generic workflow instructions in the deliverable. No source examples or synthetic people were embedded in SKILL.md.

The evaluator wrote `evidence/requirements.json` before execution. A separate fresh-context agent read only the generated skill and raw inputs, then explicitly invoked the skill for each case. The agent did not receive expected answers or evaluator requirements. Cases ran independently within one runner session. The actual output is retained in `evidence/observed.json`.

| Case | Actual result | Check outcome |
| --- | --- | --- |
| Normal supplied notes | Blue prototype decision; TEST_PERSON_A owns Friday mockup; testing Unassigned; date and budget questions | Pass, 26 words, exact heading order, two questions |
| Missing input | `Please provide the meeting notes.` | Pass, no invented brief |
| Difficult ownership and formatting case | Green prototype; internal June trial; TEST_PERSON_C owns Wednesday draft; accessibility Unassigned; two of four open issues selected | Pass, 41 words, exact heading order, no owner inferred from attendance |

Word counts include heading words and exclude Markdown marker tokens. Programmatic checks parsed heading order, section count, question count, word limits, explicit assignments, and the missing-input response. Manual semantic review found no unsupported facts. Details are retained in `evidence/structural-checks.json` and `evidence/behavioral-checks.json`.

## Delivery and limits

Local repository-file preparation is complete at the requested path. The delivery contains only the portable skill and local migration evidence. No live service or Action was involved.

The original GPT was not executed, so direct before/after parity is unverified. The execution evidence demonstrates an agent following the portable skill through explicit invocation. Repository collection storage has no skill-selection runtime of its own; automatic discovery and local-agent installation were neither requested nor tested. There are no required missing dependencies for the specified target capabilities. If the collection is later installed into an agent, verify that runtime's discovery separately.
