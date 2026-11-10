# Skill demos

Each folder here records one skill's default prompt running in Codex. The recordings become a GIF for READMEs and an MP4 for the docs site.

- Docs pages show the MP4 under **See it run**, after the invocation line.
- Skill READMEs that already exist show the GIF before their first section.
- The repository README shows the Agent Verify GIF.

## What a demo contains

```text
demos/<skill-id>/
├── demo.json         # options; {} is enough
├── workspace/        # synthetic files, committed as the starting repo
├── changes/          # optional: copied over as uncommitted work ("verify this work")
├── recording.cast    # asciinema recording, the source for the media
└── recording.json    # date, Codex version, model, prompt, playback speed
```

`demo.json` options:

| Key | Default | Use |
| --- | --- | --- |
| `stdin` | none | Workspace file piped to Codex. Codex appends it to the prompt, so "this material" has something to refer to. |
| `prompt` | `default_prompt` in `skills/<id>/agents/openai.yaml` | Only for skills without a default prompt. |
| `codexConfig` | `[]` | Extra top-level `config.toml` lines, such as `web_search = "live"`. |
| `timeoutMinutes` | `15` | Recording timeout. |

Every fixture must be invented and say so in its first lines. Never use real client, personal, or machine data.

## Record, render, embed

Requirements: a signed-in Codex CLI, [asciinema](https://asciinema.org) 3, [agg](https://github.com/asciinema/agg), and ffmpeg. On macOS: `brew install asciinema agg ffmpeg`.

```bash
node scripts/demo.mjs record sams-tree     # or: record all, --model <id>, --effort <level>
node scripts/demo.mjs render sams-tree     # GIF and MP4 in apps/docs/public/demos/
node scripts/demo.mjs embed                # update docs pages and READMEs, then the bundle
node scripts/demo.mjs --check              # fail if embeds are stale or a recording leaks
```

A recording runs `codex exec` with the exact prompt typed on screen, in a throwaway home under `/tmp`:

- The home has only the demoed skill in `~/.agents/skills`, so your global `AGENTS.md`, other skills, and shell environment never reach the agent.
- Codex runs with `workspace-write` sandboxing, no approvals, `medium` reasoning, and no saved history.
- Your Codex sign-in is copied in for the run. If Codex refreshes it, the refreshed copy is written back so the original stays valid.

Recording replaces the local account name, which tools such as `ls -l` print, with `demo`. Recording and rendering then refuse a cast that still shows that name, a home-directory path, an email address other than `example.com`, or something shaped like an API key or token. List harmless matches, such as a placeholder address quoted by a dependency, in `allowedText`. Still review every transcript (`asciinema convert -f txt`) and watch the GIF before publishing. The check catches patterns, not judgment calls.

Rendering caps each pause at two seconds and speeds playback up to 8x, aiming for about 45 seconds. The final frame holds for 10 seconds so the result can be read. Captions state the recording date, Codex version, and speed.

Re-record when a skill's behavior or default prompt changes. Commit the cast, metadata, media, and embed changes together.
