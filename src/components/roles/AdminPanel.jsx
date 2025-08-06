import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

/**
 * Componente AdminPanel
 * Panel principal para el usuario con rol administrador.
 * Muestra bienvenida con el nombre o correo del usuario autenticado.
 * Incluye botón para cerrar sesión.
 */
export default function AdminPanel() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel Administrador</h1>
      <p className="text-lg mb-6 text-gray-700">
        Bienvenido, <span className="font-semibold">{user.name || user.email}</span>
      </p>

      {/* Aquí se pueden agregar futuras funcionalidades del panel admin */}

      <button
        onClick={logout}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        aria-label="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

