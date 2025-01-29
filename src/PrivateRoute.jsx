// components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from './utils/utils';

const PrivateRoute = () => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
