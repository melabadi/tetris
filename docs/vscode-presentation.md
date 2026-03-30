<div align="center">

# 🎮 VS Code Copilot Cheatsheet — Tetris Edition

**January–March 2026 (1.109 – 1.111) · Multi-Agent Development**

[![1.109 Release Notes](https://img.shields.io/badge/1.109-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_109)
[![1.110 Release Notes](https://img.shields.io/badge/1.110-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_110)
[![1.111 Release Notes](https://img.shields.io/badge/1.111-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_111)
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
| **[Manual Compact](https://code.visualstudio.com/updates/v1_110#_context-compaction)** | Summarize conversation to free context space; focus on what matters | Built-in | `/compact focus on the scoring system changes` or click context window → _Compact Conversation_ |
| **[Fork a Session](https://code.visualstudio.com/updates/v1_110#_fork-a-chat-session)** | Branch a conversation to explore alternatives without losing original | Built-in | `/fork` for full fork, or hover a request → _Fork Conversation_ for partial |

### Demo: Fork & Explore Alternatives

```
1. Start a session: "Add a ghost piece that shows where the current tetromino will land"
2. Agent implements it in gameEngine.ts
3. Hover the implementation request → click Fork Conversation
4. In the fork: "Actually, implement ghost piece using CSS opacity instead"
5. Compare both approaches — original session is untouched
```

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

VS Code makes [Agent Skills generally available](https://code.visualstudio.com/updates/v1_109#_agent-skills-are-generally-available) and lets you [invoke them as slash commands](https://code.visualstudio.com/updates/v1_109#_use-skills-as-slash-commands) directly in chat alongside prompt files. Type `/` to see all available skills and prompts.

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

## 🔌 7 · Agent Extensibility

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Agent Plugins](https://code.visualstudio.com/updates/v1_110#_agent-plugins-experimental)** | Installable bundles of skills, tools, hooks, MCP servers | `chat.plugins.enabled` | `@agentPlugins` in Extensions view, or Command Palette → _Chat: Plugins_ |
| **[Agentic Browser Tools](https://code.visualstudio.com/updates/v1_110#_agentic-browser-tools-experimental)** | Agent drives the integrated browser: navigate, click, screenshot, read | `workbench.browser.enableChatTools` | _"Open my Tetris game at localhost:5173 and verify the board renders correctly"_ |

### Demo: Agent Plugins

1. Open Extensions view → search `@agentPlugins`
2. Browse available plugin bundles (skills, tools, hooks in one package)
3. Install a plugin — its skills and tools appear automatically in chat
4. Configure additional sources via `chat.plugins.marketplaces`

### Demo: Agentic Browser Tools

1. Enable `workbench.browser.enableChatTools` in Settings
2. Run `npm run dev` to start the Tetris dev server
3. Ask the agent: _"Open localhost:5173 in the browser, take a screenshot, and check if the board renders a 10×20 grid"_
4. Watch the agent use `openBrowserPage`, `screenshotPage`, and `readPage` to verify your app

---

## 🔧 8 · Agent Debug & Controls

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Agent Debug Panel](https://code.visualstudio.com/updates/v1_110#_agent-debug-panel-preview)** | Real-time view of chat events, tool calls, loaded customizations | Built-in (Preview) | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ while chatting |
| **[Yolo — Auto Approve](https://code.visualstudio.com/updates/v1_110#_slash-commands-for-enabling-auto-approval)** | Toggle global auto-approve from chat input | Built-in | Type `/yolo` in chat to enable, `/disableYolo` to disable |
| **[Debug Events Snapshot](https://code.visualstudio.com/updates/v1_111#_debug-events-snapshot)** | Attach agent debug events as chat context for troubleshooting | Built-in | Type `#debugEventsSnapshot` in chat → ask _"Why didn't my skill load?"_ |

### Demo: Debug & Troubleshoot Agent Behavior

1. Open Agent Debug Panel (`Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_)
2. Send a message in chat — observe events in real time
3. Click the sparkle icon in the Debug Panel to attach snapshot to chat
4. Ask: _"Which skills were loaded? How many tokens did the last tool call consume?"_
5. The agent analyzes the debug events and explains what happened

---

## 💬 9 · Chat Experience

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Custom Thinking Phrases](https://code.visualstudio.com/updates/v1_110#_custom-thinking-phrases)** | Customize loading text during reasoning / tool calls | `chat.agent.thinking.phrases` | See Quick-Copy Settings below for a Tetris-themed example |
| **[AI Co-Author Attribution](https://code.visualstudio.com/updates/v1_110#_ai-co-author-attribution-for-commits)** | Auto-append `Co-authored-by:` trailer for AI-generated code | `git.addAICoAuthor` | Set to `"chatAndAgent"` → commit after an agent edit → check git log |

### Tetris-Themed Thinking Phrases

```json
"chat.agent.thinking.phrases": {
  "mode": "replace",
  "phrases": [
    "Rotating tetrominoes...",
    "Clearing lines...",
    "Checking for T-spins...",
    "Calculating drop distance..."
  ]
}
```

---

## 💬 10 · Message Steering & Queueing

Send follow-up messages while the agent is still working — [docs](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running).

| Action | When to use | What happens |
|:-------|:-----------|:-------------|
| **Queue** | _"Also add touch support for the hold feature after you're done"_ | Waits, sends after current response |
| **Steer** | _"Actually, put the hold-piece logic in gameEngine.ts first"_ | Yields current tool, processes your message |
| **Stop & Send** | _"Forget hold-piece, add a speed-up power-up instead"_ | Cancels current request entirely |

**Settings:** `chat.requestQueuing.enabled` · `chat.requestQueuing.defaultAction` → `"steer"`

> **Try:** Ask the agent to refactor all components. While it works, send _"Start with Board.tsx first"_ → choose **Steer**.

---

## 🚀 11 · Autopilot (Preview)

The agent's highest autonomy level — it plans, implements, runs tools, responds to its own questions, and iterates until the task is complete. No approval prompts, no hand-holding.

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Autopilot](https://code.visualstudio.com/updates/v1_111#_autopilot-preview)** | Agent works fully autonomously — auto-approves tools, auto-responds to questions, iterates until `task_complete` | `chat.autopilot.enabled` | Set permission to _Autopilot_ → _"Add a hold-piece feature with keyboard shortcut C"_ → walk away |
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
  "chat.requestQueuing.defaultAction": "steer",
  "chat.plugins.enabled": true,
  "workbench.browser.enableChatTools": true,
  "chat.agent.thinking.phrases": {
    "mode": "replace",
    "phrases": [
      "Rotating tetrominoes...",
      "Clearing lines...",
      "Checking for T-spins...",
      "Calculating drop distance..."
    ]
  },
  "git.addAICoAuthor": "chatAndAgent",
  "chat.autopilot.enabled": true
}
```

---

## ⌨️ Shortcuts

| Action | Shortcut |
|:-------|:---------|
| Plan Agent | `/plan` in chat |
| Compact Context | `/compact` in chat |
| Fork Session | `/fork` in chat |
| Auto Approve | `/yolo` in chat |
| Disable Auto Approve | `/disableYolo` in chat |
| Agent Debug Panel | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| Debug Events Snapshot | `#debugEventsSnapshot` in chat |
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
| 10 | Agent Plugins | Browse and install plugin bundles | `@agentPlugins` in Extensions view |
| 11 | Browser Tools | Agent navigates to Tetris, screenshots, verifies grid | _"Open localhost:5173, screenshot the game, verify 10×20 grid"_ |
| 12 | Agent Debug | Open panel, show real-time events and loaded customizations | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| 13 | Yolo | Toggle auto-approve from chat | `/yolo` then `/disableYolo` |
| 14 | Manual Compact | Compact a long conversation with a focus topic | `/compact focus on the scoring system changes` |
| 15 | Fork | Branch a conversation to try alternatives | Hover request → _Fork Conversation_ |
| 16 | AI Co-Author | Commit after agent edit, check git log for trailer | _"git log --format=fuller -1"_ |
| 17 | Custom Thinking | Show Tetris-themed loading text | Apply the quick-copy settings → chat |
| 18 | Steering | Redirect the agent mid-task | Start refactor → steer to _"Start with Board.tsx"_ |
| 19 | Autopilot | Full autonomous implementation, no approvals | Set Autopilot → _"Add ghost piece with engine, board, and CSS"_ |

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
| [VS Code 1.109 Release Notes](https://code.visualstudio.com/updates/v1_109) | January 2026 — Agent sessions, hooks, skills, planning |
| [VS Code 1.110 Release Notes](https://code.visualstudio.com/updates/v1_110) | February 2026 — Plugins, browser tools, compaction, forks |
| [VS Code 1.111 Release Notes](https://code.visualstudio.com/updates/v1_111) | March 2026 — Autopilot, agent-scoped hooks, weekly releases |
| [Agent Sessions Day](https://youtube.com/live/tAezuMSJuFs) | YouTube recording — Feb 19, 2026 |
| [Copilot Memory](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory) | Memory docs on GitHub |
| [Plan Agent](https://code.visualstudio.com/docs/copilot/chat/chat-planning) | Planning workflow docs |
| [Message Steering](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running) | Queue & steer docs |
| [Agent Hooks](https://code.visualstudio.com/updates/v1_109#_agent-hooks) | Hook configuration reference |
| [Agent Plugins](https://code.visualstudio.com/docs/copilot/customization/agent-plugins) | Plugin documentation |
| [Agentic Browser Tools](https://code.visualstudio.com/docs/copilot/guides/browser-agent-testing-guide) | Browser testing tutorial |
| [Context Compaction](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction) | Compaction documentation |
| [Fork Chat Sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_fork-a-chat-session) | Session forking docs |
| [Autopilot & Permissions](https://code.visualstudio.com/docs/copilot/agents/agent-tools#permission-levels) | Permission levels documentation |
| [Terminal Sandboxing](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) | Sandbox for safe Autopilot usage |
| [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent) | Cloud agent docs |
| [Background Sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions) | Session management docs |

---

<div align="center">

*VS Code 1.109–1.111 · January–March 2026 · Tetris Edition 🎮*

</div>
