const BoardWinners = ({ handleDemoClick }) => {
  return (
    <div className="w-fit">
      <button
        type="button"
        className="bg-green-500 px-2 text-white"
        onClick={() => handleDemoClick()}
      >
        Start Demo Game
      </button>
      <div>BoardWinnersSections</div>
      <div className="flex justify-between divide-x border">
        <div className=" flex w-full flex-col items-center">
          <div>Q1</div>
          <div>player | $100</div>
        </div>
        <div className=" flex w-full flex-col items-center">
          <div>Q2</div>
          <div>player | $100</div>
        </div>
        <div className=" flex w-full flex-col items-center">
          <div>Q3</div>
          <div>player | $100</div>
        </div>
        <div className=" flex w-full flex-col items-center">
          <div>Q4</div>
          <div>player | $100</div>
        </div>
      </div>
    </div>
  );
};

export default BoardWinners;
