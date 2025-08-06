import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-red-600">401 - No Autorizado</h1>
      <p className="text-lg mb-4">No tienes permisos para acceder a esta página.</p>
      <Link
        to="/login"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Volver al inicio de sesión
      </Link>
    </div>
  );
};

export default Unauthorized;


