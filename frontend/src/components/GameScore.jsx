import { useState } from 'react';

const GameScore = () => {
  const [homeQuarterScore, sethomeQuarterScore] = useState([7, 16, 22, 29]);
  const [awayQuarterScore, setawayQuarterScore] = useState([7, 14, 21, 28]);
  const [homeCurrentScore, setHomeCurrentScore] = useState(22);
  const [awayCurrentScore, setawayCurrentScore] = useState(21);
  const [homeTeam, setHomeTeam] = useState('Texas');
  const [awayTeam, setAwayTeam] = useState('Alabama');

  return (
    <div className="flex justify-center mb-5 -mt-5 w-full bg-white p-5 drop-shadow">
      <div className="flex justify-center">
        <div className="m-2 text-3xl">
          {homeTeam} - {homeCurrentScore}
        </div>
        <div className="grid rows-3 grid-cols-5 text-xs">
          <div />
          {/* Quarters */}
          <div className="text-center font-semibold">1</div>
          <div className="text-center font-semibold">2</div>
          <div className="text-center font-semibold">3</div>
          <div className="text-center font-semibold">4</div>

          {/* HOME TEAM */}
          <div className="text-end font-semibold">{homeTeam}</div>
          {/* HOME TEAM SCORES */}
          {homeQuarterScore.map((score) => (
            <div className="text-center">{score}</div>
          ))}
          {/* AWAY TEAM */}
          <div className="text-end font-semibold">{awayTeam}</div>
          {/* AWAY TEAM SCORES */}
          {awayQuarterScore.map((score) => (
            <div className="text-center">{score}</div>
          ))}
        </div>
        <div className="m-2 text-3xl">
          {awayCurrentScore} - {awayTeam}
        </div>
      </div>
    </div>
  );
};

export default GameScore;
