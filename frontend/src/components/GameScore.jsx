import { useState } from 'react';

const GameScore = () => {
  const [count, setCount] = useState();

  return (
    <div className="flex justify-between w-1/3">
      <div className="m-2 text-3xl">Texas - 14</div>
      <div className="m-2 flex flex-col">
        <div className="flex justify-between">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className="flex justify-between text-xs">
          <div>0</div>
          <div>0</div>
          <div>7</div>
          <div>7</div>
        </div>
        <div className="flex justify-between text-xs">
          <div>7</div>
          <div>0</div>
          <div>7</div>
          <div>7</div>
        </div>
      </div>
      <div className="m-2 text-3xl">21 - Alabama</div>
    </div>
  );
};

export default GameScore;
