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
      className="= m-2 flex basis-1/3 flex-col items-center  rounded border bg-white shadow-sm "
    >
      <div className="flex w-full flex-col items-center p-5">
        <div>{board.boardName}</div>
        <div className="flex w-full justify-center">
          <div className="mx-2">{board.homeTeam}</div>
          <div className="mx-2">vs.</div>
          <div className="mx-2">{board.awayTeam}</div>
        </div>
        <div>
          <div>{numOfSquaresClaimed || 0}/100 claimed</div>
        </div>
      </div>
    </Link>
  );
};

export default BoardSnippet;
