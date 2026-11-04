# Vendor guidance

Use this reference only for model-specific tuning, migration, or source-backed rationale. Source review dates appear in each section. Recheck the named model before relying on changing API controls.

## Shared across current models

Sources: the OpenAI and Anthropic pages cited below, checked November 4, 2026. This section is an editorial synthesis, not vendor wording.

- Use the runtime's reasoning or effort setting to change how much the model thinks. Remove prompt lines such as "think carefully," "think harder," or "use pro mode"; both vendors say current models do not need them, and Anthropic reports that lowering effort reduces thinking more reliably than prompt text.
- Effort names are not comparable across models or versions. Rerun an effort sweep on the exact target instead of carrying the old value forward.
- Audit older prompts for compensations aimed at earlier models: blanket thoroughness or tool-use pushes, anti-formatting rules, "hold findings for the final response," and "minimize tool calls." Remove or replace them with a rule stating when the behavior is wanted.
- Defaults differ by model. GPT-6 Astra favors lists and tables; Claude Fable 5.1 formats less. State when prose, lists, or tables fit the reader rather than banning or demanding formatting outright.
- When a general rule fails to stop an observed behavior, name its specific observed forms. Both Anthropic's early-stop and frontend guidance and OpenAI's writing blocklist rely on concrete patterns rather than labels.
- Define completion as doing the authorized work and running a check that exercises it, then stopping. Scale testing to the change; neither vendor wants extra review rounds or tests for reversible, low-impact edits.
- Do not ask any current model to reproduce its private reasoning in visible output. Request conclusions, evidence, assumptions, or a short rationale.

## OpenAI: GPT-6 family

