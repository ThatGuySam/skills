# Behavioral verification

Use the source GPT's familiar requests and user-visible requirements. Add a harder case that exercises the weakest dependency. Write explicit expected requirements before running, then record input, observed output, and pass/fail/blocked for each case. Keep the source configuration, skill revision, target capabilities, and run artifacts recoverable without publishing private data.

Check two separate results:

1. **Conversion:** compare the generated files against every required output, dependency, permission boundary, and failure rule. A required missing integration or unresolved source conflict can correctly produce a partial or blocked migration. Do not count that as invented parity or as a fully usable replacement.
2. **Generated behavior:** explicitly invoke the generated skill in a fresh context using raw task inputs. Inspect the actual responses, not just its instructions or the migrator's suggested answers. For exact output contracts, parse the response and check types, required keys, extra prose, and invalid-input behavior. Record unavailable target execution separately from an agent following the portable instructions in another runtime.

Select relevant checks:

| Case | Observable success |
| --- | --- |
| Normal request with explicit invocation | Generated skill produces the required artifact |
| Natural request without explicit invocation | Target runtime selects the intended skill; requires a separate discovery run |
| Nearby unrelated request | Skill does not take over unrelated work |
| Knowledge-dependent question | Uses the supplied reference accurately and cites it when required |
| Missing required input or file | Identifies the exact gap without invented facts |
| Tool-dependent operation | Uses an available mapped operation, or reports the missing integration |
| Draft versus send request | Preserves the original authorization boundary |
| Difficult formatting or edge case | Retains required fields, calculations, and completion conditions |
| Conflicting source requirements | Reports the conflict without silently choosing precedence or weakening either requirement |

A structural validator checks packaging, not these behaviors. Reading a skill explicitly does not prove automatic selection. Label manual selection review separately from actual runtime discovery. Mock tool results demonstrate adapter logic, not live authentication or external effects.

Where available and authorized, use an independent fresh-context agent with the migration skill, raw source material, and a realistic migration task. Use another fresh context for the generated skill's task responses. Keep expected answers and grading requirements with the evaluator, away from both runners. Keep runs isolated and prevent live external changes. If no executor is available, give the smallest useful unrun test set and use `awaiting-evals`; do not turn written examples into passing executions.

For repeat migrations, compare against the existing destination and avoid destructive regeneration. For batches, keep one result row per GPT so a partial failure cannot disappear in an aggregate success claim.
