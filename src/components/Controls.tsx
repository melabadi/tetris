import React from 'react';

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onPause,
}) => {
  return (
    <div className="controls">
      <h3>Controls</h3>
      <div className="controls-info">
        <p><kbd>←</kbd> / <kbd>A</kbd> Move Left</p>
        <p><kbd>→</kbd> / <kbd>D</kbd> Move Right</p>
        <p><kbd>↓</kbd> / <kbd>S</kbd> Soft Drop</p>
        <p><kbd>↑</kbd> / <kbd>W</kbd> Rotate</p>
        <p><kbd>Space</kbd> Hard Drop</p>
        <p><kbd>P</kbd> / <kbd>Esc</kbd> Pause</p>
      </div>
      <div className="touch-controls">
        <button onClick={onRotate} aria-label="Rotate">↻</button>
        <div className="touch-row">
          <button onClick={onMoveLeft} aria-label="Move Left">←</button>
          <button onClick={onMoveDown} aria-label="Soft Drop">↓</button>
          <button onClick={onMoveRight} aria-label="Move Right">→</button>
        </div>
        <div className="touch-row">
          <button onClick={onHardDrop} aria-label="Hard Drop" className="wide-btn">
            ⬇ Drop
          </button>
          <button onClick={onPause} aria-label="Pause" className="wide-btn">
            ⏸ Pause
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
