import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../app/services/api";
import GameBoard from "../components/GameBoard";
import GameScore from "../components/GameScore";
import Header from "../components/Header";
import {
  useLazyGenerateGameQuery,
  useLazyGetGameByIdQuery,
} from "../app/services/api";
import { useEffect } from "react";

const PublishedBoard = () => {
  let { boardId } = useParams();
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const [generateGame] = useLazyGenerateGameQuery();
  const [getGameById, result] = useLazyGetGameByIdQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (result.data) {
      console.log("result.data", result.data);
    }
  }, [result.data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (board.state === "unpublished") {
    return <div>Board is unpublished</div>;
  }

  const handleDemoClick = async () => {
    const generateGameResult = await generateGame(board._id);
    const gameId = generateGameResult.data._id;
    console.log("gameId", gameId);
    getGameById(gameId);
  };

  return (
    <div>
      {/* TODO need to make header more appropriate for published board */}
      {/* <Header /> */}
      <div className="flex flex-col items-center  justify-center">
        <GameScore board={board} />
        <button
          type="button"
          className="bg-green-500 px-2 text-white"
          onClick={() => handleDemoClick()}
        >
          Start Demo Game
        </button>
        <GameBoard board={board} />
      </div>
    </div>
  );
};

export default PublishedBoard;
