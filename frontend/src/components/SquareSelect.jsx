import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SquareSelect = () => {
  const [name, setName] = useState('');
  const squares = useSelector((state) => state.squareSelect.squares);

  return (
    <div>
      <form className="flex flex-col items-start border p-4 rounded">
        <div className="mb-4">SQUARES</div>
        <div className="flex flex-wrap mb-4">
          {squares.length > 0
            ? squares.map((el) => (
                <div className="w-10 h-10 border m-2">{el}</div>
              ))
            : 'select squares'}
        </div>
        <div className="mb-4">
          <input type="text" placeholder="name" className="border px-2" />
        </div>
        <div className="flex justify-around w-full mb-4">
          <button type="button" className="border px-3 py-2">
            Confirm
          </button>
          <button type="button" className="border px-3 py-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SquareSelect;
