import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Board from '../components/Board';
import GameScore from '../components/GameScore';
import Header from '../components/Header';

const Home = () => {
  const user = useSelector((state) => state.user);

  let userLoggedIn;

  if (!user) {
    userLoggedIn = <div>LOGIN</div>;
  } else {
    userLoggedIn = <div>{user}</div>;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center mb-5">
        <GameScore />
      </div>
      <div className="flex justify-center">
        <Board />
      </div>
    </div>
  );
};

export default Home;
