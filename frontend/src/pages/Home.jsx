import { useState } from 'react';
import Board from '../components/Board';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
};

export default Home;
