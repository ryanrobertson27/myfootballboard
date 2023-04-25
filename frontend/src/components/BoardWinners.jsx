import { useEffect } from "react";
import { useGetTotalQuarterScores } from "../hooks/useGetTotalQuarterScores";
import WinnerSnippet from "./WinnerSnippet";

const BoardWinners = ({ board, winner, gameData }) => {
  const {
    homeFirstQuarterTotal,
    homeSecondQuarterTotal,
    homeThirdQuarterTotal,
    homeFourthQuarterTotal,
    awayFirstQuarterTotal,
    awaySecondQuarterTotal,
    awayThirdQuarterTotal,
    awayFourthQuarterTotal,
  } = useGetTotalQuarterScores(gameData);

  return (
    <div className=" bg-white shadow">
      <div className=" flex items-center justify-between">
        <WinnerSnippet
          quarter={1}
          board={board}
          winner={winner?.[0]?.first}
          homeQuarterTotal={homeFirstQuarterTotal}
          awayQuarterTotal={awayFirstQuarterTotal}
          gameData={gameData}
        />

        <WinnerSnippet
          quarter={2}
          board={board}
          winner={winner?.[1]?.first}
          homeQuarterTotal={homeSecondQuarterTotal}
          awayQuarterTotal={awaySecondQuarterTotal}
          gameData={gameData}
        />
        <WinnerSnippet
          quarter={3}
          board={board}
          winner={winner?.[2]?.first}
          homeQuarterTotal={homeThirdQuarterTotal}
          awayQuarterTotal={awayThirdQuarterTotal}
          gameData={gameData}
        />
        <WinnerSnippet
          quarter={4}
          board={board}
          winner={winner?.[3]?.first}
          homeQuarterTotal={homeFourthQuarterTotal}
          awayQuarterTotal={awayFourthQuarterTotal}
          gameData={gameData}
        />
      </div>
    </div>
  );
};

export default BoardWinners;
