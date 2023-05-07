import {
  useGetBoardByIdQuery,
  usePublishBoardByIdMutation,
  useClearBoardMutation,
  useFillBoardMutation,
  useGetSquaresByBoardIdQuery,
} from "../app/services/api";
import { useState, useEffect } from "react";
import BoardSettings from "../components/BoardSettings";
import GameBoard from "../components/GameBoard";
import { Link, useParams } from "react-router-dom";
import BoardPlayers from "../components/BoardPlayers";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import GlobalSpinner from "../components/GlobalSpinner";

const Board = () => {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const { boardId } = useParams();
  const { data: board, isLoading, isError } = useGetBoardByIdQuery(boardId);
  const { data: squares, isLoading: isSquaresLoading } =
    useGetSquaresByBoardIdQuery(boardId);
  const [publishBoard, { isLoading: isPublishing }] =
    usePublishBoardByIdMutation();

  const [clearBoard, { isLoading: clearUpdating }] = useClearBoardMutation();
  const [fillBoard, { isLoading: fillUpdating }] = useFillBoardMutation();

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div>
          Loading...
          <GlobalSpinner size={"100"} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container mt-10  px-10">
      <div className="mb-3 flex items-center text-sm">
        <ChevronLeft className="mr-2 h-3 w-5" />
        <Link to="/dashboard" className="">
          Back to Dashboard
        </Link>
      </div>
      <div className=" flex w-full">
        <div className="mx-1 flex basis-4/6 flex-col  rounded-md bg-white p-4">
          <div className="flex h-14 items-center justify-between border-b">
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
                ) : (
                  <button
                    className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
                    onClick={() => publishBoard(board._id)}
                  >
                    {isPublishing ? "Publishing..." : "Publish Board"}
                  </button>
                )}
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

          <GameBoard board={board} />
        </div>
        <div className="mx-1 basis-2/6 flex-col rounded-md bg-white p-4">
          <div className=" flex h-14 items-center border-b">
            <div className="font-semibold uppercase">Players</div>
            {board.boardState === "UNPUBLISHED" ? (
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
            ) : null}
          </div>

          <BoardPlayers board={board} />
        </div>
      </div>
    </div>
  );
};

export default Board;
