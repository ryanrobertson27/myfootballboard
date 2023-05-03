import { useEffect, useState } from "react";
import {
  useGetBoardPlayersByBoardIdQuery,
  useClearBoardMutation,
  useFillBoardMutation,
} from "../app/services/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NewPlayerForm from "./NewPlayerForm";
import MyTextInput from "./MyTextInput";
import { useDispatch } from "react-redux";
import { setDisabled } from "../features/square/squareSlice";
import BoardPlayerSnippet from "./BoardPlayerSnippet";

const BoardPlayers = ({ board }) => {
  const [formIsShowing, setFormIsShowing] = useState(false);
  const dispatch = useDispatch();
  const [clearBoard, { isLoading: clearUpdating }] = useClearBoardMutation();
  const [fillBoard, { isLoading: fillUpdating }] = useFillBoardMutation();

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
    <div className="mt-5 flex-col overflow-hidden rounded-md bg-white">
      {formIsShowing ? (
        <NewPlayerForm board={board} setFormIsShowing={setFormIsShowing} />
      ) : null}
      {!formIsShowing ? (
        <>
          <div className=" h-96 overflow-y-scroll border">
            {playersToRender}
          </div>
          {playersToRender.length < 100 ? (
            <button
              type="button "
              className="mr-2  items-center rounded-md border border-gray-300 bg-violet-600 py-2 px-3 text-center text-sm font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
              onClick={() => handleAddUserClick()}
            >
              Add Player
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default BoardPlayers;
