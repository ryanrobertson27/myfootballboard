import { NavLink } from "react-router-dom";

const SettingsSubHeader = () => {
  const activeClassName =
    "bg-texas-orange drop-shadow-sm text-white rounded-full hover:bg-gray-500 hover:text-white px-4 py-1 mx-1";
  const inactiveClassName =
    "bg-gray-100 drop-shadow-sm text-gray-800 rounded-full hover:bg-gray-500 hover:text-white px-4 py-1 mx-1";

  return (
    <nav className="mb-5 -mt-5 flex w-full justify-center border-b border-gray-200 bg-white py-2">
      <ul className="flex">
        <li>
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="test"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Test
          </NavLink>
        </li>
        <li>
          <NavLink
            to="test"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Test
          </NavLink>
        </li>
        <li>
          <NavLink
            to="test"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsSubHeader;
