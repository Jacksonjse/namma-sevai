import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
  // --- THIS IS THE FIX ---
  // We add the /api prefix to the base URL
  baseURL: `${API_BASE_URL}/api`, 
  // --- END OF FIX ---
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