import { Outlet } from 'react-router-dom';
import Board from './Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';
import HorizontalNav from '../components/HorizontalNav';

const Home = () => (
  <div className="flex flex-col items-center">
    <Header />
    <HorizontalNav />
    <Outlet />
  </div>
);

export default Home;
