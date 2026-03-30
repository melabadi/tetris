---
description: "Write or improve tests for the Tetris game"
---

You are writing tests for a Tetris game built with React 19 + TypeScript + Vite.

## Testing Strategy
- Focus tests on pure game logic in `src/gameEngine.ts`
- Tests should be co-located: `src/gameEngine.test.ts`
- Use descriptive test names that explain the behavior being tested

## Key functions to test in gameEngine.ts:
1. `createBoard()` — Returns 20×10 grid of nulls
2. `createPiece(type)` — Creates piece at correct starting position
3. `isValidPosition(board, piece)` — Collision detection
4. `rotatePiece(piece)` — Clockwise rotation
5. `lockPiece(board, piece)` — Places piece colors on board
6. `clearLines(board)` — Removes full rows, returns count
7. `calculateScore(lines, level)` — Scoring formula
8. `getLevel(lines)` — Level progression
9. `getSpeed(level)` — Drop speed calculation
10. `getGhostPiece(board, piece)` — Ghost piece projection
11. `mergeBoard(board, piece)` — Board + piece composition

## Test patterns:
```typescript
import { createBoard, isValidPosition, createPiece } from './gameEngine';

describe('isValidPosition', () => {
  it('should allow piece at starting position on empty board', () => {
    const board = createBoard();
    const piece = createPiece('T');
    expect(isValidPosition(board, piece)).toBe(true);
  });
});
```

## After writing tests:
- Run tests to verify they pass
- Aim for edge cases: board boundaries, full rows, game over conditions
