import React from "react";
import CalendarAvailability from "../calendar/CalendarAvailability";

/**
 * Componente VolunteerDashboard
 * Muestra el calendario de disponibilidad para que el voluntario
 * pueda gestionar y ver sus horarios disponibles.
 */
export default function VolunteerDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen rounded shadow">
      <h1 className="text-3xl mb-6 font-semibold text-gray-900">When are you available?</h1>
      <CalendarAvailability />
    </div>
  );
}
