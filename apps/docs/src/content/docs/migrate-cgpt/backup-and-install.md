---
title: Back up and install
description: Preserve original GPT details privately, convert to the standard skill folder, and choose a verified installation route.
---

A portable conversion has two separate outputs: a private original-source backup
and a converted skill. This public repository contains reusable tooling,
instructions, and synthetic test fixtures. It must not contain your real GPT
instructions, knowledge, source URLs, private examples, or credentials unless
you separately approve publishing that exact material.

## Behavior

The workflow captures the original before rewriting it, verifies the captured
file inventory, translates the behavior into the Agent Skills format, and checks
the chosen destination. It does not change the original GPT during portable
conversion. OpenAI's hosted migration is a separate operation that makes the
original read-only; back up and approve that consequence before using it.

## Install the migrator

For a local supported agent:

```bash
npx skills add thatguysam/skills --skill migrate-cgpt
```

For a repeatable installation, use a reviewed immutable repository revision.
The example below pins the validated, merged migration revision; select a newer
reviewed commit when you intentionally want an update:

```bash
git clone https://github.com/ThatGuySam/skills.git
cd skills
git checkout --detach dadb6aa3dd25c2ae8bf8ae59362eee9198b0971f
npx skills add . --skill migrate-cgpt
```

Record the selected commit with the test results. Choose the intended agent/scope
in the installer. Installing the migrator does not install the new skill it will
create.

Invoke `$migrate-cgpt` in Codex, `/migrate-cgpt` in standalone Claude Code, or
`/sam:migrate-cgpt` in the Claude collection. Example:

```text
Back up the original details and available files of this GPT I own to my private
backup folder. Then use $migrate-cgpt to convert its workflow into a separate
skill folder. Keep missing knowledge and Actions explicit; do not publish my
originals. I want to test the result in ChatGPT Web if my account supports it.
```

## Inputs & outputs

Provide authorized creator/editor access or saved instructions and source files.
A public GPT chat page is insufficient. Capture name, description, instructions,
starters, knowledge files, Action schemas without secrets, capability/model
settings, ownership/sharing, version, capture time, and relevant task context.
Use `null` for unknown metadata and mark unavailable files `missing`.

Follow the canonical [backup procedure](https://github.com/ThatGuySam/skills/blob/main/skills/migrate-cgpt/references/backup.md).
The optional Python helper copies only explicitly listed, reviewed files into a
new private folder and verifies SHA-256/byte counts. It refuses an existing
output or a Git checkout as the backup destination. It is a file-snapshot helper,
not a browser exporter, secret scanner, or GPT restore API. The manifest and
original files stay outside the converted skill and public repository.

Convert into a separate directory using the
[Agent Skills specification](https://agentskills.io/specification):

```text
my-workflow/
  SKILL.md
  references/        # required context, linked from the workflow
  assets/            # required templates or non-private assets
  scripts/           # necessary deterministic helpers only
  agents/openai.yaml # optional OpenAI metadata
```

`SKILL.md` contains YAML `name` and `description`, then the workflow in Markdown.
The lowercase name matches the folder; the description says when to use it.
Preserve inputs, outputs, evidence rules, approval boundaries, missing-file
behavior, and completion criteria. The backup manifest is separate project
metadata, not an extra Agent Skills frontmatter schema.

## Choose the destination

### Save a folder or a Git repository

A saved folder is portable source. For local Codex installation, place the
reviewed folder in `~/.agents/skills/` for user scope or `.agents/skills/` for
repository scope. Inspect a same-name installation before copying and avoid
overwriting user changes. Check `/skills` or `$` discovery and run a fresh task.
Other agents have their own discovery paths.

For a skills repository, use its canonical `skills/<name>/` layout and PR rules.
Verify the remote commit and provide an installation command for that repository.
Do not equate a pushed folder with runtime installation. If originals must also
be stored in Git, use an explicitly approved private repository and verify its
visibility and audience first; public conversion permission does not cover raw
backups. The snapshot helper does not upload or initialize Git.

### Use ChatGPT Web

OpenAI documents standalone skills for desktop/CLI/IDE and plugin-bundled skills
for Chat and Work on Web. A GitHub folder or ZIP alone does not establish a Web
installation. [Current skill guidance](https://learn.chatgpt.com/docs/build-skills)

- For an eligible published GPT you own, use My GPTs → Created by me → Migrate to
  plugin after backing up. This makes the original read-only. Review the private
  replacement under Customize → Plugins, install it, and run a fresh chat.
  [Official migration steps](https://learn.chatgpt.com/docs/migrate-custom-gpts)
- For a converted folder, use the account's supported plugin-authoring/install
  route. `@plugin-creator` can help where available. A portable package uses root
  `plugin.json` and `skills/<name>/SKILL.md`; this repository also retains the
  supported Codex compatibility manifest. Manifest validation is separate from
  actual installation. [Plugin packaging](https://developers.openai.com/plugins/build/plugins)
- Enterprise admins have a documented GitHub route: Admin → Plugins → Add →
  Import marketplace, then enter the repository URL and optional path/ref.
  Review the import and installation policy. This admin route is not a promise
  that personal Pro accounts have the same controls. [Admin import guide](https://learn.chatgpt.com/docs/enterprise/plugin-management)

If the control is absent, check the account/workspace's current eligibility and
permissions. Keep the folder deliverable and report Web installation pending.
Do not publish a draft GPT, change sharing, grant persistent access, or add an
MCP server merely to work around an unavailable install route. Actions require
separate integration work and authentication; an OpenAPI file does not supply a
working tool.

## States & edge cases

A verified snapshot can still be incomplete. Missing files, unavailable tools,
and an untested target must stay visible as `partial`, `blocked`, or
`awaiting-evals`. Report byte preservation separately from behavioral parity.
Keep snapshots append-only with a new directory per capture. A checksum catches
accidental corruption; it does not prove creator ownership, completeness,
secret removal, or authenticity if both files and manifest were altered.

## Data shape

Each backup artifact records its ID, kind, capture status, relative path or null,
and a reason for omissions. Completed captured files add a SHA-256 digest and
byte count. The private source metadata retains original settings and context.
Each converted component separately records preserved/adapted/missing/excluded
status, and every test records input, expected requirements, actual output,
runtime/revision, and pass/fail/blocked. Public examples are synthetic.

## Hand-test checklist

Run this on one GPT you own before a batch. These are test steps, not a claim
that this repository has exercised your GPT or account.

- Confirm creator access and inspect the original in the authorized editor
- Capture exact visible instructions, original files, settings, useful prompts,
  and known missing components privately; review for secrets
- Create and verify the backup; reopen files and reconcile the inventory with
  the editor; verify the original GPT has not been changed
- Review the converted skill against the original contract and validate its
  frontmatter, relative links, and any scripts
- Install on the selected target and check a fresh session discovers it
- Run a familiar request, one harder case, and a missing-input/dependency case;
  retain actual outputs and compare with prewritten requirements
- Separately test automatic selection and a nearby unrelated request
- Check knowledge citations, exact output formats, and draft/send boundaries;
  exercise live Actions only when the external effect is specifically authorized
- For hosted migration, approve the read-only effect first; verify the replacement
  stays private and required tools work before sharing or switching
- Record revision, target/account surface, results, gaps, and rollback location;
  do not claim original-GPT parity if the original could not be run

See [verification evidence and remaining limits](/migrate-cgpt/verification/).
