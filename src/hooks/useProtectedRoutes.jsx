import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

const useProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login');
    }
  }, [isAuthenticated, redirect]);

  return isAuthenticated;
};

export default useProtectedRoutes;
