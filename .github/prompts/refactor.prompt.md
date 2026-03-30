---
description: "Refactor or improve code quality in the Tetris project"
---

You are refactoring a Tetris game built with React 19 + TypeScript + Vite.

## Refactoring Principles
1. **Separation of concerns**: Game logic stays pure in `gameEngine.ts`, never import React there
2. **Components < 100 lines**: Split large components into smaller focused ones
3. **TypeScript strictness**: No `any` types, use proper interfaces and type guards
4. **Named exports** for utilities, **default exports** for components
5. **CSS kebab-case** class names

## Before refactoring:
- Run `npm run type-check` to see current state
- Run `npm run lint` for linting issues

## After refactoring:
- Ensure `npm run build` passes
- Ensure `npm run lint` passes
- Verify no visual regressions with `npm run dev`

## File organization:
```
src/constants.ts      → Types, constants, configuration
src/gameEngine.ts     → Pure functions only
src/hooks/useTetris.ts → Single hook for game state
src/components/*.tsx   → Stateless presentational components
```
