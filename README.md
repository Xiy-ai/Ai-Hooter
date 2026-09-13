# AI Hooter for Claude

**Let your coding agent call you when it needs you.**

AI Hooter gives Claude a local way to request your attention, flag a decision,
ask a question, or announce that work is ready. This repository contains only
the Claude connector, skill, configuration, and tests. The companion Mac app
is a separate product and is not included or licensed by this repository.

## Preview status

Version **0.1.3** packages the previously tested local Claude connector as a
Claude Code plugin. It is not yet listed in Anthropic's official directory.
Fresh installation through the plugin browser still needs end-to-end testing.

**A Mac build with Claude support is required.** The multi-assistant preview
has been tested with Desktop Chat and Desktop Code using manual registration.
Do not assume the currently public Mac App Store build supports this preview.
Check [AI Hooter](https://hooter.xiy.ai) for compatible build availability.

## Requirements

- macOS and a running, compatible AI Hooter Mac app.
- Claude Desktop with access to local Code sessions.
- Node.js 20 or later and npm available to Claude. You can use the graphical
  installer from [nodejs.org](https://nodejs.org/). The plugin does not bundle
  a Node executable or silently install a runtime.
- A current Claude Code version supporting marketplace dependency installation.

Hooter does not require an additional cloud account or API key. Access and
billing for Claude itself remain separate.

## Install in Claude Code Desktop

After this repository has been published:

1. Open a **local** Code session and its **Plugins** browser.
2. Use the marketplace-add option, if available in your version, and enter
   `Xiy-ai/Ai-Hooter` (or this repository's GitHub URL).
3. Select the `xiy-ai` marketplace and install **ai-hooter**.
4. Start a new local session. Ask: **"Check AI Hooter status."**

The bundled marketplace is a direct-install route, not an Anthropic approval
or verification badge. If your UI lacks a marketplace-add option, consult
[Claude's installation documentation](https://code.claude.com/docs/en/discover-plugins).
Do not upload this repository as a plain skill: the skill needs the MCP server.

## Pair once, then Hoot

1. Open the compatible AI Hooter Mac app.
2. Tell Claude: **"Pair with AI Hooter."**
3. Click **Allow** in the Mac app while the pairing request is active.
4. Tell Claude: **"Send me one test Hoot."**
5. Reply **"Got it"** to Claude and verify the pending Hoot clears.

Pairing does not authorize unsolicited alerts. You can explicitly ask Claude
to use Hooter for a particular task or project, and revoke that permission.
Acknowledgement is model-driven; this package does not install automatic
conversation hooks. If an alert remains pending, ask Claude to acknowledge
the exact Hoot it sent.

### Desktop Chat versus Code

This package targets **local Claude Code sessions**. Desktop Chat's MCPB
extension installation is separate; installing a Code plugin does not by
itself prove the Chat extension is installed. When both use this connector on
the same macOS account and port, they share one Claude pairing credential.
Disconnecting Claude invalidates that shared pairing.

Do not keep an old manually registered Hooter MCP server and this plugin
enabled in the same Code session: duplicate tools can confuse selection.
Remove only the old Hooter registration after verifying the replacement;
never delete unrelated MCP configuration or pairing data.

## Tools

| Tool | Purpose |
| --- | --- |
| `hooter_status` | Check Claude pairing and app access |
| `pair_hooter` | Request approval in the Mac app |
| `send_hoot` | Deliver an explicitly authorized project alert |
| `acknowledge_hoot` | Clear an exact Hoot from this conversation |
| `forget_hooter` | Remove Claude pairing on request |

Ordinary alerts speak a phrase selected by the Mac app; their `summary` field
is dashboard context, not the spoken message. Only the explicit `summary`
event speaks the provided text, with four sentences and at most 700 characters.

## Local communication and privacy

The MCP process uses standard input/output to communicate with Claude and
sends Hoot requests only to **127.0.0.1:47831**, under `/v2/claude/`.
There is no Hooter cloud relay, remote MCP endpoint, or external telemetry.
Claude's AI processing still uses its configured model provider; "local"
describes Hoot delivery, not offline model inference.

The private pairing credential is stored under the user's
`~/Library/Application Support/AI Hooter/Claude/` directory, with restrictive
directory and file permissions, and is never returned as tool output.
The plugin does not need access to your project source to deliver a Hoot.
Plugin installation may download pinned dependencies from npm; Hoot delivery
itself does not download code or contact a remote server.

Cloud/remote sessions cannot reach a Mac's loopback listener. Use local sessions.

## Troubleshooting

- **Tools missing:** verify the plugin is enabled in the current local session,
  Node/npm are available, dependencies installed, and restart the session.
- **Cannot reach Hooter:** open the compatible Mac app. Run only one Hooter app
  on the shared port. A preview app and the store app should not run together.
- **Pairing not completed:** check the Mac app for its Allow card and retry
  after the request expires. Never paste a pairing credential into a chat.
- **Old app / unsupported Claude pairing:** install a compatible build rather
  than attempting another assistant's endpoint.

## Development and tests

```sh
npm ci --ignore-scripts
npm test
claude plugin validate .
```

Tests use local fixture servers and disposable test credentials. They cover
MCP discovery, pairing, credential permissions, acknowledgement, and delivery
of ordinary metadata longer than 180 characters. They are not proof of public
directory installation or audible playback in a customer session.

## License and support

Claude integration source in this repository is available under the
[MIT License](LICENSE), copyright 2026 Xiy. Keep the copyright and license
notice when redistributing it. Third-party dependencies retain their own
licenses. This does not grant a license to the separate Mac app or trademarks.

Report reproducible problems through this repository's Issues, without tokens,
private project content, or payment details. Product information:
[hooter.xiy.ai](https://hooter.xiy.ai).
