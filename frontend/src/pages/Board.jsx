import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Square from '../components/Square';
import GameNumbers from '../components/GameNumbers';
import SquareEdit from '../components/SquareEdit';
import GlobalSpinner from '../components/GlobalSpinner';
import GameScore from '../components/GameScore';
// import { setEditable } from '../features/square/squareSlice';

// TODO should I make board api calls here and pass down as props?

const Board = () => {
  const dispatch = useDispatch();
  const [square, setSquare] = useState({ index: null, id: null });
  const [squareEditVisible, setSquareEditVisible] = useState(false);
  const [verticalNumbers, setVerticalNumbers] = useState([
    0, 9, 7, 3, 6, 5, 4, 2, 8, 1,
  ]);
  const [horizontalNumbers, setHorizontalNumbers] = useState([
    0, 9, 7, 3, 6, 5, 4, 2, 8, 1,
  ]);

  const handleSquareClick = (index, id) => {
    setSquare({ index, id });
    setSquareEditVisible(true);
  };

  return (
    <>
      <GameScore />
      <div className="container max-w-4xl">
        <div className="grid grid-cols-11 grid-rows-11 grid-flow-row gap-1 p-2">
          <div className="col-start-1 col-span-1 row-start-2 row-span-10 ">
            <div className="grid grid-cols-1 grid-rows-10 gap-1">
              <GameNumbers numbers={horizontalNumbers} />
            </div>
          </div>
          <div className="col-start-2 col-span-10 row-start-1 row-span-1 ">
            <div className="grid grid-cols-10 grid-rows-1 gap-1">
              <GameNumbers numbers={verticalNumbers} />
            </div>
          </div>
          <div className="col-start-2 col-span-10 row-start-2 row-span-10">
            <div className="grid grid-rows-10 grid-cols-10 gap-1 relative">
              <Square handleSquareClick={handleSquareClick} />
              {squareEditVisible ? (
                <SquareEdit
                  square={square}
                  setSquareEditVisible={setSquareEditVisible}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Board;
