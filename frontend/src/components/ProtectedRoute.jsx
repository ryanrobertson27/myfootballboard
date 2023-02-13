import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user, loading);
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // return <Navigate to="/login" state={{ from: location }} />;
    return <div>No user</div>;
  }

  return children;
};

export default ProtectedRoute;
