import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = 'apps/docs/src/content/docs/'
const readJson = path => JSON.parse(readFileSync(path, 'utf8'))
const fail = message => { throw new Error(message) }
const unique = (values, label) => {
  if (new Set(values).size !== values.length) fail(`Duplicate ${label}`)
}

export function validateCatalog(root, catalog) {
  const ids = catalog.skills.map(skill => skill.id)
  unique(ids, 'skill ids')
  const discovered = readdirSync(resolve(root, 'skills'), { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(resolve(root, 'skills', entry.name, 'SKILL.md')))
    .map(entry => entry.name).sort()
  if (JSON.stringify([...ids].sort()) !== JSON.stringify(discovered)) {
    fail(`Catalog must match skills/*/SKILL.md. Catalog: ${[...ids].sort().join(', ')}. Discovered: ${discovered.join(', ')}`)
  }
  const routeExists = slug => /^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(slug)
    && ['.md', '.mdx'].some(extension => existsSync(resolve(root, docs, slug + extension)))
  for (const skill of catalog.skills) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.id)) fail(`Invalid skill id: ${skill.id}`)
    for (const key of ['title', 'summary', 'guide']) {
      if (typeof skill[key] !== 'string' || !skill[key].trim()) fail(`Missing ${key} for ${skill.id}`)
    }
    if (/[\n\r|]/.test(skill.title + skill.summary)) fail(`Invalid table text for ${skill.id}`)
    const source = readFileSync(resolve(root, 'skills', skill.id, 'SKILL.md'), 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1]
    const name = frontmatter?.match(/^name:\s*["']?([a-z0-9-]+)["']?\s*$/m)?.[1]
    if (name !== skill.id) fail(`Frontmatter name does not match ${skill.id}`)
    if (!routeExists(skill.guide)) fail(`Missing guide route: ${skill.guide}`)
  }
  const navigationIds = catalog.navigationGroups.flatMap(group => group.skills)
  unique(navigationIds, 'navigation skill ids')
  if (JSON.stringify([...navigationIds].sort()) !== JSON.stringify([...ids].sort())) fail('Navigation must cover every skill exactly once')
  for (const group of catalog.navigationGroups) {
    if (!group.skills.length || (group.skills.length > 1 && !group.label)) fail('Shared navigation groups need a label')
    for (const item of group.items) {
      if (!item.label || !routeExists(item.slug)) fail(`Missing navigation route: ${item.slug}`)
    }
    for (const id of group.skills) {
      const skill = catalog.skills.find(skill => skill.id === id)
      if (!group.items.some(item => item.slug === skill.guide)) fail(`Navigation omits guide for ${id}`)
    }
  }
  const claude = readJson(resolve(root, '.claude-plugin/plugin.json'))
  const codex = readJson(resolve(root, '.codex-plugin/plugin.json'))
  const portable = readJson(resolve(root, 'plugin.json'))
  if (claude.skills !== './skills' || codex.skills !== './skills/') fail('Plugin discovery must use the canonical skills directory')
  if (claude.name !== 'sam' || codex.name !== 'htma-measure' || portable.name !== 'htma-measure') fail('Plugin naming contract changed')
  if (new Set([claude.version, codex.version, portable.version]).size !== 1) fail('Plugin versions do not match')
  for (const path of ['.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json']) {
    const marketplace = readJson(resolve(root, path))
    const plugin = marketplace.plugins.find(entry => entry.name === 'htma-measure')
    if (marketplace.name !== 'thatguysam-skills' || !plugin) fail(`Marketplace naming contract changed: ${path}`)
    const source = typeof plugin.source === 'string' ? plugin.source : plugin.source?.path
    if (source !== './') fail(`Marketplace must discover this checkout: ${path}`)
  }
}

