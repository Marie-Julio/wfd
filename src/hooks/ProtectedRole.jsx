import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { useSelector } from 'react-redux';

const ProtectedRole = ({ allowedRoles }) => {
  // const { modele } = useAuthContext();  // Assure-toi que le contexte renvoie bien les rôles
  const modele = useSelector((state) => state.auth.modele);

  const hasAccess = () => {
    if (!modele || !Array.isArray(modele)) {
      // console.warn("Les rôles de l'utilisateur ne sont pas disponibles ou ne sont pas dans le format attendu.");
      return false;
    }

    // Affiche les rôles de l'utilisateur pour debug
    // console.log("Rôles de l'utilisateur:", modele);
    
    // Vérifie si l'un des rôles de l'utilisateur est dans allowedRoles
    return modele.some(role => allowedRoles.includes(role.nomc));
  };

  // Si l'utilisateur a les bons rôles, retourne l'Outlet, sinon redirection vers "/unauthorized"
  return hasAccess() ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRole;
