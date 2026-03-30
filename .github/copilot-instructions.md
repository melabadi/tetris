# Copilot Instructions for tetris-mlabadi

## Project Overview
This is a Tetris game built with React 19, TypeScript, and Vite. The game runs entirely in the browser with no backend.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Linting**: ESLint 9 with TypeScript support
- **Styling**: Plain CSS (no CSS framework)

## Project Structure
```
src/
├── constants.ts          # Game constants, tetromino definitions, board dimensions
├── gameEngine.ts         # Pure game logic functions (no React dependencies)
├── hooks/
│   └── useTetris.ts      # React hook managing game state and controls
├── components/
│   ├── Board.tsx          # Game board renderer
│   ├── NextPiece.tsx      # Next piece preview
│   ├── ScoreBoard.tsx     # Score, level, lines display
│   └── Controls.tsx       # Control hints and touch buttons
├── App.tsx                # Main app component
├── App.css                # Game styles
├── index.css              # Global/reset styles
└── main.tsx               # Entry point
```

## Coding Conventions
- Use functional components with hooks (no class components)
- Game logic should be pure functions in `gameEngine.ts` — keep React out of the engine
- Use TypeScript strict mode; avoid `any` types
- Prefer `const` over `let`; never use `var`
- Use named exports for utilities, default exports for components
- CSS class names use kebab-case
- Keep components small and focused (< 100 lines ideal)

## Testing
- Game logic in `gameEngine.ts` is designed to be easily unit-testable
- Test files should be co-located with source as `*.test.ts` or `*.test.tsx`

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Type-check and build for production
- `npm run lint` — Run ESLint
- `npm run type-check` — TypeScript type checking only
- `npm run preview` — Preview production build locally
