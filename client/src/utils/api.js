import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  // ✅ Add the `/api` path here (your env URL doesn’t include it)
  baseURL: `${API_BASE_URL}api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach token if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
