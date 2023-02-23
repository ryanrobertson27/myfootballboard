import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import Logout from "./Logout";

const Header = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  let userLoggedIn;

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) {
    userLoggedIn = (
      <div className="mx-2 px-4 py-1 text-texas-orange">Login</div>
    );
  } else if (!user) {
    userLoggedIn = (
      <Link className="mx-2 px-4 py-1 text-texas-orange" to="/login">
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

  const activeClassName = `py-1 md:py-0 md:px-4 md:mx-1 md:rounded-full block bg-texas-orange hover:bg-gray-400 hover:text-white`;
  const inactiveClassName =
    "py-1 md:py-0 block md:px-4 md:rounded-full md:mx-1 hover:bg-gray-400 hover:text-white border border-gray-800";

  return (
    <div className="mb-5 flex w-full flex-wrap items-center justify-between bg-texas-dark-gray text-white md:py-0 md:px-4">
      <Link className="ml-5 py-3 uppercase" to="/">
        Insert logo
      </Link>

      <div className="mr-5 flex md:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <nav
        className={`${
          isOpen ? null : "hidden"
        } w-full text-white transition-all duration-300 ease-out md:flex md:w-auto md:items-center`}
      >
        <ul className="flex w-full flex-col items-center md:flex md:flex-row md:justify-between md:pt-0 ">
          <li className="w-full text-center">{userLoggedIn}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
