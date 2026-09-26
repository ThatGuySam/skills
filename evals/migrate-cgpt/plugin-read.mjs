// Read-only Codex 0.154.0-alpha.3 loader probe; no install or activation.
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const child = spawn(process.env.CODEX_BIN || 'codex', ['app-server', '--stdio'], {
  cwd: root,
  stdio: ['pipe', 'pipe', 'pipe'],
});
let counter = 0;
const pending = new Map();
const timeout = setTimeout(() => {
  for (const { reject } of pending.values()) reject(new Error('RPC timeout'));
  child.kill();
}, 30_000);
child.on('error', error => {
  for (const { reject } of pending.values()) reject(error);
});
child.on('exit', code => {
  for (const { reject } of pending.values()) reject(new Error(`Codex exited ${code}`));
});
// Logs are not needed to read the response and can contain unrelated host data.
child.stderr.on('data', () => {});
createInterface({ input: child.stdout }).on('line', line => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  const call = pending.get(message.id);
  if (!call) return;
  pending.delete(message.id);
  if (message.error) call.reject(new Error(JSON.stringify(message.error)));
  else call.resolve(message.result);
});
function request(method, params) {
  const id = ++counter;
  const response = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  return response;
}
try {
  await request('initialize', {
    clientInfo: { name: 'migration-package-check', version: '1.0.0' },
    capabilities: { experimentalApi: true, requestAttestation: false },
  });
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'initialized', params: {} }) + '\n');
  const { plugin } = await request('plugin/read', {
    marketplacePath: root + '/.agents/plugins/marketplace.json',
    pluginName: 'htma-measure',
  });
  console.log(JSON.stringify({
    marketplaceName: plugin.marketplaceName,
    name: plugin.summary.name,
    skills: plugin.skills.map(({ name, path }) => ({ name, path })),
    mcpServers: plugin.mcpServers,
  }, null, 2));
  if (!plugin.skills.some(skill => skill.name === 'htma-measure:migrate-cgpt'
    && skill.path === root + '/skills/migrate-cgpt/SKILL.md')) {
    throw new Error('The loader did not find canonical migrate-cgpt');
  }
} finally {
  clearTimeout(timeout);
  child.kill();
}
