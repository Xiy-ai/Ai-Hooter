import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, rename, unlink, chmod } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

export const events = ['attention', 'decision', 'question', 'access', 'browser_handoff', 'approval', 'blocked', 'security_critical', 'review', 'complete', 'summary'];

export function createBridge({port = 47831, credentialPath} = {}) {
  // Port selection is a development/test injection, never a model tool input.
  // Production transport is fixed to IPv4 loopback; no redirects or proxies.
  credentialPath ??= path.join(homedir(), 'Library', 'Application Support', 'AI Hooter', 'Claude', `pairing-token-${port}`);
  async function token() {
    try { return (await readFile(credentialPath, 'utf8')).trim(); }
    catch (error) { if (error.code === 'ENOENT') return null; throw new Error('Cannot read the private Claude pairing file.'); }
  }
  async function request(route, payload = {}, authenticated = true) {
    const credential = authenticated ? await token() : null;
    if (authenticated && !credential) throw new Error('Claude is not paired. Use pair_hooter and approve in the Mac app.');
    const body = JSON.stringify(payload);
    return new Promise((resolve, reject) => {
      const req = http.request({hostname: '127.0.0.1', port, method: 'POST', path: `/v2/claude/${route}`,
        headers: {'content-type': 'application/json', 'content-length': Buffer.byteLength(body), ...(credential ? {'x-ai-hooter-token': credential} : {})}}, res => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 404) return reject(new Error('This Mac app does not support Claude pairing. Install the multi-assistant preview build; do not re-pair through Codex.'));
          if (res.statusCode !== 200) return reject(new Error(`Local Hooter request failed (${res.statusCode}). Check pairing approval and access in the Mac app.`));
          try { resolve(JSON.parse(data)); } catch { reject(new Error('The Mac app returned an invalid response.')); }
        });
        res.on('error', () => reject(new Error('The local Hooter response was interrupted.')));
      });
      // The app's existing pairing card expires at 90 seconds; allow 5 seconds
      // for its timeout response. Ordinary localhost requests allow 5 seconds.
      req.setTimeout(authenticated ? 5000 : 95000, () => req.destroy(new Error('timeout')));
      req.on('error', () => reject(new Error('Cannot reach AI Hooter locally. Open the matching Mac app and try again.')));
      req.end(body);
    });
  }
  return {
    async pair() {
      const result = await request('pair/request', {request_id: randomUUID(), client_name: 'Claude'}, false);
      if (result.paired !== true || typeof result.credential !== 'string' || !result.credential) throw new Error('Pairing was not completed.');
      const directory = path.dirname(credentialPath);
      await mkdir(directory, {recursive: true, mode: 0o700});
      await chmod(directory, 0o700);
      const temporary = `${credentialPath}.${randomUUID()}.tmp`;
      try {
        await writeFile(temporary, result.credential, {mode: 0o600, flag: 'wx'});
        await rename(temporary, credentialPath);
      } finally { await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
      return {paired: true, assistant: 'Claude'}; // Never expose credentials to the model.
    },
    async status() {
      if (!await token()) return {paired: false, assistant: 'Claude'};
      const result = await request('pair/status');
      return {paired: result.paired === true, access_enabled: result.access_enabled === true, assistant: 'Claude'};
    },
    async hoot({event, project, summary, urgency = 'normal'}) {
      if (!events.includes(event) || !['normal', 'important', 'critical'].includes(urgency)) throw new Error('Invalid event or urgency.');
      if (typeof project !== 'string' || !project.trim() || typeof summary !== 'string') throw new Error('Project and summary are required.');
      // Only explicitly spoken summaries have the user-approved 700-character,
      // four-sentence constraint. Ordinary metadata is never capped at 180.
      if (event === 'summary' && (Array.from(summary).length > 700 || (summary.trim().match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/gu) ?? []).length !== 4)) {
        throw new Error('A spoken summary must contain four sentences and at most 700 characters.');
      }
      const hoot_id = randomUUID();
      const result = await request('hoot', {hoot_id, event, project, summary, urgency, source_app: 'claude'});
      if (result.accepted !== true) throw new Error('The Mac app did not accept the Hoot.');
      return {accepted: true, hoot_id};
    },
    async acknowledge(hoot_id) {
      if (typeof hoot_id !== 'string' || !hoot_id.trim()) throw new Error('Use the exact hoot_id returned by send_hoot.');
      const result = await request('acknowledge', {hoot_id});
      return {acknowledged: result.acknowledged === true};
    },
    async forget() {
      const result = await request('pair/forget');
      if (result.forgotten !== true) throw new Error('Claude pairing was not removed.');
      await unlink(credentialPath).catch(error => { if (error.code !== 'ENOENT') throw error; });
      return {forgotten: true, assistant: 'Claude'};
    }
  };
}
