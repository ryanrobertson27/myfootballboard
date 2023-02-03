import { NavLink } from 'react-router-dom';

const HorizontalNav = () => {
  const activeClassName = `mx-2 my-1 px-2 py-1 text-white bg-gray-800 hover:bg-texas-orange hover:text-white rounded-md`;
  const inactiveClassName =
    'mx-2 my-1 px-2 py-1 text-gray-900 hover:bg-texas-orange hover:text-white rounded-md';

  return (
    <nav className="w-full flex justify-center items-center border-b bg-white py-2 drop-shadow-sm mb-5">
      <ul className="flex ">
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
