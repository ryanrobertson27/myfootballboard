import { useState } from "react";

const GameScore = ({ board }) => {
  const [homeQuarterScore, sethomeQuarterScore] = useState([0, 0, 0, 0]);
  const [awayQuarterScore, setawayQuarterScore] = useState([0, 0, 0, 0]);
  const [homeCurrentScore, setHomeCurrentScore] = useState(22);
  const [awayCurrentScore, setawayCurrentScore] = useState(21);

  // I want to pull data from game associated with board.  If not start, display generic info
  return (
    <div className="mb-5  flex w-full items-center justify-center bg-white p-5 drop-shadow">
      <div className="mb-3 flex justify-center">
        <div className="m-2 text-3xl">
          {board.homeTeam} - {homeCurrentScore}
        </div>
        <div className="rows-3 grid grid-cols-5 text-xs">
          <div />
          {/* Quarters */}
          <div className="text-center font-semibold">1</div>
          <div className="text-center font-semibold">2</div>
          <div className="text-center font-semibold">3</div>
          <div className="text-center font-semibold">4</div>

          {/* HOME TEAM */}
          <div className="text-end font-semibold">{board.homeTeam}</div>
          {/* HOME TEAM SCORES */}
          {homeQuarterScore.map((score) => (
            <div className="text-center">{score}</div>
          ))}
          {/* AWAY TEAM */}
          <div className="text-end font-semibold">{board.awayTeam}</div>
          {/* AWAY TEAM SCORES */}
          {awayQuarterScore.map((score) => (
            <div className="text-center">{score}</div>
          ))}
        </div>
        <div className="m-2 text-3xl">
          {awayCurrentScore} - {board.awayTeam}
        </div>
      </div>
    </div>
  );
};

export default GameScore;
