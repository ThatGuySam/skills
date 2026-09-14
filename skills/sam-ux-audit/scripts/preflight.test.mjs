import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { preflight } from "./preflight.mjs"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

test("real locked dependencies detect content tampering, drift, and symlinks", () => {
  const temp = mkdtempSync(join(tmpdir(), "ux-audit-preflight-"))
  try {
    for (const name of [
      "package.json",
      "skills-lock.json",
      ".runtime",
      "SKILL.md",
      "references",
      "scripts",
    ]) {
      cpSync(join(root, name), join(temp, name), { recursive: true })
    }
    const before = preflight(temp)
    assert.equal(before.skills.length, 5)
    assert.equal(preflight(temp).lockSha256, before.lockSha256)
    const target = join(temp, ".runtime/skills/a11y/SKILL.md")
    const original = readFileSync(target)
    writeFileSync(target, Buffer.concat([original, Buffer.from("\nAltered instructions\n")]))
    assert.throws(() => preflight(temp), /installed content mismatch/)
    writeFileSync(target, original)
    assert.equal(preflight(temp).lockSha256, before.lockSha256)
    const manifestPath = join(temp, "package.json")
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
    manifest.skills.a11y.path = "different/path"
    writeFileSync(manifestPath, JSON.stringify(manifest))
    assert.throws(() => preflight(temp), /source path changed/)
    cpSync(join(root, "package.json"), manifestPath)
    symlinkSync(target, join(temp, ".runtime/skills/a11y/escape"))
    assert.throws(() => preflight(temp), /symlink/)
  } finally {
    rmSync(temp, { recursive: true, force: true })
  }
})

test("frozen install restores an empty private directory without changing the lock", () => {
  const temp = mkdtempSync(join(tmpdir(), "ux-audit-restore-"))
  const project = join(temp, "suite")
  try {
    mkdirSync(project)
    for (const name of [
      "package.json",
      "skills-lock.json",
      ".skills",
      "SKILL.md",
      "references",
      "scripts",
    ]) {
      cpSync(join(root, name), join(project, name), { recursive: true })
    }
    const lock = readFileSync(join(project, "skills-lock.json"))
    const install = () =>
      execFileSync(
        process.execPath,
        [join(root, "node_modules/skills-lock/bin/skills-lock.mjs"), "install", "--frozen"],
        {
          cwd: project,
          env: { ...process.env, SKILLS_LOCK_CACHE: join(project, ".skills/cache") },
          stdio: "pipe",
          timeout: 30000,
        },
      )
    install()
    assert.equal(preflight(project).skills.length, 5)
    assert.deepEqual(readFileSync(join(project, "skills-lock.json")), lock)
    const pinned = JSON.parse(lock).skills.hig
    const cache = join(project, ".skills/cache/github.com-dickwu-apple-design-skill", pinned.commit, "SKILL.md")
    writeFileSync(cache, "changed cached source")
    assert.throws(install, /integrity mismatch/)
    assert.deepEqual(readFileSync(join(project, "skills-lock.json")), lock)
  } finally {
    rmSync(temp, { recursive: true, force: true })
  }
})
