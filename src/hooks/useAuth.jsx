import { useReducer, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { authReducer, initialState } from '../store/authReducer';
import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {
  const [state, localDispatch] = useReducer(authReducer, initialState);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const access_token = localStorage.getItem('token');
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      const tokenNew = jwtDecode(access_token);
      const now = Math.floor(Date.now() / 1000);

      if (tokenNew.exp < now) {
        dispatch({ type: 'LOGOUT' });
        redirect('/login'); // Redirection en cas d'expiration du token
      } else {
        
        const roles = tokenNew.roles || []; // Assure-toi que les rôles sont dans le token
        dispatch({ type: 'LOGIN', payload: { token: access_token } });
        redirect('/'); // Rediriger vers la page d'accueil
      }
    } else {
      redirect("/login");
    }
  }, [access_token, dispatch, redirect]);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated, redirect]);

  const login = (token) => {
    localStorage.setItem('token', token);
    const tokenDecoded = jwtDecode(token);
    // const modele = tokenDecoded.modele[0] || [];
    // const roles = tokenDecoded.roles || [];
    dispatch({ type: 'LOGIN', payload: { token } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    redirect("/login");
  };

  return {
    ...state,
    login,
    logout,
  };
};

export default useAuth;
