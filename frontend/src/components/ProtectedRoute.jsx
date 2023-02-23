import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, Route, useLocation, Outlet } from "react-router-dom";
import GlobalSpinner from "./GlobalSpinner";
import DashboardLayout from "../pages/DashboardLayout";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <GlobalSpinner />;
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
