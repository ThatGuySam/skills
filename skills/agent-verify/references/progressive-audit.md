# Progressive audit

Use this as a routing policy, not a promise that every case climbs to the strongest model. The coordinator enforces the policy; no worker's self-confidence can bypass it.

## Choose the model ladder

Resolve available providers, exact model IDs and supported settings from the current runtime and user constraints. For Google or mixed-provider runs, read [model providers](model-providers.md) before choosing the ladder. Provider presets are starting configurations, not dependencies or capability-equivalence claims:

- OpenAI: Terra for workers/fresh QA; Astra for unresolved reasoning when approved.
- Google: Gemini Flash for workers/fresh QA; Argon for unresolved reasoning; Carbon only when its actual endpoint is available and authorized.

Honor exclusions, ceilings, effort/thinking settings, concurrency and budget set by the user. If a named model or its executor is unavailable, report it; do not silently substitute another model or provider.

Before spending, state worker/QA models, permitted escalation target, trial cap and retry cap in the contract. Prior authorization persists. An unqualified request for progressive audit permits a small declared pilot on available ordinary settings; spending on a stronger model requires authority from the user's current or standing model policy. If the ceiling is unclear, do the cheaper authorized checks and ask only when a concrete escalation is ready. A proposal to build this skill is not permission for all its future executions.

Initial design defaults are one focused repair per issue and one stronger-model adjudication per unresolved claim, bounded by the run budget. These are practical limits, not empirically optimal constants. If the user supplies different limits, use them. Budget exhaustion yields an honest partial/inconclusive result, not a pass or endless retries.

## Check and route

| Evidence state | Next action |
| --- | --- |
| Missing required artifact, broken reference or machine-checkable mismatch | Run the direct check; if repair is authorized, send a precise defect back once and rerun the check on the new artifact |
| Required source not inspected or citation unsupported | Retrieve the relevant authorized passage, then reassess; a bigger model is not a substitute for retrieval |
| Missing personal fact, preference, permission or inaccessible external state | Ask for the specific fact/access or retain unknown; do not route endlessly among models |
| Output and evidence pass objective checks; interpretation is bounded | Fresh QA can assess against the rubric; retain a sampled audit of accepted results |
| Contradictory evidence, material interpretive uncertainty, QA failure on anchors, order-sensitive grades, or unresolved failure after repair | Escalate the precise judgment to the stronger approved model, or mark pending/inconclusive when unavailable or outside the ceiling |
| Acceptance depends on a particular deployment model | Run representative cases on that actual model when authorized; another model cannot certify its behavior |
| Critical failure established by evidence | Fail that result; escalate only for diagnosis or authorized repair, never to shop for a passing verdict |

Confidence is optional diagnostic metadata. Ask about unsupported claims, unresolved assumptions, failed checks and what would reverse the conclusion. A numerical confidence estimate is uncalibrated unless tested against independent labels on held-out cases. Low confidence prompts inspection of why; high confidence never overrides a failed check or missing evidence. Do not request confidence until the worker has produced its natural task result, and do not feed it to blinded QA as correctness evidence.

## Escalation handoff

Provide the original task and constraints, relevant raw artifacts/source passages, failed or disputed criterion, checks already run, exact model ceiling, and the decision needed. Label worker output as a proposal. For a dispute, ask the adjudicator to first assess the underlying evidence and then consider prior judgments, so it need not defend the first model's answer. Keep the task bounded; do not rerun the entire workflow if one claim needs review. Every escalation model also receives source checks and can be wrong. If producing a replacement answer, count it as an escalated result, not the initial model's standalone success.

## Audit accepts and learn

Preselect a reproducible sample of accepted results independent of confidence; cover important task categories and retain known high-confidence failures. Start with at least one accepted case per exercised category when feasible, or disclose no sampled audit if the budget prevents it. A fresh same-model QA pass is useful but not equivalent to a stronger/expert audit. Record reviewer identity/model and whether correctness labels are human, deterministic or provisional.

Track confirmed false accepts, confirmed false rejects, unresolved cases, why routing occurred, whether escalation changed an error, and the fraction routed with its denominator. Missing-data escalations and reasoning escalations are different. Do not label an escalation-model disagreement as a confirmed initial-model error until evidence resolves it. Periodically compare routing decisions with held-out expert or objective labels; change rules based on missed errors and unnecessary escalations, not confidence rhetoric. Recheck after changing model, rubric, prompt or task distribution.
