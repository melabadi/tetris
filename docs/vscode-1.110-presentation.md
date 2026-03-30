<div align="center">

# 🎮 VS Code 1.110 Cheatsheet — Tetris Edition

**February 2026 Release — Smarter Sessions & Agent Extensibility**

[![Release Notes](https://img.shields.io/badge/Release_Notes-1.110-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_110)

</div>

> **Project:** React 19 + TypeScript + Vite Tetris game · `gameEngine.ts` (pure logic) · `useTetris.ts` (hook) · 4 components · 7 tetrominoes

---

## 🔌 1 · Agent Controls

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Background Agent Improvements](https://code.visualstudio.com/updates/v1_110#_background-agents)** | `/compact`, slash commands, rename sessions in background agents | Built-in | Start a background session → type `/compact focus on the scoring logic` |
| **[Agent Debug Panel](https://code.visualstudio.com/updates/v1_110#_agent-debug-panel-preview)** | Real-time view of chat events, tool calls, loaded customizations | Built-in (Preview) | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ while chatting |
| **[Auto Approve Slash Commands](https://code.visualstudio.com/updates/v1_110#_slash-commands-for-enabling-auto-approval)** | Toggle global auto-approve from chat input | Built-in | Type `/yolo` in chat to enable, `/disableYolo` to disable |
| **[Edit & Ask Mode Changes](https://code.visualstudio.com/updates/v1_110#_edit-and-ask-mode-changes)** | Edit mode hidden by default; Ask mode now fully agentic | `chat.editMode.hidden` | Select _View edit agent_ in agent picker to see its declaration |
| **[Ask Questions Tool](https://code.visualstudio.com/updates/v1_110#_ask-questions-tool)** | Question carousel moved to core; works in subagents; steer mid-question | Built-in | _"Add particle effects to line clears"_ — navigate Qs with `Alt+N` / `Alt+P` |
| **[Prevent Auto-Suspend](https://code.visualstudio.com/updates/v1_110#_prevent-auto-suspend-during-chat)** | OS won't sleep your machine while a chat request runs | Built-in | Start a long agent task, walk away — it keeps running |

---

## 🧩 2 · Agent Extensibility

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Agent Plugins](https://code.visualstudio.com/updates/v1_110#_agent-plugins-experimental)** | Installable bundles of skills, tools, hooks, MCP servers | `chat.plugins.enabled` | `@agentPlugins` in Extensions view, or Command Palette → _Chat: Plugins_ |
| **[Agentic Browser Tools](https://code.visualstudio.com/updates/v1_110#_agentic-browser-tools-experimental)** | Agent drives the integrated browser: navigate, click, screenshot, read | `workbench.browser.enableChatTools` | _"Open my Tetris game at localhost:5173 and verify the board renders correctly"_ |
| **[Create Customizations from Chat](https://code.visualstudio.com/updates/v1_110#_create-agent-customizations-from-chat)** | Generate prompts, skills, agents, hooks via `/create-*` commands | Built-in | `/create-skill` after debugging → captures the procedure as a reusable skill |
| **[Tools for Usages & Rename](https://code.visualstudio.com/updates/v1_110#_tools-for-usages-and-rename)** | Agent can use LSP-powered usages and rename instead of grep | Built-in | _"Use #rename and change BOARD_WIDTH to COLUMNS in constants.ts"_ |

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

### Demo: Create Customizations from Chat

```
1. Debug an issue over several turns in chat
2. Type: /create-skill  →  captures the debugging procedure as a reusable skill
3. Type: /create-instruction  →  turns corrections into project conventions
4. Or just say: "save this workflow as a skill" — the agent recognizes your intent
```

---

## 🧠 3 · Smarter Sessions

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Session Memory for Plans](https://code.visualstudio.com/updates/v1_110#_session-memory-for-plans)** | Plans persist across turns; survive compaction; recalled after digressions | Built-in | `/plan Add a T-spin bonus` → ask unrelated question → _"What was my plan?"_ |
| **[Context Compaction](https://code.visualstudio.com/updates/v1_110#_context-compaction)** | Summarize conversation to free context space; manual or automatic | Built-in | `/compact focus on the database schema decisions` or click context window → _Compact Conversation_ |
| **[Explore Subagent](https://code.visualstudio.com/updates/v1_110#_codebase-search-with-explore-subagent)** | Plan agent delegates research to a fast, read-only Explore subagent | `chat.exploreAgent.defaultModel` | `/plan Add wall kicks` — hover the explore task to see which model runs research |
| **[Inline Chat → Session](https://code.visualstudio.com/updates/v1_110#_inline-chat-and-chat-session)** | Inline chat queues into existing session when agent already changed the file | Built-in | Use inline chat on a file the agent modified — it uses the full session context |
| **[Fork a Chat Session](https://code.visualstudio.com/updates/v1_110#_fork-a-chat-session)** | Branch a conversation to explore alternatives without losing original | Built-in | `/fork` for full fork, or hover a request → _Fork Conversation_ for partial |

### Demo: Fork & Explore Alternatives

```
1. Start a session: "Add a ghost piece that shows where the current tetromino will land"
2. Agent implements it in gameEngine.ts
3. Hover the implementation request → click Fork Conversation
4. In the fork: "Actually, implement ghost piece using CSS opacity instead"
5. Compare both approaches — original session is untouched
```

---

## 💬 4 · Chat Experience

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Redesigned Model Picker](https://code.visualstudio.com/updates/v1_110#_redesigned-model-picker)** | Organized sections: Auto → Featured/Recent → Other; search box; hover details | Built-in | Click the model dropdown — see organized sections with rich hover info |
| **[Contextual Tips](https://code.visualstudio.com/updates/v1_110#_discover-features-with-contextual-tips-experimental)** | Suggests features you haven't tried yet when starting a new session | `chat.tips.enabled` | Start a new chat session — see personalized tips for unexplored features |
| **[Custom Thinking Phrases](https://code.visualstudio.com/updates/v1_110#_custom-thinking-phrases)** | Customize loading text during reasoning / tool calls | `chat.agent.thinking.phrases` | See Quick-Copy Settings below for a Tetris-themed example |
| **[Collapsible Terminal Tool Calls](https://code.visualstudio.com/updates/v1_110#_collapsible-terminal-tool-calls)** | Terminal output in agent mode shown as expandable sections | `chat.tools.terminal.simpleCollapsible` | Ask agent to run `npm run lint` — output appears collapsed with summary header |
| **[OS Notifications](https://code.visualstudio.com/updates/v1_110#_os-notifications-for-chat-responses-and-confirmations)** | Get notified even when VS Code is focused | `chat.notifyWindowOnResponseReceived` | Set to `"always"` → get OS notification for every chat response |
| **[Inline Chat Hover Mode](https://code.visualstudio.com/updates/v1_110#_inline-chat-hover-mode)** | Inline chat uses a hover-based UI (like rename) | `inlineChat.renderMode` | Select code → trigger inline chat → prompt appears as hover overlay |
| **[Inline Chat Affordance](https://code.visualstudio.com/updates/v1_110#_inline-chat-affordance)** | Menu appears alongside selection to start inline chat | `inlineChat.affordance` | Set to `"editor"` or `"gutter"` → select code to see the affordance |

---

## ✏️ 5 · Code Editing

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Long-Distance NES](https://code.visualstudio.com/updates/v1_110#_long-distance-next-edit-suggestions)** | Next edit suggestions anywhere in the file, not just near cursor | `github.copilot.nextEditSuggestions.extendedRange` | Edit a constant in `constants.ts` — see NES suggest updates in distant code |
| **[NES Eagerness](https://code.visualstudio.com/updates/v1_110#_nes-eagerness)** | Control suggestion frequency: more suggestions vs. more relevant | Copilot Status Bar | Click Copilot icon in status bar → adjust eagerness slider |

---

## 🖥️ 6 · Editor Experience

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Modal Editors](https://code.visualstudio.com/updates/v1_110#_modal-editors-experimental)** | Settings, Keyboard Shortcuts, Profiles float as modals over editor | `workbench.editor.useModal` | Set to `"some"` → open Settings → it floats without disrupting your tabs |
| **[Notification Position](https://code.visualstudio.com/updates/v1_110#_configurable-notification-position)** | Move notifications away from Chat view | `workbench.notifications.position` | Set to `"bottom-left"` to keep the right side clear for chat |
| **[Settings Editor Cleanup](https://code.visualstudio.com/updates/v1_110#_settings-editor-cleanup)** | Chat settings get own top-level entry; experimental settings moved to end | Built-in | Open Settings → find the new "Chat" top-level category |

---

## 🔀 7 · Source Control & Debugging

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[AI Co-Author Attribution](https://code.visualstudio.com/updates/v1_110#_ai-co-author-attribution-for-commits)** | Auto-append `Co-authored-by:` trailer for AI-generated code | `git.addAICoAuthor` | Set to `"chatAndAgent"` → commit after an agent edit → check git log |
| **[Custom Debug Properties](https://code.visualstudio.com/updates/v1_110#_javascript-debugger)** | Objects with `Symbol.for('debug.properties')` show custom view in debugger | Built-in | Add the symbol method to a game object → inspect it in debugger |
| **[Emulate Focused Window](https://code.visualstudio.com/updates/v1_110#_javascript-debugger)** | Keep browser focus while debugging hover/focus-dependent elements | Browser Options view | Enable _Emulate a focused page_ in the renamed Browser Options view |

---

## 🖥️ 8 · Terminal

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Kitty Graphics Protocol](https://code.visualstudio.com/updates/v1_110#_kitty-graphics-protocol)** | Render images directly in the integrated terminal | `terminal.integrated.enableImages` | Enable + use `kitten icat` or VT CLI to display images in terminal |
| **[Ghostty External Terminal](https://code.visualstudio.com/updates/v1_110#_ghostty-support-for-external-terminal)** | Use Ghostty as your default external terminal | `terminal.external.linuxExec` | Set to `"ghostty"` → _Terminal: Open New External Terminal_ |
| **[Terminal Sandboxing](https://code.visualstudio.com/updates/v1_110#_terminal-sandboxing-improvements-preview)** | Trusted domain network isolation; no install required on macOS | `chat.tools.terminal.sandbox.enabled` | Enable sandboxing → agent terminal commands run in isolation |

---

## 📝 9 · Languages

| Feature | What it does | Setting | Try this |
|---------|-------------|---------|----------|
| **[Unified JS/TS Settings](https://code.visualstudio.com/updates/v1_110#_unified-javascript-and-typescript-settings)** | Single `js/ts.*` prefix replaces duplicate `javascript.*`/`typescript.*` | `js/ts.format.enabled` | Replace old settings with unified `js/ts.*` versions in `settings.json` |
| **[Python Environments Extension](https://code.visualstudio.com/updates/v1_110#_python-environments-extension-rolling-out-to-all-users)** | Unified interface for managing Python envs, packages, interpreters | `python.useEnvsExtension` | Opt in immediately or wait for auto-rollout |

---

## ♿ 10 · Accessibility Highlights

| Feature | What it does | Shortcut / Setting |
|---------|-------------|-------------------|
| **Toggle thinking content** | Show/hide model reasoning in accessible view | `Alt+T` |
| **Question carousel navigation** | Navigate between questions | `Alt+N` / `Alt+P` |
| **TODO list focus toggle** | Jump between TODO list and chat input | `Ctrl+Shift+T` |
| **Find/filter accessibility help** | Contextual help in any find dialog | `Alt+F1` |
| **Steering indicator** | Screen reader announcement when steering occurs | Built-in |
| **Accessibility skill** | Built-in skill ensures new features include a11y support | Built-in |
| **Checkmarks in chat** | Re-enable checkmarks for tool call indicators | `accessibility.chat.showCheckmarks` |

---

## ⚙️ Quick-Copy Settings

Paste into `settings.json` to enable key 1.110 features:

```json
{
  "chat.plugins.enabled": true,
  "workbench.browser.enableChatTools": true,
  "chat.tips.enabled": true,
  "chat.agent.thinking.phrases": {
    "mode": "replace",
    "phrases": [
      "Rotating tetrominoes...",
      "Clearing lines...",
      "Checking for T-spins...",
      "Calculating drop distance..."
    ]
  },
  "chat.tools.terminal.simpleCollapsible": true,
  "chat.notifyWindowOnResponseReceived": "always",
  "chat.notifyWindowOnConfirmation": "always",
  "inlineChat.renderMode": "hover",
  "inlineChat.affordance": "editor",
  "workbench.editor.useModal": "some",
  "workbench.notifications.position": "bottom-left",
  "github.copilot.nextEditSuggestions.enabled": true,
  "github.copilot.nextEditSuggestions.extendedRange": true,
  "git.addAICoAuthor": "chatAndAgent",
  "terminal.integrated.enableImages": true,
  "chat.tools.terminal.sandbox.enabled": true
}
```

---

## ⌨️ Shortcuts

| Action | Shortcut |
|:-------|:---------|
| Agent Debug Panel | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| Auto Approve | `/yolo` in chat |
| Fork Session | `/fork` in chat |
| Compact Context | `/compact` in chat |
| Navigate Questions | `Alt+N` / `Alt+P` |
| Toggle TODO Focus | `Ctrl+Shift+T` |
| Command Palette | `Ctrl+Shift+P` |

---

## 🎯 Demo Flow

| # | Feature | What to show | Prompt |
|:-:|:--------|:-------------|:-------|
| 1 | Agent Debug Panel | Open panel, show real-time events and loaded customizations | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| 2 | Auto Approve | Toggle YOLO mode from chat | `/yolo` then `/disableYolo` |
| 3 | Agent Plugins | Browse and install plugin bundles | `@agentPlugins` in Extensions view |
| 4 | Browser Tools | Agent navigates to Tetris, takes screenshot, checks board | _"Open localhost:5173, screenshot the game, verify 10×20 grid"_ |
| 5 | Create Customizations | Generate a skill from conversation | `/create-skill` or _"save this as a skill"_ |
| 6 | Rename Tool | LSP-powered rename through agent | _"Use #rename to change BOARD_WIDTH to COLUMNS"_ |
| 7 | Session Memory | Plan persists across turns and compaction | `/plan Add T-spin bonus` → digress → _"What was my plan?"_ |
| 8 | Context Compaction | Manually compact a long conversation | `/compact focus on the scoring system changes` |
| 9 | Fork Session | Branch a conversation to try alternatives | Hover request → _Fork Conversation_ |
| 10 | Long-Distance NES | Show edit suggestions far from cursor | Edit a constant → see NES trigger distant updates |
| 11 | Custom Thinking Phrases | Show Tetris-themed loading text | Apply the quick-copy settings → chat |

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
| [VS Code 1.110 Release Notes](https://code.visualstudio.com/updates/v1_110) | Full release notes |
| [Agent Plugins](https://code.visualstudio.com/docs/copilot/customization/agent-plugins) | Plugin documentation |
| [Agentic Browser Tools Guide](https://code.visualstudio.com/docs/copilot/guides/browser-agent-testing-guide) | Step-by-step browser testing tutorial |
| [Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) | Create your own agent declarations |
| [Context Compaction](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction) | Compaction documentation |
| [Fork Chat Sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_fork-a-chat-session) | Session forking docs |
| [Long-Distance NES Blog](https://code.visualstudio.com/blogs/2026/02/26/long-distance-nes) | How long-distance NES was built |
| [Terminal Sandboxing](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) | Sandbox security docs |

---

<div align="center">

*VS Code 1.110 — February 2026 · Tetris Edition 🎮*

</div>
