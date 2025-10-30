import axios from 'axios';
import { getToken } from './auth';

// --- NEW DYNAMIC BASE URL ---
// This will be 'http://localhost:5001' on your local machine
// and 'https://namma-sevai-server.onrender.com' (or similar) on Vercel
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
// --- END OF NEW URL ---

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, // Use the dynamic URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;