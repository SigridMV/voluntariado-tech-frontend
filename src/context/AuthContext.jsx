import { createContext } from "react";

/**
 * AuthContext
 * Contexto React para manejar la autenticación global de usuarios.
 * Provee acceso al estado de usuario actual y funciones relacionadas (login, logout, etc.).
 * 
 * Será usado con un Provider que maneje la lógica de autenticación.
 */
export const AuthContext = createContext(null);




