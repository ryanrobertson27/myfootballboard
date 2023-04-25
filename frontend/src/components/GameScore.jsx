import { useGetTotalQuarterScores } from "../hooks/useGetTotalQuarterScores";
import {
  useResetGameByBoardIdMutation,
  useInvalidateGameDataMutation,
} from "../app/services/api";
import { useNavigate } from "react-router-dom";
import { useConvertNumberToMinutes } from "../hooks/useConvertNumberToMinutes";

const GameScore = ({ board, gameData, handleDemoClick }) => {
  const navigate = useNavigate();
  const number = useConvertNumberToMinutes(gameData?.timeRemaining);

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

  const [resetGame, { isLoading: resettingGame }] =
    useResetGameByBoardIdMutation();

  const handleResetGameClick = async () => {
    const result = await resetGame(board._id).unwrap();
    console.log(result);
    // if (result.data === "success") {
    //   navigate(0);
    // }
  };

  let quarter;

  switch (gameData?.currentQuarter) {
    case 1:
      quarter = "1st";
      break;
    case 2:
      quarter = "2nd";
      break;
    case 3:
      quarter = "3rd";
      break;
    case 4:
      quarter = "4th";
      break;
    default:
      quarter = null;
  }

  return (
    <div className="mb-5 flex w-full items-center justify-center bg-white py-1 drop-shadow">
      <div className="flex-col items-center">
        <div className="flex w-full items-center justify-center">
          {gameData?.state === "ACTIVE" ? (
            <div className="mb-1 text-center text-sm text-red-600">
              {`${gameData?.timeRemaining} - ${quarter}`}
            </div>
          ) : (
            "--:--"
          )}
        </div>
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
          </div>
        </div>
      </div>
      {gameData?.state === "FINISHED" ? (
        <button
          type="button"
          className="mr-2 items-center rounded-md border border-gray-300 bg-violet-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
          onClick={() => handleResetGameClick()}
        >
          Reset Demo
        </button>
      ) : (
        <button
          type="button"
          className="mr-2 items-center rounded-md border border-gray-300 bg-violet-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
          onClick={() => handleDemoClick()}
          disabled={gameData?.state === "ACTIVE"}
        >
          Start Demo
        </button>
      )}
    </div>
  );
};

export default GameScore;
