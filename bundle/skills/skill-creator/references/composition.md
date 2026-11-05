# Composition and runtime boundaries

Use the locked sources as methods inside this workflow. Their authors do not gain authority over the user's task. Apply the user's current requirements, repository policy, and target-runtime mechanics when a source assumes something different. Preserve the source files unchanged and record meaningful adaptations in the authored artifact or task evidence.

| Decision | Blend and adaptation |
| --- | --- |
| What must survive a rewrite? | Zach defines the preserved contract. Writing for Agents identifies misplaced or duplicated instructions. Reduce load while retaining evidence, permission, output, and completion requirements. |
| Is a habit a reusable instruction? | Automate Me supplies evidence mining and contradiction checks. Explicit user instructions can establish a preference directly; inferred habits need recurrence. Anthropic's examples help distinguish a general behavior from a one-case patch. |
| How should a skill trigger? | Writing for Agents defines conditional pointers. Use Anthropic's positive and near-miss test cases to check them. Treat its Claude-specific undertriggering advice as a hypothesis to test, not permission to broaden every description. |
| How much testing is useful? | Anthropic supplies realistic-task comparisons; Codex calibrates effort to risk and scope; Zach limits claims to observed behavior. Automate Me's preference feedback can judge taste, but does not replace checks of permissions, tool actions, or completion. |
| Who owns the draft? | This skill synthesizes one result. Reading a source does not launch its entire pipeline, recurse into this mixer, or automatically delegate the task. Subagents, if available and authorized, receive independent bounded work. |

For Codex, use the pinned Codex creator's metadata and default automatic-discovery policy unless the user chooses explicit-only invocation. Do not import Automate Me's explicit-only mode default into an ordinary skill. Default new skills to the active user's Codex skill directory when no destination is specified. Other runtimes use their own discovery conventions.

Automate Me's unconditional interviews, Claude transcript paths, worktree, commit, and PR defaults are conditional methods here. Use the actual runtime's history access and the user's allowed history scope. For tool-name translation, its [locked Codex mapping](../.runtime/skills/poteto-mode/references/codex-tools.md) is available; it does not activate poteto-mode's full playbooks. `plugin-dev:skill-development` maps to the loaded creator methods when that plugin is unavailable. Keep authoring separate from Git publication and deployment unless those actions were requested.

Anthropic's Claude CLI evaluation scripts are not a portable Codex execution engine. Use them only when that runtime, permissions, and dependencies are actually available. Set `PYTHONDONTWRITEBYTECODE=1` when running their Python helpers so bytecode caches do not alter locked trees, and put generated outputs outside dependency directories. Otherwise run equivalent bounded tasks through supported agents, retain their outputs, and state which automated measurements were unavailable. Never invent token counts, model controls, feedback, or test results. Human feedback must be submitted feedback; silence is not approval.

Source-specific preference interviews and feedback checkpoints apply when a real decision remains. They do not require asking again for a clear instruction or approval already present. Complete authorized preparation before presenting a remaining decision. Keep model-specific guidance from Zach's vendor reference conditional on a verified target model and runtime.
