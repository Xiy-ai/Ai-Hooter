import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '../build/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from '../build/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import {mkdtemp, cp, rm, readFile, stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';

test('Claude-compatible MCP handshake and five tool schemas', async () => {
  const client = new Client({name: 'isolated-test', version: '1.0.0'});
  const transport = new StdioClientTransport({command: process.execPath, args: [process.env.CLAUDE_TEST_SERVER_PATH ?? fileURLToPath(new URL('../dist/server.mjs', import.meta.url)), '--development']});
  try {
    await client.connect(transport);
    const {tools} = await client.listTools();
    assert.deepEqual(tools.map(tool => tool.name).sort(), ['pair_hooter', 'hooter_status', 'send_hoot', 'acknowledge_hoot', 'forget_hooter'].sort());
    assert.ok(!('maxLength' in tools.find(tool => tool.name === 'send_hoot').inputSchema.properties.summary));
    const invalid = await client.callTool({name: 'send_hoot', arguments: {event: 'invalid', project: 'Test', summary: ''}});
    assert.equal(invalid.isError, true);
  } finally { await client.close(); }
});

test('bundled release runs without installed dependencies and keeps pairing private', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'hooter-packaged-'));
  const requests = [];
  const fixture = http.createServer((req, res) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      requests.push({host: req.headers.host, route: req.url,
        token: req.headers['x-ai-hooter-token'], payload: JSON.parse(data)});
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(req.url.endsWith('/pair/request')
        ? {paired: true, credential: 'isolated-pairing-fixture'}
        : {paired: true, access_enabled: true, accepted: true, acknowledged: true, forgotten: true}));
    });
  });
  const client = new Client({name: 'packaged-release-fixture', version: '1.0.0'});
  try {
    // Bind the existing development port first. Never contact a real app if busy.
    await new Promise((resolve, reject) => {
      fixture.once('error', reject);
      fixture.listen(47832, '127.0.0.1', resolve);
    });
    await cp(fileURLToPath(new URL('../dist/', import.meta.url)), path.join(directory, 'dist'), {recursive: true});
    await client.connect(new StdioClientTransport({command: process.execPath,
      args: [path.join(directory, 'dist/server.mjs'), '--development'], cwd: directory,
      env: {HOME: directory, PATH: path.dirname(process.execPath)}}));
    const call = async (name, args = {}) => {
      const result = await client.callTool({name, arguments: args});
      assert.ok(!JSON.stringify(result).includes('isolated-pairing-fixture'));
      return result;
    };
    const value = result => JSON.parse(result.content[0].text);
    assert.equal(value(await call('hooter_status')).paired, false);
    assert.equal(value(await call('pair_hooter')).paired, true);
    const credential = path.join(directory, 'Library/Application Support/AI Hooter/Claude/pairing-token-47832');
    assert.equal(await readFile(credential, 'utf8'), 'isolated-pairing-fixture');
    assert.equal((await stat(credential)).mode & 0o777, 0o600);
    assert.equal(value(await call('hooter_status')).paired, true);
    const summary = 'Ordinary dashboard context. '.repeat(50);
    const sent = value(await call('send_hoot', {event: 'review', project: 'Fixture', summary}));
    assert.equal(sent.accepted, true);
    assert.equal(requests.at(-1).payload.summary, summary);
    assert.equal(value(await call('acknowledge_hoot', {hoot_id: sent.hoot_id})).acknowledged, true);
    assert.equal(requests.at(-1).payload.hoot_id, sent.hoot_id);
    // User-approved spoken-summary boundary: 700 characters and four sentences.
    const spoken = 'a'.repeat(681) + '. Two. Three. Four.';
    assert.equal(spoken.length, 700);
    assert.equal(value(await call('send_hoot', {event: 'summary', project: 'Fixture', summary: spoken})).accepted, true);
    const before = requests.length;
    assert.equal((await call('send_hoot', {event: 'summary', project: 'Fixture', summary: 'a' + spoken})).isError, true);
    assert.equal((await call('send_hoot', {event: 'summary', project: 'Fixture', summary: 'One sentence.'})).isError, true);
    assert.equal(requests.length, before);
    assert.equal(value(await call('forget_hooter')).forgotten, true);
    assert.equal(value(await call('hooter_status')).paired, false);
    assert.ok(requests.every(r => r.host === '127.0.0.1:47832' && r.route.startsWith('/v2/claude/')));
    assert.ok(requests.filter(r => !r.route.endsWith('/pair/request')).every(r => r.token === 'isolated-pairing-fixture'));
  } finally {
    await client.close();
    if (fixture.listening) await new Promise(resolve => fixture.close(resolve));
    await rm(directory, {recursive: true, force: true});
  }
});
