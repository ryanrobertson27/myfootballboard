import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ handleLogin, disabled }) => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email);
  };

  return (
    <form className="flex m-5 rounded bg-white flex-col w-96 shadow">
      <div className="p-5">
        <div className="text-lg uppercase mb-5">Sign Up</div>
        <div className="mb-5">
          <div>Email</div>
          <input
            type="test"
            className="border rounded w-full px-2 py-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            className="bg-blue-600 w-full rounded text-white py-1 drop-shadow"
          >
            Sign Up
          </button>
        </div>
        <hr className="mb-5" />
        <div className="flex justify-center">
          <div>
            Already a user? <Link className="underline">LOGIN</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
