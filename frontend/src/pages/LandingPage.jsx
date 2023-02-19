import { Navigate, NavLink, Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Logout from '../components/Logout';

const LandingPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  let userLoggedIn;

  if (loading) {
    userLoggedIn = (
      <div className="mx-2 text-texas-orange px-4 py-1">Login</div>
    );
  } else if (!user) {
    userLoggedIn = (
      <Link className="mx-2 text-texas-orange px-4 py-1" to="/login">
        Login
      </Link>
    );
  } else {
    userLoggedIn = (
      <div className="flex">
        {/* <div className="px-2">{user.email}</div> */}
        <Logout />
      </div>
    );
  }

  if (user) {
    return user && <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between w-full md:py-0 md:px-4 text-lg text-white bg-texas-dark-gray mb-5">
        <Link className="ml-5 uppercase py-4" to="/">
          Insert logo
        </Link>

        <div className="md:hidden flex mr-5">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
        <nav
          className={`${
            isOpen ? null : 'hidden'
          } md:flex md:items-center md:w-auto w-full text-white transition-all ease-out duration-300`}
        >
          <ul className="flex flex-col items-center w-full md:flex md:flex-row md:justify-between md:pt-0 ">
            <li className="w-full text-center">{userLoggedIn}</li>
          </ul>
        </nav>
      </div>
      <div className="w-screen flex flex-col items-center">
        <div className="text-4xl font-extrabold">BIG TEXT: CATCHY PHRASE</div>
        <div className="text-xl italic font-light">
          Smaller Text with quick explanation
        </div>
        <Link
          className="bg-blue-400 text-white rounded px-6 py-2"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
