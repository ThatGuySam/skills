import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert';

const html=fs.readFileSync('evals/andrej-explain/cache-ttl.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=['elapsed','ttl','elapsed-value','ttl-value','status','comparison','reason','result','band','cutoff','now','reset','controls'];
const elements=Object.fromEntries(ids.map(id=>[id,{value:id==='elapsed'?'2':id==='ttl'?'5':'',textContent:'',dataset:{},style:{},disabled:true,handlers:{},addEventListener(event,fn){this.handlers[event]=fn}}]));
vm.runInNewContext(script,{document:{getElementById:id=>elements[id]}});
assert.equal(elements.status.textContent,'Fresh');assert.equal(elements.reason.textContent,'3.0 seconds remain until the item stops being fresh.');assert.equal(elements.controls.disabled,false);
let checks=0;
for(let ei=0;ei<=100;ei++)for(let ti=0;ti<=100;ti++){
 elements.elapsed.value=String(ei/10);elements.ttl.value=String(ti/10);
 elements.elapsed.handlers.input();
 const expected=ei<ti;
 assert.equal(elements.status.textContent,expected?'Fresh':'Not fresh');
 assert.equal(elements.result.dataset.fresh,String(expected));
 assert.equal(elements['elapsed-value'].textContent,(ei/10).toFixed(1)+' seconds');
 assert.equal(elements['ttl-value'].textContent,(ti/10).toFixed(1)+' seconds');
 if(ti===0)assert.match(elements.reason.textContent,/zero TTL/);
 else if(ei===ti)assert.match(elements.reason.textContent,/Equality is not fresh/);
 else if(expected)assert.equal(elements.reason.textContent,((ti-ei)/10).toFixed(1)+' seconds remain until the item stops being fresh.');
 else assert.equal(elements.reason.textContent,'The item stopped being fresh '+((ei-ti)/10).toFixed(1)+' seconds ago.');
 checks++;
}
elements.elapsed.value='3';elements.ttl.value='2';elements.ttl.handlers.input();assert.equal(elements.status.textContent,'Not fresh');
elements.ttl.value='4';elements.ttl.handlers.input();assert.equal(elements.status.textContent,'Fresh');
elements.reset.handlers.click();assert.equal(elements.elapsed.value,'2');assert.equal(elements.ttl.value,'5');assert.equal(elements.status.textContent,'Fresh');assert.equal(elements.band.style.width,'50%');assert.equal(elements.cutoff.style.left,'50%');assert.equal(elements.now.style.left,'20%');
assert(!/<(?:script|link|img)[^>]+(?:src|href)\s*=/i.test(html));
assert(/<fieldset id="controls" disabled>/.test(html));assert(/<noscript>/.test(html));
console.log(JSON.stringify({gridCases:checks,initial:'passed',elapsedInput:'passed',ttlInput:'passed',reset:'passed',numericText:'passed',dependencyAttributeScan:'passed',fallbackSourceChecks:'passed',renderedVisualAndKeyboard:'unverified'},null,2));
