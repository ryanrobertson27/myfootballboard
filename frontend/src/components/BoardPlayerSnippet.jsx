import { useState } from "react";
import { ReactComponent as ExpandMore } from "../assets/expand-more.svg";
import { ReactComponent as ExpandLess } from "../assets/expand-less.svg";
import MyTextInput from "./MyTextInput";
import DeletePlayerModal from "./DeletePlayerModal";
import EditBoardPlayerSnippet from "./EditBoardPlayerSnippet";

const BoardPlayerSnippet = ({ player }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isConfirmShowing, setIsConfirmShowing] = useState(false);
  const [isEditShowing, setIsEditShowing] = useState(false);

  const handleEditClick = (e) => {
    setIsEditShowing(true);
  };

  const handleSnippetClick = (e) => {
    setIsDropdownShowing(!isDropdownShowing);
  };

  return (
    <div className="m-2 flex flex-col border p-2">
      {isConfirmShowing ? (
        <DeletePlayerModal
          setIsConfirmShowing={setIsConfirmShowing}
          player={player}
          setIsDropdownShowing={setIsDropdownShowing}
        />
      ) : null}
      <div className="flex justify-between">
        <div>
          {player.first} {player.last}
        </div>
        <button
          type="button"
          onClick={(e) => handleSnippetClick(e)}
          className="self-center"
        >
          {isDropdownShowing ? (
            <ExpandLess className="mr-2 h-3 w-5" />
          ) : (
            <ExpandMore className="mr-2 h-3 w-5" />
          )}
        </button>
      </div>
      {isDropdownShowing ? (
        isEditShowing ? (
          <EditBoardPlayerSnippet
            player={player}
            setIsEditShowing={setIsEditShowing}
          />
        ) : (
          <div>
            <hr className="my-1" />
            <div className="mb-1 ml-1 text-sm">Email: {player.email}</div>
            <div className="mb-1 ml-1 text-sm">Phone: {player.phone}</div>
            <div className="mb-1 ml-1 text-sm">Venmo: {player.venmo}</div>
            <hr className="my-1" />
            <div className="mt-2 flex justify-around">
              <button
                type="button"
                className="mx-1 flex-grow border border-violet-600 px-2 text-violet-600 hover:bg-violet-600 hover:text-white"
                onClick={() => setIsEditShowing(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="mx-1 flex-grow border border-red-600 px-2 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => setIsConfirmShowing(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default BoardPlayerSnippet;
