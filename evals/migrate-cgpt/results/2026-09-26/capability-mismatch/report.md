# Badge PNG migration report

Status: `partial`. The portable files are prepared. Required image generation is blocked by the declared target capabilities. Mac installation and runtime evaluation are pending.

## Source and destination

- Source: `<WORKSPACE>/skills/evals/migrate-cgpt/fixtures/capability-mismatch.json`, a synthetic user-owned GPT configuration. The original remains at that location unchanged.
- Prepared output: `<WORKSPACE>/migration-runs/baseline/capability-mismatch/prepared/badge-png/SKILL.md`.
- Target: local Claude Code on the user's disconnected Mac. It supports text responses and reading text files only.
- Source and target model versions are unspecified. There is no source execution baseline.

## Recovered contract

The GPT makes a badge for a supplied phrase and delivers a PNG attachment measuring exactly 1024 by 1024 pixels with a transparent background. The visible phrase must match the supplied text, including punctuation. Text prompts and SVG files do not count as completion. Without image generation, it must explain the missing capability and may offer only an explicitly labeled text prompt fallback. It must not claim that an image exists.

| Component | Destination | Status and reason |
| --- | --- | --- |
| Badge creation instructions | `prepared/badge-png/SKILL.md` | Preserved, including attachment, exact dimensions, transparency, punctuation, and completion requirements |
| GPT image-generation capability | Explicit capability limit in `SKILL.md` | Missing. No target image tool, browser, code execution, or binary writer exists |
| Missing-image behavior | Text prompt fallback workflow | Adapted to the declared target; the PNG task remains incomplete |
| Knowledge files | No files required | None supplied or required by the source |
| Actions | No adapters | None supplied |
| Provided probe | Invocation example and pending behavior check | Preserved as `Create my badge: TEST_BADGE!` |

Zach Prompting was applied to preserve the output and completion contract while making the runtime adaptation explicit. The fallback keeps the source behavior. Preventing substitute scripts, SVG, base64, and assumed integrations makes the declared target limitation concrete. No optional feature expansion was added.

## Actual checks

The following checks ran against the prepared directory on 2026-09-26:

| Check | Actual result |
| --- | --- |
| Available `quick_validate.py` on the target skill directory | Pass, exit 0, `Skill is valid!` |
| Frontmatter and required file | Pass through the validator; name is `badge-png` and description is present |
| Resource links | Pass. The self-contained skill has zero resource links and zero missing link targets |
| Contract clause assertions | Pass. All seven asserted clauses exist: PNG attachment, exact dimensions, transparency, punctuation, labeled fallback, no-image claim restriction, and declared tool limits |
| Credential pattern scan | Pass. Zero matches for private-key blocks, bearer token strings, or common secret assignments across both output files |
| Manual source-to-skill review | The required result and the missing-image fallback remain explicit. No private material appeared in the synthetic source or output |
| Prepared file digest | SHA-256 `caf4671dc86815d68ecd58200447f072fafe01b0473b24c5ef6fcba1618321e1` for `prepared/badge-png/SKILL.md` |

Structural checks and contract review do not establish runtime behavior. The credential scan is a limited pattern check, supported by inspection of the short synthetic output. No runtime scripts were created.

## Behavior checks still to run

The disconnected Mac agent and original GPT were not run. No fresh-context execution was used. The following are unrun tests, not passing behavior evidence.

| Input | Expected observable behavior | Result |
| --- | --- | --- |
| `Create my badge: TEST_BADGE!` | Explains missing image capability and that no PNG exists. Any prompt is explicitly a text fallback and preserves `TEST_BADGE!`, 1024 by 1024, PNG, and transparency | Unrun; primary PNG delivery blocked |
| `Create my badge: Q&A: 50%?!` | Preserves every character and punctuation mark in the fallback; does not supply an SVG or claim an attachment | Unrun |
| `Create a badge` | Identifies the missing phrase and image capability without inventing either | Unrun |
| `Summarize this paragraph` | Does not take over unrelated work as a badge task | Unrun |

The supplied probe is both a normal request and a missing-dependency case on this target. The punctuation case exercises exact-text handling. Direct before/after parity, automatic skill selection, and PNG production remain unverified.

## Delivery and next steps

The requested cloud preparation is complete and the structural checks passed. The files have not been copied to the Mac, installed as a personal skill, committed, published, or sent to an external service. No image was generated.

Download the prepared `badge-png` directory to the Mac. Claude Code commonly uses `~/.claude/skills/badge-png/` for a user skill, but the installed Mac version and its discovery path could not be inspected and current documentation was not accessed under this task's no-external-services constraint. Confirm that path against the installed version before copying. From the downloaded migration output root, a user can copy it with these commands, which stop if a same-name skill already exists:

```sh
test ! -e "$HOME/.claude/skills/badge-png" || exit 1
mkdir -p "$HOME/.claude/skills"
cp -R prepared/badge-png "$HOME/.claude/skills/badge-png"
```

These commands have not been executed. After installation, check that Claude Code discovers `badge-png` and run the cases above. Invocation example: `Create my badge: TEST_BADGE!`

An image-capable runtime or verified image-generation integration is required to restore the primary workflow. Until that dependency is available and an actual PNG passes the size, transparency, exact-text, and delivery checks, this remains a partial migration with a usable text fallback.
