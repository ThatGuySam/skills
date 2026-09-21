# Sam's Skills

Sam's Skills contains reusable workflows for Codex, Claude Code, and other agents that support the Agent Skills format. Install a single skill or the collection bundle. Each skill keeps its instructions in `SKILL.md` and loads supporting references when needed.

## Skills

### Sales Research

Research sales decisions and draft buyer communication using relevant practitioner
sources. Covers discovery, positioning, paid diagnostics, pricing, proposals,
AI proof of concept, and sales-call reviews.

```bash
npx skills add ThatGuySam/skills --skill sales-research
```

Ask: `Use $sales-research to help me decide the next step in this sales conversation.`
Include your offer, buyer context, constraints, and the decision you need.
No private corpus or companion skill is required.

Read the [install and usage guide](apps/docs/src/content/docs/sales-research/introduction.md),
[examples](apps/docs/src/content/docs/sales-research/examples.md), and
[tester checklist](apps/docs/src/content/docs/sales-research/verification.md).

### Sam UX Audit

Audit websites and GitHub repositories through locked UX, accessibility, HIG, motion, and performance review skills. Findings include evidence, scope limits, and actionable acceptance checks.

```bash
npx skills add thatguysam/skills --skill sam-ux-audit
```

Ask: `Use $sam-ux-audit to audit this URL or GitHub repository.` The agent restores the skill's locked dependencies on first use. Request a dependency update explicitly when you want the latest upstream instructions.

Read the [guide](apps/docs/src/content/docs/sam-ux-audit/introduction.md) and [smoke evals](skills/sam-ux-audit/evals/README.md).

### Zach Prompting

Improve prompts, skills, system instructions, agent definitions, tool descriptions, `CLAUDE.md`, and `AGENTS.md` files without weakening their intent or safeguards.

```bash
npx skills add thatguysam/skills --skill zach-prompting
```

Invoke a standalone installation as `/zach-prompting` in Claude Code or `$zach-prompting` in Codex.

Example prompts:

```text
Use $zach-prompting to tighten this AGENTS.md while preserving its safety,
permission, validation, and repository-boundary rules.

Use $zach-prompting to migrate this working prompt to GPT-6 Astra one measured
change at a time.
```

Read the [Zach Prompting guide](apps/docs/src/content/docs/zach-prompting/introduction.md).

### HTMA Measure

Estimate uncertain costs, budgets, rates, risks, ROI, and market size with ranges, sources, and recommendations.

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Situations it helps with:

- you need a planning budget before vendor quotes exist;
- a stakeholder wants one number even though the evidence supports a range;
- unfamiliar work or hidden subcomponents keep making estimates too optimistic;
- "cost" could mean public price, budget allowance, likely quote, or paid amount;
- only a few observations are available, but ignoring them would waste evidence; or
- research keeps expanding without a rule for when to decide.

Example prompts:

```text
Use $htma-measure to create a planning allowance for this project before quotes arrive.
Use $htma-measure to turn this point estimate into a calibrated decision range.
Use $htma-measure to estimate this unfamiliar project by decomposing the hidden work.
Use $htma-measure to update our risk estimate from these few observations.
Use $htma-measure to tell us whether more research could still change the decision.
```

Read the [HTMA Measure README](skills/htma-measure/README.md), [guide](https://skills.samcarlton.com/overview/introduction/), and source-backed [problems it solves](https://skills.samcarlton.com/overview/problems-it-solves/).

Review or rerun the [HTMA Measure evaluation suite](skills/htma-measure/evals/README.md).

## Documentation

- Human guide: [skills.samcarlton.com](https://skills.samcarlton.com)
- Complete agent corpus: [skills.samcarlton.com/llms-full.txt](https://skills.samcarlton.com/llms-full.txt)
- Site source: [`apps/docs`](apps/docs)

## Other installation paths

Clone the repository and copy the required directory from `skills/` into your agent's skills directory:

```bash
git clone https://github.com/thatguysam/skills.git
```

The repository also ships release `0.4.0` of a marketplace bundle for Codex and Claude Code. The bundle loads every published skill; use the Skills CLI when you want only one. Its stable install ID remains `htma-measure`, while Claude Code uses the collection-level `sam` command namespace.

<details>
<summary><b>Codex</b></summary>

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add htma-measure@thatguysam-skills
```

</details>

<details>
<summary><b>Claude Code</b></summary>

```text
/plugin marketplace add thatguysam/skills
/plugin install htma-measure@thatguysam-skills
```

Claude Code namespaces bundled skills with `sam`, for example `/sam:zach-prompting` and `/sam:htma-measure`. Standalone installations keep their unbundled names. Codex skill selectors remain `$zach-prompting` and `$htma-measure`.

</details>

## Repository structure

```text
skills/
  sales-research/
    SKILL.md
    README.md
    agents/openai.yaml
    references/
    evals/
  sam-ux-audit/
    SKILL.md
    package.json
    package-lock.json
    skills-lock.json
    scripts/
    references/
    evals/
  htma-measure/
    README.md
    SKILL.md
    agents/openai.yaml
    assets/
    evals/
    references/
  zach-prompting/
    SKILL.md
    agents/openai.yaml
    references/vendor-guidance.md
```

Each skill keeps discovery metadata and the core workflow in `SKILL.md`, with conditional detail in supporting resources.

## Acknowledgments

- Sales Research uses original workflow instructions informed by the practitioners linked in its source guide. Their work remains with its publishers; inclusion does not imply endorsement.

- Sam UX Audit composes the referenced skills from Addy Osmani, Emil Kowalski, and the community HIG reviewer by dickwu using Luisa Lima’s skills-lock. The HIG reviewer is not an Apple-authored package; each dependency retains its own provenance and terms.

- Zach Prompting's name and original spark were inspired by [Zach Miles](https://zachmil.es/). Its concrete prompting methods synthesize the cited OpenAI and Anthropic guidance; it is not affiliated with or endorsed by them.
- HTMA Measure is inspired by measurement and uncertainty-management ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. It is not affiliated with or endorsed by the author or publisher.

## Contributing

Changes should keep each skill specific, portable, verifiable, and minimal. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
