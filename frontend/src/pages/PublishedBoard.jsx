import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../app/services/api";
import GameBoard from "../components/GameBoard";
import GameScore from "../components/GameScore";
import Header from "../components/Header";
import {
  useLazyGenerateGameQuery,
  useLazyGetGameByIdQuery,
} from "../app/services/api";
import { useEffect, useState } from "react";
import BoardWinners from "../components/BoardWinners";

const PublishedBoard = () => {
  let { boardId } = useParams();
  const [pollingInterval, setPollingInterval] = useState(1000);
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const [generateGame] = useLazyGenerateGameQuery();
  const [getGameById, { data: gameData }] = useLazyGetGameByIdQuery({
    pollingInterval: pollingInterval,
  });
  const [currentWinningSquare, setCurrentWinningSquare] = useState(null);

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

    console.log(
      currentWinningSquare,
      homeLastNumber,
      awayLastNumber,
      gameData?.homeTeamScore,
      gameData?.awayTeamScore
    );
  }, [gameData]);

  const handleDemoClick = async () => {
    const generateGameResult = await generateGame(board._id).unwrap();
    console.log("generateGameResult", generateGameResult.gameId);
    if (generateGameResult.gameId) {
      getGameById(generateGameResult.gameId);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (board.state === "unpublished") {
    return <div>Board is unpublished</div>;
  }

  return (
    <div>
      {/* TODO need to make header more appropriate for published board */}
      {/* <Header /> */}
      <div className="flex flex-col items-center  justify-center">
        <GameScore board={board} gameData={gameData} />
        <BoardWinners handleDemoClick={handleDemoClick} />
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
