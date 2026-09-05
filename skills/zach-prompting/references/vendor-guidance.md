# Vendor guidance

Use this reference only for model-specific tuning, migration, or source-backed rationale. The Astra guidance was checked on September 5, 2026. The GPT-5.6 and Claude Fable 5 sections retain their July 15, 2026 source review; they were not reverified in the Astra update. Recheck the named model before relying on changing API controls.

## OpenAI: GPT-6 Astra

Source: [Astra prompting best practices](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices), checked September 5, 2026.

- Encourage completion of action requests, reasonable assumptions, and preparation of reviewable work before outstanding approvals.
- Audit loaded skills and instruction files for conflicting guidance. Explain which rule caused a pause; preserve user priority over skill guidelines within the instruction hierarchy.
- Specify readable prose, useful formatting, and plain technical language. Do not transfer GPT-5.6's concision assumptions to Astra.
- Tune delegation triggers and amount for the runtime. Keep agent messages legible.
- Complete relevant tests and required checks; expand verification only when changes, failures, or unresolved concerns justify it.

### Applying this in Zach Prompting

These are editorial checks, not a replacement system prompt. Preserve the target's review-only mode, authorization, output schema, and model choice. Do not add subagent tools or API features merely because Astra supports them.

For an actual API migration, consult the same guide's migration section. Preserve effective reasoning effort; map unsupported `none` or `minimal` to `low`. Astra tool calling requires Responses. Check unsupported sampling parameters separately from prompt edits.

## OpenAI: GPT-5.6

Source: [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6)

### Prompt construction

- Start from a working prompt and tool set. Remove one instruction, example, or tool group at a time and rerun the same representative evals.
- Preserve the outcome, success and stop conditions, safety, evidence, permission constraints, contextual routing, output shape, and validation.
- Remove repeated rules, outdated instructions, behavior-neutral examples, and irrelevant tools. Audit remaining instructions for contradictions.
- Prefer outcome-level contracts. Reserve `always`, `never`, `must`, and `only` for true invariants; use decision rules for judgment.
- Preserve explicit user values. When a value is implicit, provide criteria rather than universal defaults or keyword maps.

### Behavior and autonomy

- Reassess broad brevity instructions: GPT-5.6 is more concise by default than GPT-5.5. Use `text.verbosity` for an API-level default and prompt instructions for task-specific preservation and structure.
- Keep personality and collaboration style short and distinct. Define tone through observable writing choices.
- Centralize request-type authorization: inspect and report for assessment; make in-scope local changes for authorized implementation; confirm external, destructive, costly, or scope-expanding actions when they are not already authorized under the governing instructions.
- For long-running work, identify the active layer: research, design, implementation, review, or external coordination.

### Tools, retrieval, and state

- Expose only relevant tools. Describe purpose, use conditions, important returns, and error behavior.
- Parallelize independent retrieval and sequence dependent work. Try one or two meaningful fallbacks for empty or suspiciously narrow results.
- Use Programmatic Tool Calling for bounded deterministic reduction such as filtering, joining, ranking, deduplication, aggregation, batching, and repeated validation. Keep semantic judgment, approval, native artifacts, citations, and final validation in direct calls.
- Define citation requirements, evidence sufficiency, retrieval limits, and missing-evidence behavior in the prompt.
- Use sparse outcome-based progress updates. Compact at milestones, preserve prompt behavior after compaction, and reuse prior reasoning only while objectives and assumptions remain stable.

### Reasoning and validation

- Preserve the prior reasoning setting as the migration baseline. Test the same setting and one level lower before increasing effort.
- Use higher effort only when evals show a meaningful gain. Before increasing it, check for missing success criteria, dependencies, routing rules, or verification loops.
- Give the model access to relevant checks: targeted tests, applicable lint or type checks, affected-package builds, and a minimal smoke test when broader validation is too expensive.
- For migration, establish a baseline, remove outdated instructions, add the smallest fix for a measured regression, and rerun the same cases after each change.

OpenAI reports directional internal coding-agent results from leaner system prompts, but explicitly says results vary by workload. Do not reuse its reported ranges as a guarantee for another system.

## Anthropic: Claude Fable 5

Source: [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5)

### Prompt construction

- Reevaluate old skills and prompts. Stronger instruction following can make older symptom-by-symptom instructions over-prescriptive.
- Use a concise behavior rule instead of enumerating every unwanted manifestation.
- Explain the larger purpose, intended audience, and what the output enables alongside the immediate request.
- Lead with the outcome. Achieve brevity by dropping non-decision-relevant detail, not by compressing prose into fragments or jargon.

### Effort and long runs

- Treat effort as the intelligence, latency, and cost control. Anthropic recommends `high` for most tasks, `xhigh` for capability-sensitive work, and `medium` or `low` for routine work; tune against the workload.
- At high effort, prohibit unrelated features, refactors, abstractions, helpers, compatibility machinery, and impossible-case fallbacks.
- Adjust harness timeouts, streaming, and progress UX for longer turns. Instruct the model to act once enough information exists and not relitigate settled decisions.
- End only when complete or blocked by destructive action, real scope change, or input only the user can supply. For unattended work, allow reversible in-scope actions without a redundant permission check.

### Evidence, delegation, and memory

- Audit every progress claim against a tool result from the current run. State failed, skipped, and unverified work accurately.
- Distinguish assessment from implementation and require evidence for the specific state-changing action.
- Delegate independent subtasks asynchronously and keep useful local work moving. Redirect agents that lack context or drift.
- For durable memory, keep one lesson per file with a one-line summary; record why it matters; update rather than duplicate; delete disproved lessons.
- Prefer fresh-context verifier agents over self-critique for periodic checks on long work.

### Harness-specific cautions

- Avoid exposing explicit context-budget countdowns when possible; they can induce premature stopping or handoff.
- Use a dedicated send-to-user tool only when the UI must deliver exact user-facing content during a long run. Pair the tool with a clear elicitation rule and keep narration or internal reasoning out of it.
- Do not instruct Fable 5 to expose, transcribe, or explain private reasoning. Such instructions can trigger reasoning-extraction refusals. Request conclusions, evidence, assumptions, or concise rationale instead.
- Fable 5 has model-specific refusal and fallback behavior for some cybersecurity, biology, life-sciences, and reasoning-extraction requests. Keep that handling in a scoped runtime policy rather than portable prompt boilerplate.

## Cross-model inference

The shared editorial method is: clarify intent and boundaries, delete obsolete prescription, preserve evidence and completion requirements, then verify the smallest change on realistic tasks. This sentence is an editorial synthesis of the cited sources, not vendor wording.
