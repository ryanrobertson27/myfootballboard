import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Square from "./Square";
import GameNumbers from "./GameNumbers";
import SquareEdit from "./SquareEdit";
import GlobalSpinner from "./GlobalSpinner";
import GameScore from "./GameScore";
import { useGetBoardByIdQuery } from "../app/services/board";

// import { setEditable } from '../features/square/squareSlice';

// TODO should I make board api calls here and pass down as props?

const GameBoard = ({ board }) => {
  //TODO these need to pull from backend
  const [homeNumbers, setHomeNumbers] = useState([
    0, 9, 7, 3, 6, 5, 4, 2, 8, 1,
  ]);
  const [awayNumbers, setAwayNumbers] = useState([
    0, 9, 7, 3, 6, 5, 4, 2, 8, 1,
  ]);

  return (
    <div className=" mt-5 h-fit rounded-md bg-white p-2">
      <div className="grid-rows-12 grid grid-cols-12 gap-0.5 ">
        <div className="row-span-11 col-span-1 col-start-1 row-start-3 flex items-center justify-center ">
          <div className="-rotate-90 text-2xl">{board.homeTeam}</div>
        </div>
        <div className="col-span-1 col-start-2 row-span-1 row-start-2  bg-white"></div>
        <div className="row-span-10 col-span-1 col-start-2 row-start-3 ">
          <div className="grid-rows-10 grid grid-cols-1 gap-0.5 ">
            <GameNumbers numbers={homeNumbers} />
          </div>
        </div>
        <div className="col-span-10 col-start-3 row-span-1 row-start-1 flex items-center justify-center">
          <div className="text-2xl">{board.awayTeam} </div>
        </div>
        <div className="col-span-10 col-start-3 row-span-1 row-start-2 ">
          <div className="grid grid-cols-10 grid-rows-1 gap-0.5">
            <GameNumbers numbers={awayNumbers} />
          </div>
        </div>
        <div className="row-span-10 col-span-10 col-start-3 row-start-3 ">
          <div className="grid-rows-10 relative grid  grid-cols-10 gap-0.5">
            <Square />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameBoard;
