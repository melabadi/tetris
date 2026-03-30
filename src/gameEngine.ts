import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOES,
  TETROMINO_TYPES,
  POINTS_PER_LINE,
  BASE_SPEED,
  SPEED_INCREMENT,
  LINES_PER_LEVEL,
  type TetrominoType,
} from './constants';

// A cell is either null (empty) or a color string
export type Cell = string | null;
export type Board = Cell[][];

export interface Piece {
  type: TetrominoType;
  shape: number[][];
  x: number;
  y: number;
  color: string;
}

export interface GameState {
  board: Board;
  currentPiece: Piece | null;
  nextPiece: TetrominoType;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}

// Create an empty board
export function createBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

// Get a random tetromino type
export function randomTetromino(): TetrominoType {
  return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
}

// Create a piece at the top of the board
export function createPiece(type: TetrominoType): Piece {
  const tetromino = TETROMINOES[type];
  return {
    type,
    shape: tetromino.shape.map((row) => [...row]),
    x: Math.floor((BOARD_WIDTH - tetromino.shape[0].length) / 2),
    y: 0,
    color: tetromino.color,
  };
}

// Check if a piece position is valid
export function isValidPosition(board: Board, piece: Piece): boolean {
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        const newX = piece.x + col;
        const newY = piece.y + row;

        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }
  return true;
}

// Rotate a piece clockwise
export function rotatePiece(piece: Piece): Piece {
  const rows = piece.shape.length;
  const cols = piece.shape[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = piece.shape[r][c];
    }
  }

  return { ...piece, shape: rotated };
}

// Lock a piece onto the board
export function lockPiece(board: Board, piece: Piece): Board {
  const newBoard = board.map((row) => [...row]);
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        const boardY = piece.y + row;
        const boardX = piece.x + col;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  return newBoard;
}

// Clear completed lines and return new board + number of lines cleared
export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = board.filter((row) => row.some((cell) => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }

  return { board: newBoard, linesCleared };
}

// Calculate score for cleared lines
export function calculateScore(linesCleared: number, level: number): number {
  if (linesCleared === 0) return 0;
  return (POINTS_PER_LINE[linesCleared] || 0) * level;
}

// Get drop speed for current level
export function getSpeed(level: number): number {
  return Math.max(100, BASE_SPEED - (level - 1) * SPEED_INCREMENT);
}

// Calculate level from total lines cleared
export function getLevel(lines: number): number {
  return Math.floor(lines / LINES_PER_LEVEL) + 1;
}

// Get the ghost piece (preview of where piece will land)
export function getGhostPiece(board: Board, piece: Piece): Piece {
  let ghost = { ...piece };
  while (isValidPosition(board, { ...ghost, y: ghost.y + 1 })) {
    ghost = { ...ghost, y: ghost.y + 1 };
  }
  return ghost;
}

// Merge board with current piece for rendering
export function mergeBoard(
  board: Board,
  piece: Piece | null,
  showGhost: boolean = true
): Board {
  const merged = board.map((row) => [...row]);

  if (piece) {
    // Draw ghost piece
    if (showGhost) {
      const ghost = getGhostPiece(board, piece);
      for (let row = 0; row < ghost.shape.length; row++) {
        for (let col = 0; col < ghost.shape[row].length; col++) {
          if (ghost.shape[row][col]) {
            const y = ghost.y + row;
            const x = ghost.x + col;
            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH && !merged[y][x]) {
              merged[y][x] = ghost.color + '40'; // semi-transparent
            }
          }
        }
      }
    }

    // Draw current piece
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const y = piece.y + row;
          const x = piece.x + col;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            merged[y][x] = piece.color;
          }
        }
      }
    }
  }

  return merged;
}
