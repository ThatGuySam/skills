import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const suiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)
const managerRoot = dirname(require.resolve("skills-lock/package.json"))
const { hashTree } = await import(pathToFileURL(join(managerRoot, "src/integrity.mjs")))
const { assertNoSymlinks } = await import(pathToFileURL(join(managerRoot, "src/validate.mjs")))
const json = (file) => JSON.parse(readFileSync(file, "utf8"))

export function preflight(root = suiteRoot) {
  const manifest = json(join(root, "package.json"))
  const lockBytes = readFileSync(join(root, "skills-lock.json"))
  const lock = JSON.parse(lockBytes)
  assert.equal(lock.lockfileVersion, 1, "Unsupported skill lock version")
  assert.deepEqual(
    manifest.skillsConfig,
    {
      agents: ["audit-suite"],
      agentDirs: { "audit-suite": ".runtime/skills" },
    },
    "Dependency destination must remain private to the suite",
  )
  const names = Object.keys(manifest.skills).sort()
  assert.ok(names.length, "No skills declared")
  assert.deepEqual(Object.keys(lock.skills).sort(), names, "Manifest/lock dependency mismatch")
  const skills = names.map((name) => {
    assert.match(name, /^[a-z][a-z0-9-]*$/, "Unsafe dependency alias")
    const entry = manifest.skills[name]
    const pinned = lock.skills[name]
    assert.equal(pinned.spec, entry.source, `${name}: source changed`)
    assert.equal(pinned.path, entry.path, `${name}: source path changed`)
    if (!entry.source.startsWith("file:")) {
      assert.match(pinned.commit, /^[a-f0-9]{40}$/, `${name}: missing commit pin`)
    }
    const installed = join(root, ".runtime/skills", name)
    assertNoSymlinks(installed)
    assert.equal(hashTree(installed), pinned.integrity, `${name}: installed content mismatch`)
    readFileSync(join(installed, "SKILL.md"), "utf8")
    return {
      name,
      source: pinned.spec,
      commit: pinned.commit ?? null,
      path: pinned.path,
      integrity: pinned.integrity,
      entrypoint: join(installed, "SKILL.md"),
    }
  })
  return {
    checkedAt: new Date().toISOString(),
    wrapper: {
      skillSha256: createHash("sha256")
        .update(readFileSync(join(root, "SKILL.md")))
        .digest("hex"),
      referencesIntegrity: hashTree(join(root, "references")),
      scriptsIntegrity: hashTree(join(root, "scripts")),
    },
    lockSha256: createHash("sha256").update(lockBytes).digest("hex"),
    manager: manifest.devDependencies["skills-lock"],
    status: "installed-content-verified",
    skills,
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.stdout.write(`${JSON.stringify(preflight(), null, 2)}\n`)
  } catch (error) {
    process.stderr.write(`UX audit preflight failed: ${error.message}\n`)
    process.exitCode = 1
  }
}
