import assert from "node:assert/strict"
import test from "node:test"
import {
  RUNNERS,
  STORAGE_KEY,
  formatCommand,
  formatPrompt,
  modeFromUrl,
  parseCommand,
  readPreference,
  savePreference,
  urlForMode,
} from "./install-commands.mjs"

test("every runner retains the skill flag and its preceding ASCII space", () => {
  const parsed = parseCommand("npx skills add thatguysam/skills --skill sam-ux-audit")
  for (const runner of RUNNERS) {
    assert.equal(formatCommand(parsed, runner.id), `${runner.command} add thatguysam/skills --skill sam-ux-audit`)
  }
  assert.equal(formatCommand(parsed, "npm"), "npx skills add thatguysam/skills --skill sam-ux-audit")
})

test("environment assignments and multiline arguments survive switching", () => {
  const argumentsText = " add thatguysam/skills \\\n  --skill htma-measure \\\n  --agent codex --yes"
  const parsed = parseCommand(`DISABLE_TELEMETRY=1 npx skills${argumentsText}`)
  assert.equal(formatCommand(parsed, "bunx"), `DISABLE_TELEMETRY=1 bunx skills${argumentsText}`)
  const encoded = `npx skills${argumentsText.replaceAll("\n", "\u007f")}`
  assert.equal(formatCommand(parseCommand(encoded), "pnpx"), `pnx skills${argumentsText}`)
  assert.equal(parseCommand("npm ci --ignore-scripts"), null)
  assert.equal(parseCommand("npx skills-other add example"), null)
})

test("latest preference persists and invalid or blocked storage falls back safely", () => {
  const values = new Map()
  const storage = () => ({ getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) })
  assert.equal(readPreference(storage), "npx")
  savePreference(storage, "bunx")
  savePreference(storage, "mise")
  assert.equal(readPreference(storage), "mise")
  values.set(STORAGE_KEY, "pnpx")
  assert.equal(readPreference(storage), "pnx")
  values.set(STORAGE_KEY, "pnpm")
  assert.equal(readPreference(storage), "pnx")
  values.set(STORAGE_KEY, "removed-runner")
  assert.equal(readPreference(storage), "npx")
  const blocked = () => { throw new Error("Storage blocked") }
  assert.equal(readPreference(blocked), "npx")
  assert.doesNotThrow(() => savePreference(blocked, "bunx"))
})

test("the agent prompt installs the named skill non-interactively with the chosen runner", () => {
  const prompt = formatPrompt(parseCommand("npx skills add ThatGuySam/skills --skill emily"), "bunx")
  assert.match(prompt, /^Install the emily agent skill from https:\/\/github\.com\/ThatGuySam\/skills for me\./)
  assert.ok(prompt.includes("`bunx skills add ThatGuySam/skills --skill emily --global --yes`"))
  assert.ok(prompt.includes("`--agent`"), "asks the agent to target itself")
  assert.ok(prompt.includes("`emily/SKILL.md`"))
})

test("the agent prompt keeps flags the command already has and names every skill", () => {
  const source = "DISABLE_TELEMETRY=1 npx skills add thatguysam/skills \\\n  --skill sams-tree sams-status \\\n  --agent codex -g -y"
  const prompt = formatPrompt(parseCommand(source), "npx")
  assert.ok(prompt.includes("`DISABLE_TELEMETRY=1 npx skills add thatguysam/skills --skill sams-tree sams-status --agent codex -g -y`"))
  assert.ok(!prompt.includes("Add `--agent`"))
  assert.ok(!prompt.includes("Drop `--global`"))
  assert.ok(prompt.includes("the sams-tree and sams-status agent skills"))
  assert.ok(prompt.includes("`sams-tree/SKILL.md` and `sams-status/SKILL.md` now exist"))
})

test("commands that do not install a named remote skill have no agent prompt", () => {
  for (const source of [
    "npx skills add ThatGuySam/skills --list",
    "npx skills add ThatGuySam/skills",
    "npx skills add . --skill migrate-cgpt",
    "npx skills update htma-measure --yes",
    "npx skills remove sales-research",
    "npx skills list",
  ]) assert.equal(formatPrompt(parseCommand(source), "npx"), null, source)
})

test("the prompt tab is shareable through the URL and the command tab leaves it clean", () => {
  const page = "https://skills.samcarlton.com/emily/introduction/"
  assert.equal(urlForMode(page, "prompt"), `${page}?install=prompt`)
  assert.equal(modeFromUrl(`${page}?install=prompt`), "prompt")
  assert.equal(urlForMode(`${page}?install=prompt#why-use-it`, "command"), `${page}#why-use-it`)
  assert.equal(urlForMode(`${page}?q=1#why-use-it`, "prompt"), `${page}?q=1&install=prompt#why-use-it`)
  assert.equal(modeFromUrl(page), "command")
  assert.equal(modeFromUrl(`${page}?install=unknown`), "command")
})
