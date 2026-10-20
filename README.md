# Sam's Skills

Sam's Skills contains reusable workflows for Codex, Claude Code, and other agents that support the Agent Skills format. Install a single skill or the collection bundle. Each skill keeps its instructions in `SKILL.md` and loads supporting references when needed.

## Skills

<!-- skills:start:readme-catalog -->
| Skill | Use it for | Guide |
| --- | --- | --- |
| Phone Size | Condense tasks, decisions, research, and updates into a phone-screen brief with supporting detail. | [phone-size](apps/docs/src/content/docs/phone-size/introduction.md) |
| Sam's Tree | Organize notes and other material into familiar, scannable trees. | [sams-tree](apps/docs/src/content/docs/tree-status/introduction.md) |
| Sam's Status | Show project work as a status tree with sources, progress, and missing information. | [sams-status](apps/docs/src/content/docs/tree-status/introduction.md) |
| Env Example | Draft annotated environment examples with useful setup guidance and a static checker. | [env-example](apps/docs/src/content/docs/env-example/introduction.mdx) |
| Andrej Explain | Explain complex material and agent work through useful text, diagrams, HTML, or video. | [andrej-explain](apps/docs/src/content/docs/andrej-explain/introduction.md) |
| Migrate Custom GPTs | Back up GPT workflows privately and convert them to portable skills while tracking migration gaps. | [migrate-cgpt](apps/docs/src/content/docs/migrate-cgpt/introduction.md) |
| Sales Research | Research sales decisions and draft buyer communication using relevant practitioner sources. | [sales-research](apps/docs/src/content/docs/sales-research/introduction.md) |
| Sam's Gen Writing | Draft, review, or plan AI-assisted pages using Google's published Search guidance. | [sams-gen-writing](apps/docs/src/content/docs/sams-gen-writing/introduction.md) |
| Sam's Skill Creator | Create and improve agent skills with locked authoring sources and behavioral validation. | [sams-skill-creator](apps/docs/src/content/docs/sams-skill-creator/introduction.md) |
| Sam UX Audit | Audit websites and repository UX with locked review dependencies and evidence-backed findings. | [sam-ux-audit](apps/docs/src/content/docs/sam-ux-audit/introduction.md) |
| Zach Prompting | Improve prompts and agent instructions while preserving their intent and safeguards. | [zach-prompting](apps/docs/src/content/docs/zach-prompting/introduction.md) |
| HTMA Measure | Estimate uncertain quantities with ranges, sources, and decision recommendations. | [htma-measure](apps/docs/src/content/docs/overview/introduction.md) |
<!-- skills:end:readme-catalog -->

Install a listed skill with `npx skills add ThatGuySam/skills --skill <id>`. Each linked guide includes usage examples and verification limits. Sam's Skill Creator and Sam UX Audit restore their locked dependencies on first use.

## Try a skill

These examples show a few ways to start after installation:

```text
Use $sams-skill-creator to turn this workflow into a focused, tested skill.
Use $env-example to draft this project's .env.example.
Use $htma-measure to create a planning allowance for this project before quotes arrive.
```

For skill authoring, review the [validation record](skills/sams-skill-creator/evals/results.md). First use requires Node.js, npm, and Git to restore the private dependency set. Ordinary runs keep that set locked. Request a refresh explicitly.

For measurement, the [HTMA Measure README](skills/htma-measure/README.md) explains the workflow, and its [evaluation suite](skills/htma-measure/evals/README.md) records verification. For environment templates, the [synthetic test contract](skills/env-example/evals/contract.md) documents the checker limits.

## Documentation

- Human guide: [skills.samcarlton.com](https://skills.samcarlton.com)
- Complete agent corpus: [skills.samcarlton.com/llms-full.txt](https://skills.samcarlton.com/llms-full.txt)
- Site source: [`apps/docs`](apps/docs)

## Other installation paths

Clone the repository and copy the required directory from `skills/` into your agent's skills directory:

```bash
git clone https://github.com/thatguysam/skills.git
```

The repository also ships a marketplace bundle for Codex and Claude Code. The bundle loads every published skill; use the Skills CLI when you want only one. Its stable install ID remains `htma-measure`, while Claude Code uses the collection-level `sam` command namespace.

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

<!-- skills:start:readme-tree -->
```text
skills/
├── phone-size/
├── sams-tree/
├── sams-status/
├── env-example/
├── andrej-explain/
├── migrate-cgpt/
├── sales-research/
├── sams-gen-writing/
├── sams-skill-creator/
├── sam-ux-audit/
├── zach-prompting/
└── htma-measure/
```
<!-- skills:end:readme-tree -->

Each skill keeps discovery metadata and the core workflow in `SKILL.md`, with conditional detail in supporting resources.

## Acknowledgments

- Andrej Explain is inspired by Andrej Karpathy’s writing about understanding model outputs and the sources in its research memo. It is not affiliated with or endorsed by him.

- Sales Research uses original workflow instructions informed by the practitioners linked in its source guide. Their work remains with its publishers; inclusion does not imply endorsement.

- Sam UX Audit composes the referenced skills from Addy Osmani, Emil Kowalski, and the community HIG reviewer by dickwu using Luisa Lima’s skills-lock. The HIG reviewer is not an Apple-authored package; each dependency retains its own provenance and terms.

- Zach Prompting's name and original spark were inspired by [Zach Miles](https://zachmil.es/). Its concrete prompting methods synthesize the cited OpenAI and Anthropic guidance; it is not affiliated with or endorsed by them.
- HTMA Measure is inspired by measurement and uncertainty-management ideas popularized by Douglas W. Hubbard's *How to Measure Anything*. It is not affiliated with or endorsed by the author or publisher.

## Contributing

Use trunk-based development for ordinary authorized changes: validate and publish directly to `main`, with branches or pull requests for explicit requests or required repository rules. Changes should keep each skill specific, portable, verifiable, and minimal. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

Sam's Skill Creator mixes methods from Anthropic, Matt Pocock, Poteto, and Zach Prompting using the locked upstream sources. Its bundled Codex creator snapshot retains its Apache-2.0 license; downloaded ingredients retain their respective licenses.
