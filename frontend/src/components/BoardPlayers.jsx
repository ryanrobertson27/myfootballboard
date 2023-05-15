import { useState } from "react";
import { useGetBoardPlayersByBoardIdQuery } from "../app/services/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NewPlayerForm from "./NewPlayerForm";

import { useDispatch } from "react-redux";
import { setDisabled } from "../features/square/squareSlice";
import BoardPlayerSnippet from "./BoardPlayerSnippet";

const BoardPlayers = ({ board }) => {
  const [formIsShowing, setFormIsShowing] = useState(false);
  const dispatch = useDispatch();

  const {
    data: players,
    isLoading,
    isError,
  } = useGetBoardPlayersByBoardIdQuery(board._id);

  const handleAddUserClick = () => {
    setFormIsShowing(true);
    dispatch(setDisabled());
  };

  let playersToRender;

  if (isLoading) {
    playersToRender = <div>Loading</div>;
  }
  if (isError) {
    playersToRender = <div>Error</div>;
  }
  if (players) {
    playersToRender = (
      <div className="flex w-full flex-col items-center">
        {players.length < 100 ? (
          <button
            type="button "
            className="w-full border border-violet-600 bg-violet-600 py-1  text-center  text-white shadow-sm hover:bg-white hover:text-violet-600"
            onClick={() => handleAddUserClick()}
          >
            Add Player
          </button>
        ) : null}
        {players.map((player) => (
          <BoardPlayerSnippet key={player._id} player={player} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 flex-col overflow-hidden bg-white">
      {formIsShowing ? (
        <NewPlayerForm board={board} setFormIsShowing={setFormIsShowing} />
      ) : null}
      {!formIsShowing ? (
        <div className=" mb-2 h-96 overflow-y-scroll border p-1">
          {playersToRender}
        </div>
      ) : null}
    </div>
  );
};

export default BoardPlayers;
