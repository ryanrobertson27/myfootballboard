import Board from '../components/Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';
import SquareSelect from '../components/SquareSelect';
import SubHeader from '../components/SubHeader';

const Home = () => (
  <div className="flex flex-col  bg-texas-white">
    <Header />
    <SubHeader />
    <div className="flex justify-center mb-5">
      <GameScore />
    </div>
    <div className="flex justify-center">
      <div className="flex justify-center">
        <Board />
      </div>
      <div>
        <SquareSelect />
      </div>
    </div>
  </div>
);

export default Home;
