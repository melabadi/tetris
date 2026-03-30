import { useState, useCallback, useEffect, useRef } from 'react';
import {
  createBoard,
  createPiece,
  randomTetromino,
  isValidPosition,
  rotatePiece,
  lockPiece,
  clearLines,
  calculateScore,
  getSpeed,
  getLevel,
  type GameState,
} from '../gameEngine';

export function useTetris() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createBoard(),
    currentPiece: null,
    nextPiece: randomTetromino(),
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  }));

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnPiece = useCallback(() => {
    setGameState((prev) => {
      const piece = createPiece(prev.nextPiece);
      if (!isValidPosition(prev.board, piece)) {
        return { ...prev, isGameOver: true, currentPiece: null };
      }
      return {
        ...prev,
        currentPiece: piece,
        nextPiece: randomTetromino(),
      };
    });
  }, []);

  const lockAndClear = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece) return prev;

      const lockedBoard = lockPiece(prev.board, prev.currentPiece);
      const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
      const newLines = prev.lines + linesCleared;
      const newLevel = getLevel(newLines);
      const newScore = prev.score + calculateScore(linesCleared, prev.level);

      // Spawn next piece
      const nextPiece = createPiece(prev.nextPiece);
      const isGameOver = !isValidPosition(clearedBoard, nextPiece);

      return {
        ...prev,
        board: clearedBoard,
        currentPiece: isGameOver ? null : nextPiece,
        nextPiece: randomTetromino(),
        score: newScore,
        level: newLevel,
        lines: newLines,
        isGameOver,
      };
    });
  }, []);

  const moveDown = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const moved = { ...prev.currentPiece, y: prev.currentPiece.y + 1 };
      if (isValidPosition(prev.board, moved)) {
        return { ...prev, currentPiece: moved };
      }
      // Can't move down - lock piece
      return prev;
    });

    // Check if we need to lock after state update
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const below = { ...prev.currentPiece, y: prev.currentPiece.y + 1 };
      if (!isValidPosition(prev.board, below)) {
        const lockedBoard = lockPiece(prev.board, prev.currentPiece);
        const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
        const newLines = prev.lines + linesCleared;
        const newLevel = getLevel(newLines);
        const newScore = prev.score + calculateScore(linesCleared, prev.level);

        const nextPiece = createPiece(prev.nextPiece);
        const isGameOver = !isValidPosition(clearedBoard, nextPiece);

        return {
          ...prev,
          board: clearedBoard,
          currentPiece: isGameOver ? null : nextPiece,
          nextPiece: randomTetromino(),
          score: newScore,
          level: newLevel,
          lines: newLines,
          isGameOver,
        };
      }
      return prev;
    });
  }, []);

  const moveLeft = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      const moved = { ...prev.currentPiece, x: prev.currentPiece.x - 1 };
      if (isValidPosition(prev.board, moved)) {
        return { ...prev, currentPiece: moved };
      }
      return prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      const moved = { ...prev.currentPiece, x: prev.currentPiece.x + 1 };
      if (isValidPosition(prev.board, moved)) {
        return { ...prev, currentPiece: moved };
      }
      return prev;
    });
  }, []);

  const rotate = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      const rotated = rotatePiece(prev.currentPiece);

      // Try basic rotation
      if (isValidPosition(prev.board, rotated)) {
        return { ...prev, currentPiece: rotated };
      }

      // Wall kick: try shifting left/right
      for (const offset of [-1, 1, -2, 2]) {
        const kicked = { ...rotated, x: rotated.x + offset };
        if (isValidPosition(prev.board, kicked)) {
          return { ...prev, currentPiece: kicked };
        }
      }

      return prev;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      let dropped = { ...prev.currentPiece };
      let dropDistance = 0;
      while (isValidPosition(prev.board, { ...dropped, y: dropped.y + 1 })) {
        dropped = { ...dropped, y: dropped.y + 1 };
        dropDistance++;
      }

      const lockedBoard = lockPiece(prev.board, dropped);
      const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
      const newLines = prev.lines + linesCleared;
      const newLevel = getLevel(newLines);
      const newScore =
        prev.score + calculateScore(linesCleared, prev.level) + dropDistance * 2;

      const nextPiece = createPiece(prev.nextPiece);
      const isGameOver = !isValidPosition(clearedBoard, nextPiece);

      return {
        ...prev,
        board: clearedBoard,
        currentPiece: isGameOver ? null : nextPiece,
        nextPiece: randomTetromino(),
        score: newScore,
        level: newLevel,
        lines: newLines,
        isGameOver,
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver) return prev;
      return { ...prev, isPaused: !prev.isPaused };
    });
  }, []);

  const startGame = useCallback(() => {
    const board = createBoard();
    const nextType = randomTetromino();
    const firstPiece = createPiece(randomTetromino());

    setGameState({
      board,
      currentPiece: firstPiece,
      nextPiece: nextType,
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      isPaused: false,
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.currentPiece) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const speed = getSpeed(gameState.level);
    gameLoopRef.current = setInterval(moveDown, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameState.level, gameState.currentPiece, moveDown]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isGameOver && e.key !== 'Enter') return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'Escape':
          e.preventDefault();
          togglePause();
          break;
        case 'Enter':
          e.preventDefault();
          if (gameState.isGameOver || !gameState.currentPiece) {
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isGameOver, gameState.currentPiece, moveLeft, moveRight, moveDown, rotate, hardDrop, togglePause, startGame]);

  return {
    gameState,
    startGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    togglePause,
    spawnPiece,
    lockAndClear,
  };
}
