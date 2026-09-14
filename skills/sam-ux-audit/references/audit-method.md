# Sam UX Audit

Produce an evidence-backed audit that helps the owner decide what to fix first so people can understand the product, achieve their goal, and retain control over their work and money. Evaluate the experience people have, including failure and repeat use, rather than how impressive a screenshot looks.

## Frame the Review

Establish the target product/version, intended user and job, platform/input methods, product stage, primary journey, business model, and available evidence. Use supplied context; ask only for missing information that materially changes the review. Start independent inspection while a question is pending.

Choose the scope proportionally: a named screen or flow stays bounded; a broad product audit starts with the core value journey and relevant recovery and billing paths. Record inspected and uninspected areas. Do not expand a UX audit into a security scan, growth campaign, or implementation project.

Use three evidence modes and state which applies:
- **Interactive:** Walk the actual reachable experience and record actions, states, environment, and results.
- **Artifact-limited:** Review supplied screenshots, recordings, code, or copy. State what each proves; static screenshots do not establish keyboard behavior, timing, or successful billing.
- **Concept:** Assess proposed journeys as design hypotheses and name the smallest useful user test. Do not label hypothetical friction as observed behavior.

## Apply the Relevant Lenses

Read [audit-lenses.md](audit-lenses.md) for the audit questions. Check applicability first; mark irrelevant lenses N/A with a reason. Do not invent a paywall for a free tool or demand startup growth mechanics from an internal application.

Use [grounding.md](grounding.md) to select sources and optional existing skills. Load only the skills/research that resolve a concrete audit question. The skill remains usable without those packages or the local research corpus.

Broad defaults are clarity, useful feedback, accessible paths, recovery, and honest commercial terms. Their implementation depends on the product. Preserve justified safety, identity, regulatory, or expert-workflow friction. Apple platform conventions apply to Apple products; transferable HIG principles do not require making web or Android products look like iOS. YC startup advice informs hypotheses about value and product focus; it does not establish product-market fit or universal conversion targets.

## Inspect and Ground Findings

Walk from the user's intent to a meaningful result. Where relevant, inspect first use, repeat use, empty/loading/error states, interruptions, permissions, recovery, and commercial lifecycle. Exercise available input and accessibility paths rather than extrapolating from visual polish. For motion, inspect playback and reduced-motion behavior when possible.

For every finding, record:
- The user, task, state, and specific friction or harm.
- Evidence: reproducible action/observation, screenshot or recording location, exact code/copy reference, or clearly labeled supplied fact. Include version/date where meaningful. A supplied screenshot description is reported evidence, not direct visual observation.
- Why the finding matters, with a concise rationale. Distinguish **observed**, **source-inferred**, and **hypothesis**; distinguish severity from confidence.
- The smallest useful recommendation, its tradeoff, and an observable acceptance check.
- A source link and applicable section when attributing the rationale to Apple, WCAG, YC, a provider, or research. A guideline citation supports a principle; it does not prove the product has the defect.

Read the relevant official source before quoting a standard, numeric threshold, or platform requirement. For current billing/platform rules, refresh the exact provider documentation. If retrieval fails, state the limitation and offer a provisional heuristic assessment without claiming compliance. Local research is a dated lead; follow original sources before repeating its statistics or universal claims.

Prioritize by user harm, task criticality, reach/frequency, and availability of a workaround. Use these qualitative levels with a short rationale:
- **Critical:** credible severe harm, unwanted financial commitment, or loss of essential access/work with no reasonable recovery.
- **High:** blocks a core task or excludes an intended user group.
- **Medium:** avoidable errors, repeated delay, or confusion with a workable path.
- **Low:** limited polish or consistency issue with minor task impact.

Do not inflate severity from a missing screenshot or uncertain reachability. Record missing evidence as a validation gap. Avoid composite UX scores or numeric business-impact claims unless a defined rubric and actual measurements justify them. Deduplicate findings that share the same underlying user problem.

## Deliver and Finish

Lead with the most consequential findings and recommended first action. Include:
1. Scope and evidence limits, plus a compact coverage list showing reviewed, unverified, or N/A areas.
2. Prioritized findings with evidence, recommendation, confidence, and acceptance check.
3. What already works and should be preserved, when supported by evidence.
4. A small ordered next-action list and the next user observation/test needed for uncertain product assumptions.

Match detail to the review. Use a durable report when requested or when the task authorizes one; follow the target repo's document conventions. Otherwise deliver in chat. A full report can use [this source and lens map](grounding.md) without reproducing the whole checklist.

Default to inspect/report. Preserve existing authorization when changes or external artifacts are explicitly requested, but an audit alone does not authorize edits, commits, publication, customer messages, or changes to subscriptions. Use approved test environments for consequential actions; inspect the surrounding flow without submitting real payments, cancellation, deletion, or invitations unless specifically authorized. Respect browser/window isolation and redact private evidence.

Finish when the agreed scope is covered and each conclusion is evidenced or explicitly uncertain. If access is blocked, complete the available artifact review and identify the exact remaining check. Do not keep auditing merely to produce more findings.
