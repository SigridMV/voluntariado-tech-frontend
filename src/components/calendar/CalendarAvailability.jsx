// src/components/calendar/CalendarAvailability.jsx
import React, { useState, useContext } from "react";
import api from "../../services/api";                   // Cliente Axios para llamadas al backend
import { AuthContext } from "../../context/AuthContext"; // Contexto de autenticación global

export default function CalendarAvailability() {
  // Obtener usuario actual desde el contexto
  const { user } = useContext(AuthContext);

  // Estados para fecha, hora inicio, hora fin y mensajes informativos/error
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState(null);

  // Validar que solo voluntarios puedan acceder a esta pantalla
  if (!user || user.role !== "volunteer") {
    return <p>Access for Volunteers Only</p>;
  }

  // Maneja el envío del formulario para crear nueva disponibilidad
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validar que todos los campos estén completos
    if (!date || !startTime || !endTime) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      // Llamada POST al endpoint /availability con los datos formateados
      await api.post("/availability", {
        volunteer_id: user.id,
        date,
        start_time: `${date}T${startTime}:00.000Z`, // Formato ISO para backend
        end_time: `${date}T${endTime}:00.000Z`,
      });

      setMessage("Availability added successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding availability");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8 border rounded shadow">
      {/* Título */}
      <h2 className="text-xl font-bold mb-4">Set your availability</h2>

      {/* Mensaje informativo o de error */}
      {message && <p className="mb-3">{message}</p>}

      {/* Formulario para ingresar fecha y horas */}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Start time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          End time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        {/* Botón para enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add availability
        </button>
      </form>
    </div>
    
  );
}
