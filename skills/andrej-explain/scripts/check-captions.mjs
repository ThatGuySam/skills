#!/usr/bin/env node
/** Check SRT timing and structure only. Does not render or assess narration. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function milliseconds(value) {
  const match = /^(\d{2,}):([0-5]\d):([0-5]\d),(\d{3})$/.exec(value);
  if (!match) throw new Error(`Invalid timestamp: ${value}`);
  const [, h, m, s, ms] = match;
  const total = Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000 + Number(ms);
  if (!Number.isSafeInteger(total)) throw new Error('Timestamp exceeds safe integer range.');
  return total;
}
export function checkCaptions(text, durationMs) {
  if (durationMs !== undefined && (!Number.isSafeInteger(durationMs) || durationMs <= 0)) throw new Error('Duration must be a positive safe integer in milliseconds.');
  const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  const blocks = normalized ? normalized.split(/\n[ \t]*\n+/) : [];
  const errors = [];
  let previousEnd = 0;
  if (!blocks.length) errors.push({ code: 'empty-captions' });
  blocks.forEach((block, index) => {
    const [number, timing, ...body] = block.split('\n');
    if (number?.trim() !== String(index + 1)) errors.push({ code: 'sequence', cue: index + 1 });
    if (!body.join('\n').trim()) errors.push({ code: 'empty-cue', cue: index + 1 });
    try {
      const match = /^(\S+) --> (\S+)$/.exec(timing?.trim() || '');
      if (!match) throw new Error('Expected HH:MM:SS,mmm --> HH:MM:SS,mmm.');
      const start = milliseconds(match[1]), end = milliseconds(match[2]);
      if (end <= start) errors.push({ code: 'nonpositive-duration', cue: index + 1 });
      if (start < previousEnd) errors.push({ code: 'overlap-or-order', cue: index + 1 });
      if (durationMs !== undefined && end > durationMs) errors.push({ code: 'exceeds-duration', cue: index + 1, end, durationMs });
      previousEnd = Math.max(previousEnd, end);
    } catch (error) { errors.push({ code: 'timestamp', cue: index + 1, message: error.message }); }
  });
  return { schemaVersion: 1, status: errors.length ? 'fail' : 'pass', scope: 'SRT structure and timing only; no audio/video verification.', cues: blocks.length, endMs: previousEnd, durationMs: durationMs ?? null, errors };
}
export function main(args) {
  if (args.length === 1 && args[0] === '--help') { console.log('Usage: node check-captions.mjs <file.srt> [--duration-ms integer]\nExit 0: pass; 1: invalid captions; 2: input/configuration error. Gaps are allowed; overlaps are rejected.'); return 0; }
  try {
    if (![1, 3].includes(args.length) || args[0].startsWith('--') || (args.length === 3 && (args[1] !== '--duration-ms' || !/^\d+$/.test(args[2])))) throw new Error('Invalid arguments. Use --help.');
    const report = checkCaptions(readFileSync(args[0], 'utf8'), args.length === 3 ? Number(args[2]) : undefined);
    console.log(JSON.stringify(report, null, 2));
    return report.status === 'pass' ? 0 : 1;
  } catch (error) { console.log(JSON.stringify({ schemaVersion: 1, status: 'error', message: error.message })); return 2; }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = main(process.argv.slice(2));
