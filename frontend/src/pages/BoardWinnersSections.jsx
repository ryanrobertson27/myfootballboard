const BoardWinnersSections = ({ board }) => {
  let temp;

  return (
    <div className="mb-5 w-full">
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

export default BoardWinnersSections;
