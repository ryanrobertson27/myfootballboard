import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../features/squareSelectSlice';

import { useGetSquaresQuery } from '../app/services/squares';

const Square = () => {
  const { data, isLoading, isError, error } = useGetSquaresQuery();
  const [chosenSquares, setChosenSquares] = useState([]);
  const dispatch = useDispatch();

  const handleSquareSelect = (idx) => {
    if (chosenSquares.includes(idx)) {
      setChosenSquares(chosenSquares.filter((square) => square !== idx));
      dispatch(remove(idx));
    } else {
      dispatch(add(idx));
      setChosenSquares([...chosenSquares, idx]);
    }
  };

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading</div>;

  return data.map((name, idx) => (
    <div className="relative">
      <button
        id={name._id}
        key={name._id}
        type="button"
        onClick={() => handleSquareSelect(idx)}
        className="w-20 aspect-square text-center flex justify-center items-center rounded-lg bg-texas-white  shadow"
      >
        {name.owner || '-'}
      </button>
    </div>
  ));
};

export default Square;
