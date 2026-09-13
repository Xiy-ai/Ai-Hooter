import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtemp, rm, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createBridge } from '../bridge.mjs';

test('local Claude pairing keeps secrets private and ordinary long metadata intact', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'hooter-claude-test-'));
  const requests = [];
  const server = http.createServer((req, res) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      requests.push({url: req.url, token: req.headers['x-ai-hooter-token'], payload: JSON.parse(data)});
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(req.url.endsWith('/pair/request') ? {paired: true, credential: 'private-fixture-credential'} : {paired: true, access_enabled: true, accepted: true, acknowledged: true, forgotten: true}));
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const credentialPath = path.join(directory, 'Claude', 'token');
    const bridge = createBridge({port: server.address().port, credentialPath});
    assert.equal((await bridge.status()).paired, false);
    assert.deepEqual(await bridge.pair(), {paired: true, assistant: 'Claude'});
    assert.equal((await stat(credentialPath)).mode & 0o777, 0o600);
    assert.equal(await readFile(credentialPath, 'utf8'), 'private-fixture-credential');
    assert.equal((await bridge.status()).paired, true);
    const metadata = 'Long ordinary context. '.repeat(50);
    const sent = await bridge.hoot({event: 'review', project: 'Claude fixture', summary: metadata});
    assert.equal(requests.at(-1).payload.summary, metadata);
    assert.equal(requests.at(-1).payload.source_app, 'claude');
    assert.equal(requests.at(-1).token, 'private-fixture-credential');
    assert.equal((await bridge.acknowledge(sent.hoot_id)).acknowledged, true);
    assert.equal(requests.at(-1).payload.hoot_id, sent.hoot_id);
    await bridge.hoot({event: 'summary', project: 'Test', summary: 'One. Two. Three. Four.'});
    await assert.rejects(bridge.hoot({event: 'summary', project: 'Test', summary: 'One.'}));
    await assert.rejects(bridge.hoot({event: 'summary', project: 'Test', summary: `${'a'.repeat(701)}. Two. Three. Four.`}));
    await bridge.forget();
    assert.equal((await bridge.status()).paired, false);
    assert.ok(requests.every(req => req.url.startsWith('/v2/claude/')));
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(directory, {recursive: true, force: true});
  }
});

test('old Mac apps never trigger fallback to Codex pairing', async () => {
  const requests = [];
  const server = http.createServer((req, res) => { requests.push(req.url); res.writeHead(404); res.end('{}'); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const bridge = createBridge({port: server.address().port});
    await assert.rejects(bridge.pair(), /does not support Claude/);
    assert.deepEqual(requests, ['/v2/claude/pair/request']);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
