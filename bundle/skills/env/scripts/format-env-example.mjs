import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const LIMIT = 1024 * 1024;
const diagnostic = (line, code, message) => ({ line, code, message });
const refusal = (line = 0) => ({ ok: false, diagnostics: [diagnostic(line,
  'unsupported-input', 'Input is outside the supported single-line syntax.')] });

// This is a deliberately conservative spacing grammar, not a dotenv validator.
// Reject uncertain quoting before identifying any comment-block boundaries.
function supportedValue(raw) {
  const value = raw.trimStart();
  if (value.startsWith('"') || value.startsWith("'")) {
    const quote = value[0];
    const end = value.indexOf(quote, 1);
    if (end < 0 || /[\\$`]/.test(value.slice(1, end))) return false;
    const tail = value.slice(end + 1).trim();
    return !tail || tail.startsWith('#');
  }
  const body = value.split('#', 1)[0];
  return !/[\\$`"'()\[\]{}]/.test(body);
}

/** Only fixed messages, codes, and line numbers appear in diagnostics. */
export function formatEnvText(text) {
  if (typeof text !== 'string' || Buffer.byteLength(text) > LIMIT || /\0|\r(?!\n)/.test(text)) {
    return refusal();
  }
  // Retain each original terminator, including mixed LF/CRLF input and EOF.
  const lines = text.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  const kinds = [];
  for (let index = 0; index < lines.length; index++) {
    const source = lines[index].replace(/\r?\n$/, '').trim();
    if (!source) { kinds.push('blank'); continue; }
    const commented = source.startsWith('#');
    const content = commented ? source.slice(1).trimStart() : source;
    const assignment = /^(?:export[ \t]+)?[A-Za-z_][A-Za-z0-9_]*[ \t]*=[ \t]*(.*)$/.exec(content);
    if (assignment) {
      if (!supportedValue(assignment[1])) return refusal(index + 1);
      kinds.push('assignment');
    } else if (commented) {
      kinds.push(content.startsWith('@') ? 'annotation' : 'prose');
    } else return refusal(index + 1);
  }

  const insertions = new Set();
  const diagnostics = [];
  for (let index = 0; index < kinds.length; index++) {
    if (kinds[index] !== 'prose' && kinds[index] !== 'annotation') continue;
    const start = index;
    let prose = false;
    while (kinds[index] === 'prose' || kinds[index] === 'annotation') {
      prose ||= kinds[index] === 'prose';
      index++;
    }
    if (prose && kinds[start - 1] === 'assignment' && kinds[index] === 'assignment') {
      insertions.add(start);
      diagnostics.push(diagnostic(start + 1, 'missing-block-spacing',
        'Add a blank line before this explanatory comment block.'));
    }
    index--;
  }
  const output = lines.map((line, index) => {
    if (!insertions.has(index)) return line;
    const newline = lines[index - 1].endsWith('\r\n') ? '\r\n' : '\n';
    return newline + line;
  }).join('');
  return { ok: true, text: output, diagnostics };
}

async function cli(argv) {
  const modes = argv.filter(arg => arg === '--check' || arg === '--format');
  if (modes.length !== 1 || argv.filter(arg => arg === '--stdin').length > 1
      || argv.some(arg => !['--check', '--format', '--stdin'].includes(arg))) {
    process.stderr.write(JSON.stringify({ ok: false, diagnostics: [diagnostic(0,
      'invalid-arguments', 'Use --check or --format with newly authored text on stdin.')] }) + '\n');
    process.exitCode = 2;
    return;
  }
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of process.stdin) {
      size += chunk.length;
      if (size > LIMIT) throw new Error();
      chunks.push(chunk);
    }
    const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
    const result = formatEnvText(decoder.decode(Buffer.concat(chunks)));
    if (!result.ok) {
      process.stderr.write(JSON.stringify(result) + '\n');
      process.exitCode = 2;
    } else if (modes[0] === '--format') {
      process.stdout.write(result.text);
    } else {
      process.stdout.write(JSON.stringify({ ok: result.diagnostics.length === 0,
        diagnostics: result.diagnostics }) + '\n');
      process.exitCode = result.diagnostics.length ? 1 : 0;
    }
  } catch {
    process.stderr.write(JSON.stringify(refusal()) + '\n');
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await cli(process.argv.slice(2));
}
