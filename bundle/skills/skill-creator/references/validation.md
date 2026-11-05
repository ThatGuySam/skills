# Validation choices

Choose evidence for the skill's actual behavior. A concise skill can be strong; a short file, correct YAML, or several agreeing reviewers does not establish that it works.

For a small edit, run the structural validator, resolve changed references, and exercise the affected behavior when it can change execution. For a new workflow, choose a few representative tasks covering its consequential branches. Include a near-miss or boundary case where confusing scope, permissions, or invocation would cause a wrong action. Use existing task fixtures when available.

Test generated helpers on real temporary fixtures, including a relevant refusal or failure. Assertions should observe the requested result or side effect, not require the agent to reproduce particular headings or wording.

Use an independent agent when complexity warrants it and the runtime permits it. Give it the realistic request, skill path, raw inputs, permitted output directory, and side-effect limits. Keep expected answers and prior critiques out of its prompt. Inspect the actual artifact and actions, not just its self-report. Each writer gets a separate temporary output directory. Test the generated artifact's behavior too when practical; generating a plausible SKILL.md is only one part of authoring.

When claiming improvement, compare the candidate against no skill or the previous version on the same tasks, model, tools, and settings. Run candidate and baseline independently; preserve failed runs. Use Anthropic's grader/comparator schemas when using its aggregation or review viewer, rather than inventing incompatible files. Record missing timing/token telemetry as unavailable. A single bounded forward test can support its tested behavior but not broad superiority or “frontier-class” claims.

For discovery changes, use substantive positive requests and adjacent negative requests. A task that asks for a reusable skill should trigger; simply carrying out that business task should not. Test reference pointers through the paths needed for the work, not by requiring every source on every case. Description-only classification is a proxy until the actual target runtime selects the skill.

After a failed check, distinguish a product defect from an invalid assertion or unavailable environment. Fix the cause, retain the first result, then rerun affected checks. End when the scoped bar passes. Add a new cycle only for changed requirements, new failures, or a material uncovered risk.

Report structural validity and behavioral evidence separately. Keep subjective preference approval separate from both. For unavailable execution, deliver usable files plus the smallest remaining trial and mark `awaiting-evals`; do not relabel a review as a successful runtime test.

For this mixer's own acceptance cases, use [evals/cases.json](../evals/cases.json); file paths there are relative to the skill directory. The fixtures are bundled. [Recorded results](../evals/results.md) distinguish artifact trials from downstream execution and actual discovery.

The Codex structural validator requires Python 3 and PyYAML. Use an available compatible environment or a task-local virtual environment; do not alter global Python as an incidental authoring step. This version was checked with Python 3.12 and PyYAML 6.0.3. If unavailable, report the named validator as not run and distinguish any alternative syntax check.
