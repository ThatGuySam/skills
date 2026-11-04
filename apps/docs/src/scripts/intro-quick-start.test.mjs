import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const root = new URL("../../../../", import.meta.url)
const docs = new URL("apps/docs/src/content/docs/", root)
const { skills } = JSON.parse(readFileSync(new URL("skill-catalog.json", root), "utf8"))

const guides = new Map()
for (const skill of skills) guides.set(skill.guide, [...(guides.get(skill.guide) ?? []), skill.id])

function readGuide(guide) {
  for (const extension of [".md", ".mdx"]) {
    const url = new URL(`${guide}${extension}`, docs)
    if (existsSync(url)) return readFileSync(url, "utf8")
  }
  throw new Error(`Missing guide page: ${guide}`)
}

for (const [guide, ids] of guides) {
  test(`${guide} opens with an install command and example prompt`, () => {
    const body = readGuide(guide).replace(/^---\n[\s\S]*?\n---\n/, "")
    const sections = body.split(/^## /m)
    assert.match(sections[1] ?? "", /^Quick start\n/, "the first section must be Quick start")
    const quickStart = sections[1]
    const install = quickStart.match(/^npx skills add \S+ --skill .+$/m)?.[0] ?? ""
    const prompts = [...quickStart.matchAll(/```text\n([\s\S]*?)```/g)].map((match) => match[1]).join("\n")
    for (const id of ids) {
      assert.match(install, new RegExp(`--skill(?: [\\w-]+)* ${id}(?: |$)`), `install command for ${id}`)
      assert.ok(prompts.includes(`$${id} `), `example prompt for ${id}`)
    }
  })
}
