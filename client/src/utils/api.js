import axios from 'axios';
import { getToken } from './auth';

// --- THIS IS THE CRITICAL LINE ---
// It reads the variable from your Vercel settings.
// On your local machine, it will use your client/.env file.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// --- END OF CRITICAL LINE ---

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