import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Logout from './Logout';

const Header = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user, user.user, user.loading);
  }, [user]);

  let userLoggedIn;

  if (user.loading) {
    userLoggedIn = <div>Loading...</div>;
  } else if (!user.user) {
    userLoggedIn = (
      <div className="mr-5">
        <Link className="mx-2" to="/login">
          Login
        </Link>
        <Link className="mx-2" to="/register">
          Register
        </Link>
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
    <div className="w-screen h-20 flex justify-center items-center bg-slate-600 text-white mb-5">
      <div className="flex container justify-between">
        <Link className="ml-5" to="/">
          HOME
        </Link>
        <div className="flex justify-end">
          <div className="mr-3">{userLoggedIn}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
