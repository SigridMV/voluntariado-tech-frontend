import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../services/api";

const locales = {
  en: enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SchoolCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const schoolId = localStorage.getItem("schoolId");
        const projectRes = await api.get(`/projects?schoolId=${schoolId}`, {
          headers,
        });
        const projectEvents = projectRes.data.map((project) => ({
          id: project.id,
          title: `📚 ${project.name}`,
          start: new Date(project.date),
          end: new Date(project.date),
          type: "project",
          description: project.description,
        }));

        const availabilityRes = await api.get("/availability/public");
        const availabilityEvents = availabilityRes.data.map((availability) => ({
          id: availability.id,
          title: `🤝 Availability: ${
            availability.volunteerName || "Volunteer"
          }`,
          start: new Date(availability.start_time),
          end: new Date(availability.end_time),
          type: "availability",
          volunteerName: availability.volunteerName,
          specialties: availability.specialties,
          modality: availability.modality,
          date: availability.date,
        }));

        setEvents([...projectEvents, ...availabilityEvents]);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setBookingMessage(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setBookingMessage(null);
  };

  const handleBooking = async () => {
    if (!selectedEvent) return;
    setLoadingBooking(true);
    setBookingMessage(null);

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await api.post(
        "/booking",
        { availabilityId: selectedEvent.id },
        { headers }
      );

      setBookingMessage("Booking created successfully 🎉");
    } catch (error) {
      console.error("Error creating booking:", error);
      const msg = error.response?.data?.message || "Error creating booking";
      setBookingMessage(msg);
    } finally {
      setLoadingBooking(false);
    }
  };

  return (
    <>
      <div style={{ height: "80vh", padding: "2rem" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="en"
          defaultDate={new Date()} // Aquí se carga el mes y día actual
          onSelectEvent={handleSelectEvent}
          messages={{
            next: "Next",
            previous: "Prev",
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            agenda: "Agenda",
            date: "Date",
            time: "Time",
            event: "Event",
            noEventsInRange: "No events in this range.",
            showMore: (total) => `+ Show more (${total})`,
          }}
        />
      </div>

      {modalOpen && selectedEvent && (
        <div
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
              maxWidth: "500px",
            }}
          >
            <h2>{selectedEvent.title}</h2>
            <p>
              <b>Start:</b> {selectedEvent.start.toLocaleString()} <br />
              <b>End:</b> {selectedEvent.end.toLocaleString()}
            </p>

            {selectedEvent.type === "availability" && (
              <>
                <p>
                  <b>Volunteer:</b> {selectedEvent.volunteerName || "N/A"}
                </p>
                <p>
                  <b>Specialties:</b>{" "}
                  {selectedEvent.specialties
                    ? selectedEvent.specialties.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <b>Modality:</b> {selectedEvent.modality || "N/A"}
                </p>
                <p>
                  <b>Date:</b> {selectedEvent.date || "N/A"}
                </p>

                <button
                  onClick={handleBooking}
                  disabled={
                    loadingBooking ||
                    bookingMessage === "Booking created successfully 🎉"
                  }
                  style={{ marginTop: "1rem" }}
                >
                  {loadingBooking ? "Booking..." : "Book Availability"}
                </button>

                {bookingMessage && (
                  <p
                    style={{
                      marginTop: "1rem",
                      color: bookingMessage.includes("success") ? "green" : "red",
                    }}
                  >
                    {bookingMessage}
                  </p>
                )}
              </>
            )}

            {selectedEvent.type === "project" && (
              <p>
                <b>Description:</b> {selectedEvent.description || "N/A"}
              </p>
            )}

            <button onClick={handleCloseModal} style={{ marginTop: "1rem" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SchoolCalendar;

