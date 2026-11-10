import { execFileSync, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { homedir, userInfo } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncCatalog } from './skill-catalog.mjs'

// Records each skill's default prompt running in Codex, renders the recording
// to a GIF (READMEs) and an MP4 (docs pages), and embeds both. Recordings run
// in a throwaway home so Sam's global AGENTS.md, skills, and environment never
// reach the agent, and so the terminal shows no machine-specific paths.

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = 'apps/docs/src/content/docs/'
export const media = 'apps/docs/public/demos'
const site = 'https://skills.samcarlton.com'
const github = 'https://github.com/ThatGuySam/skills/tree/main'
const window = { cols: 100, rows: 34 }
const idleLimit = 2
const targetSeconds = 45
const readJson = path => JSON.parse(readFileSync(path, 'utf8'))
const fail = message => { throw new Error(message) }
const shellQuote = value => value.includes("'")
  ? `"${value.replace(/[\\"$`]/g, '\\$&')}"`
  : `'${value}'`

export function defaultPrompt(yaml) {
  const quoted = yaml.match(/^\s*default_prompt:\s*("(?:[^"\\]|\\.)*")\s*$/m)?.[1]
  return quoted ? JSON.parse(quoted) : undefined
}

export function demoConfig(root, id) {
  const path = resolve(root, 'demos', id, 'demo.json')
  if (!existsSync(path)) return undefined
  const config = readJson(path)
  const yaml = resolve(root, 'skills', id, 'agents/openai.yaml')
  const prompt = config.prompt ?? (existsSync(yaml) ? defaultPrompt(readFileSync(yaml, 'utf8')) : undefined)
  if (!prompt) fail(`No default_prompt in skills/${id}/agents/openai.yaml and no prompt in demos/${id}/demo.json`)
  return { timeoutMinutes: 15, codexConfig: [], allowedText: [], ...config, prompt }
}

export const demoIds = root => readJson(resolve(root, 'skill-catalog.json')).skills
  .map(skill => skill.id).filter(id => existsSync(resolve(root, 'demos', id, 'demo.json')))

// What the viewer sees typed. It is the exact command the recording runs.
export const displayCommand = config => `codex exec ${shellQuote(config.prompt)}${config.stdin ? ` < ${config.stdin}` : ''}`

