import { useState, useEffect } from "react";

import { useGetSquaresQuery } from "../app/services/squares";
import GlobalSpinner from "./GlobalSpinner";

const Square = ({ handleSquareClick, isEditable }) => {
  const { data, isLoading, isError } = useGetSquaresQuery();

  // useEffect(() => {
  //   console.log(data);
  // });

  if (isError) return <div>Error</div>;

  if (isLoading) return <GlobalSpinner />;

  return data.map((square, index) => (
    <button
      disabled={isEditable}
      id={square._id}
      key={square._id}
      type="button"
      onClick={() => handleSquareClick(index, square._id)}
      className="flex aspect-square items-center justify-center rounded border bg-white  text-xs hover:bg-texas-orange  hover:text-white md:text-base "
    >
      {square.owner?.name || (
        <span className="font-light text-gray-300 hover:text-white">+</span>
      )}
    </button>
  ));
};

export default Square;
