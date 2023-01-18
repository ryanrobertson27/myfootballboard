import Board from '../components/Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';

const Home = () => (
  <div className="flex flex-col h-screen bg-slate-50">
    <Header />
    <div className="flex justify-center mb-5">
      <GameScore />
    </div>
    <div className="flex justify-center">
      <Board />
    </div>
  </div>
);

export default Home;
