import assert from 'node:assert/strict'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { generatedRegions, syncCatalog } from './skill-catalog.mjs'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = 'apps/docs/src/content/docs/'

function fixture(t) {
  const root = mkdtempSync(resolve(tmpdir(), 'skill-catalog-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const catalog = JSON.parse(readFileSync(resolve(repository, 'skill-catalog.json'), 'utf8'))
  const write = (path, content) => {
    mkdirSync(dirname(resolve(root, path)), { recursive: true })
    writeFileSync(resolve(root, path), content)
  }
  const save = () => write('skill-catalog.json', JSON.stringify(catalog))
  save()
  for (const skill of catalog.skills) write(`skills/${skill.id}/SKILL.md`, `---\nname: ${skill.id}\n---\n`)
  for (const item of catalog.navigationGroups.flatMap(group => group.items)) {
    const extension = existsSync(resolve(repository, docs, item.slug + '.mdx')) ? '.mdx' : '.md'
    write(docs + item.slug + extension, '---\ntitle: Fixture\n---\n')
  }
  for (const path of ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json', 'plugin.json', '.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json', ...new Set(generatedRegions(catalog).map(([path]) => path))]) {
    mkdirSync(dirname(resolve(root, path)), { recursive: true })
    cpSync(resolve(repository, path), resolve(root, path))
  }
  return { root, catalog, save, write, read: path => readFileSync(resolve(root, path), 'utf8') }
}

test('sync is idempotent and check accepts current files without writing', t => {
  const { root } = fixture(t)
  assert.equal(syncCatalog(root).skills, 12)
  assert.deepEqual(syncCatalog(root).updated, [])
  assert.deepEqual(syncCatalog(root, { check: true }).updated, [])
})

test('an added canonical skill requires a catalog entry', t => {
  const { root, write } = fixture(t)
  write('skills/new-skill/SKILL.md', '---\nname: new-skill\n---\n')
  assert.throws(() => syncCatalog(root, { check: true }), /Catalog must match/)
})

test('a removed canonical skill rejects its stale catalog entry', t => {
  const { root } = fixture(t)
  rmSync(resolve(root, 'skills/phone-size'), { recursive: true })
  assert.throws(() => syncCatalog(root, { check: true }), /Catalog must match/)
})

test('duplicate catalog IDs and mismatched frontmatter are rejected', t => {
  const { root, catalog, save, write } = fixture(t)
  catalog.skills.push(catalog.skills[0])
  save()
  assert.throws(() => syncCatalog(root), /Duplicate skill ids/)
  catalog.skills.pop()
  save()
  write('skills/phone-size/SKILL.md', '---\nname: wrong-name\n---\n')
  assert.throws(() => syncCatalog(root), /Frontmatter name does not match phone-size/)
})

test('missing guide and navigation routes are rejected', t => {
  const { root, catalog, save } = fixture(t)
  catalog.skills[0].guide = 'phone-size/missing'
  save()
  assert.throws(() => syncCatalog(root), /Missing guide route/)
  catalog.skills[0].guide = 'phone-size/introduction'
  catalog.navigationGroups[0].items.push({ label: 'Missing', slug: 'phone-size/missing' })
  save()
  assert.throws(() => syncCatalog(root), /Missing navigation route/)
})

test('navigation must cover each skill and its guide exactly once', t => {
  const { root, catalog, save } = fixture(t)
  const group = catalog.navigationGroups.shift()
  save()
  assert.throws(() => syncCatalog(root), /Navigation must cover/)
  catalog.navigationGroups.unshift(group)
  group.items = [{ label: 'Different valid page', slug: 'tree-status/design' }]
  save()
  assert.throws(() => syncCatalog(root), /Navigation omits guide/)
})

test('stale content fails check without writes and sync repairs it', t => {
  const { root, write, read } = fixture(t)
  const stale = read('README.md').replace('| Phone Size |', '| Old title |')
  write('README.md', stale)
  assert.throws(() => syncCatalog(root, { check: true }), /Stale skill listings/)
  assert.equal(read('README.md'), stale)
  assert.ok(syncCatalog(root).updated.includes('README.md'))
  assert.match(read('README.md'), /\| Phone Size \|/)
})

for (const mutation of ['delete', 'duplicate', 'reverse']) {
  test(`${mutation} of a generated marker fails sync and check without writes`, t => {
    const { root, write, read } = fixture(t)
    const marker = '<!-- skills:start:readme-catalog -->'
    const original = read('README.md')
    const damaged = mutation === 'delete' ? original.replace(marker, '')
      : mutation === 'duplicate' ? original.replace(marker, marker + '\n' + marker)
        : original.replace(marker, 'TEMP').replace('<!-- skills:end:readme-catalog -->', marker).replace('TEMP', '<!-- skills:end:readme-catalog -->')
    write('README.md', damaged)
    for (const check of [true, false]) assert.throws(() => syncCatalog(root, { check }), /generated markers/)
    assert.equal(read('README.md'), damaged)
  })
}

test('title changes update every title-bearing listing and preserve unrelated prose', t => {
  const { root, catalog, save, read } = fixture(t)
  catalog.skills[0].title = 'Phone brief title fixture'
  save()
  syncCatalog(root)
  for (const path of ['README.md', docs + 'index.mdx', docs + 'collection/about.md', docs + 'collection/installation.md']) {
    assert.match(read(path), /Phone brief title fixture/, path)
    assert.doesNotMatch(read(path), /(?:title="|\| |### )Phone Size(?:"| \||\n)/, path)
  }
  assert.match(read('README.md'), /## Acknowledgments/)
  assert.deepEqual(syncCatalog(root, { check: true }).updated, [])
})

test('a complete added catalog entry updates every exhaustive listing', t => {
  const { root, catalog, save, write, read } = fixture(t)
  catalog.skills.push({ id: 'new-skill', title: 'New skill fixture', summary: 'A synthetic catalog test.', guide: 'new-skill/introduction' })
  catalog.navigationGroups.push({ skills: ['new-skill'], items: [{ label: 'Guide', slug: 'new-skill/introduction' }] })
  write('skills/new-skill/SKILL.md', '---\nname: new-skill\n---\n')
  write(docs + 'new-skill/introduction.md', '---\ntitle: New skill fixture\n---\n')
  save()
  assert.equal(syncCatalog(root).skills, 13)
  for (const path of new Set(generatedRegions(catalog, root).map(([path]) => path))) assert.match(read(path), /new-skill/, path)
  assert.deepEqual(syncCatalog(root, { check: true }).updated, [])
})

test('manifest discovery and version drift are rejected', t => {
  const { root, write } = fixture(t)
  const path = '.claude-plugin/plugin.json'
  const manifest = JSON.parse(readFileSync(resolve(root, path), 'utf8'))
  manifest.skills = './copied-skills'
  write(path, JSON.stringify(manifest))
  assert.throws(() => syncCatalog(root), /canonical skills directory/)
  manifest.skills = './skills'
  manifest.version = '0.0.0'
  write(path, JSON.stringify(manifest))
  assert.throws(() => syncCatalog(root), /versions do not match/)
})

test('unexpected generated regions fail without modifying files', t => {
  const { root, read, write } = fixture(t)
  const damaged = read('README.md') + '\n<!-- skills:start:unknown -->\n<!-- skills:end:unknown -->\n'
  write('README.md', damaged)
  assert.throws(() => syncCatalog(root, { check: true }), /Unknown generated markers/)
  assert.equal(read('README.md'), damaged)
})

test('homepage attributes escape catalog text as literal HTML', t => {
  const { root, catalog, save, read } = fixture(t)
  catalog.skills[0].title = 'A "quoted" title & more'
  catalog.skills[0].summary = 'Describe <literal> text.'
  save()
  syncCatalog(root)
  assert.match(read(docs + 'index.mdx'), /title="A &quot;quoted&quot; title &amp; more"/)
  assert.match(read(docs + 'index.mdx'), /description="Describe &lt;literal&gt; text\."/)
})
