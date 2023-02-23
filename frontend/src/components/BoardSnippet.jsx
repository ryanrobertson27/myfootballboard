import { Link } from "react-router-dom";

const BoardSnippet = ({ key, board }) => {
  let temp;

  // number of squares where the owner is not null
  const squaresOwned = board.squares.filter((square) => square.owner !== null);

  return (
    <Link
      to={`../${board._id}`}
      className="mb-4 flex w-80 flex-col items-center rounded border bg-white shadow-sm"
    >
      <div className="mb-2 w-full bg-gray-100 py-2 text-center">
        {board.boardName}
      </div>
      <div className="flex w-full justify-around">
        <div>{board.homeTeam}</div>
        <div>{board.awayTeam}</div>
      </div>
      <div className="mb-2 flex w-full justify-around">
        <div>cost/sq: ${board.costPerSquare}</div>
        <div>Sq owned: {squaresOwned.length}/100</div>
      </div>
    </Link>
  );
};

export default BoardSnippet;
