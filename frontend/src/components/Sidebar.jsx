import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-48 h-screen bg-white flex flex-col items-center justify-between mr-5">
      <div className="p-5 flex flex-col items-center ">
        <div className="flex flex-col items-center mb-10">
          <UserIcon className="w-5 h-5 fill-gray-600" />
          <div className="text-xs">{user.email}</div>
        </div>
        <div className="flex flex-col items-center">
          <NavLink to="/dashboard" className="flex items-center my-3">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard" className="flex items-center my-3">
            Settings
          </NavLink>
          <NavLink to="/dashboard" className="flex items-center my-3">
            Account
          </NavLink>
          <NavLink to="/dashboard" className="flex items-center my-3">
            Test
          </NavLink>
        </div>
      </div>
      <div className="m-5 self-center">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
