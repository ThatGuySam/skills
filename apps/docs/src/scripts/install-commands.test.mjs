import assert from "node:assert/strict"
import test from "node:test"
import {
  RUNNERS,
  STORAGE_KEY,
  formatCommand,
  TAB_STORAGE_KEY,
  formatPrompt,
  openTargets,
  parseCommand,
  readPreference,
  readSelection,
  savePreference,
  saveSelection,
  shownTab,
  tabsFor,
  urlForTab,
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

const memory = (initial = {}) => {
  const values = new Map(Object.entries(initial))
  return () => ({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) })
}
const page = "https://skills.samcarlton.com/emily/introduction/"

test("the agent prompt installs the named skill non-interactively and always uses npx", () => {
  const prompt = formatPrompt(parseCommand("npx skills add ThatGuySam/skills --skill emily"))
  assert.match(prompt, /^Install the emily agent skill from https:\/\/github\.com\/ThatGuySam\/skills for me\./)
  assert.ok(prompt.includes("`npx skills add ThatGuySam/skills --skill emily --global --yes`"))
  for (const runner of RUNNERS.slice(1)) assert.ok(!prompt.includes(runner.command), `${runner.id} never appears in the prompt`)
  assert.ok(prompt.includes("adding `--agent`"), "asks the agent to target itself")
  assert.ok(prompt.includes("`emily/SKILL.md` exists"))
  assert.ok(prompt.length < 340, "short enough to fit a phone screen with its Copy button")
})

test("the agent prompt keeps flags the command already has and names every skill", () => {
  const source = "DISABLE_TELEMETRY=1 npx skills add thatguysam/skills \\\n  --skill sams-tree sams-status \\\n  --agent codex -g -y"
  const prompt = formatPrompt(parseCommand(source))
  assert.ok(prompt.includes("`DISABLE_TELEMETRY=1 npx skills add thatguysam/skills --skill sams-tree sams-status --agent codex -g -y`"))
  assert.ok(!prompt.includes("adding `--agent`"))
  assert.ok(prompt.includes("the sams-tree and sams-status agent skills"))
  assert.ok(prompt.includes("each skill's `SKILL.md` exists"))
})

test("commands that do not install a named remote skill have no agent prompt", () => {
  for (const source of [
    "npx skills add ThatGuySam/skills --list",
    "npx skills add ThatGuySam/skills",
    "npx skills add . --skill migrate-cgpt",
    "npx skills update htma-measure --yes",
    "npx skills remove sales-research",
    "npx skills list",
  ]) assert.equal(formatPrompt(parseCommand(source)), null, source)
})

test("the prompt is the first tab and the default for a new visitor", () => {
  assert.deepEqual(tabsFor(true).map((tab) => tab.id), ["prompt", "npx", "bunx", "pnx", "mise", "yarn"])
  assert.deepEqual(tabsFor(false).map((tab) => tab.id), ["npx", "bunx", "pnx", "mise", "yarn"])
  assert.deepEqual(readSelection(memory(), page), { tab: "prompt", runner: "npx" })
})

test("a picked tab is remembered on the next page, and a command with no prompt keeps the last runner", () => {
  const storage = memory()
  let selection = saveSelection(storage, readSelection(storage, page), "bunx")
  assert.deepEqual(readSelection(storage, "https://skills.samcarlton.com/phone-size/introduction/"), { tab: "bunx", runner: "bunx" })
  selection = saveSelection(storage, selection, "prompt")
  assert.deepEqual(readSelection(storage, page), { tab: "prompt", runner: "bunx" })
  assert.equal(storage().getItem(TAB_STORAGE_KEY), "prompt")
  assert.equal(readPreference(storage), "bunx")
  // A command with no prompt falls back to that runner.
  assert.equal(shownTab(selection, false), "bunx")
  assert.equal(shownTab(selection, true), "prompt")
})

test("a runner saved before tabs existed still opens on that runner", () => {
  assert.deepEqual(readSelection(memory({ [STORAGE_KEY]: "bunx" }), page), { tab: "bunx", runner: "bunx" })
  assert.deepEqual(readSelection(memory({ [STORAGE_KEY]: "pnpm" }), page), { tab: "pnx", runner: "pnx" })
})

test("a shared link opens on its tab without changing what the visitor saved", () => {
  const storage = memory({ [TAB_STORAGE_KEY]: "bunx", [STORAGE_KEY]: "bunx" })
  assert.equal(readSelection(storage, `${page}?install=prompt`).tab, "prompt")
  assert.equal(readSelection(storage, `${page}?install=yarn`).tab, "yarn")
  assert.equal(readSelection(storage, `${page}?install=unknown`).tab, "bunx")
  assert.equal(storage().getItem(TAB_STORAGE_KEY), "bunx")
  assert.equal(urlForTab(`${page}?q=1#why-use-it`, "prompt"), `${page}?q=1&install=prompt#why-use-it`)
  assert.equal(urlForTab(`${page}?install=prompt`, "mise"), `${page}?install=mise`)
})

test("blocked storage still shows the default and accepts a pick for the page", () => {
  const blocked = () => { throw new Error("Storage blocked") }
  const selection = readSelection(blocked, page)
  assert.deepEqual(selection, { tab: "prompt", runner: "npx" })
  assert.deepEqual(saveSelection(blocked, selection, "mise"), { tab: "mise", runner: "mise" })
})

test("the open-in links go to PrefillPrompt's preview with the agent preset and the prompt intact", () => {
  const prompt = formatPrompt(parseCommand("npx skills add ThatGuySam/skills --skill emily"))
  const [chatgpt, claude] = openTargets(prompt)
  for (const [target, id] of [[chatgpt, "chatgpt"], [claude, "claude"]]) {
    const url = new URL(target.url)
    assert.equal(url.origin + url.pathname, "https://prefillprompt.com/open")
    assert.equal(url.searchParams.get("s"), id)
    assert.equal(url.searchParams.get("q"), prompt)
  }
  assert.ok(prompt.length < 5000, "within Claude Code's deep-link prompt limit")
})
