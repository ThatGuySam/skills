import { parseEnv } from 'node:util';
import { execFileSync } from 'node:child_process';
import { basename, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const LIMIT = 1024 * 1024;
const decimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
const booleanValues = new Set(['t', 'true', 'yes', 'on', '1', 'f', 'false', 'no', 'off', '0']);
const flags = new Set(['required', 'optional', 'sensitive', 'public']);
const roots = new Set(['defaultRequired', 'defaultSensitive']);
const own = (object, key) => Object.hasOwn(object, key);

// Split static arguments without evaluating them. Escapes and nested expressions
// are deliberately outside this checker's supported grammar.
function args(text) {
  const result = [];
  let quote = '', start = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '\\' || char === '$' || char === '`') return null;
    if (quote) { if (char === quote) quote = ''; }
    else if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === ')') return null;
    else if (char === ',') { result.push(text.slice(start, i).trim()); start = i + 1; }
  }
  if (quote) return null;
  result.push(text.slice(start).trim());
  return result;
}

function literal(text) {
  if (!text || /[\\$`]/.test(text)) return null;
  if (text[0] === '"' || text[0] === "'") {
    const quote = text[0];
    return text.length >= 2 && text.at(-1) === quote && !text.slice(1, -1).includes(quote)
      ? text.slice(1, -1) : null;
  }
  return /[\s"'(),\[\]{}]/.test(text) || /^(undefined|null)$/.test(text) ? null : text;
}

function decorators(text) {
  const result = [];
  let i = 0;
  while (i < text.length) {
    while (/\s/.test(text[i] ?? '') && i < text.length) i++;
    if (i === text.length) break;
    const match = /^@([A-Za-z][A-Za-z0-9]*)/.exec(text.slice(i));
    if (!match) return null;
    i += match[0].length;
    const start = i;
    let depth = 0, quote = '';
    for (; i < text.length; i++) {
      const char = text[i];
      if (char === '\\' || char === '$' || char === '`') return null;
      if (quote) { if (char === quote) quote = ''; continue; }
      if (char === '"' || char === "'") { quote = char; continue; }
      if (char === '(') depth++;
      if (char === ')') { depth--; if (depth < 0) return null; }
      if (depth === 0 && /\s/.test(char)) break;
    }
    if (quote || depth !== 0) return null;
    result.push({ name: match[1], suffix: text.slice(start, i) });
  }
  return result;
}

function typeSpec(suffix) {
  const match = /^=([a-z]+)(?:\((.*)\))?$/.exec(suffix);
  if (!match) return null;
  const name = match[1], body = match[2];
  if (name === 'string' || name === 'boolean') return body === undefined ? { name } : null;
  if (name === 'enum') {
    if (body === undefined) return null;
    const members = args(body)?.map(literal);
    return members?.length && members.every(member => member !== null && member !== '')
      ? { name, members } : null;
  }
  if (name !== 'number' && name !== 'port') return null;
  const spec = { name };
  if (body !== undefined) {
    const parts = args(body);
    if (!parts) return null;
    for (const part of parts) {
      const option = /^(min|max|isInt)\s*=\s*(\S+)$/.exec(part);
      if (!option || own(spec, option[1]) || (name === 'port' && option[1] === 'isInt')) return null;
      if (option[1] === 'isInt') {
        if (!['true', 'false'].includes(option[2])) return null;
        spec.isInt = option[2] === 'true';
      } else {
        if (!decimal.test(option[2]) || !Number.isFinite(Number(option[2]))) return null;
        spec[option[1]] = Number(option[2]);
      }
    }
  }
  if (name === 'port') {
    spec.min ??= 0;
    spec.max ??= 65535;
    if (![spec.min, spec.max].every(n => Number.isInteger(n) && n >= 0 && n <= 65535)) return null;
  }
  if (spec.min !== undefined && spec.max !== undefined && spec.min > spec.max) return null;
  return spec;
}