export function generatedRegions(catalog, root = repositoryRoot) {
  const skills = catalog.skills
  const table = (repository = false) => ['| Skill | Use it for | Guide |', '| --- | --- | --- |',
    ...skills.map(skill => `| ${skill.title} | ${skill.summary} | [${skill.id}](${repository ? docs + skill.guide + (existsSync(resolve(root, docs, skill.guide + '.mdx')) ? '.mdx' : '.md') : '/' + skill.guide + '/'}) |`)].join('\n')
  const tree = ['```text', 'skills/', ...skills.map((skill, index) => `${index === skills.length - 1 ? '└' : '├'}── ${skill.id}/`), '```'].join('\n')
  const names = skills.map(skill => `\`${skill.id}\``).join(', ')
  const escapeAttribute = value => '"' + value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '"'
  return [
    ['README.md', 'readme-catalog', table(true)],
    ['README.md', 'readme-tree', tree],
    [docs + 'reference/repository-layout.md', 'repository-tree', 'Collection files include `skill-catalog.json`, `scripts/skill-catalog.mjs`, the plugin manifests, and `apps/docs/`. Canonical skill directories are:\n\n' + tree],
    [docs + 'architecture/distribution-model.md', 'distribution-tree', tree],
    [docs + 'collection/about.md', 'about-catalog', table()],
    [docs + 'collection/about.md', 'about-names', `Standalone skills: ${names}.`],
    [docs + 'collection/installation.md', 'installation-names', `The repository publishes ${names}.`],
    [docs + 'collection/installation.md', 'installation-commands', skills.map(skill => `### ${skill.title}\n\n${skill.summary} [Read the guide](/${skill.guide}/).\n\n\`\`\`bash\nnpx skills add ThatGuySam/skills --skill ${skill.id}\n\`\`\``).join('\n\n')],
    [docs + 'collection/installation.md', 'installation-invocations', ['| Skill | Standalone Claude Code | Bundled Claude Code | Codex |', '| --- | --- | --- | --- |', ...skills.map(skill => `| ${skill.title} | \`/${skill.id}\` | \`/sam:${skill.id}\` | \`$${skill.id}\` |`)].join('\n')],
    [docs + 'index.mdx', 'homepage-cards', '<div className="home-skill-grid">\n' + skills.map(skill => `  <HomeSkillCard skill=${escapeAttribute(skill.id)} title=${escapeAttribute(skill.title)} href="/${skill.guide}/" description=${escapeAttribute(skill.summary)} />`).join('\n') + '\n</div>'],
  ]
}

export function syncCatalog(root = repositoryRoot, { check = false } = {}) {
  const catalog = readJson(resolve(root, 'skill-catalog.json'))
  validateCatalog(root, catalog)
  const files = new Map()
  const regions = generatedRegions(catalog, root)
  for (const [path, name, content] of regions) {
    const source = files.get(path) ?? readFileSync(resolve(root, path), 'utf8')
    const mdx = path.endsWith('.mdx')
    const start = mdx ? `{/* skills:start:${name} */}` : `<!-- skills:start:${name} -->`
    const end = mdx ? `{/* skills:end:${name} */}` : `<!-- skills:end:${name} -->`
    if (source.split(start).length !== 2 || source.split(end).length !== 2 || source.indexOf(start) > source.indexOf(end)) fail(`Missing, duplicate, or reversed generated markers: ${path} (${name})`)
    const updated = source.slice(0, source.indexOf(start) + start.length) + '\n' + content + '\n' + source.slice(source.indexOf(end))
    files.set(path, updated)
  }
  for (const [path, output] of files) {
    const expected = regions.filter(([regionPath]) => regionPath === path).length * 2
    if ([...output.matchAll(/skills:(?:start|end):[a-z-]+/g)].length !== expected) fail(`Unknown generated markers: ${path}`)
  }
  const stale = [...files].filter(([path, output]) => readFileSync(resolve(root, path), 'utf8') !== output)
  if (check && stale.length) fail(`Stale skill listings. Run node scripts/skill-catalog.mjs:\n${stale.map(([path]) => path).join('\n')}`)
  if (!check) for (const [path, output] of stale) writeFileSync(resolve(root, path), output)
  return { skills: catalog.skills.length, updated: stale.map(([path]) => path) }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = syncCatalog(repositoryRoot, { check: process.argv.includes('--check') })
    console.log(`Skill catalog: ${result.skills} skills; ${result.updated.length} files updated.`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
