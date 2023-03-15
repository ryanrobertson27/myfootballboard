import { useState, useEffect } from "react";
import { useFormik } from "formik";
import NewUser from "./NewUser";
import UserDropdown from "./UserDropdown";
import { useUpdateSquareMutation } from "../app/services/api";

const SquareEdit = ({ square, setSquareEditVisible }) => {
  const [nameToSearch, setNameToSearch] = useState("");
  const [nameToAdd, setNameToAdd] = useState(null);
  const [visibilityState, setVisibilityState] = useState("");

  const [updateSquare] = useUpdateSquareMutation();

  const handleNewUserClick = () => {
    setVisibilityState("newUser");
  };

  const handleUserSelect = (e) => {
    setNameToAdd(e.target.textContent);
    setVisibilityState("");
  };

  const handleSquareUpdate = async () => {
    try {
      const res = await updateSquare({ name: nameToAdd, id: square.id });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  let userInputSection;

  switch (visibilityState) {
    case "":
      userInputSection = null;
      break;
    case "newUser":
      userInputSection = (
        <NewUser
          square={square}
          setVisibilityState={setVisibilityState}
          setNameToAdd={setNameToAdd}
        />
      );
      break;
    case "userDropdown":
      userInputSection = (
        <UserDropdown
          nameToSearch={nameToSearch}
          handleNewUserClick={handleNewUserClick}
          handleUserSelect={handleUserSelect}
        />
      );
      break;
    default:
      userInputSection = null;
  }

  return (
    <div className="w-2xl absolute left-1/2 flex -translate-x-1/2 transform flex-col items-center rounded-md border border-gray-500 bg-white p-5 text-gray-900 shadow-lg">
      <div className="mb-5 flex w-full justify-between ">
        <div>Square: {square.index + 1}</div>

        <button
          type="button"
          className=" rounded border border-red-600 px-1 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white"
          onClick={() => setSquareEditVisible(false)}
        >
          X
        </button>
      </div>
      <div className="mb-1">
        {nameToAdd || (
          <span className="text-sm italic text-gray-500">
            Search User To Add
          </span>
        )}
      </div>
      {nameToAdd ? (
        <button
          type="submit"
          className="mt-4 rounded bg-texas-orange px-2 py-1 text-white hover:opacity-75"
          onClick={() => handleSquareUpdate()}
        >
          Add User To Square
        </button>
      ) : null}
      {!nameToAdd ? (
        <form
          // onSubmit={handleSquareUpdateClick}
          className="flex w-full flex-col items-center"
        >
          <div className="mb-4">
            <input
              type="text"
              onFocus={() => setVisibilityState("userDropdown")}
              // onBlur={() => setVisibilityState('')}
              placeholder="name"
              className="w-full rounded border border-gray-200 px-2"
              value={nameToSearch}
              onChange={(e) => setNameToSearch(e.target.value)}
            />
          </div>
        </form>
      ) : null}

      {userInputSection}
      {!nameToAdd ? (
        <>
          <div className="mb-4 italic text-gray-400">- or -</div>
          <button
            onClick={() => handleNewUserClick()}
            type="button"
            className="rounded-full bg-texas-orange px-4 text-white drop-shadow-sm"
          >
            New User
          </button>
        </>
      ) : null}
    </div>
  );
};

export default SquareEdit;
