---
name: ai-hooter
description: Send local AI Hooter alerts when the user asks to be hooted, called, summoned, or notified, and acknowledge this conversation's Hoots when the user responds. Requires the AI Hooter local MCP connector.
---

# AI Hooter for Claude

Use the connected AI Hooter MCP tools, which may have a server-name prefix: `hooter_status`, `pair_hooter`, `send_hoot`, `acknowledge_hoot`, and `forget_hooter`.

If these tools are unavailable, explain that this skill supplies instructions but the local MCP connector must be connected in the current local session. Do not claim that uploading the skill installs the connector. Do not substitute a cloud relay, search for credentials, or use Codex's connector.

Check `hooter_status` when verifying connectivity. Pair only when the user requests pairing; use `pair_hooter` and tell the user to approve Allow in the AI Hooter Mac app. Pairing alone does not grant permission to send alerts.

Send a Hoot only with explicit permission for that alert, conversation, or project. Honor revocation. For a test Hoot, call `send_hoot` with event `attention`, the current project name (or a clearly named test project), a short description of the test as summary metadata, and normal urgency. Ordinary events speak the Mac app's configured phrase; their summary is dashboard metadata, not speech, and has no 180-character limit.

Only event `summary` speaks the supplied summary directly. Its user-approved constraint is exactly four sentences and at most 700 characters.

Retain each returned `hoot_id` within this conversation. When the user next responds, acknowledge these exact outstanding IDs with `acknowledge_hoot` before other work. Do not clear another conversation's Hoots or acknowledge all projects. Report unsuccessful acknowledgement honestly.

Claim delivery only when the tool returns `accepted: true`. Do not describe successful delivery as proof that audio was heard; ask the tester to confirm that when relevant. Forget pairing only on explicit request, using `forget_hooter`; this affects Claude, not Codex.
