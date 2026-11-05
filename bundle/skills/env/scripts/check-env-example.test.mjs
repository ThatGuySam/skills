import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import { checkEnvText } from './check-env-example.mjs';

const cliPath = fileURLToPath(new URL('./check-env-example.mjs', import.meta.url));
const sentinel = 'SYNTHETIC_SECRET_SENTINEL_DO_NOT_ECHO';
const run = (args, input = '') => spawnSync(process.execPath, [cliPath, ...args], { input, encoding: 'utf8' });
const codes = result => result.diagnostics.map(d => d.code);
const annotated = `# Synthetic test configuration.\n\n# @type=port(min=1)\nPORT=3000\n\n# @type=enum(debug, info, warn, error)\nLOG_LEVEL=info\n\n# Configure using the dashboard.\n# @docs(https://docs.example.org/page?q=@foo#section)\n# @docs("Reference", https://docs.example.org/reference)\n# @required @sensitive\nTOKEN=\n`;

test('valid upstream annotations retain key-only missing-required report', () => {
  const result = checkEnvText(annotated);
  assert.equal(result.ok, true);
  assert.equal(result.complete, false);
  assert.equal(result.count, 3);
  assert.deepEqual(result.missingRequired, ['TOKEN']);
  assert.deepEqual(result.diagnostics, []);
  const values = checkEnvText(annotated, { mode: 'values' });
  assert.equal(values.ok, false);
  assert.deepEqual(codes(values), ['required-empty']);
});

test('required and optional blanks obey mode and default flags', () => {
  for (const mode of ['template', 'values']) {
    assert.equal(checkEnvText('# @optional\nEMPTY=""', { mode }).complete, true);
    assert.equal(checkEnvText('# @required=false\nEMPTY=', { mode }).complete, true);
    assert.equal(checkEnvText('# @optional=false\nEMPTY=', { mode }).complete, false);
    assert.equal(checkEnvText('# @defaultRequired=false\n# @defaultSensitive=false\n\nEMPTY=', { mode }).complete, true);
  }
  assert.equal(checkEnvText('EMPTY=').complete, false);
  assert.equal(checkEnvText('# @defaultRequired=false\n# @required\nEMPTY=', { mode: 'values' }).ok, false);
  assert.equal(checkEnvText('# @optional @type=number\nEMPTY=', { mode: 'values' }).ok, true);
});

test('enum is exact and permits quoted comma members', () => {
  assert.equal(checkEnvText('# @type=enum(debug, info)\nLEVEL=debug').ok, true);
  assert.equal(checkEnvText('# @type=enum(debug, info)\nLEVEL=DEBUG').ok, false);
  assert.equal(checkEnvText('# @type=enum("a,b", info)\nLEVEL="a,b"').ok, true);
});

test('numeric bounds and safe integers prevent unsupported coercion', () => {
  for (const value of ['1', '2', '+2', '2e0']) assert.equal(checkEnvText(`# @type=number(min=1, max=2, isInt=true)\nN=${value}`).ok, true);
  for (const value of ['0', '3', '1.5', 'NaN', 'Infinity', '0x10', '9007199254740992']) assert.equal(checkEnvText(`# @type=number(min=1, max=9007199254740992, isInt=true)\nN=${value === '3' ? '9007199254740993' : value}`).ok, false);
  for (const value of ['0', '65535']) assert.equal(checkEnvText(`# @type=port\nP=${value}`).ok, true);
  for (const value of ['-1', '65536', '1.5']) assert.equal(checkEnvText(`# @type=port\nP=${value}`).ok, false);
  assert.equal(checkEnvText('# @type=number(min=1, max=2)\nN=3').ok, false);
});

test('boolean values match documented case-sensitive spellings', () => {
  for (const value of ['t', 'true', 'yes', 'on', '1', 'f', 'false', 'no', 'off', '0']) assert.equal(checkEnvText(`# @type=boolean\nB=${value}`).ok, true);
  for (const value of ['TRUE', 'False', 'enabled', '2']) assert.equal(checkEnvText(`# @type=boolean\nB=${value}`).ok, false);
});

