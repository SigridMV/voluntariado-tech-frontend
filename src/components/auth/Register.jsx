// src/components/auth/Register.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";                   // Cliente Axios para llamadas API
import { AuthContext } from "../../context/AuthContext"; // Contexto para manejar autenticación global

export default function Register() {
  // Obtener la función login del contexto para guardar token y usuario globalmente
  const { login } = useContext(AuthContext);

  // Estado para manejar formulario con campos: name, email, password y role (por defecto volunteer)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });

  // Estado para manejar errores de validación o API
  const [error, setError] = useState(null);

  // Función para actualizar el estado del formulario cuando se modifican inputs/select
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar recarga de página
    setError(null);      // Limpiar errores previos

    try {
      // Petición POST para registrar usuario enviando todo el formulario
      const res = await api.post("/auth/register", form);

      // Si registro exitoso, guardamos token y usuario en contexto global
      login(res.data.token, res.data.user);
    } catch (err) {
      // En caso de error, mostrar mensaje recibido o uno genérico
      setError(err.response?.data?.message || "Error en registro");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center px-4 py-10 mt-20">
      {/* Contenedor principal centrado */}
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mx-auto">
        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create an account
        </h2>

        {/* Formulario registro */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Input nombre */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Input email */}
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Input contraseña */}
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="new-password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Select para elegir rol */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="volunteer">I am a Volunteer</option>
            <option value="school">School</option>
            <option value="admin">Admin panel</option>
          </select>

          {/* Mensaje de error si existe */}
          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
        </form>

        {/* Link para ir a login si ya tiene cuenta */}
        <p className="mt-6 text-center text-gray-600">
         Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}




