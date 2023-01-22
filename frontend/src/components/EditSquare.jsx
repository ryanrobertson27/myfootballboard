import { useState } from 'react';

const EditSquare = ({ setEditIsVisible, handleSquareUpdate, idx }) => {
  const [name, setName] = useState('');

  return (
    <form className="flex flex-col border rounded p-5 absolute z-50 bg-texas-white">
      <button
        type="button"
        className="self-end"
        onClick={() => setEditIsVisible(false)}
      >
        X
      </button>
      <input
        name="name"
        className="border border-texas-light-gray rounded px-2 mb-2"
        value={name}
        placeholder={`${idx}: ${name || 'name'}`}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button">Edit</button>
    </form>
  );
};

export default EditSquare;
