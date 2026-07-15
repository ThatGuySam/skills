# HTMA Measure Evals

- `Tease:` Measure changes before trusting them.
- `Lede:` This directory preserves the portable parts and aggregate history of the original HTMA evaluation program, then adds a regression runner for comparing skill revisions on the same cases and scorer.
- `Why it matters:` The historical results established useful behavior, but their raw holdouts were intentionally private. The portable suite makes repeatable regression checks possible without pretending its visible answer key is a sealed holdout.
- `Go deeper:` Run the H12 regression below, inspect `archive/2026-05-26/` for the original H1-H12 protocols and aggregate results, and keep fresh holdouts under ignored `private/` storage.

## What Is Here

| Path | Purpose | Evidence status |
| --- | --- | --- |
| `cases/h12-regression.md` | Ten sanitized numeric and behavioral cases from the original H12 A/B | Transparent regression set |
| `fixtures/h12-regression-key.json` | Deterministic numeric and behavior expectations | Visible scorer key; not a holdout |
| `scripts/run_claude.py` | Tool-free, isolated Claude CLI runner with provenance metadata | Reproducible model run |
| `scripts/score_h12.py` | Deterministic scorer ported from the original H12 run | Reproducible aggregate scoring |
| `archive/2026-05-26/` | Scrubbed aggregate H1-H12 history and generic scoring utilities | Historical evidence |
| `private/` | Optional local sealed cases, answer keys, outputs, and mappings | Ignored; never publish |

The H12 prompt packet was originally kept private to preserve a sealed comparison. It is safe and sanitized, but publishing it here changes its role: it is now a transparent regression set. Do not cite a pass here as fresh holdout evidence.

## Run A Model

Prerequisites:

- Python 3.11 or newer
- an authenticated Claude Code CLI

From the repository root:

```bash
python3 skills/htma-measure/evals/scripts/run_claude.py \
  --skill-dir skills/htma-measure \
  --cases skills/htma-measure/evals/cases/h12-regression.md \
  --output skills/htma-measure/evals/runs/current.md \
  --model sonnet \
  --effort high
```

The runner disables model tools, executes from a fresh temporary directory, passes only the skill bundle and case packet, and writes a sibling `.run.json` file containing timestamps, hashes, CLI version, model, and effort. It does not guarantee provider-side determinism; compare variants in the same session with the same runner settings.

## Score One Or More Variants

```bash
python3 skills/htma-measure/evals/scripts/score_h12.py \
  --key skills/htma-measure/evals/fixtures/h12-regression-key.json \
  --summary skills/htma-measure/evals/runs/summary.json \
  --details skills/htma-measure/evals/runs/details.json \
  current=skills/htma-measure/evals/runs/current.md
```

Add another `name=path` argument to compare a candidate. A sharded run may use `name=first.md,second.md`; files are joined in the listed order before scoring. The scorer reports:

- parse validity and allowed status use;
- correct numeric versus blocked-state behavior;
- target-mode clarity;
- numeric coverage, central error, signed bias, and interval width;
- evidence, value-of-information, burden, and privacy proxies.

These are regression signals, not a substitute for real human ratings or a new sealed holdout.

## Evaluation Discipline

1. Freeze the baseline skill and evaluator before drafting a candidate.
2. Have the candidate author avoid cases, keys, prior outputs, and aggregate results.
3. Change one instruction group at a time.
4. Run baseline and candidate with the same model, effort, tool policy, cases, and scorer.
5. Inspect aggregate metrics before per-case details.
6. Use a fresh private holdout for promotion claims; keep it outside Git.
7. Record regressions and null results. Do not tune against individual answer keys.

## Historical Boundary

The archived research intentionally omitted private actuals, raw model outputs, source ledgers, blinded mappings, and human score sheets. That boundary remains in force. This port includes only already-public research artifacts plus the sanitized H12 packet reclassified as a visible regression test.
