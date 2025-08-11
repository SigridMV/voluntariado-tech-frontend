// src/components/calendar/VolunteerAvailability.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function VolunteerAvailability() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availabilityList, setAvailabilityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  async function fetchAvailability() {
    try {
      const res = await api.get("/availability/my");
      setAvailabilityList(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar disponibilidad");
    }
  }

  async function handleAddAvailability(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!date || !startTime || !endTime) {
      setError("Complete todos los campos");
      setLoading(false);
      return;
    }
    if (startTime >= endTime) {
      setError("Hora inicio debe ser menor que hora fin");
      setLoading(false);
      return;
    }

    try {
      await api.post("/availability", {
        date,
        start_time: startTime,
        end_time: endTime,
      });
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchAvailability();
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar disponibilidad");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/availability/${id}`);
      fetchAvailability();
    } catch {
      setError("Error al eliminar");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Gestionar Disponibilidad</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleAddAvailability} className="mb-4">
        <label className="block mb-2">
          Fecha
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Hora Inicio
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Hora Fin
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Agregar Disponibilidad"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Tus Disponibilidades</h3>
      <ul
        style={{ maxHeight: "300px", overflowY: "auto" }}
        className="border rounded p-2"
      >
        {availabilityList.length === 0 && <li>No hay disponibilidad registrada.</li>}
        {availabilityList.map((a) => (
          <li
            key={a.id}
            className="flex justify-between items-center mb-1 border-b p-2"
          >
            <span>
              {a.date} {a.start_time} - {a.end_time} {a.reserved ? "(reservado)" : ""}
            </span>
            {!a.reserved && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "¿Estás seguro que quieres eliminar esta disponibilidad?"
                    )
                  ) {
                    handleDelete(a.id);
                  }
                }}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