test('single-line assignment subset handles quotes and comments', () => {
  assert.equal(checkEnvText(`A=plain # ordinary comment\nB='quoted # value'\nC="double # value"\nD=hello world`).ok, true);
  assert.equal(checkEnvText('# Contact name@example.org or @someone in prose\nA=plain').ok, true);
  assert.equal(checkEnvText('# @required\n# Ordinary comment interleaved\nA=plain').ok, true);
  assert.equal(checkEnvText('# @example="clearly synthetic"\nA=plain').ok, true);
  assert.equal(checkEnvText('# @type=enum("[x]", "{x}")\nA="[x]"').ok, true);
});

test('duplicate, orphan, conflict and unsupported metadata fail closed', () => {
  const cases = [
    ['A=x\nA=y', 'duplicate-key'],
    ['# @required @required\nA=x', 'duplicate-decorator'],
    ['# @required\n\nA=x', 'orphan-decorator'],
    ['# @required\n# ---\nA=x', 'orphan-decorator'],
    ['# @required\n# ===\nA=x', 'orphan-decorator'],
    ['# @required\n# --- Section\nA=x', 'orphan-decorator'],
    ['# @required\n# ---Section\nA=x', 'orphan-decorator'],
    ['# @required\n# === Section\nA=x', 'orphan-decorator'],
    ['# @required', 'orphan-decorator'],
    ['# @unknown\nA=x', 'unknown-decorator'],
    ['# @required @optional\nA=x', 'conflicting-required'],
    ['# @sensitive @public\nA=x', 'conflicting-sensitive'],
    ['# @type=integer\nA=1', 'unsupported-type'],
    ['# @type=number(other=true)\nA=1', 'unsupported-type'],
    ['# @type=number(min=2, max=1)\nA=1', 'unsupported-type'],
    ['# @type=number(isInt=yes)\nA=1', 'unsupported-type'],
    ['# @type=number(min=1, min=2)\nA=1', 'unsupported-type'],
    ['# @type=port(min=-1)\nA=1', 'unsupported-type'],
    ['# @type=port(max=65536)\nA=1', 'unsupported-type'],
    ['# @type=port(min=1.5)\nA=2', 'unsupported-type'],
    ['# @type=boolean(yes)\nA=true', 'unsupported-type'],
    ['# @type=string(min=1)\nA=x', 'unsupported-type'],
    ['# @type=enum()\nA=x', 'unsupported-type'],
    ['# @type=enum([x])\nA=x', 'unsupported-type'],
    ['# @type=enum({x})\nA=x', 'unsupported-type'],
    ['# @type=enum(null)\nA="null"', 'unsupported-type'],
    ['# @required=infer\nA=x', 'invalid-flag'],
    ['# @defaultRequired=infer\nA=x', 'invalid-root-decorator'],
    ['# @defaultRequired=fn()\nA=x', 'invalid-root-decorator'],
    ['A=x\n# @defaultRequired=false', 'invalid-root-decorator'],
    ['# @defaultRequired=true\n# @defaultRequired=false\nA=x', 'invalid-root-decorator'],
    ['# @docs(file:///tmp/no)\nA=x', 'invalid-docs'],
    ['# @docs(not-a-url)\nA=x', 'invalid-docs'],
    ['# @docs(https://synthetic:password@example.org/)\nA=x', 'invalid-docs'],
    ['# @example=bare\nA=x', 'invalid-example'],
  ];
  for (const [source, code] of cases) {
    const report = checkEnvText(source);
    assert.equal(report.ok, false, source);
    assert.ok(codes(report).includes(code), source);
  }
});

test('interpolation, functions, multiline and ambiguous assignments fail closed', () => {
  for (const source of ['A=${TOKEN}', 'A=$TOKEN', 'A=fn()', 'A=`command`', 'A="line\nline"', 'A="escaped\\n"', 'export A=x', 'A="x"junk', 'A=x # @required', 'A=null', 'A=undefined', 'A=[x]', 'A={x}', '@env-spec {"required":true}']) assert.equal(checkEnvText(source).ok, false);
});

