import { useState } from 'react';
import Header from '../components/Header';
import Board from './Board';
import EditSquare from '../components/EditSquare';

const Admin = () => {
  const [count, setCount] = useState();

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex">
        <div className="m-2 rounded bg-texas-orange px-2 text-texas-white">
          BOARD
        </div>
        <div className="m-2 rounded bg-texas-orange px-2 text-texas-white">
          USERS
        </div>
        <div className="m-2 rounded bg-texas-orange px-2 text-texas-white">
          SETTINGS
        </div>
      </div>
      <div className="flex justify-center">
        <Board />
      </div>
    </div>
  );
};

export default Admin;
