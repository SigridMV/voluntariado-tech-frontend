// src/components/pages/ProjectsPage.jsx

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProjectForm from "../projects/ProjectForm";
import ProjectList from "../projects/ProjectList";

/**
 * Página de gestión de proyectos.
 * - Para usuarios con rol "school", permite crear y ver proyectos propios reservados.
 * - Para usuarios con rol "volunteer", permite ver proyectos disponibles para reservar.
 */
export default function ProjectsPage() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  /**
   * Cargar proyectos guardados desde localStorage al cargar la página.
   */
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  /**
   * Filtrar los proyectos que pertenecen a la escuela actual.
   */
  const filtered = projects.filter((p) => p.schoolId === user.schoolId);

  /**
   * Agregar un nuevo proyecto y actualizar localStorage.
   * @param {Object} newProject - Proyecto a agregar.
   */
  const handleAddProject = (newProject) => {
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  /**
   * Marcar un proyecto como reservado por un voluntario.
   * @param {string} projectId - ID del proyecto reservado.
   */
  const handleReserve = (projectId) => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? { ...p, reservedBy: user.id, reservedName: user.name }
        : p
    );

    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    alert("¡Reserva confirmada!");
  };

  /**
   * Determinar qué proyectos mostrar:
   * - Escuela: proyectos propios que han sido reservados.
   * - Voluntario: proyectos no reservados por nadie.
   */
const visibleProjects =
  user?.role === "school"
    ? filtered // Todos los proyectos de esa escuela
    : projects.filter((p) => !p.reservedBy); // Voluntarios ven proyectos no reservados

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        📁 My Projects
      </h1>

      {/* Solo escuelas pueden crear proyectos */}
      {user?.role === "school" && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ➕ Add Project
          </h2>
          <ProjectForm onAdd={handleAddProject} schoolId={user.schoolId} />
        </section>
      )}

      {/* Listado de proyectos según el rol */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {user?.role === "school"
            ? "📋 Reserved Projects"
            : "🔍 Available Projects"}
        </h2>

        <ProjectList
          projects={visibleProjects}
          onReserve={handleReserve}
          showVolunteer={user?.role === "school"}
        />
      </section>
    </div>
  );
}


