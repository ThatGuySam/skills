import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, resolve } from "node:path"
import { describe, it } from "node:test"
import { fileURLToPath } from "node:url"
import { loadChunks, search, tokenize } from "./search.ts"

const scriptsDir = dirname(fileURLToPath(import.meta.url))
const skillRoot = resolve(scriptsDir, "..")

describe("Emily corpus search", () => {
  it("normalizes and stems query tokens", () => {
    assert.deepEqual(tokenize("Invitations, inviting, and replies"), [
      "invitation",
      "invit",
      "reply",
    ])
  })

  it("retrieves formal invitation evidence from chapter XI", async () => {
    const results = await search("engraved invitation accept or decline", {
      mode: "advice",
      top: 5,
    })
    assert.ok(results.some((result) => result.chapter.startsWith("Chapter XI")))
    assert.ok(results.every((result) => result.role !== "style-only"))
  })

  it("quarantines style sources from advice retrieval", async () => {
    const results = await search("American heiress Italian prince society", {
      mode: "advice",
      top: 10,
    })
    assert.ok(results.every((result) => result.role !== "style-only"))
  })

  it("makes the travel narrative available in voice mode", async () => {
    const results = await search("cross-country automobile journey mishap", {
      mode: "voice",
      top: 5,
    })
    assert.ok(results.some((result) => result.source_id === "by-motor-1916"))
  })

  it("bridges modern public-space wording to the historical shared-seat rule", async () => {
    const results = await search("crowded commuter tote on the seat beside me", {
      mode: "advice",
      top: 5,
    })
    assert.ok(results.some((result) => result.id === "etiquette-1922-c05-009"))
  })

  it("bridges modern confidentiality wording to the historical confidence rule", async () => {
    const results = await search("spouse retells something private that I confided", {
      mode: "advice",
      top: 5,
    })
    assert.ok(results.some((result) => result.id === "etiquette-1922-c29-002"))
  })

  it("bridges a modern mechanical mishap prompt to travel voice evidence", async () => {
    const results = await search("dead phone battery becomes an epic mechanical tragedy", {
      mode: "voice",
      top: 5,
    })
    assert.ok(results.some((result) => result.id === "by-motor-1916-c03-001"))
  })

  it("excludes Richard Duffy's introduction from the indexed corpus", async () => {
    const chunks = await loadChunks()
    const corpus = chunks
      .map((chunk) => chunk.text)
      .join("\n")
      .toLocaleLowerCase()
    assert.equal(corpus.includes("richard duffy"), false)
    assert.equal(corpus.includes("manners and morals"), false)
  })

  it("excludes publisher advertisements and transcriber notes", async () => {
    const chunks = await loadChunks()
    const corpus = chunks.map((chunk) => chunk.text).join("\n")
    for (const marker of [
      "CODE OF CORRECT CONDUCT",
      "A. L. CHURCHILL",
      "LEONARD WICKENDEN",
      "MARGARET STORY",
      "Transcriber's Notes:",
      "\nINDEX\n",
    ]) {
      assert.equal(corpus.includes(marker), false, marker)
    }
  })

  it("assigns a modernity label and source role to every chunk", async () => {
    const chunks = await loadChunks()
    assert.ok(chunks.length > 1_000)
    assert.ok(
      chunks.every(
        (chunk) =>
          chunk.modernity &&
          chunk.modernity_basis === "chapter-default" &&
          chunk.role &&
          chunk.risks,
      ),
    )
  })

  it("preserves section provenance across a heading transition", async () => {
    const chunks = await loadChunks()
    const doric = chunks.find((chunk) => /spaces between the triglyphs/i.test(chunk.text))
    assert.ok(doric, "expected a chunk containing the Doric entablature passage")
    assert.match(doric.section, /Doric/i)
    assert.doesNotMatch(doric.section, /Ionic/i)
  })

  it("fails closed when a corpus role is malformed", async () => {
    const temporary = await mkdtemp(resolve(tmpdir(), "emily-malformed-role-"))
    try {
      const [chunk] = await loadChunks()
      assert.ok(chunk)
      const indexPath = resolve(temporary, "chunks.jsonl")
      await writeFile(indexPath, `${JSON.stringify({ ...chunk, role: "style_only" })}\n`, "utf8")
      await assert.rejects(
        search("American heiress", { mode: "advice", indexPath }),
        /invalid role/,
      )
    } finally {
      await rm(temporary, { recursive: true, force: true })
    }
  })

  it("runs through a managed directory symlink", async () => {
    const temporary = await mkdtemp(resolve(tmpdir(), "emily-symlink-"))
    try {
      const linkedSkill = resolve(temporary, "emily")
      await symlink(skillRoot, linkedSkill, "dir")
      const run = spawnSync(
        process.execPath,
        [resolve(linkedSkill, "scripts/search.ts"), "engraved invitation", "--top", "1", "--json"],
        { encoding: "utf8" },
      )
      assert.equal(run.status, 0, run.stderr)
      const parsed = JSON.parse(run.stdout) as unknown[]
      assert.equal(parsed.length, 1)
    } finally {
      await rm(temporary, { recursive: true, force: true })
    }
  })

  it("verifies the generated corpus against its independent lock", async () => {
    const run = spawnSync(process.execPath, [resolve(scriptsDir, "build-corpus.ts"), "--check"], {
      encoding: "utf8",
    })
    assert.equal(run.status, 0, run.stderr)
    assert.match(run.stdout, /Corpus verified:/)
    const [manifest, lock] = await Promise.all([
      readFile(resolve(skillRoot, "references/corpus/manifest.json"), "utf8"),
      readFile(resolve(skillRoot, "references/corpus/lock.json"), "utf8"),
    ])
    const manifestValue = JSON.parse(manifest) as { content_identity_sha256?: string }
    const lockValue = JSON.parse(lock) as { content_identity_sha256?: string }
    assert.equal(manifestValue.content_identity_sha256, lockValue.content_identity_sha256)
  })
})
