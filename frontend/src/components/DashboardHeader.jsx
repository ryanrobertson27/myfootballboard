import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Logout from "./Logout";
import { ReactComponent as UserIcon } from "../assets/user-icon.svg";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-10 w-screen items-center justify-center bg-white drop-shadow">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          LOGO
        </Link>
        {/* <div className="mb-10 flex flex-col items-center">
          <UserIcon className="mb-3 h-8 w-8 rounded-full  border-2 border-gray-800 fill-gray-800" />
          <div className="text-xs">{user?.email}</div>
        </div> */}
        <div className="flex items-center">
          <NavLink to="/dashboard" className=" flex items-center">
            Dashboard
          </NavLink>

          <NavLink to="/dashboard" className="flex items-center">
            Account
          </NavLink>

          <div className="self-center">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
