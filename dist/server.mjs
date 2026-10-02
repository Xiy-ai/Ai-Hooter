import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);
import {
  McpServer,
  external_exports
} from "./chunk-WQUF6ACZ.mjs";
import "./chunk-ER3WQZ43.mjs";
import "./chunk-5BSGIWCJ.mjs";
import {
  JSONRPCMessageSchema
} from "./chunk-JUFOF3ZM.mjs";
import "./chunk-AOTPXK5R.mjs";
import "./chunk-WB45WUHP.mjs";
import "./chunk-RPEVOPZM.mjs";
import "./chunk-B63ELKWN.mjs";
import "./chunk-ZQX6QNAH.mjs";
import "./chunk-QVT2MGTL.mjs";
import "./chunk-EI2G42LU.mjs";
import "./chunk-U4TVNRRT.mjs";
import "./chunk-5MSMO7TU.mjs";
import "./chunk-LCS23M2F.mjs";
import "./chunk-2BD5CSCS.mjs";
import "./chunk-JDDA4D5F.mjs";
import "./chunk-IA7ZWUP6.mjs";
import "./chunk-S4A6X5XA.mjs";
import "./chunk-Y2ORPFWF.mjs";

// build/node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
import process2 from "node:process";

// build/node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js
var STDIO_DEFAULT_MAX_BUFFER_SIZE = 10 * 1024 * 1024;
var ReadBuffer = class {
  constructor(options) {
    this._maxBufferSize = options?.maxBufferSize ?? STDIO_DEFAULT_MAX_BUFFER_SIZE;
  }
  append(chunk) {
    const newSize = (this._buffer?.length ?? 0) + chunk.length;
    if (newSize > this._maxBufferSize) {
      this.clear();
      throw new Error(`ReadBuffer exceeded maximum size of ${this._maxBufferSize} bytes`);
    }
    this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
  }
  readMessage() {
    if (!this._buffer) {
      return null;
    }
    const index = this._buffer.indexOf("\n");
    if (index === -1) {
      return null;
    }
    const line = this._buffer.toString("utf8", 0, index).replace(/\r$/, "");
    this._buffer = this._buffer.subarray(index + 1);
    return deserializeMessage(line);
  }
  clear() {
    this._buffer = void 0;
  }
};
function deserializeMessage(line) {
  return JSONRPCMessageSchema.parse(JSON.parse(line));
}
function serializeMessage(message) {
  return JSON.stringify(message) + "\n";
}

// build/node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
var StdioServerTransport = class {
  constructor(_stdin = process2.stdin, _stdout = process2.stdout, options) {
    this._stdin = _stdin;
    this._stdout = _stdout;
    this._started = false;
    this._ondata = (chunk) => {
      try {
        this._readBuffer.append(chunk);
        this.processReadBuffer();
      } catch (error) {
        this.onerror?.(error);
        this.close().catch(() => {
        });
      }
    };
    this._onerror = (error) => {
      this.onerror?.(error);
    };
    this._readBuffer = new ReadBuffer({ maxBufferSize: options?.maxBufferSize });
  }
  /**
   * Starts listening for messages on stdin.
   */
  async start() {
    if (this._started) {
      throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    }
    this._started = true;
    this._stdin.on("data", this._ondata);
    this._stdin.on("error", this._onerror);
  }
  processReadBuffer() {
    while (true) {
      try {
        const message = this._readBuffer.readMessage();
        if (message === null) {
          break;
        }
        this.onmessage?.(message);
      } catch (error) {
        this.onerror?.(error);
      }
    }
  }
  async close() {
    this._stdin.off("data", this._ondata);
    this._stdin.off("error", this._onerror);
    const remainingDataListeners = this._stdin.listenerCount("data");
    if (remainingDataListeners === 0) {
      this._stdin.pause();
    }
    this._readBuffer.clear();
    this.onclose?.();
  }
  send(message) {
    return new Promise((resolve) => {
      const json = serializeMessage(message);
      if (this._stdout.write(json)) {
        resolve();
      } else {
        this._stdout.once("drain", resolve);
      }
    });
  }
};

