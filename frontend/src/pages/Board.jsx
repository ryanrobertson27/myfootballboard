import {
  useGetBoardByIdQuery,
  usePublishBoardByIdMutation,
  useClearBoardMutation,
  useFillBoardMutation,
} from "../app/services/api";
import { useState } from "react";
import BoardSettings from "../components/BoardSettings";
import GameBoard from "../components/GameBoard";
import { Link, useParams } from "react-router-dom";
import BoardPlayers from "../components/BoardPlayers";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";

const Board = () => {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const { boardId } = useParams();
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const [publishBoard, { isLoading: isPublishing }] =
    usePublishBoardByIdMutation();

  const [clearBoard, { isLoading: clearUpdating }] = useClearBoardMutation();
  const [fillBoard, { isLoading: fillUpdating }] = useFillBoardMutation();

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
      <div className=" flex  w-full">
        <div className="mx-1 flex basis-4/6 flex-col  rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className=" py-2 font-semibold uppercase">
              Board: {board.boardName}{" "}
              <span className="font-base text-xs lowercase">
                (id: {board._id})
              </span>
            </div>
            <div className="flex ">
              <div>
                {board.boardState === "PUBLISHED" ? (
                  <Link
                    to={`/published/${board._id}`}
                    target="_blank"
                    className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
                  >
                    View Board
                  </Link>
                ) : null}
              </div>
              <button
                onClick={() => setIsSettingsShowing(true)}
                className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Settings
              </button>
            </div>
          </div>
          <div>
            {isSettingsShowing ? (
              <BoardSettings
                board={board}
                setIsSettingsShowing={setIsSettingsShowing}
              />
            ) : null}
          </div>
          <div className="flex w-full justify-center">
            <GameBoard board={board} />
          </div>
        </div>
        <div className="mx-1 flex basis-2/6 flex-col  rounded-md bg-white p-4">
          <div className=" flex items-center border-b pb-3">
            <div className="font-semibold uppercase">Players</div>
            <div className="ml-auto">
              <button
                onClick={() => clearBoard(board._id)}
                className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {clearUpdating ? "Clearing..." : "Clear Board"}
              </button>
              <button
                onClick={() => fillBoard(board._id)}
                className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {fillUpdating ? "Filling..." : "Fill Board"}
              </button>
            </div>
          </div>

          <BoardPlayers board={board} />
        </div>
      </div>
    </div>
  );
};

export default Board;
