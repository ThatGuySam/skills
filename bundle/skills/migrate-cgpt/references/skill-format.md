# Portable Agent Skills format

Checked 2026-10-01 against the [Agent Skills specification](https://agentskills.io/specification)
and [OpenAI skill guidance](https://learn.chatgpt.com/docs/build-skills).

The converted deliverable is a directory named after the skill, containing
`SKILL.md` with YAML frontmatter and a Markdown workflow:

```text
meeting-brief/
  SKILL.md
  references/       # only needed background/context
  assets/           # only needed templates/original non-private assets
  scripts/          # only needed deterministic operations
  agents/openai.yaml # optional OpenAI UI/dependency metadata
```

Minimal synthetic example:

```markdown
---
name: meeting-brief
description: Turn supplied meeting notes into a brief with decisions, owners, and open questions. Use when asked to summarize a meeting; ask for notes when absent.
---

Produce Decisions, Next steps, and Open questions from the supplied notes.
Keep missing owners explicit; do not invent decisions or commitments.
```

Required fields are `name` (1–64 lowercase letters, digits or hyphens, matching the
folder; no edge or consecutive hyphens) and a nonempty `description` (at most
1,024 characters). The description is the discovery contract. Optional standard
fields include `license`, `compatibility`, string-valued `metadata`, and
experimental `allowed-tools`; include them only when useful and supported.
Do not add backup fields or GPT UI settings as invented frontmatter keys.
`agents/openai.yaml` is optional host metadata, not a replacement for SKILL.md or
a working integration.

Preserve the behavior contract and link necessary long context from the workflow.
Validate the actual directory with the target's current validator (the standard
reference tool is `skills-ref validate ./meeting-brief`), inspect relative links,
and run the generated workflow. Schema validity alone does not prove behavioral
parity, installation, automatic selection, or tool availability.
