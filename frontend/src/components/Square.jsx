import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/square/squareSlice";
import {
  useGetSquareByUserIdQuery,
  useGetSquaresQuery,
} from "../app/services/api";
import GlobalSpinner from "./GlobalSpinner";

const Square = ({ square }) => {
  const isDisabled = useSelector((state) => state.squareSelect.isDisabled);
  const squares = useSelector((state) => state.squareSelect.squares);
  const dispatch = useDispatch();

  let style;

  if (squares.find((item) => item._id === square._id)) {
    style = "bg-violet-300 text-white";
  }

  const handleSquareClick = () => {
    if (squares.find((item) => item._id === square._id)) {
      dispatch(remove(square));
    } else {
      dispatch(add(square));
    }
  };

  return (
    <button
      disabled={isDisabled || square.owner}
      id={square._id}
      key={square._id}
      type="button"
      className={`${style} flex aspect-square items-center justify-center text-xs  first:border-l first:border-t ${
        square.owner || isDisabled
          ? ""
          : "hover:bg-violet-600  hover:text-white"
      }  md:text-base`}
      onClick={handleSquareClick}
    >
      {square.owner?.first || ""}
    </button>
  );
};

export default Square;
