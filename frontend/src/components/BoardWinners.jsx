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

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  return (
    <div className=" bg-white shadow">
      <div className=" flex items-center justify-between">
        {/* <div className="text-lg font-semibold">BoardWinnersSections</div> */}
        <WinnerSnippet
          quarter={"Q1"}
          board={board}
          winner={winner?.[0]?.first}
          homeQuarterTotal={homeFirstQuarterTotal}
          awayQuarterTotal={awayFirstQuarterTotal}
        />
        <WinnerSnippet
          quarter={"Q2"}
          board={board}
          winner={winner?.[1]?.first}
          homeQuarterTotal={homeSecondQuarterTotal}
          awayQuarterTotal={awaySecondQuarterTotal}
        />
        <WinnerSnippet
          quarter={"Q3"}
          board={board}
          winner={winner?.[2]?.first}
          homeQuarterTotal={homeThirdQuarterTotal}
          awayQuarterTotal={awayThirdQuarterTotal}
        />
        <WinnerSnippet
          quarter={"Q4"}
          board={board}
          winner={winner?.[3]?.first}
          homeQuarterTotal={homeFourthQuarterTotal}
          awayQuarterTotal={awayFourthQuarterTotal}
        />
      </div>
    </div>
  );
};

export default BoardWinners;
