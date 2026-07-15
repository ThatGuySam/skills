# ThatGuySam Skills

- `Tease:` Portable agent skills for clearer instructions and better decisions.
- `Lede:` This repository publishes reusable skills for Codex, Claude Code, and other agents that support the open Agent Skills format.
- `Why it matters:` Each skill keeps a focused workflow in `SKILL.md` and loads conditional detail only when needed.
- `Go deeper:` Choose a skill below, install only that directory with the Skills CLI, or use the backward-compatible marketplace bundle.

## Skills

### Zach Prompting

Improve prompts, skills, system instructions, agent definitions, tool descriptions, `CLAUDE.md`, and `AGENTS.md` files without weakening their intent or safeguards.

```bash
npx skills add thatguysam/skills --skill zach-prompting
```

Example prompts:

```text
Use $zach-prompting to tighten this AGENTS.md while preserving its safety,
permission, validation, and repository-boundary rules.

Use $zach-prompting to migrate this working prompt to GPT-5.6 one measured
change at a time.
```

Read the [Zach Prompting guide](apps/docs/src/content/docs/zach-prompting/introduction.md).

### HTMA Measure

Turn uncertain costs, budgets, rates, risks, ROI, market size, and other quantities into calibrated, decision-ready estimates.

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Example prompts:

```text
Use $htma-measure to estimate the likely paid cost of this local event contract.
Use $htma-measure to estimate whether this project can clear our ROI threshold.
```

Read the [HTMA Measure guide](https://skills.samcarlton.com/overview/introduction/).

## Documentation

- Human guide: [skills.samcarlton.com](https://skills.samcarlton.com)
- Complete agent corpus: [skills.samcarlton.com/llms-full.txt](https://skills.samcarlton.com/llms-full.txt)
- Site source: [`apps/docs`](apps/docs)

## Other installation paths

Clone the repository and copy the required directory from `skills/` into your agent's skills directory:

```bash
git clone https://github.com/thatguysam/skills.git
```

The repository also ships a marketplace bundle for Codex and Claude Code. Its plugin ID remains `htma-measure` for backward compatibility, while release `0.2.0` loads both current skills. Use the Skills CLI when you want only one skill.

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

</details>

## Repository structure

```text
skills/
  htma-measure/
    SKILL.md
    agents/openai.yaml
    assets/
    references/
  zach-prompting/
    SKILL.md
    agents/openai.yaml
    references/vendor-guidance.md
```

Each skill keeps discovery metadata and the core workflow in `SKILL.md`, with conditional detail in supporting resources.

## Acknowledgments

- Zach Prompting's name and original spark were inspired by [Zach Miles](https://zachmil.es/). Its concrete prompting methods synthesize the cited OpenAI and Anthropic guidance; it is not affiliated with or endorsed by them.
- HTMA Measure is inspired by measurement and uncertainty-management ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. It is not affiliated with or endorsed by the author or publisher.

## Contributing

Changes should keep each skill specific, portable, verifiable, and minimal. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
