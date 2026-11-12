# Sources and migration

Phone Size is a portable synthesis, not an official Poteto, Matt Pocock or Linear package. It has no runtime dependency on another skill or hosted service.

## Contributions

- **Phone-roll**, the preceding local workflow: preserve the full decision payload, causal limits, source access boundaries, semantic coverage and actual geometry checks. The name, fixed four-card schema and required three-to-five routes are replaced. Existing phone-roll JSON is source material to reinterpret, not the required output format.
- **Lauren Tan's pstack**, inspected at `cursor/plugins` revision `2f8377461fd533f5af782e1fd643783b1067b847`: [ketchup](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/skills/ketchup/SKILL.md), [teach](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/skills/teach/SKILL.md), [recall](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/skills/recall/SKILL.md), [technical-writing](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/skills/technical-writing/SKILL.md), [unslop](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/skills/unslop/SKILL.md), and [Benny triage](https://github.com/cursor/plugins/blob/2f8377461fd533f5af782e1fd643783b1067b847/pstack/automations/benny/skills/triage-issue-reports/SKILL.md). They inform complete short briefs, plain language, current context, honest evidence and self-contained bug reports. Its Minimize Reader Load and Subtract Before You Add principles informed shallow disclosure and removing redundant policy.
- **Matt Pocock's [to-tickets](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md)**: observable outcomes and genuine dependencies rather than implementation-layer checklists. The inspected Writing for Agents methods informed conditional reference pointers. Live upstream links can change; they are provenance, not instructions to download and execute.
- **Lauren Tan's [communication essay](https://www.no.lol/2018-02-26-an-engineers-guide-to-communication/)**: facts, context and a specific request. **[Interview communication](https://www.no.lol/2019-03-25-maximizing-success-in-engineering-interviews/)**: high-level explanation before technical depth.
- **[Linear's editor](https://linear.app/docs/editor)**: native disclosure operations; capability must still be checked for the actual write path.

The phone dimensions, composition budget and acceptance checks are this workflow's design choices, not measured universal limits or claims by those authors. The instructions are original synthesis. Authoring used Sam's Skill Creator's locked sources; its integrity receipt and scoped validation are retained under `evals/`.

## Terminal grid

Added November 12, 2026. The terminal guidance separates what was measured from what is assumed:

- **Measured**, in one Claude Code 2.1 session on macOS inside a 77-column, 67-row terminal: a tool shell reported 80 columns from `tput cols`, 0 from `$COLUMNS`, and no terminal from `stty size`; the ancestor-terminal lookup in `scripts/terminal_fit.py grid` returned 77 by 67, matching the multiplexer's own report; Claude Code indented reply text and fenced blocks by 2 columns.
- **Assumed**: the 40-column and 20-row phone grid. No phone terminal was measured. The column figure is arithmetic from phone widths and text sizes; the row figure is a judgment.
- **Untested**: the lookup inside Codex CLI or a sandbox that hides parent processes, any phone client's actual grid, how terminals other than the one tested draw emoji followed by a variation selector, and terminals set to draw ambiguous-width characters such as box-drawing lines and arrows two columns wide (the count takes them as one).

The continuation-row rule for trees and the record form for tables are this workflow's design choices.

## Replacing phone-roll

Install `phone-size` as the canonical skill. Preserve existing phone-roll scripts, schemas and saved artifacts for callers that still need them. Replace its discovery entry with an explicit-only compatibility alias that loads phone-size when invoked. Do not delete older outputs or silently change their schemas. Inspect any script callers separately before retiring the legacy tools.

An old name should route to one maintained workflow, not retain a competing set of authoring rules. Existing global paths and installation conventions vary; preserve unrelated skills and use the runtime's supported discovery directory. Creating or installing this skill does not authorize executing its future publishing or tracker-editing actions.