function assignment(text) {
  const match = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(text);
  if (!match) return null;
  const raw = match[2];
  if (/[\\$`]/.test(raw)) return { key: match[1], error: true };
  let value, comment = '';
  if (raw[0] === '"' || raw[0] === "'") {
    const close = raw.indexOf(raw[0], 1);
    if (close < 0) return { key: match[1], error: true };
    value = raw.slice(1, close);
    const trailing = raw.slice(close + 1).trim();
    if (trailing && !trailing.startsWith('#')) return { key: match[1], error: true };
    comment = trailing.slice(1).trim();
  } else {
    const hash = raw.indexOf('#');
    value = (hash < 0 ? raw : raw.slice(0, hash)).trim();
    comment = hash < 0 ? '' : raw.slice(hash + 1).trim();
    if (/["'()\[\]{}]/.test(value) || /^(undefined|null)$/.test(value)) return { key: match[1], error: true };
  }
  if (comment.startsWith('@')) return { key: match[1], error: true };
  try {
    const parsed = parseEnv(text);
    if (!own(parsed, match[1]) || parsed[match[1]] !== value) return { key: match[1], error: true };
    return { key: match[1], value };
  } catch { return { key: match[1], error: true }; }
}

/** No values, annotation contents, or exceptions are returned in a report. */
export function checkEnvText(text, { mode = 'template' } = {}) {
  const diagnostics = [], missingRequired = [];
  const report = { ok: false, complete: false, mode, count: 0, missingRequired, diagnostics };
  const add = (line, key, code, message) => diagnostics.push({ line, key, code, message });
  if (!['template', 'values'].includes(mode)) {
    report.mode = 'invalid';
    add(0, null, 'invalid-mode', 'Unsupported validation mode.');
    return report;
  }
  if (typeof text !== 'string' || Buffer.byteLength(text) > LIMIT || text.includes('\0')) {
    add(0, null, 'invalid-input', 'Input must be text within the supported size and character limits.');
    return report;
  }
  let pending = [], seenAssignment = false;
  const defaults = { defaultRequired: true, defaultSensitive: true }, rootSeen = new Set(), keys = new Set();
  const flush = () => {
    for (const item of pending) add(item.line, null, 'orphan-decorator', 'Item annotation has no attached assignment.');
    pending = [];
  };
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const line = index + 1, source = lines[index].trim();
    if (!source || /^#\s*(?:---|===)/.test(source)) { flush(); continue; }
    if (source.startsWith('#')) {
      const content = source.slice(1).trim();
      if (!content.startsWith('@')) continue;
      const parsed = decorators(content);
      if (!parsed) { add(line, null, 'unsupported-annotation', 'Annotation syntax is unsupported.'); continue; }
      for (const item of parsed) {
        if (roots.has(item.name)) {
          if (seenAssignment || pending.length || rootSeen.has(item.name) || !/^=(true|false)$/.test(item.suffix)) {
            add(line, null, 'invalid-root-decorator', 'Root annotation must be a unique boolean in the header.');
          } else { defaults[item.name] = item.suffix === '=true'; rootSeen.add(item.name); }
        } else pending.push({ ...item, line });
      }
      continue;
    }
    seenAssignment = true;
    const item = assignment(source);
    if (!item || item.error) {
      add(line, item?.key ?? null, 'unsupported-assignment', 'Assignment syntax is unsupported.');
      flush(); continue;
    }
    const { key, value } = item;
    report.count++;
    if (keys.has(key)) add(line, key, 'duplicate-key', 'Variable is assigned more than once.');
    keys.add(key);
    const meta = Object.create(null);
    let spec = { name: 'string' };
    for (const annotation of pending) {
      const { name, suffix, line: annotationLine } = annotation;
      if (own(meta, name) && name !== 'docs') {
        add(annotationLine, key, 'duplicate-decorator', 'Item annotation is repeated.'); continue;
      }
      meta[name] = true;
      if (flags.has(name)) {
        if (!/^(?:=(?:true|false))?$/.test(suffix)) add(annotationLine, key, 'invalid-flag', 'Flag annotation must be a static boolean.');
        else meta[name] = suffix !== '=false';
      } else if (name === 'type') {
        const parsedType = typeSpec(suffix);
        if (!parsedType) add(annotationLine, key, 'unsupported-type', 'Type or type options are invalid or unsupported.');
        else spec = parsedType;
      } else if (name === 'docs') {
        const parts = /^\((.*)\)$/.exec(suffix);
        const values = parts ? args(parts[1])?.map(literal) : null;
        let valid = values && [1, 2].includes(values.length) && values.every(v => v !== null && v !== '');
        if (valid) {
          try {
            const url = new URL(values.at(-1));
            valid = ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
          }
          catch { valid = false; }
        }
        if (!valid) add(annotationLine, key, 'invalid-docs', 'Documentation annotation requires a static HTTP or HTTPS URL.');
      } else if (name === 'example') {
        if (!/^=("[^"\\$`]*"|'[^'\\$`]*')$/.test(suffix)) add(annotationLine, key, 'invalid-example', 'Example annotation requires a quoted static string.');
      } else add(annotationLine, key, 'unknown-decorator', 'Annotation is unsupported.');
    }
    pending = [];
    if (own(meta, 'required') && own(meta, 'optional')) add(line, key, 'conflicting-required', 'Required and optional annotations cannot be combined.');
    if (own(meta, 'sensitive') && own(meta, 'public')) add(line, key, 'conflicting-sensitive', 'Sensitive and public annotations cannot be combined.');
    const required = own(meta, 'required') ? meta.required : own(meta, 'optional') ? !meta.optional : defaults.defaultRequired;
    if (value === '') {
      if (required) {
        missingRequired.push(key);
        if (mode === 'values') add(line, key, 'required-empty', 'Required variable is empty.');
      }
      continue;
    }
    let valid = true;
    if (spec.name === 'enum') valid = spec.members.includes(value);
    else if (spec.name === 'boolean') valid = booleanValues.has(value);
    else if (spec.name === 'number' || spec.name === 'port') {
      const number = Number(value);
      valid = decimal.test(value) && Number.isFinite(number)
        && (!(spec.isInt || spec.name === 'port') || Number.isSafeInteger(number))
        && (spec.min === undefined || number >= spec.min)
        && (spec.max === undefined || number <= spec.max);
    }
    if (!valid) add(line, key, 'invalid-value', 'Value does not satisfy its declared type.');
  }
  flush();
  report.ok = diagnostics.length === 0;
  report.complete = report.ok && missingRequired.length === 0;
  return report;
}

