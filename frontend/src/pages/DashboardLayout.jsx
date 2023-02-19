import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 h-screen bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
