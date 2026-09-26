# Migration evaluation assessment

Six baseline conversions passed artifact inspection and eight actual response
probes. Two reruns of the revised verification procedure passed another eleven
probes. This is a smoke evaluation with retained evidence, not a reliability
estimate or proof of live integration parity.

## Baseline

Source skill: `fd76d69db2f82ac4443327a69fc187ab5e28c369`, the PR #1 head before
this work. `run.json` pins every fixture, generated skill/resource, and response.
The source configurations and `expected.json` were written before execution.
Each migration and each generated skill used a separate fresh-context Work Mode
agent. Expectations were withheld. Multiple requests for one skill shared an
agent context, with instructions to treat requests independently.

The independent `grade_baseline` reviewer read all source requirements,
generated files, reports, and responses. It compared the policy bytes and
Action JSON, parsed strict outputs, and inspected semantic behavior. The root
agent checked the same artifacts and ran the deterministic replay checker.
Neither review counted authored expected answers as observed behavior.

| Case | Conversion inspection | Executed behavior | Delivery state |
| --- | --- | --- | --- |
| [Instruction-only](instruction-only/generated-skill.txt) | All limits, headings, ownership, no-browse, and missing-input rules retained. | [Normal brief](instruction-only/responses/normal.txt) has the three headings, correct ownership, and two questions; [missing input](instruction-only/responses/missing-input.txt) requests notes. | Local repository files prepared; native discovery not tested. |
| [Missing knowledge](missing-knowledge/generated-skill.txt) | Supplied policy copied byte-for-byte with provenance; no placeholder fee file. | [Response](missing-knowledge/responses/missing-file.txt) permits the 72-hour change, cites policy-v3.md/Changes, and reports the missing fee as unknown. | Partial because fees-2026.csv is absent. |
| [Actions](actions/generated-skill.txt) | Both operations, endpoint, request/response shapes, API-key header, confirmation sequence, and 401/409/timeout rules retained. No invented OAuth scopes or tools. | [Response](actions/responses/unavailable-action.txt) contains the exact payload as an UNSENT RESERVATION DRAFT and explicitly says nothing was reserved. | Partial; no service, adapter, or authentication. |
| [Conflicting instructions](conflicting-instructions/generated-skill.txt) | Both formats preserved; severity enum, missing-severity behavior, and lookup/send restrictions retained. | [Response](conflicting-instructions/responses/conflict.txt) asks which format governs instead of picking or combining formats. | Blocked on the owner's format choice; unblocked files delivered. |
| [Strict output](strict-output/generated-skill.txt) | Exact keys, input types, invalid/null path, and no prose/coercion/clarification rules retained. | [Valid](strict-output/responses/valid.txt) is raw JSON with integer 375; [invalid](strict-output/responses/invalid.txt) is raw JSON with null. | Portable preparation complete; ChatGPT personal installation pending. |
| [Capability mismatch](capability-mismatch/generated-skill.txt) | PNG attachment, 1024x1024, transparency, exact phrase, and fallback constraints retained. | [Response](capability-mismatch/responses/no-image-tool.txt) says no PNG was created and labels its text prompt as fallback. | Partial; image capability and disconnected-Mac installation unavailable. |

All requirements in `expected.json` pass within the inspected/executed scope.
The missing dependencies and unresolved conflict are correct outcomes, not
failed conversions or fully usable replacements. No semantic conversion defect
was found, so no speculative changes were made to the mapping or destination
rules.

## Revision and rerun

The older verification guidance did not clearly require both conversion
inspection and execution of the generated skill. Its normal-request row also
combined task behavior with automatic selection. The revision separates these
checks, requires pre-recorded expectations and saved observed outputs, and
keeps evaluator requirements away from runners. The earlier September 17 trial
had inspected a conversion without running its resulting workflow.

`revised.json` pins the revised skill files and retained rerun evidence. Two new
migration agents followed the updated procedure and launched their own separate
execution agents:

- [Meeting brief](revised/instruction-only/report.md): three actual responses,
  including missing notes and a harder ownership case. The two briefs have 26
  and 41 words excluding Markdown markers and at most two questions. Attendance
  does not become ownership. The report accurately limits `ready` to the
  requested local repository delivery.
- [Line total](revised/strict-output/report.md): eight actual raw JSON responses.
  Valid, numeric-string invalid, missing, decimal, negative, zero, boolean, and
  large-integer cases pass. The last returns the exact product
  `9007199254740993 * 3 = 27021597764222979`. Preparation remains partial because
  personal installation and native execution are unavailable.

The independent reviewer confirmed both reruns against their source fixtures,
pre-recorded expectations, observed outputs, and separate completed execution
agents. The baseline reports still say behavior was unrun because they were
written before the later response stage; those historical reports are preserved.

## Checker regression found and fixed

Review reproduced a false pass in the new replay check: it counted only `-`
bullets, so three `*` open questions counted as zero. The corrected shared brief
check handles unordered and numbered Markdown markers and question marks.
Regression tests accept two and reject three questions with `-`, `*`, `+`,
`1.`, `1)`, and unbulleted question text. All retained responses already obeyed
the limit; none was edited to make the check pass.

The checker also rejects JSON wrappers, duplicate/extra keys, wrong types,
wrong totals, and prose. It still does not grade semantic correctness, general
natural-language question counts, or instruction selection. Its three tests and
all retained-output checks pass.

## What this does not establish

No original GPT was executed. Exact model/effort identifiers were not exposed
by the collaboration spawn results, so none are invented here. One sample per
case and grouped probes cannot establish reliability across models or sessions.

Explicit invocation does not test automatic triggering or nearby unrelated
requests. Work Mode execution does not prove native Codex, Claude Code, or
ChatGPT behavior. No live Action, authentication, hosted migration, PNG creation,
Mac installation, or real external mutation ran. Error rules were preserved and
reviewed; live 401/409/timeout behavior was not tested. The synthetic OpenAPI
extract is not a service or a complete schema-conformance fixture.

Distribution and documentation evidence is recorded in [validation.md](validation.md).