function git(cwd, argv) {
  return execFileSync('git', ['--literal-pathspecs', '-C', cwd, ...argv], { encoding: 'utf8', maxBuffer: LIMIT + 4096, stdio: ['ignore', 'pipe', 'pipe'] });
}

function committedExample(path) {
  if (basename(path) !== '.env.example') throw new Error('refusal');
  const absolute = resolve(path), parent = dirname(absolute);
  // Git resolves the repository from the parent. No stat/read/realpath of the
  // requested env path is performed, including when the working copy is a link.
  const prefix = git(parent, ['rev-parse', '--show-prefix']).trimEnd();
  const repoPath = `${prefix}.env.example`;
  git(parent, ['ls-files', '--error-unmatch', '--', '.env.example']);
  const root = git(parent, ['rev-parse', '--show-toplevel']).trimEnd();
  const tree = git(root, ['ls-tree', '-z', 'HEAD', '--', repoPath]);
  const entries = tree.split('\0').filter(Boolean);
  if (entries.length !== 1) throw new Error('refusal');
  const match = /^(100644|100755) blob ([a-f0-9]+)\t(.+)$/.exec(entries[0]);
  if (!match || match[3] !== repoPath) throw new Error('refusal');
  const size = Number(git(root, ['cat-file', '-s', match[2]]).trim());
  if (!Number.isSafeInteger(size) || size > LIMIT) throw new Error('refusal');
  return git(root, ['cat-file', 'blob', match[2]]);
}

async function cli(argv) {
  let mode = 'template', path, stdin = false, seenMode = false;
  try {
    for (let i = 0; i < argv.length; i++) {
      if (argv[i] === '--stdin' && !stdin) stdin = true;
      else if (argv[i] === '--file' && path === undefined && argv[i + 1]) path = argv[++i];
      else if (argv[i] === '--mode' && !seenMode && ['template', 'values'].includes(argv[i + 1])) { mode = argv[++i]; seenMode = true; }
      else throw new Error('refusal');
    }
    if (stdin === (path !== undefined)) throw new Error('refusal');
    let text;
    if (stdin) {
      const chunks = [];
      let size = 0;
      for await (const chunk of process.stdin) {
        size += chunk.length;
        if (size > LIMIT) throw new Error('refusal');
        chunks.push(chunk);
      }
      text = Buffer.concat(chunks).toString('utf8');
    } else text = committedExample(path);
    const result = checkEnvText(text, { mode });
    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode = result.ok ? 0 : 1;
  } catch {
    process.stdout.write(`${JSON.stringify({ ok: false, complete: false, mode, count: 0, missingRequired: [], diagnostics: [{ line: 0, key: null, code: 'input-refused', message: 'Input or command is unsupported or could not be read safely.' }] })}\n`);
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await cli(process.argv.slice(2));
