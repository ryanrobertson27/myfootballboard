import { useState } from 'react';
import Header from '../components/Header';
import Board from '../components/Board';
import EditSquare from '../components/EditSquare';

const Admin = () => {
  const [count, setCount] = useState();

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex">
        <div className="px-2 bg-texas-orange rounded text-texas-white my-2 mx-2">
          BOARD
        </div>
        <div className="px-2 bg-texas-orange rounded text-texas-white my-2 mx-2">
          USERS
        </div>
        <div className="px-2 bg-texas-orange rounded text-texas-white my-2 mx-2">
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
