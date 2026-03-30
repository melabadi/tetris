---
description: "Add a new game feature to the Tetris game"
---

You are working on a Tetris game built with React 19, TypeScript, and Vite.

## Architecture Rules
1. All game logic MUST go in `src/gameEngine.ts` as pure functions — no React imports there
2. React state management lives in `src/hooks/useTetris.ts`
3. UI components are in `src/components/` and should be stateless (receive props from App)
4. The game board is a 10×20 grid defined in `src/constants.ts`

## When adding a new feature:
1. First implement the pure logic in `gameEngine.ts`
2. Wire it into the `useTetris` hook
3. Create or update components as needed
4. Add CSS to `App.css`
5. Ensure `npm run build` passes with no type errors

## Tetromino types: I, O, T, S, Z, J, L
## Board: 10 columns × 20 rows
## Scoring: 100/300/500/800 points for 1/2/3/4 lines × level multiplier!
