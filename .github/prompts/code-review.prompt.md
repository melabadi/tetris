---
description: "Review code changes for the Tetris project"
---

You are reviewing code for a Tetris game built with React 19, TypeScript, and Vite.

## Review Checklist

### Architecture
- [ ] Game logic is in `gameEngine.ts` with NO React imports
- [ ] React state management is in `useTetris.ts` hook only
- [ ] Components are stateless and receive data via props
- [ ] No business logic in components

### TypeScript
- [ ] No `any` types used
- [ ] Proper interfaces for all data structures
- [ ] Strict mode compliance (no implicit any, etc.)

### Code Quality
- [ ] Functions are pure where possible
- [ ] No `var` — only `const` and `let`
- [ ] Components under 100 lines
- [ ] CSS uses kebab-case class names
- [ ] Named exports for utilities, default exports for components

### Performance
- [ ] No unnecessary re-renders (check useCallback/useMemo usage)
- [ ] Game loop cleanup in useEffect return
- [ ] No memory leaks from intervals/timeouts

### Build
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
