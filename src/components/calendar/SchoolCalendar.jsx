// src/components/calendar/SchoolCalendar.jsx
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar"; // Calendario visual con soporte para localización
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es"; // Localización al español
import "react-big-calendar/lib/css/react-big-calendar.css"; // Estilos por defecto para react-big-calendar
import api from "../../services/api"; // Instancia axios configurada para llamadas API

// Configuración de localización para el calendario
const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SchoolCalendar = () => {
  const [events, setEvents] = useState([]); // Estado para almacenar eventos (proyectos)

  useEffect(() => {
    // Función para obtener proyectos desde la API
    const fetchProjects = async () => {
      try {
        // Obtener token JWT desde localStorage para autorización
        const token = localStorage.getItem("token");
        const schoolId = localStorage.getItem("schoolId");
        const response = await api.get(`/projects?schoolId=${schoolId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projects = response.data;

        // Mapear los proyectos a eventos compatibles con react-big-calendar
        const formattedEvents = projects.map((project) => ({
          title: project.name,
          start: new Date(project.date), // Asegúrate que project.date sea ISO o formato válido para Date()
          end: new Date(project.date),   // El evento dura un día; para eventos con duración, ajustar end
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
        // Opcional: podrías manejar un estado de error para mostrar en UI
      }
    };

    fetchProjects();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div style={{ height: "80vh", padding: "2rem" }}>
      <Calendar
        localizer={localizer} // Configuración de localización para fechas y formatos
        events={events}       // Eventos a mostrar en el calendario
        startAccessor="start" // Campo que indica inicio del evento
        endAccessor="end"     // Campo que indica fin del evento
        culture="es"          // Cultura para textos y formato
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango.",
          showMore: (total) => `+ Ver más (${total})`,
        }} // Traducción de textos del calendario
      />
    </div>
  );
};

export default SchoolCalendar;


