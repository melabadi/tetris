import React from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from '../constants';
import type { Board as BoardType } from '../gameEngine';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div
      className="board"
      style={{
        width: BOARD_WIDTH * CELL_SIZE,
        height: BOARD_HEIGHT * CELL_SIZE,
      }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`cell ${cell ? 'filled' : 'empty'}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              backgroundColor: cell || 'transparent',
            }}
          />
        ))
      )}
    </div>
  );
};

export default Board;
