import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../app/services/api";
import GameBoard from "../components/GameBoard";
import GameScore from "../components/GameScore";
import Header from "../components/Header";
import {
  useLazyGenerateGameQuery,
  useLazyGetGameByIdQuery,
  useUpdateBoardWithGameDataMutation,
  useGetBoardWinnersByIdQuery,
} from "../app/services/api";
import { useEffect, useState } from "react";
import BoardWinners from "../components/BoardWinners";

const PublishedBoard = () => {
  let { boardId } = useParams();
  const [pollingInterval, setPollingInterval] = useState(0);
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const [generateGame] = useLazyGenerateGameQuery();
  const { data: winner } = useGetBoardWinnersByIdQuery(boardId, {
    pollingInterval: pollingInterval,
  });
  const [getGameById, { data: gameData }] = useLazyGetGameByIdQuery({
    pollingInterval: pollingInterval,
  });
  const [currentWinningSquare, setCurrentWinningSquare] = useState(null);
  const [updateBoardWithGameData] = useUpdateBoardWithGameDataMutation();

  // end polling when game is finished
  useEffect(() => {
    if (gameData?.state === "FINISHED") setPollingInterval(0);

    const homeLastNumber = board?.homeNumbers
      .indexOf(gameData?.homeTeamScore % 10)
      .toString();
    const awayLastNumber = board?.awayNumbers
      .indexOf(gameData?.awayTeamScore % 10)
      .toString();

    setCurrentWinningSquare(Number(awayLastNumber + homeLastNumber));
  }, [gameData]);

  const handleDemoClick = async () => {
    setPollingInterval(1000);
    const generateGameResult = await generateGame(board._id).unwrap();
    if (generateGameResult.gameId) {
      getGameById(generateGameResult.gameId);
      updateBoardWithGameData({
        boardId: board._id,
        gameId: generateGameResult.gameId,
      });
      getBoardWinnersById(board._id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {/* TODO need to make header more appropriate for published board */}
      {/* <Header /> */}
      <div className="flex flex-col items-center  justify-center">
        <GameScore
          board={board}
          gameData={gameData}
          handleDemoClick={handleDemoClick}
        />
        <BoardWinners board={board} winner={winner} />
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
