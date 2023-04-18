import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSquaresByBoardIdQuery } from "../app/services/api";
import GameBoard from "./GameBoard";

const BoardSnippet = ({ key, board }) => {
  const {
    data: squares,
    isLoading,
    isError,
  } = useGetSquaresByBoardIdQuery(board._id);

  let numOfSquaresClaimed;

  if (squares) {
    numOfSquaresClaimed = squares.filter((square) => square.owner).length;
  }

  return (
    <Link
      to={`../${board._id}`}
      className=" m-2 flex w-1/4 flex-col items-center  rounded border bg-white shadow-sm hover:shadow-lg "
    >
      <div className="flex w-full flex-col items-center">
        <div className="py-2 text-xl font-semibold text-violet-800">
          {board.boardName}
        </div>
        <hr className="w-full" />
        <div className="my-2 flex w-full items-center justify-center">
          <div className="mx-2 text-lg font-bold">{board.homeTeam}</div>
          <div className="mx-2 text-sm text-gray-500">vs.</div>
          <div className="mx-2 text-lg font-bold">{board.awayTeam}</div>
        </div>
        <div className="mb-2 text-sm text-gray-500">
          <div>{numOfSquaresClaimed || 0}/100 claimed</div>
        </div>
      </div>
    </Link>
  );
};

export default BoardSnippet;
