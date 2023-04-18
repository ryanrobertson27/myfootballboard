const BoardWinners = ({ board }) => {
  return (
    <div className=" bg-white px-4 py-2 shadow">
      <div className="mb-2 flex items-center justify-between">
        {/* <div className="text-lg font-semibold">BoardWinnersSections</div> */}
        <div className="flex items-start justify-between ">
          <div className=" flex  flex-col items-center px-10">
            <div className="border-b">Q1</div>
            {board?.quarterWinners[0] || (
              <div className="text-lg italic">pending</div>
            )}
            <div className="text-xs text-gray-600">
              payout: ${board.costPerSquare / 4}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between ">
          <div className=" flex  flex-col items-center px-10">
            <div className="border-b">Q2</div>
            {board?.quarterWinners[1] || (
              <div className="text-lg italic">pending</div>
            )}
            <div className="text-xs text-gray-600">
              payout: ${board.costPerSquare / 4}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between ">
          <div className=" flex  flex-col items-center px-10">
            <div className="border-b">Q3</div>
            {board?.quarterWinners[2] || (
              <div className="text-lg italic">pending</div>
            )}
            <div className="text-xs text-gray-600">
              payout: ${board.costPerSquare / 4}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between ">
          <div className=" flex  flex-col items-center px-10">
            <div className="border-b">Q4</div>
            {board?.quarterWinners[3] || (
              <div className="text-lg italic">pending</div>
            )}
            <div className="text-xs text-gray-600">
              payout: ${board.costPerSquare / 4}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardWinners;
