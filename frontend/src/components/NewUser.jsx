import { useState } from 'react';
import { useCreateUserMutation } from '../app/services/users';

const NewUser = ({ square, setVisibilityState, setNameToAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [venmo, setVenmo] = useState('');
  const [createUser] = useCreateUserMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUser({ name, phone, email, venmo, square });
      console.log(res);
      if (res.data) {
        setVisibilityState('');
        setNameToAdd(res.data.name);
      }
    } catch (err) {
      console.log(err);
    }

    console.log('ehloo');
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
      <h1>New User</h1>
      <input
        className="border border-gray-100 px-2 mb-2"
        placeholder="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-100 px-2 mb-2"
        placeholder="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-gray-100 px-2 mb-2"
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-100 px-2 mb-2"
        placeholder="venmo"
        type="text"
        value={venmo}
        onChange={(e) => setVenmo(e.target.value)}
      />
      <div className="flex w-full justify-around">
        <button
          type="submit"
          className="bg-green-400 text-white rounded px-2 py-1"
        >
          Create
        </button>
        <button
          type="button"
          className="bg-red-400 text-white rounded px-2 py-1"
          onClick={() => setVisibilityState('')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewUser;
