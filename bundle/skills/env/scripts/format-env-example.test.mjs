import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { formatEnvText } from './format-env-example.mjs';

// All fixtures are authored synthetic strings; no env files are read.
const script = fileURLToPath(new URL('./format-env-example.mjs', import.meta.url));
const run = (args, input = '') => spawnSync(process.execPath, [script, ...args], { input, encoding: 'utf8' });
function formatted(input, expected) {
  const result = formatEnvText(input);
  assert.equal(result.ok, true);
  assert.equal(result.text, expected);
  assert.equal(formatEnvText(result.text).text, expected);
  assert.deepEqual(formatEnvText(result.text).diagnostics, []);
  assert.equal(input.replace(/^[ \t]*\r?\n/gm, ''), expected.replace(/^[ \t]*\r?\n/gm, ''));
}

test('separates prose belonging to active and commented optional flags', () => {
  const input = '# @defaultRequired=false\nBASE=\n# Enable a synthetic option.\n# FLAG_A=true\n# Enable a second synthetic option.\n# FLAG_B=false\n';
  formatted(input, input.replace('BASE=\n#', 'BASE=\n\n#').replace('FLAG_A=true\n#', 'FLAG_A=true\n\n#'));
});

test('keeps multi-line prose and annotations together', () => {
  const block = '# Choose a synthetic endpoint.\n# Keep this second sentence together.\n# @optional\n# @public\nURL="https://example.invalid/#fragment"\n';
  formatted('BASE=\n' + block, 'BASE=\n\n' + block);
});

test('keeps compact bare and annotation-only groups regardless of size', () => {
  const input = 'VITE_API_BASE=\n# @optional\n# @public\nVITE_ADMIN_PATH=/admin\n'
    + Array.from({ length: 30 }, (_, i) => `SYNTHETIC_${i}=\n`).join('');
  formatted(input, input);
});

test('retains section markers and existing shared-header blank lines', () => {
  const input = '# Shared guidance.\n\nA=\nB=\n\n# === Next section ===\nC=\n';
  formatted(input, input);
  formatted('A=\n# === Next section ===\nB=\n', 'A=\n\n# === Next section ===\nB=\n');
});

test('trailing prose and blank-separated assignment do not acquire spacing', () => {
  for (const input of ['A=\n# Trailing prose.\n', 'A=\n# Shared header.\n\nB=\n', 'A=\n# @optional\n# Trailing prose.']) {
    formatted(input, input);
  }
});

test('preserves CRLF, whitespace, quotes, comments, exports and missing final newline', () => {
  const input = "  export A = 'literal#hash' # unchanged  \r\n\t# Guidance.  \r\n # B = \"literal\" # unchanged";
  formatted(input, input.replace('\r\n\t#', '\r\n\r\n\t#'));
});

test('preserves mixed native terminators without normalization', () => {
  formatted('A=\r\n# Guidance.\nB=\r\n', 'A=\r\n\r\n# Guidance.\nB=\r\n');
});

test('refuses multiline, ambiguous quoting and dynamic active values without candidate', () => {
  for (const input of ['A="first\n# prose\nB=second\nlast"', "A='first\nlast'", 'A=`first\nlast`', 'A="one"tail', 'A=one"two', 'A=${OTHER}', 'A=one\\', '# A="first\n# second"']) {
    const result = formatEnvText(input);
    assert.equal(result.ok, false);
    assert.equal(Object.hasOwn(result, 'text'), false);
    assert.deepEqual(Object.keys(result.diagnostics[0]).sort(), ['code', 'line', 'message']);
    assert.equal(result.diagnostics[0].code, 'unsupported-input');
  }
});

test('hash inside quotes stays a value and inline comment syntax stays untouched', () => {
  const input = "A='# # @public'\n# Guidance.\nB=plain # arbitrary $ ` \\ inline comment\n";
  formatted(input, input.replace('\n# Guidance.', '\n\n# Guidance.'));
});

test('root decorators are annotation text, not prose or a semantic validation target', () => {
  const input = '# @defaultRequired=false\n# @defaultSensitive=true\nA=\n# @custom=value\nB=\n';
  formatted(input, input);
});

test('refuses invalid input and unsupported active lines with sanitized diagnostics', () => {
  for (const input of [null, 'A=\0\n', 'A=\rB=', 'PRIVATE_SENTINEL', 'A='.repeat(600000)]) {
    const result = formatEnvText(input);
    assert.equal(result.ok, false);
    assert.equal(JSON.stringify(result).includes('PRIVATE_SENTINEL'), false);
  }
});

test('API diagnostics point to original comment lines with no keys or values', () => {
  const result = formatEnvText('PRIVATE_NAME=PRIVATE_VALUE\n# PRIVATE_COMMENT\nB=\n');
  assert.deepEqual(result.diagnostics, [{ line: 2, code: 'missing-block-spacing',
    message: 'Add a blank line before this explanatory comment block.' }]);
});

test('CLI check reports clean or needs-spacing without exposing text', () => {
  const clean = run(['--check', '--stdin'], 'A=\n');
  assert.equal(clean.status, 0);
  assert.equal(JSON.parse(clean.stdout).ok, true);
  const dirty = run(['--check'], 'A=PRIVATE_VALUE\n# PRIVATE_COMMENT\nB=\n');
  assert.equal(dirty.status, 1);
  assert.equal(JSON.parse(dirty.stdout).diagnostics[0].line, 2);
  assert.equal(dirty.stdout.includes('PRIVATE'), false);
});

test('CLI format produces only candidate text; unsupported input exits 2', () => {
  const result = run(['--stdin', '--format'], 'A=\n# Guidance.\nB=');
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'A=\n\n# Guidance.\nB=');
  assert.equal(result.stderr, '');
  const rejected = run(['--format'], 'A="PRIVATE_SENTINEL\n');
  assert.equal(rejected.status, 2);
  assert.equal(rejected.stdout, '');
  assert.equal(rejected.stderr.includes('PRIVATE_SENTINEL'), false);
});

test('CLI refuses filesystem arguments, unknown flags, duplicate modes, and invalid UTF-8', () => {
  for (const args of [[], ['--format', '--check'], ['--check', '--check'], ['--check', '--file', 'PRIVATE_SENTINEL'], ['--format', '--stdin', '--stdin'], ['--PRIVATE_SENTINEL']]) {
    const result = run(args, 'PRIVATE_INPUT');
    assert.equal(result.status, 2);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr.includes('PRIVATE'), false);
    assert.equal(JSON.parse(result.stderr).diagnostics[0].code, 'invalid-arguments');
  }
  const result = run(['--format'], Buffer.from([0xff]));
  assert.equal(result.status, 2);
  assert.equal(result.stdout, '');
});
