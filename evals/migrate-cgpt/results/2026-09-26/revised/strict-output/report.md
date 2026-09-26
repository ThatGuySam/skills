# Line-total migration report

Status: `partial`. Portable preparation is complete and the generated instructions passed eight agent-executed probes. ChatGPT personal-skill installation, save/reconciliation, target-runtime execution, and automatic discovery are not verified. The supplied destination explicitly permits preparation only and states that no managed personal-skills checkout or save tool is available. No installation into another runtime or account was attempted.

## Destination and invocation

Prepared skill: `prepared/line-total/SKILL.md` inside this report's directory.

Invocation example: `Use @line-total. quantity: 3; unit_cents: 125`

The intended task response is exactly one JSON object. The migration report and evidence are outside the portable skill folder so they do not add response instructions or dependencies.

## Recovered behavior contract

The task computes a line total for callers supplying `quantity` and `unit_cents`. Both inputs must be nonnegative integers. Valid input yields `status` equal to `ok` and an integer `total_cents` equal to their product. Invalid or missing input yields `status` equal to `invalid` and `total_cents` equal to null. The sole response must be one JSON object with exactly those two keys. No numeric-string coercion, decimal rounding, clarification question, Markdown fence, or extra text is allowed. Completion occurs after that object.

The source provides no named audience, model, reasoning setting, external evidence requirement, knowledge files, Actions, integrations, history, or conversation starters. The two supplied probes were retained as behavioral cases. The target capabilities are reading supplied files and writing staging files. The portable skill needs no external tools or additional files.

## Component map

| Source component | Destination | Status |
| --- | --- | --- |
| Input fields and nonnegative integer validation | `prepared/line-total/SKILL.md` | Preserved |
| Exact product on valid input | `prepared/line-total/SKILL.md` | Preserved |
| Invalid and missing input status/null result | `prepared/line-total/SKILL.md` | Preserved |
| Exactly two JSON keys and their value types | `prepared/line-total/SKILL.md` | Preserved |
| No coercion, rounding, clarification, fences, or additional text | `prepared/line-total/SKILL.md` | Preserved |
| Knowledge and Actions | None supplied or required | Nothing to migrate |
| Valid and invalid probes | `evidence/requests.json` and responses | Preserved as execution cases |
| GPT model/runtime details | Not supplied | Unknown; direct parity unverified |
| ChatGPT personal-skill installation | No supported target delivery mechanism in fixture | Pending, as requested |

The only instruction adaptations are skill selection metadata and an explicit list of invalid value types. Strings, booleans, null, decimals, and other non-integers are covered by the source's integer requirement. No optional workflow improvements, scripts, installation shortcuts, or new permissions were added.

## Structural checks actually run

- Read the full supplied migration skill and the destination, component-map, and verification references. Applied zach-prompting and unslop. Read skill-creator guidance, but followed the explicit preparation-only destination instead of its installation workflow.
- Parsed YAML frontmatter at the actual prepared destination, checked the exact name and description fields, naming rules, and folder/name match. Passed.
- Checked the skill inventory. It contains only `SKILL.md`; no extra resource links or missing files exist. Passed.
- Ran the available `quick_validate.py` against the prepared folder. Exit code 0, output `Skill is valid!`. This establishes packaging validity only.
- Scanned the prepared instructions for credential patterns and inspected their content. No credentials or private examples were included. All supplied material is synthetic.
- No scripts were added to the skill, so no bundled script execution was required.

Machine-readable details are in `evidence/structural-checks.json`.

## Behavioral execution

Expected requirements and values were recorded in `evidence/expectations.json` before execution. A fresh-context agent, `/root/revised_output/execute_line_total`, received only the generated skill, raw requests, permitted capabilities, and response-save paths. It was not shown expected values or the report. Each case was treated independently in one batch. The runner was instructed to use no external services or calculation code.

I then parsed every saved response in full and checked exact keys, types, expected values, and absence of prose or Markdown. Ordinary JSON whitespace, including a trailing newline, was accepted. All eight passed.

| Case | Request | Observed complete JSON response | Result |
| --- | --- | --- | --- |
| Supplied valid | `quantity: 3; unit_cents: 125` | `{"status":"ok","total_cents":375}` | Pass |
| Supplied invalid | `quantity: "3"; unit_cents: 125` | `{"status":"invalid","total_cents":null}` | Pass |
| Missing input | `quantity: 3` | `{"status":"invalid","total_cents":null}` | Pass |
| Decimal | `quantity: 2.5; unit_cents: 125` | `{"status":"invalid","total_cents":null}` | Pass |
| Negative | `quantity: -1; unit_cents: 125` | `{"status":"invalid","total_cents":null}` | Pass |
| Zero | `quantity: 0; unit_cents: 125` | `{"status":"ok","total_cents":0}` | Pass |
| Boolean | `quantity: true; unit_cents: 125` | `{"status":"invalid","total_cents":null}` | Pass |
| Difficult arithmetic | `quantity: 9007199254740993; unit_cents: 3` | `{"status":"ok","total_cents":27021597764222979}` | Pass |

Raw responses are retained in `evidence/responses/`; parsed results and hashes are in `evidence/behavioral-results.json`. These are executions of explicitly loaded portable instructions in another agent runtime. They do not demonstrate ChatGPT personal-skill discovery, target-host output handling, or equivalence to the original GPT. No missing knowledge or integration case applies; missing task input was exercised.

## Delivery state and next step

The authorized portable preparation is saved at the requested destination. Nothing was published, installed, or sent to an external service, and the source skill and source GPT were not changed.

To finish the personal-skill migration, use a destination that provides the managed ChatGPT personal-skill creation/save flow, verify the saved skill by frontmatter name `line-total`, and rerun the supplied valid and invalid cases there. Also test natural invocation and a nearby unrelated request to assess discovery. Direct before/after parity remains unverified because the original GPT was not available for execution.

## Recoverable source and revision

The supplied synthetic source remains at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/strict-output.json`.

Source SHA-256: `b3513ad980e57d44cbb560c8b9d907e9bd21e9a8c143fb3eaac6759bfbf119d2`

Prepared skill SHA-256: `b23cc2a18326d87d357431c7a1a1cdd78f7d6909efeea427cae4ebdfcf68110c`
