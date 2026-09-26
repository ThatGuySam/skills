# Migration evaluations

Six synthetic configurations cover instruction-only conversion, missing
knowledge, Actions, conflicting requirements, strict JSON, and unavailable
target capabilities. Target delivery covers a repository collection, Codex and
Claude Code project layouts, ChatGPT personal skills, and a disconnected Mac.
No real customer data, credentials, or reachable Action endpoint is used.

`fixtures/` supplies raw configurations and user requests. `expected.json`
records requirements written before the runs. Keep it away from runners.

## Run a new evaluation

1. Freeze the migration skill and references at a commit or file hashes.
2. Start a fresh agent for each fixture. Give it only the skill path, fixture
   path, and an isolated output directory. Ask it to migrate the user-owned GPT
   according to the fixture and save the result and report. Prohibit external
   services, personal installation, publication, and edits to the source skill.
   The fixture's capabilities describe the target, not the migration host.
3. Start another fresh agent for each generated skill. Give it only that skill,
   linked resources, and each `probes[].request`. Save complete responses as
   `responses/<probe-id>.txt`. Do not include the original instructions, report,
   expected requirements, or another case's output. Prefer one context per
   probe; record any grouping, as this run does.
4. Have an independent evaluator compare every expected requirement with the
   generated files and responses. Preserve failures as evidence before making
   a narrow change. An accurately blocked integration is a passing dependency
   check and an incomplete product, not a working integration.
5. Record revision/hashes, runtime/model information actually exposed by the
   runner, target capabilities, invocation mode, observed files, and grades.
   Rerun affected cases after changes. Never mark unrun examples as passes.

The performed run used Work Mode `collaboration.spawn_agent` with
`fork_turns: "none"` and inherited model settings. Exact model and effort were
not exposed in spawn results. Migration and task-execution agents were
separate. Multi-probe cases used one agent instructed to treat each request
independently, so those probes are not independent samples.

## Recorded evidence

[2026-09-26 results](results/2026-09-26/assessment.md) contain six conversions
and eight actual generated-skill responses. Each case retains its generated
files, migration report, and responses. `run.json` pins input and output hashes.
`SKILL.md` is stored as `generated-skill.txt` so fixtures cannot become
installable skills. Only temporary paths in reports were normalized.

`revised/` contains two reruns of the updated verification procedure, with 11
additional response probes. `revised.json` pins the revised skill and evidence.
Temporary paths in auxiliary rerun evidence were also normalized; generated
skills and responses were not edited. All eight conversions and 19 responses
are retained, with semantic judgments separate from deterministic replay checks.

The reports were produced before the separate response runs; their pending
execution notes describe that point in time. The assessment records the later
execution evidence. Installation status does not change because a response
passed in Work Mode.

Recheck recorded evidence from the repository root:

```bash
python3 evals/migrate-cgpt/check.py
python3 -m unittest discover -s evals/migrate-cgpt -p 'test_*.py'
```

These commands check integrity, copied resources, exact output constraints,
and the JSON checker's rejection cases. They do **not** rerun a model or grade
semantic requirements. Semantic judgments and their evidence are in the
assessment. Automatic triggers, original-GPT comparisons, live services, and
native ChatGPT/Mac execution require separate authorized runs.
