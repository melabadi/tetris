<div align="center">

# 🎮 Aide-mémoire VS Code Copilot — Édition Tetris

**Janvier–Mars 2026 (1.109 – 1.111) · Développement multi-agent**

[![1.109 Notes de version](https://img.shields.io/badge/1.109-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_109)
[![1.110 Notes de version](https://img.shields.io/badge/1.110-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_110)
[![1.111 Notes de version](https://img.shields.io/badge/1.111-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/updates/v1_111)
[![Agent Sessions Day](https://img.shields.io/badge/Regarder-Agent_Sessions_Day-red?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/live/tAezuMSJuFs)

</div>

> **Projet :** Jeu Tetris en React 19 + TypeScript + Vite · `gameEngine.ts` (logique pure) · `useTetris.ts` (hook) · 4 composants · 7 tétrominos

---

## 🔎 1 · Général

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Fenêtre de contexte](https://code.visualstudio.com/updates/v1_109#_context-window-details)** | Affiche la répartition des tokens dans l'entrée du chat | Intégré | Joignez `gameEngine.ts` + `useTetris.ts` + `constants.ts` au chat, survolez la barre en bas |
| **[Mémoire Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory)** | Retient vos préférences d'une session à l'autre | `github.copilot.chat.copilotMemory.enabled` | _« Retiens : la logique du jeu doit être des fonctions pures dans gameEngine.ts, ne jamais y importer React »_ puis dans une nouvelle session : _« Quelles sont mes conventions de code ? »_ |

> **Gérer les mémoires →** [github.com/settings/copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory)

---

## 📐 2 · Planification

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Agent Plan](https://code.visualstudio.com/docs/copilot/chat/chat-planning)** | Flux en 4 phases : Découverte → Alignement → Conception → Raffinement | Intégré | `/plan Ajouter une fonctionnalité de pièce en réserve permettant d'échanger le tétromino actuel` |
| **[Poser des questions](https://code.visualstudio.com/updates/v1_109#_ask-questions-tool)** | L'agent pose des questions à choix multiples au lieu de deviner | `chat.askQuestions.enabled` | _« Ajouter un système de scoring combo au jeu Tetris »_ — observez-le poser des questions sur la fenêtre de combo, les multiplicateurs et le retour visuel |
| **[Diagrammes Mermaid](https://code.visualstudio.com/updates/v1_109#_mermaid-diagrams)** | Affiche des diagrammes interactifs directement dans le chat | Intégré | _« Dessine un diagramme d'états pour la boucle de jeu Tetris : inactif → en jeu → en pause → game over »_ |
| **[Modèle par étape](https://code.visualstudio.com/updates/v1_109#_specific-model-for-implementation)** | Modèles différents pour la planification et l'implémentation | `github.copilot.chat.implementAgent.model` | Définir à `"Claude Sonnet 4.5 (copilot)"` dans les Paramètres |

---

## 🤖 3 · Sessions Agent

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Page d'accueil](https://code.visualstudio.com/updates/v1_109#_agent-sessions-welcome-page)** | Affiche les sessions agent récentes au démarrage | `workbench.startupEditor` → `agentSessionsWelcomePage` | Fermez et rouvrez VS Code |
| **[Sous-agent de recherche](https://code.visualstudio.com/updates/v1_109#_search-subagent)** | Recherche dans le code avec sa propre fenêtre de contexte | `github.copilot.chat.searchSubagent.enabled` | _« Trouve chaque endroit où on appelle isValidPosition ou vérifie les collisions »_ |
| **[Indicateur d'état](https://code.visualstudio.com/updates/v1_109#_agent-status-indicator)** | Badge dans le centre de commandes : En cours · Non lu · Entrée requise | `chat.agentsControl.enabled` | Lancez une tâche agent, vérifiez le badge en haut |
| **[Gestion des sessions](https://code.visualstudio.com/updates/v1_109#_agent-session-management)** | Sessions locales / en arrière-plan / cloud, basculer entre elles | Intégré | Démarrez une session locale → déléguez en arrière-plan ou dans le cloud |
| **[Compactage manuel](https://code.visualstudio.com/updates/v1_110#_context-compaction)** | Résume la conversation pour libérer de l'espace de contexte ; ciblez ce qui compte | Intégré | `/compact se concentrer sur les modifications du système de score` ou cliquez sur la fenêtre de contexte → _Compacter la conversation_ |
| **[Bifurquer une session](https://code.visualstudio.com/updates/v1_110#_fork-a-chat-session)** | Créez une branche de conversation pour explorer des alternatives sans perdre l'original | Intégré | `/fork` pour une bifurcation complète, ou survolez une requête → _Fork Conversation_ pour une partielle |

### Démo : Bifurquer et explorer des alternatives

```
1. Démarrez une session : « Ajouter une pièce fantôme montrant où le tétromino va atterrir »
2. L'agent l'implémente dans gameEngine.ts
3. Survolez la requête d'implémentation → cliquez sur Fork Conversation
4. Dans la bifurcation : « En fait, implémente la pièce fantôme avec l'opacité CSS »
5. Comparez les deux approches — la session originale reste intacte
```

---

## ☁️ 4 · Délégation en arrière-plan et dans le cloud

Déléguez les tâches longues pour continuer à coder localement.

| Type de session | Où elle s'exécute | Idéal pour | Comment démarrer |
|:----------------|:-----------------|:-----------|:-----------------|
| **Locale** | Votre machine, VS Code ouvert | Modifications rapides, débogage | Par défaut — chattez simplement |
| **Arrière-plan** | Votre machine, VS Code peut être fermé | Builds, suites de tests, refactors | Cliquez **⋯** sur une session → **Continuer en arrière-plan** |

### Démo : Déléguer une fonctionnalité en arrière-plan

1. Démarrez une session locale : _« Ajouter une fonctionnalité de pièce en réserve — le joueur appuie sur C pour échanger le tétromino actuel avec la pièce en réserve »_
2. Pendant que l'agent planifie, cliquez **⋯** → **Continuer en arrière-plan**
3. Fermez le panneau de chat — l'agent continue de travailler
4. Le badge d'état indique la progression ; cliquez dessus pour reprendre une fois terminé

> **Astuce :** Les sessions cloud respectent `.github/copilot-instructions.md` — vos règles d'architecture Tetris (logique pure dans `gameEngine.ts`, état dans `useTetris.ts`) sont appliquées automatiquement.

---

## 🪝 5 · Hooks Agent

### Les hooks de ce dépôt

Ce projet dispose d'une suite complète de hooks dans `.github/hooks/hooks.json` qui se déclenche à chaque action de l'agent :

```json
{
  "hooks": {
    "sessionStart":          [{ "powershell": ".github/hooks/scripts/session-start.ps1" }],
    "sessionEnd":            [{ "powershell": ".github/hooks/scripts/session-end.ps1" }],
    "userPromptSubmitted":   [{ "powershell": ".github/hooks/scripts/log-prompt.ps1" }],
    "preToolUse":            [
      { "powershell": ".github/hooks/scripts/security-check.ps1", "comment": "Bloquer les commandes dangereuses" },
      { "powershell": ".github/hooks/scripts/audit-tool-use.ps1", "comment": "Auditer toutes les invocations d'outils" }
    ],
    "postToolUse":           [{ "powershell": ".github/hooks/scripts/post-tool-stats.ps1" }],
    "errorOccurred":         [{ "powershell": ".github/hooks/scripts/log-error.ps1" }]
  }
}
```

> **Essayez :** Demandez à l'agent de modifier `Board.tsx` — observez le terminal afficher la vérification de sécurité et le journal d'audit se déclencher automatiquement.

### Ajouter un hook de lint après chaque modification

Vous voulez linter automatiquement après chaque modification de fichier ? Ajoutez ceci au tableau `postToolUse` :

```json
{
  "type": "command",
  "bash": "npx eslint --no-warn-ignored ${TOOL_ARGS_FILE_PATH} || true",
  "powershell": "npx eslint --no-warn-ignored $env:TOOL_ARGS_FILE_PATH; exit 0",
  "timeoutSec": 30
}
```

---

## 🧩 6 · Skills et Prompts (Commandes slash)

VS Code rend les [Agent Skills disponibles de manière générale](https://code.visualstudio.com/updates/v1_109#_agent-skills-are-generally-available) et permet de les [invoquer en commandes slash](https://code.visualstudio.com/updates/v1_109#_use-skills-as-slash-commands) directement dans le chat, aux côtés des fichiers de prompts. Tapez `/` pour voir toutes les commandes disponibles.

### Agent Skills — _GA dans 1.109_

Les skills encapsulent l'expertise métier dans des fichiers `SKILL.md` réutilisables. L'agent les charge automatiquement quand c'est pertinent, ou vous les invoquez manuellement avec `/nom-du-skill`.

| Skill | Ce qu'il encode |
|:------|:----------------|
| `/new-game-mechanic` | Pipeline d'implémentation en 6 étapes : constantes → moteur → hook → composants → CSS → validation |
| `/test-and-validate` | Stratégie de test pour les 8 fonctions de `gameEngine.ts` + cas limites |
| `/game-architect` | Analyse architecturale approfondie, revue de séparation des responsabilités |
| `/optimize-performance` | Rendu React, boucle de jeu, mémoïsation, performance CSS |
| `/design-theme` | Thèmes visuels, animations, palettes de couleurs des tétrominos |

Contrôlez la visibilité avec le frontmatter :
- `user-invokable: false` — masqué du menu `/`, mais le modèle peut toujours le charger automatiquement
- `disable-model-invocation: true` — visible dans le menu `/`, mais empêche le chargement automatique

> **Essayez :** `/new-game-mechanic Implémenter les wall kicks avec les tables d'offset SRS`

### Prompts en commandes slash

Les fichiers de prompts dans `.github/prompts/` apparaissent aussi comme commandes `/` :

| Prompt | Ce qu'il fait |
|:-------|:-------------|
| `/add-feature` | Guide l'ajout d'une nouvelle fonctionnalité Tetris en suivant les règles d'architecture |
| `/fix-bug` | Débogage structuré avec checklist par catégorie de fichier |
| `/refactor` | Refactoring avec application de la séparation des responsabilités |
| `/write-tests` | Génération de tests ciblant toutes les fonctions de `gameEngine.ts` |
| `/code-review` | Revue d'architecture, TypeScript, qualité et performance |
| `/demo-hold-piece` | 🎯 Démo : fonctionnalité pièce en réserve de bout en bout |
| `/demo-high-scores` | 🎯 Démo : meilleurs scores avec localStorage |

### Comment ils fonctionnent ensemble

```
┌─────────────────────────────────────────────────────────────┐
│  Tapez / dans le chat pour voir toutes les commandes         │
│                                                             │
│  ┌──────────────────────────────────────────┐                │
│  │  /new-game-mechanic  /test-and-validate  │  Skills        │
│  │  /game-architect     /optimize-perf      │  (chargement   │
│  │  /design-theme                           │  auto ou       │
│  └──────────────────────────────────────────┘  manuel)       │
│                                                             │
│  ┌──────────────────────────────────────────┐                │
│  │  /add-feature   /write-tests   /fix-bug  │  Fichiers      │
│  │  /refactor      /code-review             │  de prompts    │
│  │  /demo-hold-piece  /demo-high-scores     │  (manuel       │
│  └──────────────────────────────────────────┘  uniquement)   │
└─────────────────────────────────────────────────────────────┘
```

### Démo : Flux Skills + Prompts

```
1. /new-game-mechanic Ajouter une pièce fantôme montrant où le tétromino va atterrir
   → Le skill fournit le pipeline d'implémentation en 6 étapes

2. /code-review Examiner l'implémentation de la pièce fantôme
   → Le prompt vérifie l'architecture, les types et la performance

3. /write-tests Écrire des tests pour getGhostPiece() couvrant les cas limites
   → Le prompt génère des tests ciblés

4. /optimize-performance Vérifier le rendu de la pièce fantôme pour les re-rendus inutiles
   → Le skill se concentre sur la performance React
```

---

## 🔌 7 · Extensibilité de l'agent

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Plugins Agent](https://code.visualstudio.com/updates/v1_110#_agent-plugins-experimental)** | Bundles installables de skills, outils, hooks, serveurs MCP | `chat.plugins.enabled` | `@agentPlugins` dans la vue Extensions, ou Palette de commandes → _Chat: Plugins_ |
| **[Outils navigateur agentiques](https://code.visualstudio.com/updates/v1_110#_agentic-browser-tools-experimental)** | L'agent pilote le navigateur intégré : naviguer, cliquer, capturer, lire | `workbench.browser.enableChatTools` | _« Ouvre mon jeu Tetris sur localhost:5173 et vérifie que le plateau s'affiche correctement »_ |

### Démo : Plugins Agent

1. Ouvrez la vue Extensions → recherchez `@agentPlugins`
2. Parcourez les bundles de plugins disponibles (skills, outils, hooks dans un seul paquet)
3. Installez un plugin — ses skills et outils apparaissent automatiquement dans le chat
4. Configurez des sources additionnelles via `chat.plugins.marketplaces`

### Démo : Outils navigateur agentiques

1. Activez `workbench.browser.enableChatTools` dans les Paramètres
2. Lancez `npm run dev` pour démarrer le serveur de développement Tetris
3. Demandez à l'agent : _« Ouvre localhost:5173 dans le navigateur, fais une capture d'écran et vérifie si le plateau affiche une grille 10×20 »_
4. Observez l'agent utiliser `openBrowserPage`, `screenshotPage` et `readPage` pour vérifier votre application

---

## 🔧 8 · Débogage et contrôles de l'agent

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Panneau de débogage Agent](https://code.visualstudio.com/updates/v1_110#_agent-debug-panel-preview)** | Vue en temps réel des événements du chat, appels d'outils, personnalisations chargées | Intégré (Préversion) | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ pendant une conversation |
| **[Yolo — Approbation auto](https://code.visualstudio.com/updates/v1_110#_slash-commands-for-enabling-auto-approval)** | Active/désactive l'approbation automatique globale depuis le chat | Intégré | Tapez `/yolo` dans le chat pour activer, `/disableYolo` pour désactiver |
| **[Instantané d'événements de débogage](https://code.visualstudio.com/updates/v1_111#_debug-events-snapshot)** | Joignez les événements de débogage agent au contexte du chat pour le dépannage | Intégré | Tapez `#debugEventsSnapshot` dans le chat → demandez _« Pourquoi mon skill ne s'est pas chargé ? »_ |

### Démo : Déboguer et analyser le comportement de l'agent

1. Ouvrez le panneau de débogage Agent (`Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_)
2. Envoyez un message dans le chat — observez les événements en temps réel
3. Cliquez sur l'icône étincelle dans le panneau pour joindre l'instantané au chat
4. Demandez : _« Quels skills ont été chargés ? Combien de tokens le dernier appel d'outil a-t-il consommé ? »_
5. L'agent analyse les événements de débogage et explique ce qui s'est passé

---

## 💬 9 · Expérience de chat

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Phrases de réflexion personnalisées](https://code.visualstudio.com/updates/v1_110#_custom-thinking-phrases)** | Personnalisez le texte de chargement pendant le raisonnement / les appels d'outils | `chat.agent.thinking.phrases` | Voir les paramètres rapides ci-dessous pour un exemple thématique Tetris |
| **[Attribution co-auteur IA](https://code.visualstudio.com/updates/v1_110#_ai-co-author-attribution-for-commits)** | Ajoute automatiquement le trailer `Co-authored-by:` pour le code généré par IA | `git.addAICoAuthor` | Définir à `"chatAndAgent"` → commitez après une modification de l'agent → vérifiez git log |

### Phrases de réflexion thématique Tetris

```json
"chat.agent.thinking.phrases": {
  "mode": "replace",
  "phrases": [
    "Rotation des tétrominos...",
    "Suppression des lignes...",
    "Vérification des T-spins...",
    "Calcul de la distance de chute..."
  ]
}
```

---

## 💬 10 · Redirection de messages et file d'attente

Envoyez des messages de suivi pendant que l'agent travaille encore — [docs](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running).

| Action | Quand l'utiliser | Ce qui se passe |
|:-------|:----------------|:----------------|
| **File d'attente** | _« Ajoute aussi le support tactile pour la pièce en réserve quand tu auras fini »_ | Attend, envoie après la réponse en cours |
| **Rediriger** | _« En fait, mets la logique de la pièce en réserve dans gameEngine.ts d'abord »_ | Interrompt l'outil en cours, traite votre message |
| **Arrêter et envoyer** | _« Oublie la pièce en réserve, ajoute un power-up d'accélération plutôt »_ | Annule complètement la requête en cours |

**Paramètres :** `chat.requestQueuing.enabled` · `chat.requestQueuing.defaultAction` → `"steer"`

> **Essayez :** Demandez à l'agent de refactorer tous les composants. Pendant qu'il travaille, envoyez _« Commence par Board.tsx d'abord »_ → choisissez **Rediriger**.

---

## 🚀 11 · Autopilot (Préversion)

Le niveau d'autonomie le plus élevé de l'agent — il planifie, implémente, exécute les outils, répond à ses propres questions et itère jusqu'à ce que la tâche soit terminée. Aucune demande d'approbation, aucune assistance requise.

| Fonctionnalité | Ce qu'elle fait | Paramètre | Essayez ceci |
|----------------|----------------|-----------|--------------|
| **[Autopilot](https://code.visualstudio.com/updates/v1_111#_autopilot-preview)** | L'agent travaille de manière entièrement autonome — approuve auto les outils, répond auto aux questions, itère jusqu'à `task_complete` | `chat.autopilot.enabled` | Définissez la permission sur _Autopilot_ → _« Ajouter une fonctionnalité de pièce en réserve avec le raccourci clavier C »_ → partez tranquille |
| **[Sélecteur de permissions](https://code.visualstudio.com/updates/v1_111#_autopilot-and-agent-permissions)** | Choisissez le niveau d'autonomie de l'agent par session : Approbations par défaut / Contourner les approbations / Autopilot | Intégré | Cliquez sur le sélecteur de permissions dans la vue Chat → basculez entre les niveaux en cours de session |

### Niveaux de permission

| Niveau | Ce qui se passe | Idéal pour |
|:-------|:---------------|:-----------|
| **Approbations par défaut** | Les outils affichent des dialogues de confirmation avant exécution | Travail minutieux, étape par étape |
| **Contourner les approbations** | Tous les outils approuvés automatiquement ; relance auto en cas d'erreur | Tâches multi-étapes de confiance |
| **Autopilot** (Préversion) | Autonomie totale : approbation auto, réponse auto, itération jusqu'à terminaison | Grosses fonctionnalités, implémentation de bout en bout |

> **⚠️ Attention :** Contourner les approbations et Autopilot ignorent les messages d'approbation manuelle, y compris pour les actions destructives. Un dialogue d'avertissement confirme votre choix la première fois. Envisagez d'utiliser le [sandboxing du terminal](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) pour une protection supplémentaire.

### Démo : Autopilot de bout en bout

1. Activez `chat.autopilot.enabled` dans les Paramètres
2. Réglez le sélecteur de permissions sur **Autopilot**
3. Prompt : _« Ajouter une pièce fantôme montrant où le tétromino va atterrir. Mettre à jour gameEngine.ts avec une fonction getGhostPosition, ajouter le rendu fantôme dans Board.tsx et le styler avec 30% d'opacité dans App.css »_
4. Observez l'agent planifier, implémenter dans plusieurs fichiers, exécuter lint/type-check et appeler `task_complete` — aucune approbation nécessaire
5. Examinez le diff et testez

---

## ⚙️ Paramètres rapides à copier

Collez dans `settings.json` pour tout activer d'un coup :

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
      "Rotation des tétrominos...",
      "Suppression des lignes...",
      "Vérification des T-spins...",
      "Calcul de la distance de chute..."
    ]
  },
  "git.addAICoAuthor": "chatAndAgent",
  "chat.autopilot.enabled": true
}
```

---

## ⌨️ Raccourcis

| Action | Raccourci |
|:-------|:---------|
| Agent Plan | `/plan` dans le chat |
| Compacter le contexte | `/compact` dans le chat |
| Bifurquer la session | `/fork` dans le chat |
| Approbation auto | `/yolo` dans le chat |
| Désactiver l'approbation auto | `/disableYolo` dans le chat |
| Panneau de débogage Agent | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| Instantané d'événements | `#debugEventsSnapshot` dans le chat |
| Nouveau chat local | `Ctrl+Shift+N` |
| Paramètres | `Ctrl+,` |
| Palette de commandes | `Ctrl+Shift+P` |

---

## 🎯 Déroulement de la démo

| # | Fonctionnalité | Ce qu'il faut montrer | Prompt |
|:-:|:---------------|:---------------------|:-------|
| 1 | Fenêtre de contexte | Joignez `gameEngine.ts` + `useTetris.ts`, survolez la barre de tokens | — |
| 2 | Mémoire | Enregistrez une convention, rappelez-la dans une nouvelle session | _« Retiens : la logique du jeu reste pure dans gameEngine.ts »_ |
| 3 | `/plan` | Parcourez le flux de planification en 4 phases | `/plan Ajouter une fonctionnalité de pièce en réserve` |
| 4 | Poser des questions | Montrez l'agent posant des questions de clarification | _« Ajouter un système de scoring combo »_ |
| 5 | Mermaid | Affichez un diagramme d'états du jeu en ligne | _« Dessine un diagramme d'états pour la boucle de jeu Tetris »_ |
| 6 | Skills et Prompts | Invoquez un skill ou prompt en commande slash | `/new-game-mechanic Ajouter une pièce fantôme` puis `/code-review Examinez-la` |
| 7 | Hooks Agent | Modifiez un fichier, observez le contrôle de sécurité et l'audit se déclencher | _« Renommer BOARD_WIDTH en COLUMNS dans constants.ts »_ |
| 8 | Agent en arrière-plan | Déléguez une tâche en arrière-plan | _« Ajouter les meilleurs scores avec localStorage »_ → ⋯ → Arrière-plan |
| 9 | Agent Cloud | Montrez Copilot Coding Agent sur une Issue GitHub | Assignez Copilot à une issue |
| 10 | Plugins Agent | Parcourez et installez des bundles de plugins | `@agentPlugins` dans la vue Extensions |
| 11 | Outils navigateur | L'agent navigue vers Tetris, capture, vérifie la grille | _« Ouvre localhost:5173, capture le jeu, vérifie la grille 10×20 »_ |
| 12 | Débogage Agent | Ouvrez le panneau, montrez les événements en temps réel | `Ctrl+Shift+P` → _Developer: Open Agent Debug Panel_ |
| 13 | Yolo | Activez/désactivez l'approbation auto depuis le chat | `/yolo` puis `/disableYolo` |
| 14 | Compactage manuel | Compactez une longue conversation avec un sujet ciblé | `/compact se concentrer sur les modifications du système de score` |
| 15 | Bifurcation | Créez une branche de conversation pour essayer des alternatives | Survolez une requête → _Fork Conversation_ |
| 16 | Co-auteur IA | Commitez après une modification de l'agent, vérifiez git log | _« git log --format=fuller -1 »_ |
| 17 | Phrases personnalisées | Montrez le texte de chargement thématique Tetris | Appliquez les paramètres rapides → chattez |
| 18 | Redirection | Redirigez l'agent en cours de tâche | Démarrez un refactor → redirigez vers _« Commence par Board.tsx »_ |
| 19 | Autopilot | Implémentation entièrement autonome, sans approbation | Réglez sur Autopilot → _« Ajouter pièce fantôme avec moteur, plateau et CSS »_ |

---

## 📁 Référence rapide du projet

```
src/
├── constants.ts          # 7 tétrominos, plateau 10×20, tables de scores
├── gameEngine.ts         # Fonctions pures : collision, rotation, suppression de lignes
├── hooks/useTetris.ts    # État du jeu, gestion clavier, boucle de jeu
├── components/
│   ├── Board.tsx          # Rendu de la grille 10×20
│   ├── NextPiece.tsx      # Aperçu de la prochaine pièce
│   ├── ScoreBoard.tsx     # Affichage score / niveau / lignes
│   └── Controls.tsx       # Indications clavier + boutons tactiles
├── App.tsx                # Orchestre les composants + overlays
└── App.css                # Tous les styles du jeu

.github/
├── copilot-instructions.md   # Règles d'architecture pour les agents IA
├── prompts/                   # 7 prompts en commandes slash
├── skills/                    # 5 skills agent réutilisables (SKILL.md)
├── hooks/hooks.json           # 6 hooks du cycle de vie agent
└── workflows/                 # CI + déploiement GitHub Pages
```

---

## 📚 Ressources

| Lien | Description |
|:-----|:-----------|
| [Notes de version VS Code 1.109](https://code.visualstudio.com/updates/v1_109) | Janvier 2026 — Sessions agent, hooks, skills, planification |
| [Notes de version VS Code 1.110](https://code.visualstudio.com/updates/v1_110) | Février 2026 — Plugins, outils navigateur, compactage, bifurcations |
| [Notes de version VS Code 1.111](https://code.visualstudio.com/updates/v1_111) | Mars 2026 — Autopilot, hooks scopés aux agents, versions hebdomadaires |
| [Agent Sessions Day](https://youtube.com/live/tAezuMSJuFs) | Enregistrement YouTube — 19 février 2026 |
| [Mémoire Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory) | Documentation mémoire sur GitHub |
| [Agent Plan](https://code.visualstudio.com/docs/copilot/chat/chat-planning) | Documentation du flux de planification |
| [Redirection de messages](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_send-messages-while-a-request-is-running) | Documentation file d'attente et redirection |
| [Hooks Agent](https://code.visualstudio.com/updates/v1_109#_agent-hooks) | Référence de configuration des hooks |
| [Plugins Agent](https://code.visualstudio.com/docs/copilot/customization/agent-plugins) | Documentation des plugins |
| [Outils navigateur agentiques](https://code.visualstudio.com/docs/copilot/guides/browser-agent-testing-guide) | Tutoriel de test navigateur |
| [Compactage du contexte](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction) | Documentation compactage |
| [Bifurquer les sessions de chat](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_fork-a-chat-session) | Documentation bifurcation de session |
| [Autopilot et permissions](https://code.visualstudio.com/docs/copilot/agents/agent-tools#permission-levels) | Documentation niveaux de permission |
| [Sandboxing du terminal](https://code.visualstudio.com/docs/copilot/agents/agent-tools#_sandbox-terminal-commands-experimental) | Sandbox pour utilisation sécurisée d'Autopilot |
| [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent) | Documentation agent cloud |
| [Sessions en arrière-plan](https://code.visualstudio.com/docs/copilot/chat/chat-sessions) | Documentation gestion des sessions |

---

<div align="center">

*VS Code 1.109–1.111 · Janvier–Mars 2026 · Édition Tetris 🎮*

</div>
