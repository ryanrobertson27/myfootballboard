import { useEffect, useState } from "react";
import { useGetBoardPlayersByBoardIdQuery } from "../app/services/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NewPlayerForm from "./NewPlayerForm";
import MyTextInput from "../hooks/formik/MyTextInput";
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
    playersToRender = players.map((player) => (
      <BoardPlayerSnippet player={player} />
    ));
  }

  return (
    <div className="mt-5 flex h-full flex-col rounded-md bg-white">
      {formIsShowing ? (
        <NewPlayerForm board={board} setFormIsShowing={setFormIsShowing} />
      ) : null}
      {!formIsShowing ? (
        <>
          <div className="overflow-y-scroll">{playersToRender}</div>
          <button
            type="button "
            className="mx-2 border bg-green-500 p-2 text-center text-white"
            onClick={() => handleAddUserClick()}
          >
            Add User
          </button>
        </>
      ) : null}
    </div>
  );
};

export default BoardPlayers;
