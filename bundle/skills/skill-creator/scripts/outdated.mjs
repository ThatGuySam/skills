import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSpec } from '../node_modules/skills-lock/src/spec.mjs';
import { hashTree } from '../node_modules/skills-lock/src/integrity.mjs';
import { assertNoSymlinks } from '../node_modules/skills-lock/src/validate.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(readFileSync(join(root,'package.json')));
const lock=JSON.parse(readFileSync(join(root,'skills-lock.json')));
const heads=new Map(),sources=[];
for(const [name,entry] of Object.entries(manifest.skills)){
 const spec=parseSpec(entry,name),pinned=lock.skills[name];
 if(spec.type==='file'){
  const host=join(process.env.CODEX_HOME||join(homedir(),'.codex'),'skills','.system','skill-creator');
  let status='unknown';
  try{if(existsSync(host)){assertNoSymlinks(host);status=hashTree(host)===pinned.integrity?'current-local-snapshot':'local-update-available';}}catch{}
  sources.push({name,status,source:host,lockedIntegrity:pinned.integrity});continue;
 }
 if(spec.ref!==null){sources.push({name,status:'fixed-ref-not-checked',commit:pinned.commit});continue;}
 if(!heads.has(spec.url)){
  try{const output=execFileSync('git',['ls-remote','--exit-code','--',spec.url,'HEAD'],{encoding:'utf8',timeout:20000,env:{...process.env,GIT_TERMINAL_PROMPT:'0'},stdio:['ignore','pipe','pipe']});const head=output.trim().split(/\s+/)[0];heads.set(spec.url,/^[a-f0-9]{40}$/.test(head)?head:null);}catch{heads.set(spec.url,null);}
 }
 const current=heads.get(spec.url);
 sources.push({name,status:current===null?'unknown':current===pinned.commit?'current':'update-available',lockedCommit:pinned.commit,currentCommit:current});
}
console.log(JSON.stringify({checkedAt:new Date().toISOString(),readOnly:true,sources},null,2));
if(sources.some(s=>s.status==='unknown'))process.exitCode=2;
