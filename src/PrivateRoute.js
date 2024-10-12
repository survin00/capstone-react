// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('access_token');
  return (!accessToken ? <Navigate to="/" /> : <Outlet/>)
}

export default PrivateRoute;
