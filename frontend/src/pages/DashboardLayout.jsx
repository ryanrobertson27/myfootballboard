import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = () => {
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
