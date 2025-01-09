import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context';
import useAuth from '../hooks/useAuth';


export const AuthProvider = ({ children}) => {
    const auth = useAuth();


  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
