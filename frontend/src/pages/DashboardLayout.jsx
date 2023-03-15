import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

import DashboardSidebar from "../components/DashboardSidebar";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-screen w-screen ">
      <div className="absolute top-0">
        <DashboardHeader />
      </div>
      <div></div>
      <div className="mt-12 flex w-screen justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
