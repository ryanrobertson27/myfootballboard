import { useState } from 'react';
import Board from '../components/Board';
import Header from '../components/Header';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center">
        <Board />
      </div>
    </div>
  );
};

export default Home;
