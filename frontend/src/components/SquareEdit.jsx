import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import NewUser from './NewUser';
import UserDropdown from './UserDropdown';
import { useUpdateSquareMutation } from '../app/services/squares';

const SquareEdit = ({ square, setSquareEditVisible }) => {
  const [nameToSearch, setNameToSearch] = useState('');
  const [nameToAdd, setNameToAdd] = useState(null);
  const [visibilityState, setVisibilityState] = useState('');

  const [updateSquare] = useUpdateSquareMutation();

  const handleNewUserClick = () => {
    setVisibilityState('newUser');
  };

  const handleUserSelect = (e) => {
    setNameToAdd(e.target.textContent);
    setVisibilityState('');
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
    case '':
      userInputSection = null;
      break;
    case 'newUser':
      userInputSection = (
        <NewUser
          square={square}
          setVisibilityState={setVisibilityState}
          setNameToAdd={setNameToAdd}
        />
      );
      break;
    case 'userDropdown':
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
    <div className="bg-white text-gray-900 border border-gray-500 shadow-lg absolute left-1/2 transform -translate-x-1/2 w-2xl p-5 rounded-md flex flex-col items-center">
      <div className="flex justify-between mb-5 w-full ">
        <div>Square: {square.index + 1}</div>

        <button
          type="button"
          className=" text-red-600 font-bold border text-sm border-red-600 hover:bg-red-600 hover:text-white px-1 rounded"
          onClick={() => setSquareEditVisible(false)}
        >
          X
        </button>
      </div>
      <div className="mb-1">
        {nameToAdd || (
          <span className="text-gray-500 italic ">Choose User To Add</span>
        )}
      </div>
      {nameToAdd ? (
        <button
          type="submit"
          className="bg-texas-orange text-white px-2 py-1 mt-4 rounded hover:opacity-75"
          onClick={() => handleSquareUpdate()}
        >
          Add User To Square
        </button>
      ) : null}
      {!nameToAdd ? (
        <form
          // onSubmit={handleSquareUpdateClick}
          className="flex flex-col items-center w-full"
        >
          <div className="mb-4">
            <input
              type="text"
              onFocus={() => setVisibilityState('userDropdown')}
              // onBlur={() => setVisibilityState('')}
              placeholder="name"
              className="border border-gray-200 rounded px-2 w-full"
              value={nameToSearch}
              onChange={(e) => setNameToSearch(e.target.value)}
            />
          </div>
        </form>
      ) : null}

      {userInputSection}
      {!nameToAdd ? (
        <>
          <div className="text-gray-400 italic mb-4">- or -</div>
          <button
            onClick={() => handleNewUserClick()}
            type="button"
            className="bg-texas-orange drop-shadow-sm text-white px-4 rounded-full"
          >
            New User
          </button>
        </>
      ) : null}
    </div>
  );
};

export default SquareEdit;
