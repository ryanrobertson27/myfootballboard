import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Register = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col bg-slate-50 h-screen items-center">
      <Header />
      <form className="flex m-5 rounded bg-white flex-col w-96 shadow">
        <div className="p-5">
          <div className="text-lg uppercase mb-5">Sign Up</div>
          <div className="flex mb-5">
            <div className="pr-1">
              <div>First</div>
              <input
                type="test"
                className="border border-texas-light-gray rounded w-full px-2 py-1"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>

            <div className="pl-">
              <div>Last</div>
              <input
                type="test"
                className="border border-texas-light-gray rounded w-full px-2 py-1"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5">
            <div>Email</div>
            <input
              type="test"
              className="border border-texas-light-gray rounded w-full px-2 py-1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="bg-texas-dark-blue blue w-full rounded text-texas-white py-1 drop-shadow"
            >
              Sign Up
            </button>
          </div>
          <hr className="mb-5" />
          <div className="flex justify-center">
            <div>
              Already a user?{' '}
              <Link to="/login" className="underline">
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

// First Last
// Email
//
