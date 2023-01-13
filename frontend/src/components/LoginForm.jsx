import { useState } from 'react';

const LoginForm = ({ handleLogin, disabled }) => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email);
  };

  return (
    <form
      className="container w-1/4 rounded flex flex-col border"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center m-4 text-2xl">Login</h1>

      <input
        className="mx-5 mb-5 border px-2 py-1 rounded"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <input
        disabled={disabled}
        className=" mx-5 mb-5 px-2 py-1 bg-slate-600 rounded text-white hover:bg-slate-400"
        type="submit"
        value="Login With Magic Link"
      />
    </form>
  );
};

export default LoginForm;
