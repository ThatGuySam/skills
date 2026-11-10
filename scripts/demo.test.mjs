import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { castDuration, defaultPrompt, demoConfig, demoIds, displayCommand, insertBlock, privacyProblems, syncEmbeds } from './demo.mjs'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = 'apps/docs/src/content/docs/'

test('reads the default prompt from agents/openai.yaml', () => {
  assert.equal(defaultPrompt('interface:\n  default_prompt: "Use $x to say \\"hi\\"."\n'), 'Use $x to say "hi".')
  assert.equal(defaultPrompt('interface:\n  display_name: "X"\n'), undefined)
})

test('every demo has a prompt and its fixture files', () => {
  for (const id of demoIds(repository)) {
    const config = demoConfig(repository, id)
    assert.ok(config.prompt.includes(`$${id} `), `${id} prompt invokes the skill`)
    if (config.stdin) assert.ok(readFileSync(resolve(repository, 'demos', id, 'workspace', config.stdin)), `${id} stdin fixture`)
  }
})

test('the displayed command passes the exact prompt to codex', () => {
  for (const prompt of ['Use $a to read this.', "Use $a to read the project's notes.", 'Use $a with "quotes" and `ticks`.']) {
    const command = displayCommand({ prompt }).replace(/^codex exec /, 'printf %s ')
    assert.equal(execFileSync('bash', ['-c', command], { encoding: 'utf8' }), prompt)
  }
  assert.equal(displayCommand({ prompt: 'Use $a.', stdin: 'notes.md' }), "codex exec 'Use $a.' < notes.md")
})

test('flags machine paths and credentials but not demo paths', () => {
  assert.deepEqual(privacyProblems('workdir: /private/tmp/skills-demo-a/home/a-demo\nfrom demo@example.com'), [])
  assert.deepEqual(privacyProblems('cat /Users/sam/notes'), ['a macOS home path'])
  assert.deepEqual(privacyProblems('cd /home/sam'), ['a Linux home path'])
  assert.deepEqual(privacyProblems('mail me at someone@company.io'), ['an email address'])
  assert.deepEqual(privacyProblems('key sk-abcdefghijklmnopqrstuvwxyz'), ['an API key'])
})

test('measures recordings with idle time capped', () => {
  const cast = '{"version":3}\n[0.5, "o", "a"]\n[30, "o", "b"]\n[1, "x", "0"]\n'
  assert.equal(castDuration(cast, 2), 3.5)
})

test('inserts a docs demo after the invocation line and updates it in place', () => {
  const page = '---\ntitle: X\n---\n\n## Why use it\n\nBrief.\n\nInvoke it as `$x`.\n\n## More prompts\n\nMore.\n'
  const path = docs + 'x/introduction.md'
  const first = insertBlock(page, 'x', 'Demo one', path)
  assert.match(first, /Invoke it as `\$x`\.\n\n<!-- demo:start:x -->\nDemo one\n<!-- demo:end:x -->\n\n## More prompts/)
  const second = insertBlock(first, 'x', 'Demo two', path)
  assert.equal(second, first.replace('Demo one', 'Demo two'))
  assert.match(insertBlock(page, 'x', 'Demo', docs + 'x/introduction.mdx'), /\{\/\* demo:start:x \*\/\}\nDemo\n\{\/\* demo:end:x \*\/\}/)
})

test('a second demo on a shared page follows the first one', () => {
  const path = docs + 'x/introduction.md'
  const page = insertBlock('## Why use it\n\nBrief.\n\n## More prompts\n', 'a', '## See A run', path)
  assert.equal(insertBlock(page, 'b', '## See B run', path),
    '## Why use it\n\nBrief.\n\n<!-- demo:start:a -->\n## See A run\n<!-- demo:end:a -->\n\n<!-- demo:start:b -->\n## See B run\n<!-- demo:end:b -->\n\n## More prompts\n')
})

test('inserts a README demo before the first section', () => {
  assert.equal(insertBlock('# X\n\nIntro.\n\n## Install\n', 'x', 'GIF', 'README.md'), '# X\n\nIntro.\n\n<!-- demo:start:x -->\nGIF\n<!-- demo:end:x -->\n\n## Install\n')
})

test('repository demo embeds are current', () => {
  syncEmbeds(repository, { check: true })
})
