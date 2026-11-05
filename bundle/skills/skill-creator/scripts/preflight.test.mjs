import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync,cpSync,rmSync,appendFileSync,readFileSync,writeFileSync,unlinkSync,symlinkSync } from 'node:fs';
import { join,dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { preflight } from './preflight.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
function fixture(t){const dir=mkdtempSync(join(tmpdir(),'skill-mixer-test-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));for(const name of ['package.json','skills-lock.json','SKILL.md','references','scripts','.sources','.runtime'])cpSync(join(root,name),join(dir,name),{recursive:true});return dir;}
test('verified private sources yield a complete receipt',t=>{const r=preflight(fixture(t));assert.equal(r.status,'installed-content-verified');assert.equal(r.skills.length,6);assert(r.skills.filter(s=>s.commit).every(s=>/^[a-f0-9]{40}$/.test(s.commit)));});
test('an edited installed instruction fails integrity',t=>{const r=fixture(t);appendFileSync(join(r,'.runtime/skills/zach-prompting/SKILL.md'),'\nChanged authority\n');assert.throws(()=>preflight(r),/installed content mismatch/);});
test('a changed local adapter requires explicit relocking',t=>{const r=fixture(t);appendFileSync(join(r,'.sources/codex-creator/SKILL.md'),'\nChanged adapter\n');assert.throws(()=>preflight(r),/local source changed/);});
test('removing a dependency cannot leave unpinned guidance loadable',t=>{const r=fixture(t);for(const file of ['package.json','skills-lock.json']){const p=join(r,file),j=JSON.parse(readFileSync(p));delete j.skills['zach-prompting'];writeFileSync(p,JSON.stringify(j));}assert.throws(()=>preflight(r),/Required mixer source set/);});
test('missing transitive platform guidance fails',t=>{const r=fixture(t);unlinkSync(join(r,'.runtime/skills/poteto-mode/references/codex-tools.md'));assert.throws(()=>preflight(r),/installed content mismatch/);});
test('escaping symlinks are rejected before source consumption',t=>{const r=fixture(t);symlinkSync('/etc/hosts',join(r,'.runtime/skills/automate-me/outside'));assert.throws(()=>preflight(r),/symlink/i);});
test('source changes cannot pass an unchanged lock',t=>{const r=fixture(t),p=join(r,'package.json'),j=JSON.parse(readFileSync(p));j.skills['writing-for-agents'].source='someone/else';writeFileSync(p,JSON.stringify(j));assert.throws(()=>preflight(r),/source changed/);});
