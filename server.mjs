import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createBridge, events } from './bridge.mjs';

const development = process.argv.includes('--development');
const bridge = createBridge({port: development ? 47832 : 47831});
const server = new McpServer({name: 'ai-hooter-claude-local', version: '0.1.5'}, {
  instructions: 'AI Hooter is an optional local alert tool. Pair only when the user asks. Send Hoots only with explicit user permission for this conversation/project or this alert. A pairing is not permission to interrupt. Honor revocation immediately. Ordinary summary fields are visual metadata, not spoken alerts. Event summary speaks the supplied text. Acknowledge only an exact Hoot from this conversation when the user responds to it. Never claim delivery unless the tool succeeds. Do not expose pairing credentials.'
});
const result = value => ({content: [{type: 'text', text: JSON.stringify(value)}]});
const run = fn => async args => { try { return result(await fn(args)); } catch (error) { return {...result({error: error.message}), isError: true}; } };
server.registerTool('pair_hooter', {description: 'Ask the user to approve Claude pairing in the local Mac app. Only on explicit pairing request.', inputSchema: {}}, run(() => bridge.pair()));
server.registerTool('hooter_status', {description: 'Check this Claude connection to the local Mac app.', inputSchema: {}, annotations: {readOnlyHint: true}}, run(() => bridge.status()));
server.registerTool('send_hoot', {description: 'Send an authorized local Hoot for this conversation/project. Ordinary summary is dashboard context only. Remember the returned hoot_id in this conversation. On the next user message, call acknowledge_hoot for that ID before answering or doing other work. Never acknowledge a Hoot from another conversation.', inputSchema: {
  event: z.enum(events), project: z.string().min(1), summary: z.string(), urgency: z.enum(['normal', 'important', 'critical']).default('normal')
}}, run(async args => ({
  ...await bridge.hoot(args),
  next_user_message: 'Before responding to the next user message in THIS conversation, call acknowledge_hoot with this exact hoot_id. Retain each outstanding ID from this conversation only. Do not clear other conversations or projects. If acknowledgement fails, report the failure; do not claim it cleared.'
})));
server.registerTool('acknowledge_hoot', {description: 'Acknowledge only the exact Claude Hoot the user has responded to.', inputSchema: {hoot_id: z.string().min(1)}}, run(args => bridge.acknowledge(args.hoot_id)));
server.registerTool('forget_hooter', {description: 'Forget only Claude pairing, on an explicit user request. Codex stays paired.', inputSchema: {}, annotations: {destructiveHint: true}}, run(() => bridge.forget()));
await server.connect(new StdioServerTransport());
