import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

/**
 * Componente SchoolInfo
 * Muestra y permite editar la información del colegio asociado al usuario actual.
 * - Obtiene datos desde API al montar el componente.
 * - Permite actualizar el nombre, contacto y teléfono.
 * - Maneja estados de carga, error, éxito y guardado.
 */
export default function SchoolInfo() {
  const { user } = useContext(AuthContext);
  const [school, setSchool] = useState(null);
  const [form, setForm] = useState({
    school_name: "",
    contact_person: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cargar info escuela al montar o cambiar usuario
  useEffect(() => {
    if (!user?.school?.id) return;


    setLoading(true);
    api
      .get(`/school/${user.school.id}`) // Endpoint para obtener info
      .then((res) => {
        setSchool(res.data);
        setForm({
          school_name: res.data.school_name || "",
          contact_person: res.data.contact_person || "",
          phone: res.data.phone || "",
        });
      })
      .catch(() => setError("Error al cargar la información del colegio"))
      .finally(() => setLoading(false));
  }, [user]);

  // Actualiza el estado del formulario al cambiar inputs
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setSuccess(null);
  };

  // Envía los datos modificados a la API para actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.put(`/school/${user.school.id}`, form);
      setSuccess("Information updated successfully.");
    } catch {
      setError("Error al actualizar la información. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  // Estado de carga
  if (loading) return <p className="text-center py-6">Cargando información del colegio...</p>;

  // Si no se encontró la escuela asociada
  if (!school) return <p className="text-center py-6 text-red-600">School information not found.</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">School information</h2>

      {/* Mensajes de error o éxito */}
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
      {success && <p className="mb-4 text-green-600 font-semibold">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulario de información del colegio">
        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">School Name</span>
          <input
            type="text"
            name="school_name"
            value={form.school_name}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Colegio San Diego"
            required
            aria-required="true"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">Contact Person</span>
          <input
            type="text"
            name="contact_person"
            value={form.contact_person}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Juan Pérez"
            required
            aria-required="true"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">Phone Number</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: +56 9 1234 5678"
            aria-describedby="phoneHelp"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          aria-busy={saving}
        >
          {saving ? "Guardando..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