// bridge.mjs
import http from "node:http";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, rename, unlink, chmod } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
var events = ["attention", "decision", "question", "access", "browser_handoff", "approval", "blocked", "security_critical", "review", "complete", "summary"];
function createBridge({ port = 47831, credentialPath } = {}) {
  credentialPath ??= path.join(homedir(), "Library", "Application Support", "AI Hooter", "Claude", `pairing-token-${port}`);
  async function token() {
    try {
      return (await readFile(credentialPath, "utf8")).trim();
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw new Error("Cannot read the private Claude pairing file.");
    }
  }
  async function request(route, payload = {}, authenticated = true) {
    const credential = authenticated ? await token() : null;
    if (authenticated && !credential) throw new Error("Claude is not paired. Use pair_hooter and approve in the Mac app.");
    const body = JSON.stringify(payload);
    return new Promise((resolve, reject) => {
      const req = http.request({
        hostname: "127.0.0.1",
        port,
        method: "POST",
        path: `/v2/claude/${route}`,
        headers: { "content-type": "application/json", "content-length": Buffer.byteLength(body), ...credential ? { "x-ai-hooter-token": credential } : {} }
      }, (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode === 404) return reject(new Error("This Mac app does not support Claude pairing. Install the multi-assistant preview build; do not re-pair through Codex."));
          if (res.statusCode !== 200) return reject(new Error(`Local Hooter request failed (${res.statusCode}). Check pairing approval and access in the Mac app.`));
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("The Mac app returned an invalid response."));
          }
        });
        res.on("error", () => reject(new Error("The local Hooter response was interrupted.")));
      });
      req.setTimeout(authenticated ? 5e3 : 95e3, () => req.destroy(new Error("timeout")));
      req.on("error", () => reject(new Error("Cannot reach AI Hooter locally. Open the matching Mac app and try again.")));
      req.end(body);
    });
  }
  return {
    async pair() {
      const result2 = await request("pair/request", { request_id: randomUUID(), client_name: "Claude" }, false);
      if (result2.paired !== true || typeof result2.credential !== "string" || !result2.credential) throw new Error("Pairing was not completed.");
      const directory = path.dirname(credentialPath);
      await mkdir(directory, { recursive: true, mode: 448 });
      await chmod(directory, 448);
      const temporary = `${credentialPath}.${randomUUID()}.tmp`;
      try {
        await writeFile(temporary, result2.credential, { mode: 384, flag: "wx" });
        await rename(temporary, credentialPath);
      } finally {
        await unlink(temporary).catch((error) => {
          if (error.code !== "ENOENT") throw error;
        });
      }
      return { paired: true, assistant: "Claude" };
    },
    async status() {
      if (!await token()) return { paired: false, assistant: "Claude" };
      const result2 = await request("pair/status");
      return { paired: result2.paired === true, access_enabled: result2.access_enabled === true, assistant: "Claude" };
    },
    async hoot({ event, project, summary, urgency = "normal" }) {
      if (!events.includes(event) || !["normal", "important", "critical"].includes(urgency)) throw new Error("Invalid event or urgency.");
      if (typeof project !== "string" || !project.trim() || typeof summary !== "string") throw new Error("Project and summary are required.");
      if (event === "summary" && (Array.from(summary).length > 700 || (summary.trim().match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/gu) ?? []).length !== 4)) {
        throw new Error("A spoken summary must contain four sentences and at most 700 characters.");
      }
      const hoot_id = randomUUID();
      const result2 = await request("hoot", { hoot_id, event, project, summary, urgency, source_app: "claude" });
      if (result2.accepted !== true) throw new Error("The Mac app did not accept the Hoot.");
      return { accepted: true, hoot_id };
    },
    async acknowledge(hoot_id) {
      if (typeof hoot_id !== "string" || !hoot_id.trim()) throw new Error("Use the exact hoot_id returned by send_hoot.");
      const result2 = await request("acknowledge", { hoot_id });
      return { acknowledged: result2.acknowledged === true };
    },
    async forget() {
      const result2 = await request("pair/forget");
      if (result2.forgotten !== true) throw new Error("Claude pairing was not removed.");
      await unlink(credentialPath).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
      return { forgotten: true, assistant: "Claude" };
    }
  };
}

// server.mjs
var development = process.argv.includes("--development");
var bridge = createBridge({ port: development ? 47832 : 47831 });
var server = new McpServer({ name: "ai-hooter-claude-local", version: "0.1.5" }, {
  instructions: "AI Hooter is an optional local alert tool. Pair only when the user asks. Send Hoots only with explicit user permission for this conversation/project or this alert. A pairing is not permission to interrupt. Honor revocation immediately. Ordinary summary fields are visual metadata, not spoken alerts. Event summary speaks the supplied text. Acknowledge only an exact Hoot from this conversation when the user responds to it. Never claim delivery unless the tool succeeds. Do not expose pairing credentials."
});
var result = (value) => ({ content: [{ type: "text", text: JSON.stringify(value) }] });
var run = (fn) => async (args) => {
  try {
    return result(await fn(args));
  } catch (error) {
    return { ...result({ error: error.message }), isError: true };
  }
};
server.registerTool("pair_hooter", { description: "Ask the user to approve Claude pairing in the local Mac app. Only on explicit pairing request.", inputSchema: {} }, run(() => bridge.pair()));
server.registerTool("hooter_status", { description: "Check this Claude connection to the local Mac app.", inputSchema: {}, annotations: { readOnlyHint: true } }, run(() => bridge.status()));
server.registerTool("send_hoot", { description: "Send an authorized local Hoot for this conversation/project. Ordinary summary is dashboard context only. Remember the returned hoot_id in this conversation. On the next user message, call acknowledge_hoot for that ID before answering or doing other work. Never acknowledge a Hoot from another conversation.", inputSchema: {
  event: external_exports.enum(events),
  project: external_exports.string().min(1),
  summary: external_exports.string(),
  urgency: external_exports.enum(["normal", "important", "critical"]).default("normal")
} }, run(async (args) => ({
  ...await bridge.hoot(args),
  next_user_message: "Before responding to the next user message in THIS conversation, call acknowledge_hoot with this exact hoot_id. Retain each outstanding ID from this conversation only. Do not clear other conversations or projects. If acknowledgement fails, report the failure; do not claim it cleared."
})));
server.registerTool("acknowledge_hoot", { description: "Acknowledge only the exact Claude Hoot the user has responded to.", inputSchema: { hoot_id: external_exports.string().min(1) } }, run((args) => bridge.acknowledge(args.hoot_id)));
server.registerTool("forget_hooter", { description: "Forget only Claude pairing, on an explicit user request. Codex stays paired.", inputSchema: {}, annotations: { destructiveHint: true } }, run(() => bridge.forget()));
await server.connect(new StdioServerTransport());
