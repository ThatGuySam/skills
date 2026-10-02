import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { checkText, containsLiteral } from '../../skills/andrej-explain/scripts/check-text.mjs';
import { checkCaptions } from '../../skills/andrej-explain/scripts/check-captions.mjs';

const words = n => Array(n).fill('word').join(' ') + '.';
const cue = (n, start, end, text = 'Caption.') => `${n}\n${start} --> ${end}\n${text}`;

test('procedure boundary: 20 words passes, 21 warns without certification', () => {
  assert.equal(checkText(words(20), { profile: 'procedure' }).warnings.length, 0);
  const report = checkText(words(21), { profile: 'procedure' });
  assert.equal(report.warnings[0].code, 'ste-length-review');
  assert.equal(report.status, 'pass');
  assert.match(report.scope, /not ASD-STE100/);
});
test('description 25/26 words and 6/7 sentences use advisory limits', () => {
  assert.equal(checkText(words(25), { profile: 'description' }).warnings.length, 0);
  assert.equal(checkText(words(26), { profile: 'description' }).warnings.length, 1);
  for (const n of [6, 7]) {
    const report = checkText(Array(n).fill('It works.').join(' '), { profile: 'description' });
    assert.equal(report.warnings.length, n === 7 ? 1 : 0);
  }
});
test('explicit contract length limits fail at the boundary', () => {
  assert.equal(checkText(words(21), { contract: { maxWordsPerSentence: 20 } }).status, 'fail');
  assert.equal(checkText('One. Two.', { contract: { maxSentencesPerParagraph: 1 } }).status, 'fail');
  assert.equal(checkText('One.\n\nTwo.', { contract: { maxSentencesPerParagraph: 1, exactSentences: 2 } }).status, 'pass');
  assert.equal(checkText('One.', { contract: { exactSentences: 2 } }).status, 'fail');
});
test('semicolons fail STE profiles and explicit contracts, not plain default', () => {
  assert.equal(checkText('Open; close.').status, 'pass');
  assert.equal(checkText('Open; close.', { profile: 'procedure' }).status, 'fail');
  assert.equal(checkText('Open; close.', { contract: { forbidSemicolons: true } }).status, 'fail');
});
test('required values cannot hide inside larger numbers or identifiers', () => {
  assert.equal(containsLiteral('Wait 15 seconds.', '5 seconds'), false);
  assert.equal(containsLiteral('Error X429.', '429'), false);
  assert.equal(containsLiteral('Wait at least 5 seconds.', 'at least 5 seconds'), true);
  assert.equal(containsLiteral('éTTL', 'TTL'), false);
  assert.equal(containsLiteral('(TTL)', 'TTL'), true);
});
test('literal requirements are case-sensitive, escaped, and never claim meaning', () => {
  assert.equal(checkText('Use A+B.', { contract: { requiredLiterals: ['A+B'] } }).status, 'pass');
  assert.equal(checkText('Use AAAB.', { contract: { requiredLiterals: ['A+B'] } }).status, 'fail');
  assert.equal(checkText('ttl', { contract: { requiredLiterals: ['TTL'] } }).status, 'fail');
  assert.equal(checkText('Guaranteed.', { contract: { forbiddenLiterals: ['Guaranteed'] } }).status, 'fail');
});
test('empty and punctuation-only text fail', () => {
  for (const text of ['', '   ', '...']) assert.equal(checkText(text).status, 'fail');
});
test('CRLF paragraphs and decimal measurements remain inspectable', () => {
  const report = checkText('Wait 2.5 seconds.\r\n\r\nThen continue.');
  assert.equal(report.metrics.paragraphs, 2);
  assert.equal(report.metrics.sentences, 2);
  assert.equal(report.sentences[0].text, 'Wait 2.5 seconds.');
});
test('invalid and misspelled contracts fail closed', () => {
  for (const contract of [null, [], { maxWords: 20 }, { exactSentences: 0 }, { maxWordsPerSentence: 1.5 }, { requiredLiterals: [''] }, { requiredLiterals: 'word' }, { forbidSemicolons: 'true' }]) assert.throws(() => checkText('Text.', { contract }));
  assert.throws(() => checkText('Text.', { profile: 'strict' }));
});
test('captions permit exact endpoint and gaps', () => {
  const text = cue(1, '00:00:00,000', '00:00:01,000') + '\n\n' + cue(2, '00:00:02,000', '00:00:03,000');
  assert.equal(checkCaptions(text, 3000).status, 'pass');
  assert.equal(checkCaptions(text, 2999).errors[0].code, 'exceeds-duration');
});
test('captions reject overlap, reversed and zero-length intervals', () => {
  assert.equal(checkCaptions(cue(1, '00:00:01,000', '00:00:01,000')).status, 'fail');
  assert.equal(checkCaptions(cue(1, '00:00:02,000', '00:00:01,000')).status, 'fail');
  const text = cue(1, '00:00:00,000', '00:00:02,000') + '\n\n' + cue(2, '00:00:01,999', '00:00:03,000');
  assert.equal(checkCaptions(text).errors[0].code, 'overlap-or-order');
});
test('captions reject invalid clock fields, missing text, sequence and empty files', () => {
  for (const text of ['', cue(1, '00:60:00,000', '01:00:01,000'), cue(1, '00:00:00.000', '00:00:01,000'), cue(2, '00:00:00,000', '00:00:01,000'), cue(1, '00:00:00,000', '00:00:01,000', '')]) assert.equal(checkCaptions(text).status, 'fail');
  assert.throws(() => checkCaptions('', NaN));
  assert.throws(() => checkCaptions('', 0));
});
test('captions support BOM, CRLF, and multiline text', () => {
  assert.equal(checkCaptions('\uFEFF' + cue(1, '00:00:00,000', '00:00:01,000', 'First\nSecond').replaceAll('\n', '\r\n')).status, 'pass');
});
test('CLI exit codes and JSON cover real file/config failures', () => {
  const dir = mkdtempSync(join(tmpdir(), 'andrej-checks-'));
  const run = (script, args) => spawnSync(process.execPath, [`skills/andrej-explain/scripts/${script}.mjs`, ...args], { encoding: 'utf8' });
  try {
    const input = join(dir, 'text.txt'), config = join(dir, 'contract.json');
    writeFileSync(input, 'Wait 15 seconds.');
    writeFileSync(config, JSON.stringify({ requiredLiterals: ['5 seconds'] }));
    assert.equal(run('check-text', [input]).status, 0);
    let result = run('check-text', [input, '--contract', config]);
    assert.equal(result.status, 1); assert.equal(JSON.parse(result.stdout).errors[0].code, 'missing-literal');
    for (const args of [[input, '--unknown', 'x'], [input, '--profile'], [input, '--profile', 'plain', '--profile', 'plain'], [join(dir, 'absent')]]) assert.equal(run('check-text', args).status, 2);
    writeFileSync(config, '{'); assert.equal(run('check-text', [input, '--contract', config]).status, 2);
    const srt = join(dir, 'cue.srt'); writeFileSync(srt, cue(1, '00:00:00,000', '00:00:01,000'));
    assert.equal(run('check-captions', [srt, '--duration-ms', '1000']).status, 0);
    assert.equal(run('check-captions', [srt, '--duration-ms', '999']).status, 1);
    assert.equal(run('check-captions', [srt, '--duration-ms', 'NaN']).status, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
