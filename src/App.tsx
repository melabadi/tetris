import Board from './components/Board';
import NextPiece from './components/NextPiece';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';
import { useTetris } from './hooks/useTetris';
import { mergeBoard } from './gameEngine';
import './App.css';

function App() {
  const {
    gameState,
    startGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    togglePause,
  } = useTetris();

  const displayBoard = mergeBoard(gameState.board, gameState.currentPiece);

  return (
    <div className="app">
      <h1 className="title">TETRIS</h1>

      <div className="game-container">
        <div className="sidebar left-sidebar">
          <ScoreBoard
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
          />
        </div>

        <div className="board-wrapper">
          <Board board={displayBoard} />

          {/* Overlay messages */}
          {!gameState.currentPiece && !gameState.isGameOver && (
            <div className="overlay">
              <h2>TETRIS</h2>
              <p>Press <kbd>Enter</kbd> to Start</p>
            </div>
          )}

          {gameState.isGameOver && (
            <div className="overlay game-over">
              <h2>GAME OVER</h2>
              <p>Score: {gameState.score.toLocaleString()}</p>
              <p>Press <kbd>Enter</kbd> to Restart</p>
              <button onClick={startGame}>Play Again</button>
            </div>
          )}

          {gameState.isPaused && (
            <div className="overlay paused">
              <h2>PAUSED</h2>
              <p>Press <kbd>P</kbd> or <kbd>Esc</kbd> to Resume</p>
            </div>
          )}
        </div>

        <div className="sidebar right-sidebar">
          <NextPiece type={gameState.nextPiece} />
          <Controls
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onMoveDown={moveDown}
            onRotate={rotate}
            onHardDrop={hardDrop}
            onPause={togglePause}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
