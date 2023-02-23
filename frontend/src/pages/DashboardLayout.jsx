import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-screen">
      <DashboardHeader />
      <div className="flex h-screen justify-center">
        <div className="container flex  justify-center  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
