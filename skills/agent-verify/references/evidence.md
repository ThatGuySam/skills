# Evidence records and creator handoff

Use the area's existing verification directory or a named local run directory. No specific repo or installed sibling is required. Keep sensitive user records out of distributable skill files. A minimal durable run contains:

- A contract with claim, scope, settings, budget, critical criteria and acceptance policy.
- Frozen skill/input snapshots or hashes plus explicit access limits.
- Natural task prompts, separate rubric/reference labels, per-output source-access inventories, and isolated output directories.
- Actual artifacts, available tool-event logs and command/check outputs, including failed attempts.
- Original QA grades, optional order-swapped grades, corrections and escalation decisions.
- A final report separating structural checks, behavior, comparison, sampled audits and remaining uncertainty.

Use opaque IDs for worker directories and grading labels. Keep the ID-to-variant mapping private from workers/QA. Do not put evaluation instructions into the skill under assessment. If private records cannot be copied, keep secure pointers and record that replay is incomplete. Missing trace or model telemetry is `unavailable`, never zero or invented. Store tool actions/results, not hidden reasoning.

## Optional receipt checker

For repeated runs, `scripts/check_receipt.py RUN/receipt.json` verifies that cited local evidence files exist and match their SHA-256 hashes, every trial has a full criterion record, and comparison trials use paired input/configuration IDs. It does not inspect semantic correctness, verify that a trace really came from a tool, or decide improvement. It has no network access and does not write files. A valid receipt can describe failed or unknown results. Never report its success as a behavioral pass.

Requires Python 3.9 or later. Receipt format, version 1:

- `version`: integer `1`.

- `mode`: `verify`, `compare`, or `progressive`.
- `criteria`: nonempty list of `{id, critical}`; critical is boolean.
- `artifacts`: nonempty list of `{id, path, sha256}`. Paths are relative to the receipt directory, refer to copied evidence, and stay inside that directory after resolving symlinks.
- `trials`: nonempty list of `{id, case, variant, input_id, config_id, artifact_ids, results}`. Case/variant/input/config are nonempty strings. Artifact IDs identify actual outputs or error receipts, even for a failed execution.
- `results`: one `{criterion, status, evidence_ids}` for every criterion; status is `pass`, `fail`, or `unknown`. Pass/fail require evidence IDs; unknown may have none. If full execution failed, record failed/unknown criteria rather than dropping the trial.
- `pair_variants`: in compare mode, exactly two different variant names. Every case must have equal trial counts for both variants and consistent input/config IDs. For progressive compare workflows use `mode: compare` and document the routing policy in the contract.

Record semantic details, trial attempts, observed provider/executor/model IDs, native reasoning or thinking settings, sources, QA calibration status and escalation reasons in the contract/grade artifacts referenced by the receipt. Input/config IDs must point to meaningful frozen definitions in those artifacts; matching strings alone cannot establish fair experimental control. The helper detects accounting defects, not dishonest or mistaken records.

Exit 0 means the receipt is structurally complete and local hashes match. Exit 1 means an invalid or incomplete receipt. The JSON result lists nonpassing and critical-nonpassing criteria and always says that the behavioral verdict is not determined by this checker.

## Creator handoff

A skill creator can call Agent Verify after freezing a draft and before claiming effectiveness. Supply draft and baseline paths, preserved requirements, realistic tasks, environment boundaries and model policy. Agent Verify returns the report and evidence; the creator owns revisions and installation. After a revision, preserve the prior run and create a new run for affected checks. Do not alter the creator's locked sources to add this workflow.

Example request: "Use $agent-verify in compare mode on these two skill directories. Use Terra Medium, no Astra, and a six-trial pilot. Include a standalone case, retain all failures, and tell me whether the change improves the tested behavior."

Example progressive request: "Use $agent-verify for a progressive audit of this result. Use the listed checks, allow one repair, and escalate only the unresolved judgment within my approved model ceiling."

For Google, an example contract is Flash workers/QA with Argon as the ceiling and Carbon disabled unless account/runtime discovery confirms access. Record the exact resolved IDs; see [model providers](model-providers.md). Mixed-provider generation or judging must be labeled, with data-access boundaries and an approved provider list. Changing the generation model as well as the skill version is a confounded skill comparison.
