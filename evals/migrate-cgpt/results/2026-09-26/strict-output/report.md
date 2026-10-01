# Migration report

Status: `partial`. The portable replacement is prepared and structurally checked. Behavioral status is `awaiting-evals`. Personal-skill installation and discovery remain unverified because the specified environment has no managed checkout or save/reconciliation tool.

## Destination and delivery

- Requested runtime: ChatGPT personal skill.
- Prepared destination: `prepared/line-total/SKILL.md`, relative to this report.
- Available target capabilities: read supplied files and write staging files.
- Actual delivery: staging files created and read back successfully. No personal skill was installed, published, or saved into another account or runtime.
- Source: `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/strict-output.json`. The supplied synthetic source remains recoverable there and was not modified.
- Source and destination model versions were not supplied. No model-equivalence claim is made.

Invocation example: `quantity: 3; unit_cents: 125`

The required response to that invocation is exactly `{"status":"ok","total_cents":375}`.

## Recovered behavior and component map

| Component | Destination or decision | Status |
| --- | --- | --- |
| Line-total task | `SKILL.md` calculates quantity multiplied by unit_cents | Preserved |
| Input validation | Both values must be nonnegative integers | Preserved |
| Invalid and missing inputs | status invalid and total_cents null | Preserved |
| Output schema | Exactly one JSON object with only status and total_cents | Preserved |
| Output restrictions | No numeric-string coercion, decimal rounding, clarification, Markdown fences, or extra text | Preserved |
| Selection metadata | Added skill name and task-specific description | Adapted |
| Knowledge files | Source lists none | No dependency |
| Actions | Source lists none | No dependency |
| Provided probes | Listed below with their required observable results | Preserved as evaluation cases |
| Personal-skill installation | Requires the target account's supported managed save process | Missing |

The change adds portable frontmatter and splits the source instructions into short rules. It introduces no new workflow, tool, approval, or clarification requirement. No scripts or reference files are needed for this task. The JSON-only rule governs task responses; this report is separate migration documentation.

## Actual checks

The following checks ran against the actual prepared `SKILL.md` with a Python assertion command, which exited with code 0:

| Check | Actual result |
| --- | --- |
| Frontmatter delimiters and fields | Pass. Exactly name and description are present and nonempty |
| Skill name | Pass. line-total matches its containing folder and uses lowercase hyphenated form |
| Body | Pass. Nonempty |
| Resource links | Pass. No linked resources or missing files |
| Required contract phrases | Pass. Output keys, integer validation, multiplication, invalid/missing behavior, and all output prohibitions remain present |
| Credential-pattern scan | Pass. No matching secret-like values |
| Prepared file inventory | One file, SKILL.md |

A manual comparison with the supplied source found no omitted behavior. The source contains no customer examples or credentials. The pattern scan is a limited text check, not a proof that arbitrary content is free of sensitive information.

Prepared skill SHA-256: `70b19d3f7c3d71f54bbe7b4b156e5dd36baa5411b6d8f7fdecd7b20bdcc56e9f`.

These checks verify packaging and contract retention. They do not establish automatic selection or model behavior. No official target-runtime validator or target executor was available within the specified capabilities. No scripts were added, so there are no script execution results.

## Behavioral cases

No target execution or original GPT execution was performed. Every case below is an unrun test, and each expected output is a contract-derived reference answer, not an observed response.

| Case | Input | Required observable result | Actual result |
| --- | --- | --- | --- |
| Supplied valid probe | quantity: 3; unit_cents: 125 | `{"status":"ok","total_cents":375}` and no additional text | Not run |
| Supplied invalid probe | quantity: "3"; unit_cents: 125 | `{"status":"invalid","total_cents":null}` and no additional text | Not run |
| Missing input | quantity: 3 | `{"status":"invalid","total_cents":null}` without a question | Not run |
| Decimal input | quantity: 3.5; unit_cents: 125 | `{"status":"invalid","total_cents":null}` without rounding | Not run |
| Zero boundary | quantity: 0; unit_cents: 125 | `{"status":"ok","total_cents":0}` and no additional text | Not run |
| Negative input | quantity: -1; unit_cents: 125 | `{"status":"invalid","total_cents":null}` | Not run |
| Nearby unrelated request | Write a haiku about rain | The line-total skill does not take over the request | Not run |

Direct before/after parity, personal installation, automatic selection, and target-runtime response conformance are unverified. The description was reviewed manually for task relevance; that is not a discovery test.

## Next concrete step

Save the prepared folder through the intended account's supported personal-skill workflow when its managed checkout and save/reconciliation tools are available. Verify the saved skill by its name, `line-total`, then run the cases above in a fresh target conversation. Keep the result partial until installation and required response behavior are verified.
