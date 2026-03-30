<div align="center">

# 🎮 VS Code 1.111 Cheatsheet — Tetris Edition

**March 2026 Release — Autopilot & Weekly Stable Releases**

[![Release Notes](https://img.shields.io/badge/Release_Notes-1.111-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_111)

</div>

> **Project:** React 19 + TypeScript + Vite Tetris game · `gameEngine.ts` (pure logic) · `useTetris.ts` (hook) · 4 components · 7 tetrominoes
>
> **Note:** 1.111 is the first weekly Stable release — smaller, more focused updates shipping faster.

---

## 🤖 1 · Autopilot & Agent Permissions

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Autopilot (Preview)](https://code.visualstudio.com/updates/v1_111#_autopilot-preview)** | Agent works fully autonomously — auto-approves tools, auto-responds to questions, iterates until `task_complete` | `chat.autopilot.enabled` | Set permission to _Autopilot_ → _"Add a hold-piece feature with keyboard shortcut C"_ → walk away |
| **[Permissions Picker](https://code.visualstudio.com/updates/v1_111#_autopilot-and-agent-permissions)** | Choose agent autonomy per session: Default Approvals / Bypass Approvals / Autopilot | Built-in | Click the permissions picker in Chat view → switch between levels mid-session |

### Permission Levels

| Level | What happens | Best for |
|:------|:------------|:---------|
| **Default Approvals** | Tools show confirmation dialogs before running | Careful, step-by-step work |
| **Bypass Approvals** | All tools auto-approved; auto-retries on errors | Trusted multi-step tasks |
| **Autopilot** (Preview) | Full autonomy: auto-approve, auto-respond, iterate until done | Large features, end-to-end implementation |

> **⚠️ Caution:** Bypass Approvals and Autopilot skip manual approval prompts, including for destructive actions. A warning dialog confirms your choice the first time. Consider using [terminal sandboxing](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) for additional protection.

### Demo: Autopilot End-to-End

1. Enable `chat.autopilot.enabled` in Settings
2. Set the permissions picker to **Autopilot**
3. Prompt: _"Add a ghost piece that shows where the tetromino will land. Update gameEngine.ts with a getGhostPosition function, add the ghost rendering in Board.tsx, and style it with 30% opacity in App.css"_
4. Watch the agent plan, implement across files, run lint/type-check, and call `task_complete` — no approvals needed
5. Review the diff and test

---

## 🪝 2 · Agent-Scoped Hooks (Preview)

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Agent-Scoped Hooks](https://code.visualstudio.com/updates/v1_111#_agent-scoped-hooks-preview)** | Hooks in `.agent.md` frontmatter run only for that specific agent | `chat.useCustomAgentHooks` | Add hooks to a custom agent → they fire only when that agent is selected |

### Example: Custom Agent with Scoped Hooks

Create `.github/agents/tetris-dev.agent.md`:

```yaml
---
name: tetris-dev
description: Tetris game development agent
tools:
  - run_in_terminal
  - replace_string_in_file
hooks:
  postToolUse:
    - type: command
      powershell: "npx eslint --no-warn-ignored $env:TOOL_ARGS_FILE_PATH; exit 0"
      timeoutSec: 30
---

You are a Tetris game developer. Always keep game logic pure in gameEngine.ts.
Never import React in the game engine. Run lint after every file edit.
```

The `postToolUse` hook fires **only** when the `tetris-dev` agent is active — other agents are unaffected.

---

## 🔍 3 · Debug Events Snapshot

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Debug Events Snapshot](https://code.visualstudio.com/updates/v1_111#_debug-events-snapshot)** | Attach agent debug events as chat context for troubleshooting | Built-in | Type `#debugEventsSnapshot` in chat → ask _"Why didn't my skill load?"_ |

### Demo: Troubleshoot Agent Behavior

1. Open Agent Debug Panel (`Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_)
2. Send a message in chat — observe events in real time
3. Click the sparkle icon in the Debug Panel to attach snapshot to chat
4. Ask: _"Which skills were loaded? How many tokens did the last tool call consume?"_
5. The agent analyzes the debug events and explains what happened

---

## 💡 4 · Chat Tip Improvements

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Redesigned Chat Tips](https://code.visualstudio.com/updates/v1_111#_chat-tip-improvements)** | Structured onboarding journey: foundational tips first, then quality-of-life tips | Built-in | Start a new session — see foundational tips (Plan agent, custom agents) first |
| **`/init` Tip** | Discover project initialization command | Built-in | Look for the `/init` tip in a new session |
| **`/fork` Tip** | Discover conversation forking | Built-in | Look for the `/fork` tip after foundational tips |

### Tip Behavior

- **Foundational tips** shown first: Plan agent, creating custom agents
- **Quality-of-life tips** shown after: experimental settings, Mermaid diagrams
- Tips include keyboard shortcuts for discoverability
- Tips hide after you act on or dismiss them
- Only shown when a single chat session is visible

---

## 🖥️ 5 · Terminal

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[AI CLI Profile Group](https://code.visualstudio.com/updates/v1_111#_ai-cli-profile-group-in-terminal-dropdown-experimental)** | AI CLI profiles (e.g. GitHub Copilot CLI) shown in dedicated group at top of dropdown | `terminal.integrated.experimental.aiProfileGrouping` | Enable → open terminal dropdown → see AI CLIs grouped at the top |

---

## 🔧 6 · Extension Authoring

| Feature | What it does | Try this |
|---------|-------------|----------|
| **[Localized String IntelliSense](https://code.visualstudio.com/updates/v1_111#_basic-intellisense-for-localized-strings-in-extension-packagejson-files)** | Go to Definition and Find All References for `package.nls.json` strings | In an extension's `package.json` → `Ctrl+Click` a localized string → jumps to `package.nls.json` |

---

## 🏗️ 7 · Engineering

VS Code now ships weekly Stable releases. To support this pace:

| Improvement | What it does |
|:------------|:------------|
| **Test plan item creation** | One-click creation of test plan items from feature request issues |
| **Verification step generation** | Auto-generate verification steps on issues for efficient testing |
| **Auto PR media to issues** | Images/GIFs from merged PRs auto-posted as comments on linked issues |
| **Chat showcase pipeline** | Issues labeled `chat-showcase` auto-create corresponding chat tip issues |

---

## ⚙️ Quick-Copy Settings

Paste into `settings.json` to enable key 1.111 features:

```json
{
  "chat.autopilot.enabled": true,
  "chat.useCustomAgentHooks": true,
  "terminal.integrated.experimental.aiProfileGrouping": true
}
```

Combine with [1.110 settings](vscode-1.110-presentation.md) for the full experience.

---

## ⌨️ Shortcuts

| Action | Shortcut |
|:-------|:---------|
| Agent Debug Panel | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| Attach Debug Snapshot | `#debugEventsSnapshot` in chat |
| Fork Session | `/fork` in chat |
| Compact Context | `/compact` in chat |
| Command Palette | `Ctrl+Shift+P` |

---

## 🎯 Demo Flow

| # | Feature | What to show | Prompt |
|:-:|:--------|:-------------|:-------|
| 1 | Permissions Picker | Switch between Default / Bypass / Autopilot | Click picker in Chat view |
| 2 | Autopilot | Full autonomous implementation | _"Add ghost piece with getGhostPosition, Board.tsx rendering, and CSS"_ |
| 3 | Agent-Scoped Hooks | Hook fires only for a specific agent | Create `tetris-dev.agent.md` with lint hook → switch agents to compare |
| 4 | Debug Events Snapshot | Attach snapshot, ask about loaded customizations | `#debugEventsSnapshot` → _"Which skills loaded?"_ |
| 5 | Chat Tips | Show onboarding journey, foundational → quality-of-life | Start a new session |
| 6 | AI CLI Profile Group | Show grouped AI CLIs in terminal dropdown | Enable setting → open terminal dropdown |

---

## 📁 Project Quick Reference

```
src/
├── constants.ts          # 7 tetrominoes, 10×20 board, scoring tables
├── gameEngine.ts         # Pure functions: collision, rotation, line clearing
├── hooks/useTetris.ts    # Game state, keyboard handling, game loop
├── components/
│   ├── Board.tsx          # 10×20 grid renderer
│   ├── NextPiece.tsx      # Upcoming piece preview
│   ├── ScoreBoard.tsx     # Score / level / lines display
│   └── Controls.tsx       # Key hints + mobile touch buttons
├── App.tsx                # Orchestrates components + overlays
└── App.css                # All game styles

.github/
├── copilot-instructions.md   # Architecture rules for AI agents
├── prompts/                   # Slash-command prompts
├── skills/                    # Reusable agent skills (SKILL.md)
├── hooks/hooks.json           # Agent lifecycle hooks
└── workflows/                 # CI + GitHub Pages deploy
```

---

## 📚 Resources

| Link | Description |
|:-----|:-----------|
| [VS Code 1.111 Release Notes](https://code.visualstudio.com/updates/v1_111) | Full release notes |
| [Autopilot & Agent Permissions](https://code.visualstudio.com/docs/copilot/agents/agent-tools#permission-levels) | Permission levels documentation |
| [Agent-Scoped Hooks](https://code.visualstudio.com/docs/copilot/customization/hooks#_agentscoped-hooks) | Hook configuration for custom agents |
| [Debug Chat Interactions](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view) | Agent Debug panel documentation |
| [Terminal Sandboxing](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) | Sandbox for safe Autopilot usage |
| [VS Code 1.110 Cheatsheet](vscode-1.110-presentation.md) | Previous release cheatsheet |
| [VS Code 1.109 Cheatsheet](vscode-1.109-presentation.md) | Foundation release cheatsheet |

---

<div align="center">

*VS Code 1.111 — March 2026 · First Weekly Release · Tetris Edition 🎮*

</div>
