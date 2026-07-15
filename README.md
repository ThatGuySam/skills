# Sam's Skills

- `Tease:` Skills Sam actually uses, packaged to share.
- `Lede:` This repository is Sam's public collection of reusable skills for Codex, Claude Code, and other agents that support the open Agent Skills format.
- `Why it matters:` Each skill captures a focused workflow that has earned a place in Sam's toolkit, keeps its core contract in `SKILL.md`, and loads conditional detail only when needed.
- `Go deeper:` Choose one skill below or install the marketplace bundle to get the collection.

## Skills

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

The repository also ships release `0.2.0` of a marketplace bundle for Codex and Claude Code. The bundle loads every published skill; use the Skills CLI when you want only one. Its stable install ID remains `htma-measure`, while Claude Code uses the collection-level `sam` command namespace.

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
  htma-measure/
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

- Zach Prompting's name and original spark were inspired by [Zach Miles](https://zachmil.es/). Its concrete prompting methods synthesize the cited OpenAI and Anthropic guidance; it is not affiliated with or endorsed by them.
- HTMA Measure is inspired by measurement and uncertainty-management ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. It is not affiliated with or endorsed by the author or publisher.

## Contributing

Changes should keep each skill specific, portable, verifiable, and minimal. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
