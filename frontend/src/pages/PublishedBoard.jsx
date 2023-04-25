import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import GameScore from "../components/GameScore";
import BoardWinners from "../components/BoardWinners";
import {
  useLazyGenerateGameQuery,
  useUpdateBoardWithGameDataMutation,
  useGetBoardWinnersByIdQuery,
  useGetGameByBoardIdQuery,
  useGetBoardByIdQuery,
} from "../app/services/api";

const PublishedBoard = () => {
  let { boardId } = useParams();
  const [pollingInterval, setPollingInterval] = useState(0);
  const [currentWinningSquare, setCurrentWinningSquare] = useState(null);

  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const { data: winner } = useGetBoardWinnersByIdQuery(boardId, {
    pollingInterval: pollingInterval,
    skip: false, // makes sure the query runs on page load
  });
  const { data: gameData, error } = useGetGameByBoardIdQuery(boardId, {
    pollingInterval: pollingInterval,
    skip: false, // makes sure the query runs on page load
  });

  const [generateGame] = useLazyGenerateGameQuery();
  const [updateBoardWithGameData] = useUpdateBoardWithGameDataMutation();

  useEffect(() => {
    // if game is active, poll every second, otherwise stop polling
    if (gameData?.state === "ACTIVE") {
      setPollingInterval(1000);
    } else {
      setPollingInterval(0);
    }
    // get last digit of home and away team scores and convert to string
    const homeLastNumber = board?.homeNumbers
      .indexOf(gameData?.homeTeamScore % 10)
      .toString();
    const awayLastNumber = board?.awayNumbers
      .indexOf(gameData?.awayTeamScore % 10)
      .toString();
    // add the strings together and convert to number to get the winning square
    setCurrentWinningSquare(Number(awayLastNumber + homeLastNumber));
  }, [gameData, winner]);

  const handleDemoClick = async () => {
    const generateGameResult = await generateGame(board._id).unwrap();
    if (generateGameResult.gameId) {
      updateBoardWithGameData({
        boardId: board._id,
        gameId: generateGameResult.gameId,
      });
    }
    setPollingInterval(1000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center  justify-center">
        <GameScore
          board={board}
          gameData={gameData}
          handleDemoClick={handleDemoClick}
        />
        <BoardWinners board={board} winner={winner} gameData={gameData} />
        <GameBoard
          board={board}
          currentWinningSquare={currentWinningSquare}
          gameData={gameData}
        />
      </div>
    </div>
  );
};

export default PublishedBoard;
