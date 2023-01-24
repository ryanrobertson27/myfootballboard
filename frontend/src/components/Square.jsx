import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../features/square/squareSlice';

import { useGetSquaresQuery } from '../app/services/squares';

const Square = () => {
  const { data, isLoading, isError, error } = useGetSquaresQuery();
  const [chosenSquares, setChosenSquares] = useState([]);
  const dispatch = useDispatch();

  const handleSquareSelect = (index, id) => {
    if (chosenSquares.includes(index)) {
      setChosenSquares(chosenSquares.filter((square) => square !== index));
      dispatch(remove(index));
    } else {
      dispatch(add({ index, id }));
      setChosenSquares([...chosenSquares, index]);
    }
  };

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading</div>;

  return data.map((name, index) => (
    <div className="relative">
      <button
        id={name._id}
        key={name._id}
        type="button"
        onClick={() => handleSquareSelect(index, name._id)}
        className={`w-20 aspect-square text-center flex justify-center items-center rounded-lg ${
          chosenSquares.includes(index) ? 'bg-green-400' : 'bg-white'
        }  shadow`}
      >
        {name.owner || '-'}
      </button>
    </div>
  ));
};

export default Square;
