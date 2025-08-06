import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

/**
 * Componente PrivateRoute
 * Protege rutas según si el usuario está autenticado y tiene roles permitidos.
 * @param {React.ReactNode} children - Elementos hijos que se renderizan si se cumplen permisos.
 * @param {string[]} allowedRoles - Lista de roles permitidos para acceder a la ruta.
 * @returns {React.ReactNode} - Los hijos o redirección a login/unauthorized.
 */
export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario no tiene rol permitido, redirige a página no autorizada
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Si cumple los requisitos, renderiza los hijos
  return children;
}