test('reports never echo values, annotation arguments or exceptions', () => {
  for (const source of [`# @type=enum(${sentinel})\nA=other`, `# @type=port\nA=${sentinel}`, `# @docs(https://${sentinel}.example/)\nA=x`, `# @${sentinel}\nA=x`, `A="${sentinel}`, `# @example="${sentinel}"\nA=x`]) {
    assert.equal(JSON.stringify(checkEnvText(source)).includes(sentinel), false);
    const result = run(['--stdin'], source);
    assert.equal((result.stdout + result.stderr).includes(sentinel), false);
  }
  assert.equal(JSON.stringify(checkEnvText('A=x', { mode: sentinel })).includes(sentinel), false);
});

test('CLI modes, input refusal and import behavior', () => {
  assert.equal(run(['--stdin'], 'A=').status, 0);
  assert.equal(run(['--stdin', '--mode', 'values'], 'A=').status, 1);
  assert.equal(run(['--stdin'], '# @type=port\nA=bad').status, 1);
  for (const argv of [[], ['--stdin', '--file', '/tmp/.env.example'], ['--stdin', '--mode', sentinel], ['--file', `/tmp/${sentinel}/.env`]]) {
    const result = run(argv);
    assert.equal(result.status, 2);
    assert.equal((result.stdout + result.stderr).includes(sentinel), false);
  }
  assert.equal(run(['--stdin'], 'x'.repeat(1024 * 1024 + 1)).status, 2);
  const imported = spawnSync(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(new URL('./check-env-example.mjs', import.meta.url).href)})`], { encoding: 'utf8' });
  assert.equal(imported.status, 0);
  assert.equal(imported.stdout, '');
  assert.equal(imported.stderr, '');
});

test('file mode checks committed regular blobs exclusively in synthetic Git repository', () => {
  const dir = mkdtempSync(join(tmpdir(), 'env-spec-test-'));
  const git = argv => execFileSync('git', ['-C', dir, ...argv], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    git(['init', '-q']);
    git(['config', 'user.name', 'Synthetic Test']);
    git(['config', 'user.email', 'synthetic@example.invalid']);
    mkdirSync(join(dir, 'nested'));
    writeFileSync(join(dir, '.env.example'), '# @type=port\nPORT=3000\n');
    writeFileSync(join(dir, 'nested', '.env.example'), '# @optional\nTOKEN=\n');
    git(['add', '--', '.env.example', 'nested/.env.example']);
    git(['commit', '-qm', 'Synthetic fixtures']);
    writeFileSync(join(dir, '.env.example'), `PORT=${sentinel}\n`);
    let result = run(['--file', join(dir, '.env.example')]);
    assert.equal(result.status, 0);
    assert.equal(JSON.parse(result.stdout).count, 1);
    assert.equal((result.stdout + result.stderr).includes(sentinel), false);
    assert.equal(run(['--file', join(dir, 'nested', '.env.example')]).status, 0);
    for (const name of ['.env', '.env.local']) {
      writeFileSync(join(dir, name), sentinel);
      assert.equal(run(['--file', join(dir, name)]).status, 2);
    }
    mkdirSync(join(dir, 'untracked'));
    writeFileSync(join(dir, 'untracked', '.env.example'), sentinel);
    assert.equal(run(['--file', join(dir, 'untracked', '.env.example')]).status, 2);
    git(['add', '--', 'untracked/.env.example']);
    assert.equal(run(['--file', join(dir, 'untracked', '.env.example')]).status, 2);
    rmSync(join(dir, '.env.example'));
    symlinkSync('.env.local', join(dir, '.env.example'));
    // A working-tree symlink cannot redirect the committed regular blob read.
    assert.equal(run(['--file', join(dir, '.env.example')]).status, 0);
    git(['add', '--', '.env.example']);
    git(['commit', '-qm', 'Synthetic symlink fixture']);
    result = run(['--file', join(dir, '.env.example')]);
    assert.equal(result.status, 2);
    assert.equal((result.stdout + result.stderr).includes(sentinel), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
