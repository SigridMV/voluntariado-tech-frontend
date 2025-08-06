import React, { useState, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

/**
 * AuthProvider
 * Componente que provee contexto de autenticación global para la app.
 * Maneja estado de usuario, login, logout y persistencia en localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * login
   * Guarda token y datos de usuario en localStorage, configura el header Authorization y actualiza estado.
   * @param {string} token - Token JWT de autenticación
   * @param {object} userData - Información del usuario autenticado
   */
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  /**
   * logout
   * Elimina token y datos de usuario del localStorage, limpia el header y el estado de usuario.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // Al montar el componente, intenta recuperar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



