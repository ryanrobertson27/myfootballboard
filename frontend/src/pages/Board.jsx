import { useGetBoardByIdQuery } from "../app/services/api";
import { useState } from "react";
import BoardSettings from "../components/BoardSettings";
import GameBoard from "../components/GameBoard";
import { Link, useParams } from "react-router-dom";
import BoardPlayers from "../components/BoardPlayers";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";

const Board = () => {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const { boardId } = useParams();
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container mt-10 px-10">
      <div className="mb-3 flex items-center text-sm">
        <ChevronLeft className="mr-2 h-3 w-5" />
        <Link to="/dashboard" className="">
          Back to Dashboard
        </Link>
      </div>
      <div className=" flex w-full">
        <div className="mx-1 flex basis-4/6 flex-col  rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b">
            <div className="py-2 font-semibold uppercase">
              Board: {board.boardName}{" "}
              <span className="font-base text-xs lowercase">
                (id: {board._id})
              </span>
            </div>
            <div className="flex items-center">
              <div>
                {board.state === "published" ? (
                  <Link to={`/published/${board._id}`} target="_blank">
                    View Board
                  </Link>
                ) : (
                  <button>Publish Board</button>
                )}
              </div>
              <button onClick={() => setIsSettingsShowing(!isSettingsShowing)}>
                {isSettingsShowing ? (
                  <CloseIcon className="mr-2 h-5 w-5" />
                ) : (
                  <SettingsIcon className="mr-2 h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            {isSettingsShowing ? <BoardSettings board={board} /> : null}
          </div>
          <div className="flex w-full justify-center">
            <GameBoard board={board} />
          </div>
        </div>
        <div className="mx-1 flex basis-2/6 flex-col  rounded-md bg-white p-4">
          <div className=" border-b py-2 font-semibold uppercase ">Users</div>
          <BoardPlayers board={board} />
        </div>
      </div>
    </div>
  );
};

export default Board;
