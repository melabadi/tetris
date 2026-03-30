import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, lines }) => {
  return (
    <div className="score-board">
      <div className="stat">
        <h3>Score</h3>
        <span>{score.toLocaleString()}</span>
      </div>
      <div className="stat">
        <h3>Level</h3>
        <span>{level}</span>
      </div>
      <div className="stat">
        <h3>Lines</h3>
        <span>{lines}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
