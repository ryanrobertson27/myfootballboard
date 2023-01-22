import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Logout from './Logout';

const Header = () => {
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   console.log(user, user.user, user.loading);
  // }, [user]);

  let userLoggedIn;

  if (user.loading) {
    userLoggedIn = <div>Loading...</div>;
  } else if (!user.user) {
    userLoggedIn = (
      <div className="mr-5">
        <Link
          className="mx-2 bg-texas-white text-texas-orange px-2 py-1 rounded drop-shadow-sm"
          to="/login"
        >
          Login
        </Link>
        {/* <Link
          className="mx-2 bg-texas-white text-texas-orange px-2 py-1 rounded drop-shadow-sm"
          to="/register"
        >
          Register
        </Link> */}
      </div>
    );
  } else {
    userLoggedIn = (
      <div className="flex">
        <div className="px-2">{user.user.email}</div>
        <Logout />
      </div>
    );
  }

  return (
    <div className="w-screen h-14 flex justify-center items-center bg-texas-orange text-texas-white  drop-shadow">
      <div className="flex container justify-between">
        <Link className="ml-5 uppercase" to="/">
          Insert logo
        </Link>
        <div className="flex justify-end">
          <div className="mr-3">{userLoggedIn}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
