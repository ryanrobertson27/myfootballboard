import { useState } from 'react';
import Board from '../components/Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';
import SquareSelect from '../components/SquareSelect';
import SubHeader from '../components/SubHeader';

const Home = () => {
  const [showSquareSelect, setShowSquareSelect] = useState(false);

  return (
    <div className="flex flex-col  bg-gray-50 h-screen items-center">
      <Header />
      <SubHeader />
      <div className="flex justify-center mb-5">
        <GameScore />
      </div>
      <button
        type="button"
        onClick={() => setShowSquareSelect(!showSquareSelect)}
        className="border px-3 py-2 mb-5 justify-center"
      >
        EDIT
      </button>
      <div className="flex justify-center">
        <div className="flex justify-center">
          <Board />
        </div>
        {showSquareSelect ? <SquareSelect /> : null}
        {/* <div>
          <SquareSelect />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
