import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Logout from "./Logout";
import { ReactComponent as Logo } from "../assets/footballsquareslogo.svg";
import logo from "../assets/footballsquareslogo.png";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-16 w-screen items-center justify-center bg-white drop-shadow">
      <div className="container flex items-center justify-between">
        <div className="">
          <img className="h-10 w-auto" src={logo} />
        </div>
        {/* <div className="mb-10 flex flex-col items-center">
          <UserIcon className="mb-3 h-8 w-8 rounded-full  border-2 border-gray-800 fill-gray-800" />
          <div className="text-xs">{user?.email}</div>
        </div> */}
        <div className="flex items-center">
          <div className="self-center">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
