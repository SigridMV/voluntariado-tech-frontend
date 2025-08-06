import React, { useEffect, useState } from "react";
import api from "../../services/api";

/**
 * Componente ProjectsList
 * Muestra una lista de proyectos obtenidos desde la API.
 * Maneja estados de carga, error y lista vacía.
 */
export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("Error al cargar proyectos:", err);
        setError("No se pudieron cargar los proyectos.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-4">Cargando proyectos...</p>;
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  if (projects.length === 0) {
    return <p className="text-center py-4">No hay proyectos disponibles actualmente.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded p-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <h3 className="text-lg font-semibold text-blue-700">{project.name}</h3>
          <p className="text-gray-700 mt-1">{project.description}</p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Inicio:</strong>{" "}
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "No definido"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Fin:</strong>{" "}
            {project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "No definido"}
          </p>
        </div>
      ))}
    </div>
  );
}


