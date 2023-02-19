import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, useLocation, Outlet } from 'react-router-dom';
import GlobalSpinner from './GlobalSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <GlobalSpinner />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
