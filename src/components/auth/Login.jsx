// src/components/auth/Register.jsx
import React, { useState, useContext } from "react"; 
import { Link } from "react-router-dom";
import api from "../../services/api";            // Cliente axios configurado para llamadas API
import { AuthContext } from "../../context/AuthContext"; // Contexto global para manejo de autenticación

export default function Login() {
  // Obtenemos la función 'login' del contexto para guardar token y usuario globalmente
  const { login } = useContext(AuthContext);

  // Estados locales para controlar email, password y mensaje de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita recargar la página
    setError(null);      // Resetea el error para nuevo intento

    try {
      // Llamada POST al endpoint de login, enviando email y password
      const res = await api.post("/auth/login", { email, password });

      // Si es exitoso, se llama a login para guardar token y usuario en contexto global
      login(res.data.token, res.data.user);

    } catch (err) {
      // Si hay error, se muestra mensaje recibido del backend o un mensaje genérico
      setError(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center px-4 py-10 mt-20">
      {/* Contenedor principal con estilos Tailwind para centrar el formulario */}
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mx-auto">
        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Sign in
        </h2>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Input para correo electrónico */}
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          {/* Input para contraseña */}
          <input
            className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {/* Link para recuperación de contraseña */}
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          {/* Botón para enviar formulario */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Sign in
          </button>
        </form>

        {/* Link para ir a registro si no tiene cuenta */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}



