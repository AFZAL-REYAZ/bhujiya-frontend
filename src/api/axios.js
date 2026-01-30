import axios from 'axios';

// Vite ke env variable ko read karne ka tarika
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL 
});

export default API;