// Recordings are published, so anything that identifies the machine or looks
// like a credential blocks rendering.
const forbidden = [
  [/(?:^|[\s'"=:(])\/Users\/[^/\s"'\\]+/m, 'a macOS home path'],
  [/(?:^|[\s'"=:(])\/home\/[a-z][^/\s"'\\]*/m, 'a Linux home path'],
  [/[A-Za-z0-9._%+-]+@(?!example\.(?:com|org|net)\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, 'an email address'],
  [/\b(?:sk|rk|pk)-[A-Za-z0-9_-]{20,}/, 'an API key'],
  [/\beyJ[A-Za-z0-9_-]{20,}\./, 'a JWT'],
  [/\b(?:ghp|gho|ghs|github_pat)_[A-Za-z0-9_]{20,}/, 'a GitHub token'],
]

export function privacyProblems(text, allowed = []) {
  const scanned = allowed.reduce((output, value) => output.split(value).join(''), text)
  return forbidden.filter(([pattern]) => pattern.test(scanned)).map(([, label]) => label)
}

// The terminal output of an asciicast, without color or cursor sequences.
export const castText = cast => cast.split('\n').slice(1).filter(Boolean).map(line => JSON.parse(line))
  .filter(([, type]) => type === 'o').map(([, , data]) => data).join('')
  .replace(/\x1b\[[0-9;?]*[A-Za-z]|\x1b\][^\x07]*\x07/g, '')

// Tools such as `ls -l` print the local account name; recordings show `demo` instead.
const account = new RegExp(`\\b${userInfo().username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')
export const redactAccount = text => text.replace(account, 'demo')

const castProblems = (root, id) => {
  const cast = resolve(root, 'demos', id, 'recording.cast')
  const text = castText(readFileSync(cast, 'utf8'))
  const problems = privacyProblems(text, demoConfig(root, id).allowedText)
  return new RegExp(account.source).test(text) ? [...problems, 'the local account name'] : problems
}

// asciicast v3 stores the interval since the previous event first.
export function castDuration(cast, idle = idleLimit) {
  return cast.split('\n').slice(1).filter(Boolean).reduce((total, line) => {
    const interval = JSON.parse(line)[0]
    return total + Math.min(interval, idle)
  }, 0)
}

function trackedFiles(root, path) {
  return execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', path], { cwd: root, encoding: 'utf8' })
    .split('\0').filter(file => file && existsSync(resolve(root, file)))
}

function copyTracked(root, from, to) {
  for (const file of trackedFiles(root, from)) {
    const target = resolve(to, file.slice(from.length + 1))
    mkdirSync(dirname(target), { recursive: true })
    cpSync(resolve(root, file), target)
  }
}

function prepareRun(root, id, config, { model, effort }) {
  const run = resolve(realpathSync('/tmp'), `skills-demo-${id}`)
  rmSync(run, { recursive: true, force: true })
  const home = resolve(run, 'home')
  const codexHome = resolve(home, '.codex')
  const work = resolve(home, `${id}-demo`)
  mkdirSync(codexHome, { recursive: true })
  // The whole folder, so skills with locked dependencies reuse the restored set offline.
  cpSync(resolve(root, 'skills', id), resolve(home, '.agents/skills', id), { recursive: true, filter: path => !path.endsWith('.DS_Store') })
  copyTracked(root, `demos/${id}/workspace`, work)

  const git = (...args) => execFileSync('git', args, { cwd: work, env: { ...gitEnv(home), PATH: process.env.PATH }, stdio: 'ignore' })
  writeFileSync(resolve(home, '.gitconfig'), '[user]\n\tname = Demo\n\temail = demo@example.com\n[init]\n\tdefaultBranch = main\n')
  git('init', '-q')
  git('add', '-A')
  git('commit', '-q', '-m', 'Initial demo workspace')
  // `changes/` lands as uncommitted work, for skills that review "this work".
  if (existsSync(resolve(root, 'demos', id, 'changes'))) copyTracked(root, `demos/${id}/changes`, work)

  writeFileSync(resolve(codexHome, 'config.toml'), [
    model && `model = ${JSON.stringify(model)}`,
    `model_reasoning_effort = ${JSON.stringify(effort)}`,
    'approval_policy = "never"',
    'sandbox_mode = "workspace-write"',
    ...config.codexConfig,
    '',
    '[history]',
    'persistence = "none"',
    '',
    `[projects.${JSON.stringify(work)}]`,
    'trust_level = "trusted"',
    '',
  ].filter(line => line !== undefined && line !== false).join('\n'))

  const command = displayCommand(config)
  writeFileSync(resolve(run, 'run.sh'), `#!/bin/bash
cd ${shellQuote(work)}
command=${shellQuote(command)}
printf '\\033[1;32m~/${id}-demo\\033[0m $ '
sleep 1
for ((i = 0; i < \${#command}; i++)); do printf '%s' "\${command:i:1}"; sleep 0.015; done
printf '\\n'
${command}
status=$?
sleep 3
exit $status
`)
  return { run, home, codexHome, work }
}

const gitEnv = home => ({ HOME: home, GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_DATE: '2026-01-01T00:00:00Z', GIT_COMMITTER_DATE: '2026-01-01T00:00:00Z' })

// Codex ChatGPT sign-in rotates refresh tokens. The run gets a copy, and a
// refreshed copy is written back so the original login stays valid.
function withAuth(codexHome, action) {
  const source = resolve(process.env.CODEX_HOME ?? resolve(homedir(), '.codex'), 'auth.json')
  if (!existsSync(source)) fail(`Sign in to Codex first; ${source} is missing`)
  const original = readFileSync(source, 'utf8')
  const copy = resolve(codexHome, 'auth.json')
  writeFileSync(copy, original, { mode: 0o600 })
  try {
    return action()
  } finally {
    const after = existsSync(copy) ? readFileSync(copy, 'utf8') : original
    const refreshed = after !== original && JSON.parse(after).last_refresh > JSON.parse(original).last_refresh
    if (refreshed && readFileSync(source, 'utf8') === original) writeFileSync(source, after, { mode: 0o600 })
    rmSync(copy, { force: true })
  }
}

export function record(root, id, { model, effort = 'medium' } = {}) {
  const config = demoConfig(root, id) ?? fail(`Missing demos/${id}/demo.json`)
  const { run, home, codexHome } = prepareRun(root, id, config, { model, effort })
  const cast = resolve(root, 'demos', id, 'recording.cast')
  const pathDirectories = [...new Set([dirname(process.execPath), dirname(execFileSync('which', ['codex'], { encoding: 'utf8' }).trim()), '/usr/bin', '/bin', '/usr/sbin', '/sbin'])]
  const env = {
    ...gitEnv(home),
    CODEX_HOME: codexHome,
    PATH: pathDirectories.join(':'),
    TERM: 'xterm-256color',
    COLORTERM: 'truecolor',
    LANG: 'en_US.UTF-8',
    SHELL: '/bin/bash',
  }
  console.log(`Recording ${id}: ${config.prompt}`)
  const result = withAuth(codexHome, () => spawnSync('asciinema', ['rec', '--headless', '--overwrite', '--return', '--quiet',
    '--window-size', `${window.cols}x${window.rows}`, '--idle-time-limit', String(idleLimit),
    '--title', `${id} demo`, '--command', `bash ${shellQuote(resolve(run, 'run.sh'))}`, cast],
  { env, stdio: 'inherit', timeout: config.timeoutMinutes * 60_000 }))
  if (result.error) fail(`Recording ${id} failed: ${result.error.message}`)
  if (result.status !== 0) fail(`Recording ${id} exited with ${result.status}; review ${cast} and ${run}`)

  writeFileSync(cast, redactAccount(readFileSync(cast, 'utf8')))
  const codex = execFileSync('codex', ['--version'], { encoding: 'utf8' }).trim().replace(/^codex-cli\s*/, '')
  const shownModel = castText(readFileSync(cast, 'utf8')).match(/^model:\s*(\S+)/m)?.[1] ?? model ?? 'Codex default'
  writeFileSync(resolve(root, 'demos', id, 'recording.json'), JSON.stringify({
    recorded: new Date().toISOString().slice(0, 10), codex, model: shownModel, prompt: config.prompt,
  }, null, 2) + '\n')
  rmSync(run, { recursive: true, force: true })
  const problems = castProblems(root, id)
  if (problems.length) fail(`${cast} contains ${problems.join(', ')}. Review it, then allow harmless text in demo.json allowedText.`)
}

export function render(root, id) {
  const cast = resolve(root, 'demos', id, 'recording.cast')
  if (!existsSync(cast)) fail(`Record ${id} first`)
  const problems = castProblems(root, id)
  if (problems.length) fail(`${cast} contains ${problems.join(', ')}`)
  const text = readFileSync(cast, 'utf8')
  const speed = Math.min(8, Math.max(1, Math.ceil(castDuration(text) / targetSeconds * 2) / 2))
  mkdirSync(resolve(root, media), { recursive: true })
  const gif = resolve(root, media, `${id}.gif`)
  const mp4 = resolve(root, media, `${id}.mp4`)
  execFileSync('agg', ['--quiet', '--theme', 'github-dark', '--font-size', '14', '--fps-cap', '15',
    '--idle-time-limit', String(idleLimit), '--speed', String(speed), '--last-frame-duration', '10', cast, gif], { stdio: 'inherit' })
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', gif, '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
    '-vf', 'fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-crf', '26', mp4], { stdio: 'inherit' })
  // The final frame doubles as the poster when a browser does not autoplay.
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-sseof', '-0.5', '-i', mp4, '-frames:v', '1', '-update', '1', resolve(root, media, `${id}.png`)], { stdio: 'inherit' })
  const metadataPath = resolve(root, 'demos', id, 'recording.json')
  writeFileSync(metadataPath, JSON.stringify({ ...readJson(metadataPath), speed }, null, 2) + '\n')
  const megabytes = statSync(gif).size / 1e6
  console.log(`Rendered ${id}: ${speed}x, GIF ${megabytes.toFixed(1)} MB, MP4 ${(statSync(mp4).size / 1e6).toFixed(1)} MB`)
  if (megabytes > 10) console.warn(`Warning: ${id}.gif is over GitHub's 10 MB image limit`)
}

// Embeds -------------------------------------------------------------------

const markers = (id, mdx) => mdx
  ? [`{/* demo:start:${id} */}`, `{/* demo:end:${id} */}`]
  : [`<!-- demo:start:${id} -->`, `<!-- demo:end:${id} -->`]

function caption(id, metadata, config) {
  const input = config.stdin ? `[synthetic input](${github}/demos/${id}/workspace)` : `a [synthetic workspace](${github}/demos/${id})`
  const speed = metadata.speed > 1 ? `, and playback runs at ${metadata.speed}x` : ''
  return `A real Codex run of the default prompt on ${input}, recorded ${metadata.recorded} with Codex CLI ${metadata.codex}. Waits are shortened${speed}.`
}

export function embeds(root, id, catalog) {
  const metadataPath = resolve(root, 'demos', id, 'recording.json')
  if (!existsSync(resolve(root, media, `${id}.mp4`)) || !existsSync(metadataPath)) return []
  const metadata = readJson(metadataPath)
  const config = demoConfig(root, id)
  const skill = catalog.skills.find(entry => entry.id === id)
  const shared = catalog.skills.filter(entry => entry.guide === skill.guide).length > 1
  const alt = `Codex running ${skill.title} with the prompt: ${config.prompt}`
  const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const guide = docs + skill.guide + (existsSync(resolve(root, docs, skill.guide + '.mdx')) ? '.mdx' : '.md')
  const video = `<video src="/demos/${id}.mp4" poster="/demos/${id}.png" aria-label="${escape(alt)}" autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/${id}.gif">Watch the ${escape(skill.title)} demo</a></video>`
  const gif = path => `![${alt.replace(/[[\]]/g, '')}](${path})`
  const result = [[guide, `## ${shared ? `See ${skill.title} run` : 'See it run'}\n\n${video}\n\n${caption(id, metadata, config)}`]]
  if (existsSync(resolve(root, 'skills', id, 'README.md'))) {
    result.push([`skills/${id}/README.md`, `${gif(`${site}/demos/${id}.gif`)}\n\n${caption(id, metadata, config)}`])
  }
  if (id === 'agent-verify') result.push(['README.md', `${gif(`${media}/${id}.gif`)}\n\n**${skill.title} in Codex.** ${caption(id, metadata, config)}`])
  return result
}

// First embed: docs pages get the demo after the invocation line, before the
// next section; READMEs get it before their first section.
export function insertBlock(source, id, content, path) {
  const [start, end] = markers(id, path.endsWith('.mdx'))
  const block = `${start}\n${content}\n${end}`
  if (source.includes(start)) {
    if (source.split(start).length !== 2 || !source.includes(end) || source.indexOf(start) > source.indexOf(end)) fail(`Broken demo markers in ${path} (${id})`)
    return source.slice(0, source.indexOf(start)) + block + source.slice(source.indexOf(end) + end.length)
  }
  // Another skill's demo on a shared page: follow it rather than splitting it.
  const lastEnd = [...source.matchAll(/(?:<!-- |\{\/\* )demo:end:[a-z0-9-]+(?: -->| \*\/\})\n/g)].at(-1)
  if (lastEnd) return source.slice(0, lastEnd.index + lastEnd[0].length) + '\n' + block + '\n' + source.slice(lastEnd.index + lastEnd[0].length)
  const anchor = path.startsWith(docs) ? source.indexOf('\n## ', source.indexOf('## Why use it') + 1) : source.indexOf('\n## ')
  if (anchor === -1) return source.trimEnd() + '\n\n' + block + '\n'
  return source.slice(0, anchor + 1) + block + '\n\n' + source.slice(anchor + 1)
}

export function syncEmbeds(root = repositoryRoot, { check = false } = {}) {
  const catalog = readJson(resolve(root, 'skill-catalog.json'))
  const files = new Map()
  for (const id of demoIds(root)) {
    for (const [path, content] of embeds(root, id, catalog)) {
      files.set(path, insertBlock(files.get(path) ?? readFileSync(resolve(root, path), 'utf8'), id, content, path))
    }
  }
  const stale = [...files].filter(([path, output]) => readFileSync(resolve(root, path), 'utf8') !== output)
  if (check && stale.length) fail(`Stale demo embeds. Run node scripts/demo.mjs embed:\n${stale.map(([path]) => path).join('\n')}`)
  if (!check) for (const [path, output] of stale) writeFileSync(resolve(root, path), output)
  for (const id of demoIds(root)) {
    if (!existsSync(resolve(root, 'demos', id, 'recording.cast'))) continue
    const problems = castProblems(root, id)
    if (problems.length) fail(`demos/${id}/recording.cast contains ${problems.join(', ')}`)
  }
  // Skill READMEs are copied into the marketplace bundle.
  if (!check && stale.some(([path]) => path.startsWith('skills/'))) syncCatalog(root)
  return stale.map(([path]) => path)
}

const usage = `Usage:
  node scripts/demo.mjs record <id...|all> [--model <model>] [--effort <effort>]
  node scripts/demo.mjs render <id...|all>
  node scripts/demo.mjs embed
  node scripts/demo.mjs --check`

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, ...rest] = process.argv.slice(2)
    const option = name => rest.includes(name) ? rest.splice(rest.indexOf(name), 2)[1] : undefined
    const model = option('--model')
    const effort = option('--effort')
    const ids = rest.includes('all') ? demoIds(repositoryRoot) : rest
    if (command === 'record' || command === 'render') {
      if (!ids.length) fail(usage)
      for (const id of ids) command === 'record' ? record(repositoryRoot, id, { model, effort }) : render(repositoryRoot, id)
    } else if (command === 'embed') {
      console.log(`Demo embeds: ${syncEmbeds(repositoryRoot).length} files updated.`)
    } else if (command === '--check') {
      syncEmbeds(repositoryRoot, { check: true })
      console.log(`Demo embeds: ${demoIds(repositoryRoot).length} demos current.`)
    } else {
      fail(usage)
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
