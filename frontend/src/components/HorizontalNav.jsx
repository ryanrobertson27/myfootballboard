import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const HorizontalNav = () => {
  const user = useSelector((state) => state.user);

  let userLoggedIn;

  if (user.loading) {
    userLoggedIn = <div>Loading...</div>;
  } else if (!user.user) {
    userLoggedIn = (
      <Link
        className="mx-2 bg-gray-800 text-texas-orange px-4 py-1 rounded-full  border-2 border-texas-orange drop-shadow-sm"
        to="/login"
      >
        Login
      </Link>
    );
  } else {
    userLoggedIn = (
      <div className="flex">
        <div className="px-2">{user.user.email}</div>
        <Logout />
      </div>
    );
  }

  const handleDropDown = () => {
    console.log('hello');
  };

  const activeClassName = `text-white bg-texas-orange hover:bg-texas-orange hover:text-white rounded-full`;
  const inactiveClassName =
    'text-white shadow hover:bg-gray-500 hover:text-white rounded-full border border-gray-800';

  return (
    <nav className=" md:flex w-full py-2">
      <ul className="md:flex ">
        <li className="">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Board
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalNav;
