# HTMA Measure

**Turn uncertain questions into decision-ready, calibrated estimates.**

`htma-measure` is an agent skill for estimating costs, budgets, rates, risks, ROI, market size, and other uncertain quantities. It forces the decision threshold, separates facts from inference, decomposes the estimate, reports a range instead of false precision, and identifies the next measurement worth making.

## Documentation

- Human guide: [skills.samcarlton.com](https://skills.samcarlton.com)
- Complete agent corpus: [skills.samcarlton.com/llms-full.txt](https://skills.samcarlton.com/llms-full.txt)
- Site source: [`apps/docs`](apps/docs)

## Quick Start

Install with the open [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Or clone the repository and copy `skills/htma-measure` into your agent's skills directory:

```bash
git clone https://github.com/thatguysam/skills.git
```

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

## What It Does

The skill guides an agent to:

1. Define the decision, quantity, unit, time horizon, threshold, and cost of being wrong.
2. Separate confirmed evidence from assumptions and inference.
3. Build a low / central / high decomposition from direct evidence and reference classes.
4. Report a calibrated interval and central estimate without laundering weak inputs through simulation.
5. Rank remaining uncertainty by value of information.
6. Produce a reusable Markdown memo with an `HTMA_RESULT` JSON appendix.

Example prompts:

```text
Use $htma-measure to estimate the likely paid cost of this local event contract.
Use $htma-measure to estimate whether this project can clear our ROI threshold.
Use $htma-measure to size this market and tell me what evidence would most change the decision.
```

## Repository Structure

```text
skills/
  htma-measure/
    SKILL.md
    agents/openai.yaml
    assets/measurement-brief-template.md
    references/
```

The repository follows the portable Agent Skills pattern: concise discovery metadata, a workflow-focused `SKILL.md`, and supporting material loaded only when needed.

## Acknowledgment

This independent skill is inspired by measurement and uncertainty-management ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. It is not affiliated with or endorsed by the author or publisher.

## Contributing

Changes should keep the skill specific, verifiable, evidence-driven, and minimal. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
