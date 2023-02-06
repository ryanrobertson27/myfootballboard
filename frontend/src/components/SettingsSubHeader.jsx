import { NavLink } from 'react-router-dom';

const SettingsSubHeader = () => {
  const activeClassName =
    'border-b-2 border-b-gray-800 hover:bg-gray-800 hover:text-white px-2 py-1';
  const inactiveClassName = '';

  return (
    <nav className="flex justify-center mb-5 py-1 w-full border-b border-gray-200">
      <ul>
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
      </ul>
    </nav>
  );
};

export default SettingsSubHeader;
