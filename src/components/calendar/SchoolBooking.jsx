// src/components/calendar/SchoolBooking.jsx
import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";                       // Cliente API para hacer requests al backend
import CalendarAvailability from "../calendar/CalendarAvailability"; // Componente para mostrar disponibilidad
import BookingForm from "./BookingForm";                    // Formulario para crear una reserva

export default function SchoolBooking() {
  // Estados para datos y filtros
  const [availabilities, setAvailabilities] = useState([]); // Slots disponibles
  const [selectedSlot, setSelectedSlot] = useState(null);   // Slot seleccionado para reservar
  const [specialty, setSpecialty] = useState("");           // Filtro especialidad
  const [modality, setModality] = useState("");             // Filtro modalidad
  const [date, setDate] = useState("");                      // Filtro fecha
  const [error, setError] = useState(null);                  // Mensajes de error

  // Función memoizada para obtener disponibilidad según filtros
  const fetchAvailabilities = useCallback(async () => {
    setError(null);
    try {
      const query = new URLSearchParams();

      // Agregar filtros solo si están definidos
      if (specialty) query.append("specialty", specialty);
      if (modality) query.append("modality", modality);
      if (date) query.append("date", date);

      // Llamada GET al backend con filtros en query string
      const res = await api.get(`/availability/available?${query.toString()}`);
      setAvailabilities(res.data); // Actualiza estado con datos recibidos
    } catch {
      setError("Error al cargar disponibilidad");
    }
  }, [specialty, modality, date]); // Dependencias para refrescar datos al cambiar filtros

  // useEffect para disparar la carga de disponibilidad cuando cambian los filtros
  useEffect(() => {
    fetchAvailabilities();
  }, [fetchAvailabilities]);

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* Filtros: especialidad, modalidad y fecha */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Especialidad</option>
          <option value="fullstack">Desarrollo FullStack</option>
          <option value="arquitectura">Arquitectura</option>
          <option value="nube">Nube</option>
        </select>

        <select
          className="border rounded p-2"
          value={modality}
          onChange={(e) => setModality(e.target.value)}
        >
          <option value="">Modalidad</option>
          <option value="presencial">Presencial</option>
          <option value="virtual">Virtual</option>
        </select>

        <input
          type="date"
          className="border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Mostrar error si existe */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar calendario con disponibilidad */}
      <CalendarAvailability
        availabilities={availabilities}
        onSlotSelect={setSelectedSlot} // Al seleccionar un slot actualiza estado
      />

      {/* Mostrar formulario de reserva si hay slot seleccionado */}
      {selectedSlot && (
        <BookingForm
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)} // Cerrar formulario limpia selección
        />
      )}
    </div>
  );
}


