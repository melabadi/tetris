---
description: "Demo: Add localStorage high-score persistence (great for showcasing cloud/background agent delegation)"
---

You are adding high-score persistence to a Tetris game built with React 19, TypeScript, and Vite.

## Feature Requirements
- Save the top 10 high scores to `localStorage`
- Display a high-score list on the game-over screen
- Each entry stores: score, level, lines cleared, and date
- Highlight the current score if it made the leaderboard
- Add a "Clear Scores" button

## Implementation Steps
1. **`src/gameEngine.ts`** — Add types and pure functions:
   - `HighScoreEntry` type: `{ score, level, lines, date }`
   - `isHighScore(scores, newScore)` — checks if score qualifies
   - `insertHighScore(scores, entry)` — returns sorted top 10
2. **`src/hooks/useTetris.ts`** — Load/save scores via `localStorage`, expose `highScores` state
3. **`src/components/HighScores.tsx`** — New component to render the leaderboard
4. **`src/App.tsx`** — Show `HighScores` on game-over overlay
5. **`src/App.css`** — Style the leaderboard table

## Architecture Rules
- Score logic (sorting, filtering, validation) in `gameEngine.ts` as pure functions
- `localStorage` access only in `useTetris.ts` hook
- `HighScores.tsx` is a stateless presentational component
