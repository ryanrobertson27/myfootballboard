const WinnerSnippet = ({
  board,
  winner,
  homeQuarterTotal,
  awayQuarterTotal,
  quarter,
  gameData,
}) => {
  let pulse;

  if (gameData?.currentQuarter === quarter && gameData?.state === "ACTIVE") {
    pulse = "border-2 border-green-400 animate-pulse";
  }

  return (
    <div className={`flex w-full justify-between p-2 ${pulse}`}>
      <div className=" flex w-full flex-col items-center">
        <div className="mb-2 text-xl">{`Q${quarter}`}</div>
        <div className="text-xs text-gray-400">winning numbers</div>
        <div className="mb-2 flex  w-full justify-between divide-x divide-gray-300 border p-1 text-xs">
          <div className="flex w-20 flex-col items-center  px-1">
            <div>{board.homeTeam}</div>
            <div className="text-lg">{homeQuarterTotal % 10}</div>
          </div>
          <div className="flex w-20 flex-col items-center  px-2">
            <div>{board.awayTeam}</div>
            <div className="text-lg">{awayQuarterTotal % 10}</div>
          </div>
        </div>

        {winner || <div className="text-lg italic">pending</div>}
        <div className=" text-xs text-gray-600">
          payout: ${(board.costPerSquare * 100) / 4}
        </div>
      </div>
    </div>
  );
};

export default WinnerSnippet;
