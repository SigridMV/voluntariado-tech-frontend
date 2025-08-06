// src/components/projects/ProjectList.jsx
import React from "react";

/**
 * Lista de proyectos disponibles para escuelas y voluntarios.
 * 
 * Props:
 * - projects (array): lista de objetos proyecto.
 * - onReserve (function): función para reservar un proyecto (solo para voluntarios).
 * - showVolunteer (boolean): muestra el nombre del voluntario asignado (solo para escuelas).
 */
export default function ProjectList({ projects, onReserve, showVolunteer = false }) {
  if (projects.length === 0) {
    return (
      <p className="text-gray-600 text-center italic">
        No hay proyectos por ahora. ¡Empieza uno!
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition"
        >
          {/* Nombre del proyecto */}
          <h3 className="text-2xl font-semibold text-blue-700 mb-1">{project.name}</h3>

          {/* Descripción del proyecto */}
          <p className="text-gray-800 mb-2">{project.description}</p>

          {/* Fecha y horario */}
          <p className="text-sm text-gray-600 mb-2">
            📅 <strong>{project.date}</strong> &nbsp; | &nbsp; 🕒{" "}
            {project.startTime} - {project.endTime}
          </p>

          {/* Información del voluntario asignado (si aplica) */}
          {showVolunteer && project.reservedName && (
            <p className="text-green-700 font-medium text-sm">
              ✅ Aceptado por: <span className="font-semibold">{project.reservedName}</span>
            </p>
          )}

          {/* Botón de reserva para voluntarios */}
          {!showVolunteer && !project.reservedBy && (
            <div className="mt-4">
              <button
                onClick={() => onReserve(project.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Reservar
              </button>
            </div>
          )}

          {/* Estado si ya fue reservado por otro */}
          {!showVolunteer && project.reservedBy && (
            <p className="mt-3 text-sm text-red-500 font-medium">
              Este proyecto ya fue reservado por otro voluntario.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

