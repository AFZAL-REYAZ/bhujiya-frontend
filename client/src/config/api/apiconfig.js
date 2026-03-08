import axios from 'axios';

console.log("API URL:", import.meta.env.VITE_API_URL);
// Creating the instance with your Render URL
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL 
});

// REQUEST INTERCEPTOR: Automatically attach the token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: Catch global errors (like 401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname || "";
      const isAdminPath = currentPath.startsWith("/admin");

      if (!isAdminPath) {
        // User auth flow fallback
        localStorage.removeItem('token');
        window.location.href = "/auth/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
