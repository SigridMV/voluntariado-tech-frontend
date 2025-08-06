import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

/**
 * Componente principal de la página de inicio.
 * Muestra una bienvenida general para usuarios no autenticados
 * y un panel personalizado con accesos rápidos para usuarios autenticados.
 */
export default function Home() {
  const { user } = useContext(AuthContext);

  // === Vista para usuarios NO autenticados ===
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 mt-10">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-xl text-center">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
            Welcome to <span className="text-blue-600">Tech Volunteering</span>
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            DevLunteer is a platform that connects developers and technology
            enthusiasts with volunteering opportunities. It efficiently manages
            projects, availability, and attendance, promoting the use of tech
            talent to create social impact.
          </p>

          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  // === Vista para usuarios AUTENTICADOS ===
  return (
    <div className="w-full bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md max-w-3xl w-full p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          👋 Hi, <span className="text-blue-600">{user.name}</span>
        </h1>

        <p className="mb-8 text-gray-700 text-lg">
          Welcome to your dashboard for{" "}
          <span className="capitalize">{user.role}</span>. Here you can access the features specific to your profile.
        </p>

        {/* === Paneles por rol === */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* ADMIN */}
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="block p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center font-semibold"
            >
              🛠 Admin Dashboard
            </Link>
          )}

          {/* VOLUNTARIO */}
          {user.role === "volunteer" && (
            <>
              <Link
                to="/volunteer/dashboard"
                className="block p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center font-semibold"
              >
                🤝 Volunteer Dashboard
              </Link>
              <Link
                to="/volunteer/availability"
                className="block p-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-center font-semibold"
              >
                📅 Manage Availability
              </Link>
              <Link
                to="/volunteer/projects"
                className="block p-6 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-500 transition text-center font-semibold"
              >
                📋 View Projects
              </Link>
            </>
          )}

          {/* ESCUELA */}
          {user.role === "school" && (
            <>
              <Link
                to="/school/calendar"
                className="block p-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition text-center font-semibold"
              >
                📅 View Volunteers' Availability
              </Link>
              <Link
                to="/school/projects"
                className="block p-6 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition text-center font-semibold"
              >
                📋 My School's Projects
              </Link>
              <Link
                to="/school/info"
                className="block p-6 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition text-center font-semibold"
              >
                🏫 My School Info
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
