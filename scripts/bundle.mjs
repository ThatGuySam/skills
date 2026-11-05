import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The marketplace bundle needs its own copies: Codex and Claude Code name a
// bundled skill `<plugin>:<name>`, so `skills/sams-tree` would appear as
// `sams:sams-tree`. Each copy drops the sams-/sam- prefix (`sams:tree`) and is
// marked internal so the Skills CLI offers only the canonical skills/.

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const bundleSkills = 'bundle/skills'
const skipped = new Set(['node_modules', '.runtime', '.skills', '__pycache__', '.DS_Store'])
const fail = message => { throw new Error(message) }

export const bundleName = id => id.replace(/^sams?-/, '')

function packageFiles(root, id) {
  const directory = resolve(root, 'skills', id)
  if (existsSync(resolve(root, '.git'))) {
    return execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', `skills/${id}`], { cwd: root, encoding: 'utf8' })
      .split('\0').filter(path => path && existsSync(resolve(root, path))).map(path => relative(`skills/${id}`, path)).sort()
  }
  const walk = folder => readdirSync(folder, { withFileTypes: true }).filter(entry => !skipped.has(entry.name))
    .flatMap(entry => entry.isDirectory() ? walk(resolve(folder, entry.name)) : [relative(directory, resolve(folder, entry.name))])
  return walk(directory).sort()
}

// Selectors for renamed siblings (`sams-status`, `$sams-tree`) would point at
// names that do not exist inside the bundle.
export function bundleSelectors(text, ids) {
  return ids.filter(id => bundleName(id) !== id).reduce((output, id) =>
    output.replace(new RegExp(`([\`$])${id}(?![a-z0-9-])`, 'g'), `$1sams:${bundleName(id)}`), text)
}

export function bundleSkillFile(source, id) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) fail(`Missing frontmatter: ${id}`)
  if (/^metadata:/m.test(match[1])) fail(`Bundle generation cannot merge existing metadata: ${id}`)
  const frontmatter = match[1].replace(/^name:.*$/m, `name: ${bundleName(id)}`) + '\nmetadata:\n  internal: true'
  return `---\n${frontmatter}\n---\n` + source.slice(match[0].length)
}

function expectedBundle(root, catalog) {
  const files = new Map()
  const names = catalog.skills.map(skill => bundleName(skill.id))
  if (new Set(names).size !== names.length) fail('Bundle skill names collide')
  const ids = catalog.skills.map(skill => skill.id)
  for (const id of ids) {
    for (const path of packageFiles(root, id)) {
      let content = readFileSync(resolve(root, 'skills', id, path))
      if (path === 'SKILL.md' || /^agents\/[^/]+\.ya?ml$/.test(path)) {
        const text = bundleSelectors(content.toString('utf8'), ids)
        content = Buffer.from(path === 'SKILL.md' ? bundleSkillFile(text, id) : text)
      }
      files.set(`${bundleSkills}/${bundleName(id)}/${path}`, content)
    }
  }
  return files
}

function existingBundle(root) {
  const base = resolve(root, bundleSkills)
  if (!existsSync(base)) return []
  const walk = folder => readdirSync(folder, { withFileTypes: true })
    .flatMap(entry => entry.isDirectory() ? walk(resolve(folder, entry.name)) : [relative(root, resolve(folder, entry.name))])
  return walk(base)
}

export function syncBundle(root = repositoryRoot, catalog, { check = false } = {}) {
  const expected = expectedBundle(root, catalog)
  const stale = [...expected].filter(([path, content]) => !existsSync(resolve(root, path)) || !readFileSync(resolve(root, path)).equals(content)).map(([path]) => path)
  const extra = existingBundle(root).filter(path => !expected.has(path))
  if (check && (stale.length || extra.length)) fail(`Stale bundle. Run node scripts/skill-catalog.mjs:\n${[...stale, ...extra].join('\n')}`)
  if (!check) {
    for (const path of extra) rmSync(resolve(root, path))
    for (const path of stale) {
      mkdirSync(dirname(resolve(root, path)), { recursive: true })
      writeFileSync(resolve(root, path), expected.get(path))
    }
    const prune = folder => {
      for (const entry of readdirSync(folder, { withFileTypes: true })) if (entry.isDirectory()) prune(resolve(folder, entry.name))
      if (!readdirSync(folder).length) rmSync(folder, { recursive: true })
    }
    if (existsSync(resolve(root, bundleSkills)) && statSync(resolve(root, bundleSkills)).isDirectory()) prune(resolve(root, bundleSkills))
  }
  return [...stale, ...extra]
}
