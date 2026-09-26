# Sales Research

Research a sales decision, prepare a discovery conversation, review a sales call,
or draft a prospect reply. The skill selects relevant practitioners, checks the
evidence, and leads toward a concrete next step.

## Install

With Node.js and npm available, run this from the project where you want the skill:

```bash
npx skills add ThatGuySam/skills --skill sales-research
```

Choose your agent in the installer. Add `--global` to use it across projects, or
`--agent codex` / `--agent claude-code` to select one agent explicitly.

## Use

```text
Use $sales-research to help me prepare a discovery call. I sell [your service]
to [buyer type]. Here is what they have said: [redacted context]. Help me choose
what to ask, what to defer, and what decision to reach by the end of the call.
```

Bracketed fields are inputs to replace, not facts. Codex uses `$sales-research`;
standalone Claude Code uses `/sales-research`. The collection's Claude plugin
uses `/sam:sales-research`. Other agents can use the plain-language request
"Use the sales-research skill".

Read the [installation and usage guide](https://github.com/ThatGuySam/skills/blob/main/apps/docs/src/content/docs/sales-research/introduction.md),
[example prompts](https://github.com/ThatGuySam/skills/blob/main/apps/docs/src/content/docs/sales-research/examples.md),
[source guide](references/sources.md), and [test scenarios](evals/README.md).
The installed workflow is self-contained in `SKILL.md` and `references/`.

No other skills or private corpus are required. Web access is useful for fresh
research; without it, the agent must disclose evidence limits. This is an
experimental shared workflow, not a guarantee of sales results.
