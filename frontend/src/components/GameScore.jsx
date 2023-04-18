import { useEffect } from "react";

const GameScore = ({ board, gameData, handleDemoClick }) => {
  useEffect(() => {
    console.log("gameData", gameData);
  }, [gameData]);

  return (
    <div className="mb-5 flex w-full items-center justify-center bg-white py-1 drop-shadow">
      <div className="flex-col items-center">
        <div className="text-center">{gameData?.timeRemaining || "00:00"}</div>
        <div className="mb-3 flex justify-center">
          <div className="rows-4 grid grid-cols-6  text-xs">
            {/* Quarters */}
            <div></div>
            <div className="text-center font-semibold">1</div>
            <div className="text-center font-semibold">2</div>
            <div className="text-center font-semibold">3</div>
            <div className="text-center font-semibold">4</div>
            <div className="text-center font-semibold">Total</div>

            <div className="text-end font-semibold">{board.homeTeam}</div>
            <div className="text-center">
              {gameData?.firstQuarter.homeScore || 0}
            </div>
            <div className="text-center">
              {gameData?.secondQuarter.homeScore || 0}
            </div>
            <div className="text-center">
              {gameData?.thirdQuarter.homeScore || 0}
            </div>
            <div className="text-center">
              {gameData?.fourthQuarter.homeScore || 0}
            </div>

            <div className="text-center">{gameData?.homeTeamScore || 0}</div>

            {/* AWAY TEAM */}
            <div className="text-end font-semibold">{board.awayTeam}</div>
            {/* AWAY TEAM SCORES */}
            <div className="text-center">
              {gameData?.firstQuarter.awayScore || 0}
            </div>
            <div className="text-center">
              {gameData?.secondQuarter.awayScore || 0}
            </div>
            <div className="text-center">
              {gameData?.thirdQuarter.awayScore || 0}
            </div>
            <div className="text-center">
              {gameData?.fourthQuarter.awayScore || 0}
            </div>
            <div className="text-center">{gameData?.awayTeamScore || 0}</div>
            {/* <div className="col-span-6 mt-1 text-center italic">
              score each quarter is total at the end of each quarter, not per
              quarter score
            </div> */}
          </div>
          {/* <div className="m-2 text-3xl">
            {gameData?.awayTeamScore || 0} - {board.awayTeam}
          </div> */}
        </div>
      </div>

      <button
        type="button"
        className="mr-2 items-center rounded-md border border-gray-300 bg-violet-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
        onClick={() => handleDemoClick()}
      >
        Start Demo
      </button>
    </div>
  );
};

export default GameScore;
