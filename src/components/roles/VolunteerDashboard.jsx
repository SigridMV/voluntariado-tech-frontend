import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarAvailability from "../calendar/CalendarAvailability";
import api from "../../services/api";

export default function VolunteerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoadingBookings(true);
      setErrorBookings(null);
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch {
        setErrorBookings("Error loading bookings");
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Volunteer Dashboard</h1>

      <h2 className="text-xl font-semibold mt-10 mb-4">
        Bookings made by schools
      </h2>

      {loadingBookings && <p>Loading bookings...</p>}
      {errorBookings && <p className="text-red-600">{errorBookings}</p>}

      {bookings.length === 0 && !loadingBookings && (
        <p>You have no bookings yet.</p>
      )}

      <ul className="border rounded p-4 max-h-64 overflow-auto">
        {bookings.map((booking) => (
          <li key={booking.id} className="mb-3 border-b pb-2">
            <p>
              <b>Date:</b>{" "}
              {new Date(booking.availability.date).toLocaleDateString()}
            </p>
            <p>
              <b>Start Time:</b>{" "}
              {new Date(booking.availability.start_time).toLocaleTimeString()}
            </p>
            <p>
              <b>End Time:</b>{" "}
              {new Date(booking.availability.end_time).toLocaleTimeString()}
            </p>
            <p>
              <b>School that booked:</b> {booking.school?.school_name || "N/A"}
            </p>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

