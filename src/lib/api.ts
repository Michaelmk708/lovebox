import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Auto-attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// 2. Response Interceptor: Auto-logout on 401 (Invalid Token)
api.interceptors.response.use(
  (response) => response, // If success, just return data
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid/expired
      console.warn("Session expired or invalid token. Logging out...");
      
      // Clear bad data
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      
      // Redirect to login (window.location is cleaner than useNavigate here)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;