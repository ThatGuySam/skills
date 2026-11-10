import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import test from "node:test"
import { findCanary, isBlockedPath } from "./check-private-leaks.mjs"

// Built at runtime so this file never contains a literal canary.
const canary = ["SKILLS-PRIVATE", "CANARY", randomUUID()].join(" ")

test("detects a private canary anywhere in a file", () => {
  assert.equal(findCanary(`notes\n<!-- ${canary}. Private eval material -->\n`), true)
  assert.equal(findCanary("SKILLS-PRIVATE CANARY not-a-uuid"), false)
  assert.equal(findCanary("an ordinary README"), false)
})

test("blocks raw macOS diagnostics and report folders", () => {
  for (const path of [
    "evals/x/report.ips",
    "a/PerfPowerServices_2026.cpu_resource.diag",
    "b/system_logs.tracev3",
    "c/CurrentPowerlog.PLSQL",
    "fixtures/fs/Library/Logs/DiagnosticReports/readme.txt",
  ]) {
    assert.equal(isBlockedPath(path), true, path)
  }
  for (const path of [
    "skills/activity-monitor/scripts/diag-summary.sh",
    "evals/activity-monitor/2026-11-05/README.md",
    "docs/diagnosis.md",
  ]) {
    assert.equal(isBlockedPath(path), false, path)
  }
})
