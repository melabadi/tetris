---
description: "Demo: Add a hold-piece feature to the Tetris game (great for showcasing /plan and agent workflows)"
---

You are adding a "hold piece" feature to a Tetris game built with React 19, TypeScript, and Vite.

## Feature Requirements
- Pressing **C** swaps the current piece with a held piece
- The held piece is displayed in a new `HoldPiece` component (similar to `NextPiece`)
- The player can only hold once per piece drop (prevent infinite swapping)
- If no piece is held yet, the current piece goes to hold and the next piece spawns
- The held piece resets its position to the top when swapped back in

## Implementation Steps
1. **`src/constants.ts`** — No changes needed
2. **`src/gameEngine.ts`** — Add a `holdPiece` function that swaps pieces and resets position
3. **`src/hooks/useTetris.ts`** — Add `heldPiece` state, `canHold` flag, and keyboard handler for "C"
4. **`src/components/HoldPiece.tsx`** — New component modeled after `NextPiece.tsx`
5. **`src/App.tsx`** — Render the `HoldPiece` component in the sidebar
6. **`src/App.css`** — Add styles for the hold piece display

## Architecture Rules
- All swap/reset logic MUST be pure functions in `gameEngine.ts`
- React state (`heldPiece`, `canHold`) managed only in `useTetris.ts`
- `HoldPiece.tsx` must be stateless — props only
