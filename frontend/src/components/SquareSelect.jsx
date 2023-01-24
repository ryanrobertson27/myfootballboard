import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateUserMutation } from '../app/services/users';

const SquareSelect = () => {
  const [name, setName] = useState('');
  const squares = useSelector((state) => state.squareSelect.squares);

  const [createUser] = useCreateUserMutation();

  const handleSquareUpdateClick = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(name);
      if (result.data) {
        console.log(result.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSquareUpdateClick}
        className="flex flex-col w-64 items-start p-4 rounded bg-white ml-5 shadow"
      >
        <div className="mb-4">SQUARES</div>
        <div className="flex flex-wrap mb-4">
          {squares.length > 0
            ? squares.map((square) => (
                <div className="w-10 h-10 border m-2 rounded flex justify-center items-center border-texas-orange text-texas-orange">
                  {square.index}
                </div>
              ))
            : 'select squares'}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="name"
            className="border border-gray-200 rounded px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-around w-full">
          <button
            type="submit"
            className="border border-green-400 text-green-400 font-semibold px-3 py-2 rounded bg-white hover:bg-green-400 hover:text-white"
          >
            Confirm
          </button>
          <button
            type="button"
            className="border border-red-400 text-red-400 font-semibold px-3 py-2 rounded bg-white hover:bg-red-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SquareSelect;
