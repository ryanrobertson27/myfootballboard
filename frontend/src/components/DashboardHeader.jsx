import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Logout from "./Logout";
import { ReactComponent as Logo } from "../assets/main-logo-landscape.svg";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-16 w-screen items-center justify-center bg-white drop-shadow">
      <div className="container flex items-center justify-between">
        <div className="">
          <Logo className="h-auto w-32" />
        </div>
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
