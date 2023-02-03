import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    <div className="bg-white shadow absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 p-5 rounded">
      <div className="flex justify-between mb-5">
        <div>Square: {square.index + 1}</div>

        <button
          type="button"
          className="bg-texas-orange text-white px-1 rounded"
          onClick={() => setSquareEditVisible(false)}
        >
          X
        </button>
      </div>
      <div className="mb-5">
        Name:{' '}
        {nameToAdd || (
          <span className="text-gray-500 italic ">Choose User To Add</span>
        )}
      </div>
      {nameToAdd ? (
        <button
          type="submit"
          className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-300"
          onClick={() => handleSquareUpdate()}
        >
          Add User To Square
        </button>
      ) : null}
      {!nameToAdd ? (
        <form
          // onSubmit={handleSquareUpdateClick}
          className="flex flex-col items-start"
        >
          <div className="mb-4">
            <input
              type="text"
              onFocus={() => setVisibilityState('userDropdown')}
              // onBlur={() => setVisibilityState('')}
              placeholder="name"
              className="border border-gray-200 rounded px-2"
              value={nameToSearch}
              onChange={(e) => setNameToSearch(e.target.value)}
            />
          </div>
        </form>
      ) : null}

      {userInputSection}
    </div>
  );
};

export default SquareEdit;
