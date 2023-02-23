import { useState } from "react";

const EditSquare = ({ setEditIsVisible, handleSquareUpdate, idx }) => {
  const [name, setName] = useState("");

  return (
    <form className="absolute z-50 flex flex-col rounded border bg-texas-white p-5">
      <button
        type="button"
        className="self-end"
        onClick={() => setEditIsVisible(false)}
      >
        X
      </button>
      <input
        name="name"
        className="mb-2 rounded border border-texas-light-gray px-2"
        value={name}
        placeholder={`${idx}: ${name || "name"}`}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button">Edit</button>
    </form>
  );
};

export default EditSquare;
