import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Layout from "./components/layout/Layout";
import Home from "./components/pages/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import VolunteerDashboard from "./components/roles/VolunteerDashboard";
import VolunteerTime from "./components/roles/VolunteerTime";
import ProjectsPage from "./components/pages/ProjectsPage";
import SchoolCalendar from "./components/calendar/SchoolCalendar";
import SchoolInfo from "./components/school/SchoolInfo";
import ProjectOverview from "./components/pages/ProjectOverview";

import Unauthorized from "./components/pages/Unauthorized";
import PrivateRoute from "./components/routes/PrivateRoute";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Rutas públicas: login y registro */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />

      {/* Ruta raíz con Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      {/* Rutas protegidas por roles */}

      {/* Voluntario - Panel principal */}
      <Route
        path="/volunteer/dashboard"
        element={
          <PrivateRoute allowedRoles={["volunteer"]}>
            <Layout>
              <VolunteerDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Voluntario - Gestión de disponibilidad */}
      <Route
        path="/volunteer/availability"
        element={
          <PrivateRoute allowedRoles={["volunteer"]}>
            <Layout>
              <VolunteerTime />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Voluntario y Escuela - Proyectos */}
      <Route
        path="/volunteer/projects"
        element={
          <PrivateRoute allowedRoles={["volunteer", "school"]}>
            <Layout>
              <ProjectsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/school/projects"
        element={
          <PrivateRoute allowedRoles={["school"]}>
            <Layout>
              <ProjectsPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Escuela - Calendario de disponibilidad */}
      <Route
        path="/school/calendar"
        element={
          <PrivateRoute allowedRoles={["school"]}>
            <Layout>
              <SchoolCalendar />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Escuela y Voluntario - Información de la escuela */}
      <Route
        path="/school/info"
        element={
          <PrivateRoute allowedRoles={["volunteer", "school"]}>
            <Layout>
              <SchoolInfo />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Página pública - Sobre el proyecto */}
      <Route
        path="/sobre"
        element={
          <Layout>
            <ProjectOverview />
          </Layout>
        }
      />

      {/* Ruta acceso no autorizado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Ruta fallback - 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <div className="p-6 text-center text-2xl font-semibold text-red-600">
              404 - Página no encontrada
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}

