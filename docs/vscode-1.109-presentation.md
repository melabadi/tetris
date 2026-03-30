<div align="center">

# 🎮 VS Code 1.109 Cheatsheet — Tetris Edition

**January 2026 Release — Multi-Agent Development**

[![Release Notes](https://img.shields.io/badge/Release_Notes-1.109-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_109)
[![Agent Sessions Day](https://img.shields.io/badge/Watch-Agent_Sessions_Day-red?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/live/tAezuMSJuFs)

</div>

> **Project:** React 19 + TypeScript + Vite Tetris game · `gameEngine.ts` (pure logic) · `useTetris.ts` (hook) · 4 components · 7 tetrominoes

---

## 🔎 1 · General

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Context Window](https://code.visualstudio.com/updates/v1_109#_context-window-details)** | Shows token usage breakdown in chat input | Built-in | Attach `gameEngine.ts` + `useTetris.ts` + `constants.ts` to chat, hover the bar at bottom |
| **[Copilot Memory](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory)** | Remembers preferences across sessions | `github.copilot.chat.copilotMemory.enabled` | _"Remember: game logic must be pure functions in gameEngine.ts, never import React there"_ then in a new session: _"What are my code conventions?"_ |

> **Manage memories →** [github.com/settings/copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory)

---

## 📐 2 · Planning

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Plan Agent](https://code.visualstudio.com/docs/copilot/chat/chat-planning)** | 4-phase workflow: Discovery → Alignment → Design → Refinement | Built-in | `/plan Add a hold-piece feature that lets the player swap the current tetromino with a held piece` |
| **[Ask Questions](https://code.visualstudio.com/updates/v1_109#_ask-questions-tool)** | Agent asks multi-choice questions instead of guessing | `chat.askQuestions.enabled` | _"Add a combo scoring system to the Tetris game"_ — watch it ask about combo windows, multipliers, and visual feedback |
| **[Mermaid Diagrams](https://code.visualstudio.com/updates/v1_109#_mermaid-diagrams)** | Renders interactive diagrams inline in chat | Built-in | _"Draw a state diagram for the Tetris game loop: idle → playing → paused → game over"_ |
| **[Model per Step](https://code.visualstudio.com/updates/v1_109#_specific-model-for-implementation)** | Different models for planning vs implementation | `github.copilot.chat.implementAgent.model` | Set to `"Claude Sonnet 4.5 (copilot)"` in Settings |

---

## 🤖 3 · Agent Sessions

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Welcome Page](https://code.visualstudio.com/updates/v1_109#_agent-sessions-welcome-page)** | Shows recent agent sessions on startup | `workbench.startupEditor` → `agentSessionsWelcomePage` | Close & reopen VS Code |
| **[Search Subagent](https://code.visualstudio.com/updates/v1_109#_search-subagent)** | Searches codebase in its own context window | `github.copilot.chat.searchSubagent.enabled` | _"Find every place we call isValidPosition or check for collisions"_ |
| **[Status Indicator](https://code.visualstudio.com/updates/v1_109#_agent-status-indicator)** | Badge in command center: In-progress · Unread · Needs input | `chat.agentsControl.enabled` | Start an agent task, check the badge at top |
| **[Session Management](https://code.visualstudio.com/updates/v1_109#_agent-session-management)** | Local / Background / Cloud sessions, hand off between them | Built-in | Start a local session → delegate to background or cloud |

---

## ☁️ 4 · Background & Cloud Agent Delegation

Hand off long-running tasks so you can keep coding locally.

| Session Type | Where it runs | Best for | How to start |
|:-------------|:-------------|:---------|:-------------|
| **Local** | Your machine, VS Code open | Quick edits, debugging | Default — just chat |
| **Background** | Your machine, VS Code can close | Builds, test suites, refactors | Click **⋯** on a session → **Continue in Background** |
| **Cloud (Copilot Coding Agent)** | GitHub-hosted | Large features, multi-file changes, CI-verified PRs | Assign a GitHub Issue, or click **⋯** → **Continue in Cloud** |

### Demo: Delegate a Feature to Background

1. Start a local session: _"Add a hold-piece feature — let the player press C to swap the current tetromino with a held piece"_
2. While the agent plans, click **⋯** → **Continue in Background**
3. Close the chat panel — the agent keeps working
4. The status badge shows progress; click it to resume when done

### Demo: Delegate to Copilot Coding Agent (Cloud)

1. Create a GitHub Issue: _"Add high-score persistence using localStorage"_
2. Assign **Copilot** to the issue
3. Copilot Coding Agent creates a branch, implements the feature, runs CI (`npm run lint` + `npm run type-check` + `npm run build`), and opens a PR
4. Review the PR — Copilot iterates on your feedback

> **Tip:** Cloud sessions respect `.github/copilot-instructions.md` — your Tetris architecture rules (pure logic in `gameEngine.ts`, state in `useTetris.ts`) are enforced automatically.

---

## 🪝 5 · Agent Hooks

### This Repo's Hooks

This project has a full hook suite in `.github/hooks/hooks.json` that fires on every agent action:

```json
{
  "hooks": {
    "sessionStart":          [{ "powershell": ".github/hooks/scripts/session-start.ps1" }],
    "sessionEnd":            [{ "powershell": ".github/hooks/scripts/session-end.ps1" }],
    "userPromptSubmitted":   [{ "powershell": ".github/hooks/scripts/log-prompt.ps1" }],
    "preToolUse":            [
      { "powershell": ".github/hooks/scripts/security-check.ps1", "comment": "Block dangerous commands" },
      { "powershell": ".github/hooks/scripts/audit-tool-use.ps1", "comment": "Audit all tool invocations" }
    ],
    "postToolUse":           [{ "powershell": ".github/hooks/scripts/post-tool-stats.ps1" }],
    "errorOccurred":         [{ "powershell": ".github/hooks/scripts/log-error.ps1" }]
  }
}
```

> **Try:** Ask the agent to edit `Board.tsx` — watch the terminal show the security check and audit log fire automatically.

### Adding a Lint-on-Edit Hook

Want to auto-lint after every file edit? Add this to the `postToolUse` array:

```json
{
  "type": "command",
  "bash": "npx eslint --no-warn-ignored ${TOOL_ARGS_FILE_PATH} || true",
  "powershell": "npx eslint --no-warn-ignored $env:TOOL_ARGS_FILE_PATH; exit 0",
  "timeoutSec": 30
}
```

---

## 🧩 6 · Skills & Prompts (Slash Commands)

VS Code 1.109 makes [Agent Skills generally available](https://code.visualstudio.com/updates/v1_109#_agent-skills-are-generally-available) and lets you [invoke them as slash commands](https://code.visualstudio.com/updates/v1_109#_use-skills-as-slash-commands) directly in chat alongside prompt files. Type `/` to see all available skills and prompts.

### Agent Skills — _GA in 1.109_

Skills package domain expertise into reusable `SKILL.md` files. The agent loads them automatically when relevant, or you invoke them manually with `/skill-name`.

| Skill | What it encodes |
|:------|:----------------|
| `/new-game-mechanic` | 6-step implementation pipeline: constants → engine → hook → components → CSS → validate |
| `/test-and-validate` | Testing strategy for all 8 `gameEngine.ts` functions + edge cases |
| `/game-architect` | Deep architectural analysis, separation-of-concerns review |
| `/optimize-performance` | React rendering, game loop, memoization, CSS performance |
| `/design-theme` | Visual themes, animations, tetromino color palettes |

Control visibility with frontmatter:
- `user-invokable: false` — hide from `/` menu, but the model can still load it automatically
- `disable-model-invocation: true` — show in `/` menu, but prevent automatic loading

> **Try:** `/new-game-mechanic Implement wall kicks using SRS offset tables`

### Slash-Command Prompts

Prompt files in `.github/prompts/` also appear as `/` commands:

| Prompt | What it does |
|:-------|:-------------|
| `/add-feature` | Guides adding a new Tetris feature following the architecture rules |
| `/fix-bug` | Structured debugging with file-by-category checklist |
| `/refactor` | Refactoring with separation-of-concerns enforcement |
| `/write-tests` | Test generation targeting all `gameEngine.ts` functions |
| `/code-review` | Architecture, TypeScript, quality, and performance review |
| `/demo-hold-piece` | 🎯 Demo: Hold-piece feature end-to-end |
| `/demo-high-scores` | 🎯 Demo: localStorage high scores |

### How They Work Together

```
┌─────────────────────────────────────────────────────────────┐
│  Type / in chat to see all available commands                │
│                                                             │
│  ┌──────────────────────────────────────────┐                │
│  │  /new-game-mechanic  /test-and-validate  │  Skills        │
│  │  /game-architect     /optimize-perf      │  (auto-loaded  │
│  │  /design-theme                           │  or manual)    │
│  └──────────────────────────────────────────┘                │
│                                                             │
│  ┌──────────────────────────────────────────┐                │
│  │  /add-feature   /write-tests   /fix-bug  │  Prompt        │
│  │  /refactor      /code-review             │  Files         │
│  │  /demo-hold-piece  /demo-high-scores     │  (manual only) │
│  └──────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Demo: Skills + Prompts Workflow

```
1. /new-game-mechanic Add a ghost piece that shows where the current tetromino will land
   → Skill provides the 6-step implementation pipeline

2. /code-review Review the ghost piece implementation
   → Prompt checks architecture, types, and performance

3. /write-tests Write tests for getGhostPiece() covering edge cases
   → Prompt generates targeted tests

4. /optimize-performance Check the ghost piece rendering for unnecessary re-renders
   → Skill focuses on React performance
```

---

## 💬 7 · Message Steering & Queueing

Send follow-up messages while the agent is still working — [docs](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running).

| Action | When to use | What happens |
|:-------|:-----------|:-------------|
| **Queue** | _"Also add touch support for the hold feature after you're done"_ | Waits, sends after current response |
| **Steer** | _"Actually, put the hold-piece logic in gameEngine.ts first"_ | Yields current tool, processes your message |
| **Stop & Send** | _"Forget hold-piece, add a speed-up power-up instead"_ | Cancels current request entirely |

**Settings:** `chat.requestQueuing.enabled` · `chat.requestQueuing.defaultAction` → `"steer"`

> **Try:** Ask the agent to refactor all components. While it works, send _"Start with Board.tsx first"_ → choose **Steer**.

---

## ⚙️ Quick-Copy Settings

Paste into `settings.json` to enable everything at once:

```json
{
  "github.copilot.chat.copilotMemory.enabled": true,
  "chat.askQuestions.enabled": true,
  "github.copilot.chat.implementAgent.model": "Claude Sonnet 4.5 (copilot)",
  "inlineChat.defaultModel": "Claude Sonnet 4.5 (copilot)",
  "workbench.startupEditor": "agentSessionsWelcomePage",
  "github.copilot.chat.searchSubagent.enabled": true,
  "chat.agentsControl.enabled": true,
  "chat.agentsControl.clickBehavior": "cycle",
  "chat.requestQueuing.enabled": true,
  "chat.requestQueuing.defaultAction": "steer"
}
```

---

## ⌨️ Shortcuts

| Action | Shortcut |
|:-------|:---------|
| Plan Agent | `/plan` in chat |
| New Local Chat | `Ctrl+Shift+N` |
| Settings | `Ctrl+,` |
| Command Palette | `Ctrl+Shift+P` |

---

## 🎯 Demo Flow

| # | Feature | What to show | Prompt |
|:-:|:--------|:-------------|:-------|
| 1 | Context Window | Attach `gameEngine.ts` + `useTetris.ts`, hover the token bar | — |
| 2 | Memory | Store a convention, recall it in a new session | _"Remember: game logic stays pure in gameEngine.ts"_ |
| 3 | `/plan` | Walk through the 4-phase planning workflow | `/plan Add a hold-piece feature` |
| 4 | Ask Questions | Show the agent asking clarifying questions | _"Add a combo scoring system"_ |
| 5 | Mermaid | Render a game-state diagram inline | _"Draw a state diagram for the Tetris game loop"_ |
| 6 | Skills & Prompts | Invoke a skill or prompt as a slash command | `/new-game-mechanic Add a ghost piece` then `/code-review Review it` |
| 7 | Agent Hooks | Edit a file, watch security check + audit fire | _"Rename BOARD_WIDTH to COLUMNS in constants.ts"_ |
| 8 | Background Agent | Delegate a task to run in the background | _"Add localStorage high scores"_ → ⋯ → Background |
| 9 | Cloud Agent | Show Copilot Coding Agent on a GitHub Issue | Assign Copilot to an issue |
| 10 | Steering | Redirect the agent mid-task | Start refactor → steer to _"Start with Board.tsx"_ |

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
├── prompts/                   # 7 slash-command prompts
├── skills/                    # 5 reusable agent skills (SKILL.md)
├── hooks/hooks.json           # 6 agent lifecycle hooks
└── workflows/                 # CI + GitHub Pages deploy
```

---

## 📚 Resources

| Link | Description |
|:-----|:-----------|
| [VS Code 1.109 Release Notes](https://code.visualstudio.com/updates/v1_109) | Full release notes |
| [Agent Sessions Day](https://youtube.com/live/tAezuMSJuFs) | YouTube recording — Feb 19, 2026 |
| [Copilot Memory](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory) | Memory docs on GitHub |
| [Plan Agent](https://code.visualstudio.com/docs/copilot/chat/chat-planning) | Planning workflow docs |
| [Message Steering](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running) | Queue & steer docs |
| [Agent Hooks](https://code.visualstudio.com/updates/v1_109#_agent-hooks) | Hook configuration reference |
| [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent) | Cloud agent docs |
| [Background Sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions) | Session management docs |

---

<div align="center">

*VS Code 1.109 — January 2026 · Tetris Edition 🎮*

</div>
