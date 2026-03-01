import axios from 'axios';

console.log("API URL:", import.meta.env.VITE_API_URL);
// Creating the instance with your Render URL
const API = axios.create({ 
  baseURL: "https://chips-backend-qmst.onrender.com/api" 
});

// REQUEST INTERCEPTOR: Automatically attach the token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
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
      // If token expires, clear storage and send to login
      localStorage.clear();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default API;