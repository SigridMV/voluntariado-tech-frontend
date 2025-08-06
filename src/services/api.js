import axios from "axios";

// URL base de la API, configurable vía variable de entorno o fallback local
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Crear instancia de axios con la baseURL configurada
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token Bearer en cada request si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejo de errores antes de enviar la request (por ejemplo errores de configuración)
    return Promise.reject(error);
  }
);

export default api;

