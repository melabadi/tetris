import React from 'react';
import { TETROMINOES, CELL_SIZE, type TetrominoType } from '../constants';

interface NextPieceProps {
  type: TetrominoType;
}

const NextPiece: React.FC<NextPieceProps> = ({ type }) => {
  const tetromino = TETROMINOES[type];
  const size = tetromino.shape.length;

  return (
    <div className="next-piece-container">
      <h3>Next</h3>
      <div
        className="next-piece"
        style={{
          width: size * CELL_SIZE,
          height: size * CELL_SIZE,
          position: 'relative',
        }}
      >
        {tetromino.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`cell ${cell ? 'filled' : 'empty'}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                backgroundColor: cell ? tetromino.color : 'transparent',
                position: 'absolute',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPiece;
