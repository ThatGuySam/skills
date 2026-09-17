# Behavioral verification

Use the source GPT's familiar requests and user-visible requirements. Add a harder case that exercises the weakest dependency. Record input, expected observable behavior, actual result, and pass/fail/blocked for each case.

Select relevant checks:

| Case | Observable success |
| --- | --- |
| Normal request phrased naturally | Skill is selected and produces the required artifact |
| Nearby unrelated request | Skill does not take over unrelated work |
| Knowledge-dependent question | Uses the supplied reference accurately and cites it when required |
| Missing required input or file | Identifies the exact gap without invented facts |
| Tool-dependent operation | Uses an available mapped operation, or reports the missing integration |
| Draft versus send request | Preserves the original authorization boundary |
| Difficult formatting or edge case | Retains required fields, calculations, and completion conditions |

A structural validator checks packaging, not these behaviors. Reading a skill explicitly does not prove automatic selection. Label manual selection review separately from actual runtime discovery. Mock tool results demonstrate adapter logic, not live authentication or external effects.

Where available and authorized, use an independent fresh-context agent with the skill, raw source material, and a realistic task. Keep it in an isolated workspace and prevent live external changes during evaluation. Do not provide the intended answer or your suspected failure. If no executor is available, give the smallest useful unrun test set and use `awaiting-evals`.

For repeat migrations, compare against the existing destination and avoid destructive regeneration. For batches, keep one result row per GPT so a partial failure cannot disappear in an aggregate success claim.