Sources checked November 4, 2026: [Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model), [API changelog](https://developers.openai.com/api/docs/changelog), [Deprecations](https://developers.openai.com/api/docs/deprecations), and the earlier [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) post.

### Verified API facts

- **Models:** GPT-6 Astra (`gpt-6-astra`, September 3) is the highest-intelligence model. GPT-6.1 Sol (`gpt-6.1-sol`, September 29) balances speed, cost, and intelligence near Astra. GPT-6.1 Terra (`gpt-6.1-terra`, October 26) targets visual reasoning, precise computer use, and writing. GPT-6 Luna (`gpt-6-luna`) is the fastest and cheapest, for focused high-volume work. GPT-6 Sol (`gpt-6-sol`, September 22) remains available; review the migration guidance before moving it to 6.1 Sol.
- **Effort:** GPT-6.1 Sol supports `low` through `max`, default `medium`, and not `none`. GPT-6.1 Terra supports `none` through `max`, default `medium`. Astra does not support `none`. GPT-6 Sol and Luna support `none` through `max`, default `medium`. Map a legacy `minimal` request, or `none` on a model without it, to `low` and compare.
- **Endpoints:** Tool calling with reasoning requires Responses. Astra, 6.1 Sol, and Terra accept Chat Completions but need Responses for tools; GPT-6 Sol and Luna allow Chat Completions function calling only at `reasoning_effort: "none"`.
- **Parameters:** When effort is not `none`, remove `temperature`, `top_p`, `top_logprobs`, and logprobs. To change effort mid-conversation without losing the cache, use `configuration_update` items and keep the request-level `reasoning.effort` unchanged. When migrating from GPT-5.5 or earlier, replace `prompt_cache_retention` with `prompt_cache_options.ttl`.
- **Prompt objects:** The `v1/prompts` API and reusable prompt objects shut down November 30, 2026. Move reusable prompt content into application code.
- API support does not establish Codex settings or account availability. Check the selected runtime separately.

### Conditional prompting guidance

OpenAI attributes these observed behaviors to Astra and offers the prompts as family starting points. The fetched sources do not establish distinct Sol, Terra, or Luna prompting styles. Evaluate each candidate on the target model:

- **Initiative:** Astra asks clarifying questions more often and can stop where users expect it to continue. Tell it to infer intent and scope, make reasonable assumptions, and request approval only after preparing a concrete, reviewable result. Preserve explicit approval gates.
- **Instruction sensitivity:** Astra is more sensitive to skill files and `AGENTS.md`; unclear or conflicting guidance can block work early. Audit loaded instructions, state that user instructions outrank skill guidance, and ask the model to name the file and rule behind any pause or deviation.
- **Warnings:** Tell it not to add unsolicited warnings or safety checklists for hypothetical risks.
- **Writing:** Specify prose when needed, such as "clear, concise paragraphs, each developing one main idea," and calibrate technical language to the reader. OpenAI lists patterns to avoid, including "delve," "leverage," "it's worth noting," "This isn't about X. It's about Y," "X, not Y" framing, invented compound labels, and concluding summaries such as "In short:". Use such a list only when the target's house style calls for it.
- **Delegation:** Astra may delegate less than a workflow wants. Specify when and how much to parallelize, and request legible inter-agent messages.
- **Testing:** Astra tests thoroughly. Skip tests for reversible, low-impact changes that mirror the implementation.

Keep descriptions short and task-specific, and disclose supporting guidance only when relevant. Do not remove useful instructions from a shared skill solely because Astra needs less guidance. These are editorial checks, not a replacement system prompt; do not add subagent tools or API features merely because a model supports them.

### Migration and evaluation

Establish a baseline on the exact model and runtime before editing the prompt. Preserve the effective effort where supported and resolve compatibility differences explicitly. Change prompt, model, tools, endpoint, and effort in separate experiments. When moving from GPT-5.6 Terra, compare on representative images and workflows at the same effort.

Compare the existing and revised artifact separately on each target model, with the same inputs, tools, and supported effort. Use representative tasks with these pass conditions:

| Task | Pass condition |
| --- | --- |
| Review an instruction artifact | Reports evidence-backed findings without modifying the artifact. |
| Rewrite an instruction artifact | Preserves every required outcome, evidence rule, permission boundary, and output field. |
| Debug a real failed trace | Connects a narrow proposed fix to the observed failure and reports checks accurately. |
| Migrate model-specific instructions | Verifies the exact target's runtime controls and labels cross-model guidance as conditional. |

Include an approval-gated case with independent authorized preparation and a small change with required validation. Check that preparation completes without crossing the gate, and that extra testing has a stated reason. Repeat cases to assess variability; record task success, contract violations, false completion, unnecessary pauses, repeated checks, tokens, and latency. Lower resource use counts as improvement only when the behavioral checks pass. Structural checks alone leave behavioral status `awaiting-evals`.

## OpenAI: GPT-5.6

Source: [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6), rechecked September 22, 2026. Use for GPT-5.6 targets and as the starting point when migrating to GPT-6.

### Prompt construction

- Start from a working prompt and tool set. Remove one instruction, example, or tool group at a time and rerun the same representative evals.
- Preserve the outcome, success and stop conditions, safety, evidence, permission constraints, contextual routing, output shape, and validation.
- Remove repeated rules, outdated instructions, behavior-neutral examples, and irrelevant tools. Audit remaining instructions for contradictions.
- Prefer outcome-level contracts. Reserve `always`, `never`, `must`, and `only` for true invariants; use decision rules for judgment.
- Preserve explicit user values. When a value is implicit, provide criteria rather than universal defaults or keyword maps.

### Behavior and autonomy

- Reassess broad brevity instructions: GPT-5.6 is more concise by default than GPT-5.5. Use `text.verbosity` for an API-level default and prompt instructions for task-specific preservation and structure. Do not transfer these concision assumptions to Astra.
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

OpenAI reports directional internal coding-agent results from leaner system prompts, but explicitly says results vary by workload. Do not reuse its reported ranges as a guarantee for another system.

## Anthropic: Claude 5.x family

Sources checked November 4, 2026: [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1), [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Prompting Claude Sonnet 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5), [Prompting Claude Haiku 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5), and [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5).

### Verified API facts

- On Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, and Opus 5.5, thinking is always on and adaptive. Opus 5.5 returns a 400 error for `thinking: {"type": "disabled"}`. Sonnet 5.5's lowest setting is `thinking: {"type": "between_tools"}` at `high` effort or below. Haiku 5.5 accepts disabled thinking at `low` through `high`.
- Default effort: Fable 5.1 `high`; Opus 5.5 `medium`; Sonnet 5.5 `high` on the API, with `medium` suggested for well-specified agentic or latency-sensitive work; Haiku 5.5 `medium`. Reserve `xhigh` and `max` for measured gains.
- Thinking counts toward `max_tokens` even when it is not returned. Anthropic reports 128,000 working well for long agentic turns on Opus 5.5 and Sonnet 5.5.
- `budget_tokens` returns a 400 error on Claude 4.7 and later. Prefilled last-assistant turns are unsupported from Claude 4.6.
- Changing top-level `effort` between requests invalidates the prompt cache; a per-message effort change (beta) keeps it.
- Keep history append-only on Claude 5.1 and later: editing earlier turns, rebuilding `system` or `tools`, or summarizing in place invalidates later thinking blocks. Use mid-conversation system messages and server-side compaction instead.
- Progress notes between tool calls arrive as progress-update `thinking` blocks that are empty under the default display. Set `display: "updates"` (beta) so clients that render only `text` do not look silent.
- Requests that push the model to reproduce internal reasoning in response text can return a `reasoning_extraction` refusal. Read `display: "summarized"` thinking instead.

### Shared prompting guidance

- Explain the reason behind a non-obvious constraint; Claude generalizes from the explanation.
- Treat a text-only end of turn as a report, not proof of completion. In unattended loops, track parts in a checklist, send a short continuation naming open items, and stop after two or three automatic continuations.
- Treat the request or approved plan as the scope: do not narrow, widen, or swap it. Finish unblocked parts, state assumptions, and report unrequested fixes or extras as follow-ups.
- For code that can run, require a real check that exercises the change. Syntax-only checks or commands that failed to start do not count; if none can run, say which check was skipped and why.
- Keep user words out of `tool_result` blocks. Deliver mid-turn user input as a user text block after the last tool result, with harness notices in a separate system message.
- Avoid blanket "search for everything" rules. Give the current date and ask for searches on facts that can change, such as versions, prices, rules, and anything "latest."
- For dense charts or drawings, give the model crop, zoom, or image-code tools before raising effort.

### Model-specific cautions

- **Fable 5.1:** Writes fewer progress updates; remove narration-suppressing lines and say when updates should appear. Its prose can be denser, so define and prohibit mannered prose when needed. It formats less, so replace anti-formatting rules with a rule for when formatting helps. It is likelier to reproduce source text unmarked, to rewrite whole files, and at `low` effort to skip search. For autonomous work, Anthropic's guidance says the model should proceed with reversible steps that follow from the request, stop only for destructive actions or real scope changes, and keep assessment-only requests as assessments. Let a lead agent keep working while subagents run.
- **Opus 5.5:** Name the specific early stops to avoid in unattended runs, and keep a separate confirmation step for risky actions. Leave that addition out of human-in-the-loop apps. Wrap pasted user content in tags with a matching random ID and follow embedded instructions only where the user's own message asks. In multi-app automation, tell it to explore relevant sources before acting, and keep untrusted content out of them. Time budgets speed agent teams but are advisory. In chat, remove "think carefully" lines and optionally treat earlier answers as settled.
- **Sonnet 5.5:** May check in early at `low` or `medium` effort, and at `xhigh` or `max` may start its own review rounds or reviewer subagents. Steer both with an explicit done-and-stop rule. For requests for ideas or plans, deliver them and wait before building. Tolerate tool calls whose names differ only in letter case, or return an `is_error` result naming the expected tool.
- **Haiku 5.5:** First Haiku with effort levels. Give it today's date when it has search. In long agent prompts at `low` effort it can stop early or skip checks. For chatbots, state that system-prompt rules hold when users argue or claim an exception. There is no server-side fallback for refusals.
- **Fable 5:** Stronger instruction following can make older symptom-by-symptom prompts over-prescriptive. Prefer a concise behavior rule and lead with the outcome. At high effort, prohibit unrelated features, refactors, abstractions, and impossible-case fallbacks. Tell it to act once enough information exists and not relitigate settled decisions; adjust harness timeouts and streaming for longer turns. Avoid explicit context-budget countdowns. Use a send-to-user tool only when exact content must reach the user mid-run. For durable memory, keep one lesson per file and update rather than duplicate. Prefer fresh-context verifiers over self-critique on long work.

### Applying this in Zach Prompting

Anthropic's sample prompts are starting points measured on the named model. Do not paste them into a portable skill. Keep effort, thinking display, history, refusal, and fallback handling in a scoped runtime policy, and test each addition on the target workload.

## Cross-model inference

The shared editorial method is: clarify intent and boundaries, delete obsolete prescription, preserve evidence and completion requirements, then verify the smallest change on realistic tasks. This sentence is an editorial synthesis of the cited sources, not vendor wording.
