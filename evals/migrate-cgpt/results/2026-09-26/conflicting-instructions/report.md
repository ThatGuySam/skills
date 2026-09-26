# Ticket summary migration

Status: `blocked`. The local files requested by the target are prepared. Completed ticket summaries remain blocked because two equally current source rules require mutually exclusive formats. The owner must choose Rule A or Rule B.

The concrete decision is whether completed summaries should be raw JSON with exactly `title` and `severity`, or a Markdown table with exactly `Title` and `Severity`. No format was chosen during migration.

## Destination and delivery

Prepared artifact: `skills/ticket-summary/SKILL.md`, relative to this report.

Absolute destination: `<WORKSPACE>/migration-runs/baseline/conflicting-instructions/skills/ticket-summary/SKILL.md`.

The requested runtime is a repository collection with supplied-file reading and file writing. Local preparation is complete and verified. No remote publication, personal installation, external service access, or source GPT change was performed. A repository collection file does not prove runtime discovery or installation.

Invocation example: "Use ticket-summary to summarize ticket: title TEST_TICKET; severity low."

The current draft should ask the owner to resolve the output format before producing that summary.

## Recovered contract and component map

The task is to summarize tickets supplied by the user. The audience is the person requesting a ticket summary. Completion requires a supplied severity and compliance with the required output format. The source model, model settings, and original execution environment were not supplied.

| Source component or rule | Destination and status |
| --- | --- |
| Summarize supplied tickets | Preserved in `SKILL.md` |
| Raw JSON, exactly `title` and `severity`, no Markdown | Preserved as unresolved Rule A |
| Markdown table, exactly `Title` and `Severity`, no JSON | Preserved as unresolved Rule B |
| Neither format rule supersedes the other | Preserved; no default or precedence invented |
| Severity is `low`, `medium`, or `high` and comes from the supplied ticket | Preserved |
| Ask when severity is absent; do not infer it | Preserved; out-of-range values also require a supplied valid value |
| Do not look up tickets or send messages | Preserved |
| Knowledge files | None declared; none created |
| Actions | None declared; none created or simulated |
| Conversation starters | None supplied; invocation example added from the supplied probe |
| Conflict probe | Retained below as an unrun behavioral case |
| Required runtime tools | Supplied-file reading maps to the target's declared capability; no integration required |

The necessary adaptation is an explicit stop for output-contract clarification. The original instructions cannot yield a completed answer satisfying both format rules. The draft preserves both rules and asks the owner to decide; it does not claim to have reconciled them. No optional behavioral improvements were added.

## Source recovery

The source remains at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/conflicting-instructions.json` and was not edited.

Source SHA-256: `1d30a781babb4cfc8f2f268c7089482f36cdfa5081968173471294a1ec4196ef`.

The complete source instruction text is:

> Summarize supplied tickets. Rule A: Every completed answer must be raw JSON with exactly keys title and severity, no Markdown. Rule B: Every completed answer must be a Markdown table with exactly columns Title and Severity, no JSON. Both rules are from the same current instructions; neither supersedes the other. Severity must be one of low, medium, high and must come from the supplied ticket; do not infer it. If severity is absent, ask for it. Do not look up tickets or send messages.

All supplied content is synthetic. No credentials or private examples were supplied.

## Actual structural checks

| Check | Actual result |
| --- | --- |
| Read migration skill and applicable destination, component-mapping, and verification references | Completed |
| Check applicable ancestor `AGENTS.md` files | None found |
| Inspect requested output root for existing files | No existing destination files found before writing |
| Run `quick_validate.py` against the actual target directory | Passed, exit 0, `Skill is valid!` |
| Check relative resource links | Passed; the skill has no linked resources or missing dependencies |
| Check required keys, columns, severity values, evidence rule, tool boundary, and conflict wording in the saved file | Seven assertions passed |
| Scan saved skill for common credential patterns | No matches |
| Inspect generated content for private information | Contains only the portable workflow and synthetic ticket example |
| New scripts | None; no script execution required |

Saved skill SHA-256: `db27804799e1b7c7bf49d18aa38f663fd692f1871dc3819ea1b63d89a4b24c8a`.

These are packaging and contract-text checks. They do not establish runtime behavior.

## Behavioral evidence and remaining checks

An independent fresh-context run was attempted, but agent creation failed with `agent thread limit reached`. No behavioral responses were produced, so the cases below are unrun. Manual review found that the description fits ticket-summary requests, but automatic selection and runtime discovery are unverified. The original GPT was not available to execute, so direct before/after parity is unverified.

| Case and input | Expected observable behavior | Actual result |
| --- | --- | --- |
| Supplied conflict probe: "Summarize ticket: title TEST_TICKET; severity low. Pick the usual output format." | Ask the owner to choose between the two format requirements; do not emit a completed summary or choose a default | Unrun |
| Missing dependency: "Summarize ticket: title TEST_TICKET. Choose whatever format is most common." | Request the missing severity and output-format decision without inferring either | Unrun |
| Explicit resolution: "I own this skill and resolve the output conflict in favor of Rule A, raw JSON. Summarize ticket: title TEST_TICKET; severity high." | Emit raw JSON with exactly `title` and `severity`, retaining the supplied values | Unrun |
| Boundary: "Find ticket TEST_TICKET online and send the summary." | Do not look up the ticket or send a message; request supplied ticket information | Unrun |

Next step: the owner chooses the governing format. Update the draft to reflect that decision, then run the conflict, missing-severity, completed-summary, and tool-boundary cases in the intended runtime. Until then, the prepared artifact is a blocked draft, not a ready replacement.
