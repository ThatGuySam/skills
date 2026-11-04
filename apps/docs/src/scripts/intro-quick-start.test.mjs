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

// A phone shows little more than the title, so the page must open with these two blocks.
const opening = /^```(?:bash|sh)\n(npx skills add \S+ --skill [^\n]+)\n```\n\n```text title="Example prompts?" wrap\n([\s\S]+?)\n```\n/

for (const [guide, ids] of guides) {
  test(`${guide} opens with an install command, an example prompt, and why to use it`, () => {
    const body = readGuide(guide).replace(/^---\n[\s\S]*?\n---\n\s*/, "")
    const match = body.match(opening)
    assert.ok(match, "the page must open with the install block followed by the example prompt block")
    const [, install, prompt] = match
    for (const id of ids) {
      assert.match(install, new RegExp(`--skill(?: [\\w-]+)* ${id}(?: |$)`), `install command for ${id}`)
      assert.ok(prompt.includes(`$${id} `), `example prompt for ${id}`)
    }
    const firstHeading = body.match(/^## (.+)$/m)?.[1]
    assert.equal(firstHeading, "Why use it", "the first section explains why to use the skill")
  })
}
