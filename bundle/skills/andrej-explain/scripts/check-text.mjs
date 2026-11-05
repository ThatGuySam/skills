#!/usr/bin/env node
/** Local text checks. No dependencies, network, rewriting, or compliance certification. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const limits = ['maxWordsPerSentence', 'maxSentencesPerParagraph', 'exactSentences'];
const lists = ['requiredLiterals', 'forbiddenLiterals'];
const keys = new Set([...limits, ...lists, 'forbidSemicolons']);

export function validateContract(contract) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) throw new Error('Contract must be an object.');
  for (const key of Object.keys(contract)) {
    if (!keys.has(key)) throw new Error(`Unknown contract key: ${key}`);
    const value = contract[key];
    if (limits.includes(key) && (!Number.isSafeInteger(value) || value < 1)) throw new Error(`${key} must be a positive safe integer.`);
    if (lists.includes(key) && (!Array.isArray(value) || value.some(x => typeof x !== 'string' || !x.trim()))) throw new Error(`${key} must be an array of nonempty strings.`);
    if (key === 'forbidSemicolons' && typeof value !== 'boolean') throw new Error('forbidSemicolons must be boolean.');
  }
}

// Match case-sensitive literals with identifier boundaries, not regex supplied by users.
export function containsLiteral(text, literal) {
  let start = 0;
  const identifier = /[\p{L}\p{N}_]/u;
  while (start <= text.length) {
    const index = text.indexOf(literal, start);
    if (index < 0) return false;
    const before = [...text.slice(0, index)].at(-1) || '';
    const after = [...text.slice(index + literal.length)][0] || '';
    const first = [...literal][0];
    const last = [...literal].at(-1);
    if (!(identifier.test(first) && identifier.test(before)) && !(identifier.test(last) && identifier.test(after))) return true;
    start = index + 1;
  }
  return false;
}

export function checkText(text, { profile = 'plain', contract = {} } = {}) {
  if (!['plain', 'procedure', 'description'].includes(profile)) throw new Error('Profile must be plain, procedure, or description.');
  validateContract(contract);
  if (typeof text !== 'string') throw new Error('Input must be text.');
  const sentenceSegmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
  const wordSegmenter = new Intl.Segmenter('en', { granularity: 'word' });
  const paragraphs = text.replace(/\r\n?/g, '\n').trim().split(/\n[ \t]*\n+/).filter(x => x.trim());
  const sentences = paragraphs.flatMap((paragraph, index) => [...sentenceSegmenter.segment(paragraph)]
    .map(({ segment }) => ({ paragraph: index + 1, text: segment.trim(), words: [...wordSegmenter.segment(segment)].filter(x => x.isWordLike).length }))
    .filter(x => x.words > 0));
  const errors = [];
  const warnings = [];
  if (!sentences.length) errors.push({ code: 'empty-text', message: 'Input contains no word-like text.' });
  const sentenceCounts = paragraphs.map((_, i) => sentences.filter(s => s.paragraph === i + 1).length);
  for (const [index, sentence] of sentences.entries()) {
    if (contract.maxWordsPerSentence && sentence.words > contract.maxWordsPerSentence) errors.push({ code: 'sentence-limit', sentence: index + 1, actual: sentence.words, limit: contract.maxWordsPerSentence });
    const suggested = profile === 'procedure' ? 20 : profile === 'description' ? 25 : null;
    if (suggested && sentence.words > suggested) warnings.push({ code: 'ste-length-review', sentence: index + 1, actual: sentence.words, suggested, message: 'Approximate count; inspect using official STE counting rules.' });
  }
  sentenceCounts.forEach((actual, index) => {
    if (contract.maxSentencesPerParagraph && actual > contract.maxSentencesPerParagraph) errors.push({ code: 'paragraph-limit', paragraph: index + 1, actual, limit: contract.maxSentencesPerParagraph });
    if (profile === 'description' && actual > 6) warnings.push({ code: 'ste-paragraph-review', paragraph: index + 1, actual, suggested: 6 });
  });
  if (contract.exactSentences && sentences.length !== contract.exactSentences) errors.push({ code: 'sentence-count', actual: sentences.length, expected: contract.exactSentences });
  const semicolons = [...text].filter(x => x === ';').length;
  if (semicolons && (profile !== 'plain' || contract.forbidSemicolons)) errors.push({ code: 'semicolon', actual: semicolons });
  for (const literal of contract.requiredLiterals || []) if (!containsLiteral(text, literal)) errors.push({ code: 'missing-literal', literal });
  for (const literal of contract.forbiddenLiterals || []) if (containsLiteral(text, literal)) errors.push({ code: 'forbidden-literal', literal });
  return {
    schemaVersion: 1, status: errors.length ? 'fail' : 'pass', profile,
    scope: 'Mechanical checks only; not ASD-STE100 compliance or semantic fidelity.',
    engine: { node: process.versions.node, icu: process.versions.icu, segmentation: 'Intl.Segmenter/en' },
    metrics: { paragraphs: paragraphs.length, sentences: sentences.length, words: sentences.reduce((n, s) => n + s.words, 0), sentenceCounts },
    sentences, errors, warnings,
  };
}

export function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node check-text.mjs <plain-text-file> [--profile plain|procedure|description] [--contract file.json]\nExit 0: checks pass (inspect warnings); 1: check failed; 2: invalid input/configuration.');
    return 0;
  }
  try {
    if (!args.length || args[0].startsWith('--')) throw new Error('A plain-text file is required. Use --help.');
    const file = args[0];
    const options = {};
    const seen = new Set();
    for (let i = 1; i < args.length; i += 2) {
      const flag = args[i], value = args[i + 1];
      if (!['--profile', '--contract'].includes(flag) || !value || value.startsWith('--') || seen.has(flag)) throw new Error(`Invalid or repeated option: ${flag}`);
      seen.add(flag);
      if (flag === '--profile') options.profile = value;
      else options.contract = JSON.parse(readFileSync(value, 'utf8'));
    }
    const report = checkText(readFileSync(file, 'utf8'), options);
    console.log(JSON.stringify(report, null, 2));
    return report.status === 'pass' ? 0 : 1;
  } catch (error) {
    console.log(JSON.stringify({ schemaVersion: 1, status: 'error', message: error.message }));
    return 2;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = main(process.argv.slice(2));
