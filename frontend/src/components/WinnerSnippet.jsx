const WinnerSnippet = ({
  board,
  winner,
  homeQuarterTotal,
  awayQuarterTotal,
  quarter,
}) => {
  return (
    <div className="flex  items-start justify-between  p-2">
      <div className=" mx-4  flex w-full flex-col items-center">
        <div className="mb-2 text-xl">{quarter}</div>
        <hr className="w-full" />
        <div className="my-2 flex  w-full justify-between text-xs">
          <div className="mx-3 flex flex-col items-center">
            <div>{board.homeTeam}</div>
            <div className="text-lg">{homeQuarterTotal % 10}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>{board.awayTeam}</div>
            <div className="text-lg">{awayQuarterTotal % 10}</div>
          </div>
        </div>
        <hr className="w-full " />
        {winner || <div className="text-lg italic">pending</div>}
        <div className=" text-xs text-gray-600">
          payout: ${board.costPerSquare / 4}
        </div>
      </div>
    </div>
  );
};

export default WinnerSnippet;
