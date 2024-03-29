import Square from "./Square";
import GameNumbers from "./GameNumbers";
import {
  useGetSquaresByBoardIdQuery,
  useRandomizeGameNumbersMutation,
} from "../app/services/api";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/main-logo-stacked.svg";
import GlobalSpinner from "./GlobalSpinner";

const GameBoard = ({ board, gameData, currentWinningSquare }) => {
  const [randomize] = useRandomizeGameNumbersMutation();

  let squareSection;

  const {
    data: squares,
    isLoading,
    isError,
  } = useGetSquaresByBoardIdQuery(board._id);

  if (isLoading) {
    squareSection = (
      <div className="flex h-full w-full items-center justify-center">
        loading...
        <GlobalSpinner size={"100"} />
      </div>
    );
  }
  if (isError) {
    squareSection = <div>Error Loading Squares </div>;
  }

  if (squares) {
    squareSection = (
      <div className="grid-rows-10 relative grid  grid-cols-10 divide-x divide-y  ">
        {squares.map((square) => (
          <Square
            key={square._id}
            square={square}
            currentWinningSquare={currentWinningSquare}
            gameData={gameData}
          />
        ))}
      </div>
    );
  }

  return (
    <div className=" mt-5 flex justify-around rounded-md bg-white">
      <div className="grid-rows-12 grid w-full grid-cols-12 border">
        <div className="col-span-1 col-start-1 row-span-1 row-start-1 flex aspect-square flex-col items-center justify-center   bg-white text-xs"></div>
        <div className="col-span-1 col-start-2 row-span-1 row-start-1 flex aspect-square flex-col items-center justify-center  bg-white text-xs"></div>
        <div className="col-span-1 col-start-1 row-span-1 row-start-2 flex aspect-square flex-col items-center justify-center  bg-white text-xs"></div>
        <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex aspect-square flex-col items-center justify-center  bg-white text-xs"></div>
        <div className="col-span-2 col-start-1 row-span-2 row-start-1 flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl ">
            {board.boardState !== "PUBLISHED" ? (
              <button onClick={() => randomize(board._id)}>
                Randomize Numbers
              </button>
            ) : (
              <div>
                <Logo className="h-20 w-20" />
              </div>
            )}
          </div>
        </div>
        <div> </div>
        <div className="row-span-10 col-span-1 col-start-1 row-start-3 flex items-center justify-center border-t border-r">
          <div className="-rotate-90 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl">
            {board.awayTeam}
          </div>
        </div>
        <div className="row-span-10 col-span-1 col-start-2 row-start-3  ">
          <div className="grid-rows-10 grid grid-cols-1  divide-y  ">
            <GameNumbers numbers={board.awayNumbers} team="away" />
          </div>
        </div>
        <div className="col-span-10 col-start-3 row-span-1 row-start-1 flex items-center justify-center border-b border-l">
          <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl">
            {board.homeTeam}{" "}
          </div>
        </div>
        <div className="col-span-10 col-start-3 row-span-1 row-start-2 ">
          <div className="grid grid-cols-10 grid-rows-1 divide-x ">
            <GameNumbers numbers={board.homeNumbers} team="home" />
          </div>
        </div>
        <div className="row-span-10 col-span-10 col-start-3 row-start-3">
          {squareSection}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
