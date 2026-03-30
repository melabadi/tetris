---
description: "Fix a bug in the Tetris game"
---

You are debugging a Tetris game built with React 19 + TypeScript + Vite.

## Key files to check when fixing bugs:
- `src/gameEngine.ts` — Pure game logic (collision, rotation, line clearing, scoring)
- `src/hooks/useTetris.ts` — React hook (game loop, keyboard handling, state updates)
- `src/constants.ts` — Board dimensions, tetromino shapes, scoring tables
- `src/components/Board.tsx` — Rendering the game board

## Common bug categories:
1. **Collision issues** → Check `isValidPosition()` in gameEngine.ts
2. **Rotation problems** → Check `rotatePiece()` and wall kick logic in useTetris.ts
3. **Scoring bugs** → Check `calculateScore()` and `clearLines()` in gameEngine.ts
4. **Rendering glitches** → Check `mergeBoard()` in gameEngine.ts and Board.tsx
5. **Game loop timing** → Check the `useEffect` interval in useTetris.ts
6. **Keyboard not responding** → Check the keydown event handler in useTetris.ts

## After fixing:
1. Verify with `npm run type-check`
2. Verify with `npm run build`
3. Test the game manually with `npm run dev`
