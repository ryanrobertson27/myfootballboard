import { useState } from "react";
import { ReactComponent as ExpandMore } from "../assets/expand-more.svg";
import { ReactComponent as ExpandLess } from "../assets/expand-less.svg";
import DeletePlayerModal from "./DeletePlayerModal";

const BoardPlayerSnippet = ({ player }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isConfirmShowing, setIsConfirmShowing] = useState(false);

  const handleSnippetClick = (e) => {
    setIsDropdownShowing(!isDropdownShowing);
  };

  return (
    <div className="m-2 flex flex-col border p-2">
      {isConfirmShowing ? (
        <DeletePlayerModal
          setIsConfirmShowing={setIsConfirmShowing}
          player={player}
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
        <div>
          <div className="text-sm">{player.email}</div>
          <div className="text-sm">{player.phone}</div>
          <div className="text-sm">{player.venmo}</div>
          <div className="flex justify-around">
            <button
              type="button"
              className="mx-1 flex-grow border border-amber-400 px-2 text-amber-400 hover:bg-amber-400 hover:text-white"
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
      ) : null}
    </div>
  );
};

export default BoardPlayerSnippet;
