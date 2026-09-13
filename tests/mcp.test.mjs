import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'node:url';

test('Claude-compatible MCP handshake and five tool schemas', async () => {
  const client = new Client({name: 'isolated-test', version: '1.0.0'});
  const transport = new StdioClientTransport({command: process.execPath, args: [process.env.CLAUDE_TEST_SERVER_PATH ?? fileURLToPath(new URL('../server.mjs', import.meta.url)), '--development']});
  try {
    await client.connect(transport);
    const {tools} = await client.listTools();
    assert.deepEqual(tools.map(tool => tool.name).sort(), ['pair_hooter', 'hooter_status', 'send_hoot', 'acknowledge_hoot', 'forget_hooter'].sort());
    assert.ok(!('maxLength' in tools.find(tool => tool.name === 'send_hoot').inputSchema.properties.summary));
    const invalid = await client.callTool({name: 'send_hoot', arguments: {event: 'invalid', project: 'Test', summary: ''}});
    assert.equal(invalid.isError, true);
  } finally { await client.close(); }
});
