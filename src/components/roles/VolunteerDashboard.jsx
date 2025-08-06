import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente VolunteerDashboard
 * Muestra un panel resumen para voluntarios con información básica
 * sobre eventos próximos, horas acumuladas y proyectos activos.
 */
export default function VolunteerDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl mb-6 font-semibold text-gray-900">Panel Voluntario</h1>
      <p className="mb-6 text-gray-700">
        Here you can see a summary of your participation and upcoming events
      </p>

      {/* Tarjeta resumen de actividades */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Activity Summary</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Next event:</strong> Class - 10 Sep</li>
          <li><strong>Hours accumulated this month:</strong> 12</li>
          <li><strong>Active projects:</strong> 3</li>
        </ul>
      </div>

            <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
      
    </div>
  );
}


