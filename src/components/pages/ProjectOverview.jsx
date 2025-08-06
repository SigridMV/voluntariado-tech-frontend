// src/components/pages/ProjectOverview.jsx

import React from "react";

/**
 * Componente que presenta una descripción detallada del proyecto actual.
 * Se utiliza en la sección informativa del sistema para explicar el objetivo, tareas,
 * cronograma y artefactos del proyecto "Tech Volunteer Scheduling App".
 */
const ProjectOverview = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        📝 Descripción del Proyecto
      </h1>

      <div className="grid gap-6">

        {/* Sección: Título del proyecto */}
        <Card title="Título del Proyecto">
          Tech Volunteer Scheduling App
        </Card>

        {/* Sección: Categoría */}
        <Card title="Categoría del Proyecto">
          Desarrollo profesional personal
        </Card>

        {/* Sección: Resumen */}
        <Card title="Resumen del Proyecto">
          Esta aplicación web conecta escuelas con voluntarios tech dispuestos a dar charlas o clases. 
          Usa <strong>React</strong> para el frontend, <strong>Node.js</strong> en el backend y <strong>PostgreSQL</strong> como base de datos, todo desplegado en <strong>Render</strong>.<br /><br />
          Roles disponibles: <em>escuela</em>, <em>voluntario</em> y <em>administrador</em>. Incluye calendario interactivo, formularios de reserva y sistema responsivo.
        </Card>

        {/* Sección: Problema */}
        <Card title="Problema Específico">
          Muchas escuelas no tienen cómo contactar a profesionales tecnológicos voluntarios, limitando el acceso de estudiantes a experiencias reales del sector.
        </Card>

        {/* Sección: Objetivo */}
        <Card title="Objetivo Medible">
          Crear y desplegar una plataforma funcional con autenticación por roles, calendario dinámico y reservas. Se probará con 1 escuela y 3 voluntarios.
        </Card>

        {/* Sección: Objetivos Profesionales */}
        <Card title="Objetivos Profesionales">
          Desarrollar habilidades full-stack, experiencia en autenticación/autorización y liderar un proyecto socialmente impactante.
        </Card>

        {/* Sección: Tareas y tiempo */}
        <Card title="Tareas y Cronograma">
          <ul className="list-disc list-inside space-y-1">
            <li>Investigar plataformas similares – 4h</li>
            <li>Diseñar la base de datos – 4h</li>
            <li>Frontend en React – 12h</li>
            <li>Backend Node.js + PostgreSQL – 10h</li>
            <li>Login y gestión de roles – 6h</li>
            <li>Calendario + reserva – 8h</li>
            <li>Pruebas y mejoras UI – 3h</li>
            <li>Documentación final – 3h</li>
            <li className="font-semibold">⏱ Total estimado: 50 horas</li>
          </ul>
        </Card>

        {/* Sección: Artefactos */}
        <Card title="Artefactos del Proyecto">
          <ul className="list-disc list-inside space-y-1">
            <li>Diagrama ER (en proceso)</li>
            <li>Wireframes y UI (en proceso)</li>
            <li>Código fuente (final)</li>
            <li>Capturas de pantalla (final)</li>
            <li>Documentación técnica (final)</li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

/**
 * Componente reutilizable para mostrar cada sección del proyecto.
 * @param {string} title - Título de la sección.
 * @param {ReactNode} children - Contenido de la sección.
 */
const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-600">
    <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
    <div className="text-gray-800 text-base leading-relaxed">{children}</div>
  </div>
);

export default ProjectOverview;

