import { useGetBoardByIdQuery } from "../app/services/board";
import BoardSettings from "../components/BoardSettings";
import GameBoard from "../components/GameBoard";
import { Link, useParams } from "react-router-dom";
import BoardUsers from "../components/BoardUsers";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";

const Board = () => {
  const { boardId } = useParams();
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="mt-5 w-full">
      <div className="mb-5 flex items-center border-b pb-5">
        <ChevronLeft className="mr-2 h-5 w-5" />
        <Link to="/dashboard" className="">
          Back to Dashboard
        </Link>
      </div>
      <div className=" flex h-fit w-full">
        <div className="flex w-1/6 flex-col px-4">
          <div className="font-semibold uppercase">Settings</div>
          <BoardSettings board={board} />
        </div>
        <div className="flex w-4/6 flex-col px-4">
          <div className="font-semibold uppercase">
            Board: {board.boardName}{" "}
            <span className="font-base text-xs lowercase">
              (id: {board._id})
            </span>
          </div>
          <GameBoard board={board} />
        </div>
        <div className="flex w-1/6 flex-col px-4">
          <div className="font-semibold uppercase">Users</div>
          <BoardUsers board={board} />
        </div>
      </div>
    </div>
  );
};

export default Board;
