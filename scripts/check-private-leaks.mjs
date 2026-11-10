#!/usr/bin/env node
// Keeps private eval material out of this public repository.
//
// Some skills here are also measured by maintainer-only held-out evals built from real,
// private sessions. That material lives in a separate private companion repository and
// must never land here. This check enforces it in three layers:
//
//   1. Canary: private grader-side files carry a "SKILLS-PRIVATE CANARY <uuid>" line.
//      Any such string here means private material was copied in.
//   2. File types: raw macOS diagnostics and logs (.ips, .diag, .tracev3, .PLSQL, and
//      anything under a DiagnosticReports folder) are blocked; public evals use
//      labeled synthetic captures instead.
//   3. Private terms: when the private companion checkout is present (SKILLS_PRIVATE_DIR,
//      or ../skills-private next to this repo), its guard/leak-rules.toml is run with
//      betterleaks or gitleaks. Those rules list private terms, so they stay private;
//      CI and contributors run layers 1 and 2 only.
//
// Usage:
//   node scripts/check-private-leaks.mjs --all          working tree (tracked + untracked, not ignored)
//   node scripts/check-private-leaks.mjs --range A..B   files changed in a commit range, at B
//   node scripts/check-private-leaks.mjs --pre-push     ranges from git's pre-push stdin

import { execFileSync, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const CANARY = /SKILLS-PRIVATE CANARY [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
const BLOCKED_PATH = /(\.(ips|diag|tracev3|plsql)$)|(^|\/)DiagnosticReports\//i

export function findCanary(text) {
  return CANARY.test(text)
}

export function isBlockedPath(path) {
  return BLOCKED_PATH.test(path)
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const git = (...args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 })

function rangesFromPrePush(stdin) {
  const zero = /^0+$/
  return stdin
    .trim()
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const [, localSha, , remoteSha] = line.split(" ")
      if (zero.test(localSha)) return [] // branch deletion
      return [`${zero.test(remoteSha) ? "origin/main" : remoteSha}..${localSha}`]
    })
}

// Returns [{ path, read }] for the files to check.
function filesFor(mode, range) {
  if (mode === "all") {
    return git("ls-files", "--cached", "--others", "--exclude-standard", "-z")
      .split("\0")
      .filter(Boolean)
      .filter((path) => existsSync(join(root, path)))
      .map((path) => ({ path, read: () => readFileSync(join(root, path)) }))
  }
  const to = range.split(/\.\.\.?/)[1]
  return git("diff", "--name-only", "--diff-filter=ACMR", "-z", range)
    .split("\0")
    .filter(Boolean)
    .map((path) => ({
      path,
      read: () =>
        execFileSync("git", ["show", `${to}:${path}`], { cwd: root, maxBuffer: 64 << 20 }),
    }))
}

function privateRules() {
  const dir = resolve(process.env.SKILLS_PRIVATE_DIR ?? join(root, "..", "skills-private"))
  const rules = join(dir, "guard", "leak-rules.toml")
  return existsSync(rules) ? rules : null
}

function scanner() {
  for (const name of ["betterleaks", "gitleaks"]) {
    if (spawnSync(name, ["version"], { stdio: "ignore" }).status === 0) return name
  }
  return null
}

// Copies the files into a temp dir and scans that, so ignored and unrelated files are skipped.
function scanPrivateTerms(files, rules) {
  const tool = scanner()
  if (!tool) {
    console.warn(
      "⚠️  private leak rules found, but neither betterleaks nor gitleaks is installed; skipping private-term scan",
    )
    return true
  }
  const dir = mkdtempSync(join(tmpdir(), "private-leak-scan-"))
  try {
    for (const file of files) {
      const dest = join(dir, file.path)
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest, file.read())
    }
    const result = spawnSync(
      tool,
      ["dir", dir, "--config", rules, "--no-banner", "--redact", "--exit-code", "1"],
      {
        encoding: "utf8",
        env: { ...process.env, GOMAXPROCS: "4" },
      },
    )
    if (result.status !== 0) {
      console.error(
        `❌ private-term scan (${tool}) found matches:\n${(result.stdout + result.stderr).replaceAll(dir + "/", "")}`,
      )
      return false
    }
    return true
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function check(files) {
  const problems = []
  for (const file of files) {
    if (isBlockedPath(file.path)) problems.push(`private artifact type: ${file.path}`)
    else if (findCanary(file.read().toString("utf8"))) problems.push(`private canary: ${file.path}`)
  }
  for (const p of problems) console.error(`❌ ${p}`)
  const rules = privateRules()
  const termsOk = rules
    ? scanPrivateTerms(
        files.filter((f) => !isBlockedPath(f.path)),
        rules,
      )
    : true
  return problems.length === 0 && termsOk
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const args = process.argv.slice(2)
  let ok = true
  if (args.includes("--all")) ok = check(filesFor("all"))
  else if (args.includes("--range"))
    ok = check(filesFor("range", args[args.indexOf("--range") + 1]))
  else if (args.includes("--pre-push")) {
    for (const range of rangesFromPrePush(readFileSync(0, "utf8")))
      ok = check(filesFor("range", range)) && ok
  } else {
    console.error("usage: check-private-leaks.mjs --all | --range A..B | --pre-push")
    process.exit(2)
  }
  if (!ok) process.exit(1)
  console.log(
    `✅ no private eval material found${privateRules() ? " (including private-term rules)" : ""}`,
  )
}
