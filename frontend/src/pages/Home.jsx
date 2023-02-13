import { Outlet } from 'react-router-dom';
import Board from './Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';

const Home = () => (
  <div className="flex flex-col items-center">
    <Header />
    <Outlet />
  </div>
);

export default Home;
