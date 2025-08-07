// src/components/projects/ProjectForm.jsx
import React, { useState } from "react";

/**
 * Componente de formulario para crear un nuevo proyecto.
 * Accesible solo por usuarios con rol "school".
 * 
 * Props:
 * - onAdd (function): función para agregar un nuevo proyecto al estado principal.
 */
export default function ProjectForm({ onAdd, schoolId }) {
  // Estado local para almacenar los valores del formulario
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Maneja los cambios en los inputs y actualiza el estado
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...form,
      id: Date.now(), // Generar ID único (temporal)
      schoolId: schoolId,
    };
    onAdd(newProject); // Llama al callback del padre
    setForm({ name: "", description: "", date: "", startTime: "", endTime: "" }); // Reiniciar formulario
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Nombre del Proyecto
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="¿Cómo se llama tu proyecto?"
          className="w-full border rounded p-2"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="¿De qué se trata?"
          className="w-full border rounded p-2"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block font-medium mb-1">
          Fecha
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="w-full border rounded p-2"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="startTime" className="block font-medium mb-1">
            Hora de Inicio
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            className="w-full border rounded p-2"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="endTime" className="block font-medium mb-1">
            Hora de Término
          </label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            className="w-full border rounded p-2"
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Crear Proyecto
        </button>
      </div>
    </form>
  );
}

