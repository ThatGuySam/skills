import assert from "node:assert/strict"
import test from "node:test"
import { RUNNERS, STORAGE_KEY, formatCommand, parseCommand, readPreference, savePreference } from "./install-commands.mjs"

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
