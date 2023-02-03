import { NavLink } from 'react-router-dom';

const VerticalNav = () => {
  const activeClassName = `flex flex-col h-full text-center mx-2 my-1 px-2 py-1 text-white border-b-2 hover:bg-white hover:text-gray-800`;
  const inactiveClassName =
    ' mx-2 my-1 px-2 py-1 white hover:bg-white hover:text-gray-800';

  return (
    <nav className="hidden md:flex h-full justify-center items-center">
      <ul className="flex items-center h-full">
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

export default VerticalNav;
