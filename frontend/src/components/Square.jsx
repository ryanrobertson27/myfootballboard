import { useState, useEffect } from 'react';

import { useGetSquaresQuery } from '../app/services/squares';
import GlobalSpinner from './GlobalSpinner';

const Square = ({ handleSquareClick, isEditable }) => {
  const { data, isLoading, isError } = useGetSquaresQuery();

  useEffect(() => {
    console.log(data);
  });

  if (isError) return <div>Error</div>;

  if (isLoading) return <GlobalSpinner />;

  return data.map((square, index) => (
    <button
      disabled={isEditable}
      id={square._id}
      key={square._id}
      type="button"
      onClick={() => handleSquareClick(index, square._id)}
      className="aspect-square text-xs flex justify-center items-center bg-white rounded-md shadow hover:bg-texas-orange hover:text-white "
    >
      {square.owner?.name || (
        <span className="text-gray-300 hover:text-white font-light">+</span>
      )}
    </button>
  ));
};

export default Square;
