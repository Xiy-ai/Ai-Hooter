# AI Hooter 0.1.4 review notes

This updates the existing Xiy-ai/Ai-Hooter submission from 0.1.3, commit
4fa632e7464a4e4d00f66840978e20b504dbb517. It does not change the Mac app,
the pairing flow, alert behavior, or supported platforms.

## Icon

The plugin manifest now references the existing 512×512 Hooter PNG.

## Dependency installation hold

The submitted version was held under LOCKFILE_AUTO_INSTALL. Runtime code is
now shipped as readable JavaScript in dist/, with third-party licenses.
The MCP command starts dist/server.mjs directly. No root package.json or
lockfile triggers an installation. Build-only manifests and the reproducible
bundler live in build/. End users need Node, but not npm or a build step.

The bundle is split at upstream module boundaries to meet Anthropic's
documented inspection threshold of less than 256 KiB per non-image file:
https://claude.com/docs/plugins/pre-submission-checklist#files-in-the-plugin-folder
This is a packaging requirement, not a limit on Hoot content.

## Credential warning: MCP_FORWARDS_CREDENTIAL_ENV

Please review this warning in the context of first-party local pairing.
The connector does not read a GitHub token, cloud API key, Claude credential,
or ambient credential environment variable. On an explicit pair_hooter request,
it asks the local Hooter Mac app for a new Claude-specific pairing credential.
The user approves that request in the Mac app. The connector then stores the
app-issued credential in its own AI Hooter/Claude application-support folder,
with directory mode 0700 and file mode 0600.

bridge.mjs reads only that pairing file. It sends the value as x-ai-hooter-token
only to the fixed IPv4 loopback destination 127.0.0.1:47831 under /v2/claude/.
There is no redirect following, proxy, remote endpoint, or tool argument that
can select a different destination. The development switch uses port 47832
on the same loopback host. Pairing credentials are stripped from tool results.
Forgetting Claude pairing revokes it in the Mac app and removes the local file.

Changing this to a user-entered cloud credential would not describe this
integration. The local pairing behavior is retained and disclosed here for
review rather than hidden or renamed to evade the warning. Automated review
may continue to flag this data flow; only Anthropic can clear that warning.

## Platform scope

This connector requires a compatible macOS Hooter companion and local Claude
execution. The local MCP process is informationally flagged by the directory;
it cannot operate from claude.ai web or a remote execution host. Cowork support
must be tested separately before being advertised. This release does not add
Windows support or claim all Claude surfaces work.
