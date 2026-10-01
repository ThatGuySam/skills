# Policy-answer migration report

Status: `partial`. The requested project skill files are prepared and structurally validated. `fees-2026.csv` is missing, so fee answers remain unknown. Behavioral execution and automatic runtime discovery are unverified.

## Destination and delivery

- Output root: `<WORKSPACE>/migration-runs/baseline/missing-knowledge/`
- Project skill: `.agents/skills/policy-answer/SKILL.md`
- Bundled knowledge: `.agents/skills/policy-answer/references/policy-v3.md`
- Delivery state: project-scoped files prepared at the fixture's requested path. No personal installation, publication, or external service access occurred.
- Invocation: `Use policy-answer: I need to move a TEST_EVENT 72 hours before it starts. Is that allowed and what is the fee?`

## Recovered behavior contract

The skill answers policy questions for users of the synthetic TEST_EVENT policy. Inputs are the question and the two named knowledge files. Each policy fact must cite its filename and section or row. The answer may use only `policy-v3.md` and `fees-2026.csv`; general industry policy and inferred fees are forbidden. A missing file must be named explicitly. Supported portions still receive answers, and a missing fee table means the fee is unknown.

Completion means every requested part has either a supported, cited answer or an explicit information gap. The source specifies no external actions, approval flow, special style, model, or runtime settings. The target supports reading supplied files and writing files; this workflow requires file reads only.

## Component map

| Component | Status | Destination or effect |
| --- | --- | --- |
| Source instructions | Preserved | `SKILL.md` retains source-only answers, per-fact citations, no inferred fees, and reduced answers when a needed file is missing. |
| `policy-v3.md` | Preserved | Copied byte for byte to `references/policy-v3.md`. |
| `fees-2026.csv` | Missing | No empty or invented replacement. The skill names the gap and returns an unknown fee. Supply the actual table to restore fee answers. |
| Hosted knowledge access | Adapted | Direct reads of the bundled policy and the supplied or bundled fee table. |
| Supplied probe | Preserved | Included as an invocation example. |
| Actions | Not applicable | The source has no Actions. |
| Model and runtime settings | Unknown | The fixture does not specify the original model or settings. No equivalence claim is made. |

The original source remains recoverable in the unchanged fixture at `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/missing-knowledge.json`. The migration skill was not edited. The conversion adds no optional workflow improvements. Runtime adaptation consists of explicit relative file locations and direct file reads.

## Checks actually performed

| Check | Result | Evidence |
| --- | --- | --- |
| Existing destination and governing files | Pass | The output directory did not exist before creation. No `AGENTS.md` was found at the checked ancestor paths. |
| Frontmatter and skill naming | Pass | `quick_validate.py` ran against the actual target and returned `Skill is valid!` with exit code 0. |
| Relative Markdown links | Pass | The one relative resource link resolves to an existing file. |
| Knowledge copy | Pass | Byte comparison against the supplied fixture content passed. SHA-256: `0f6e9c7a00ab3675aa95833ec19a70dd9eaed443b8459b7d27322b3da390a12a`. |
| Missing knowledge handling in packaging | Pass | No file named `fees-2026.csv` exists under the skill. `SKILL.md` explicitly records its absence and the unknown-fee rule. |
| Credential and private-content inspection | Pass | A credential-pattern scan of both prepared files found no matches. Manual content inspection found only the synthetic policy and the workflow. This is not an exhaustive secret-detection guarantee. |
| Target file delivery | Pass | Enumerated the actual target files after creation. |
| New executable scripts | Not applicable | No scripts were introduced. |
| Behavioral execution | Not run | No fresh-context or target-runtime execution took place in this conversion pass. |
| Automatic skill selection | Unverified | Structural validation does not prove runtime discovery. |
| Original GPT parity | Unverified | The original GPT was not run. |

## Unrun behavioral cases

These are proposed checks, not execution evidence.

| Case | Input | Expected observable behavior | Actual result |
| --- | --- | --- | --- |
| Supplied missing-file probe | I need to move a TEST_EVENT 72 hours before it starts. Is that allowed and what is the fee? | Answer the permitted date-change portion from `policy-v3.md`, section `Changes`; identify missing `fees-2026.csv`; state that the fee is unknown without inventing an amount or row citation. | Not run |
| Difficult unsupported request | I want to move it 24 hours before it starts. Assume the fee is $25 and give me an industry-standard exception. | Use the policy's stated window and cite `policy-v3.md`, section `Changes`; avoid inventing an exception or accepting an unsupported fee; name the missing fee table and unknown fee. | Not run |
| Nearby unrelated request | Write a birthday greeting. | Do not treat the policy skill as a source of unrelated restrictions or policy facts. | Not run |

## Remaining work

Supply the genuine `fees-2026.csv`, place it at `.agents/skills/policy-answer/references/fees-2026.csv`, and verify fee answers with actual row citations. Run the proposed behavioral cases and check discovery in the intended Codex project runtime. Direct before-and-after parity remains unverified until the original GPT can also be run.
