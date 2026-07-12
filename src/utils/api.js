import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// ─── Axios Instance ──────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor — attach auth token ────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('liquorhub-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor — handle errors globally ──────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('liquorhub-token');
      localStorage.removeItem('liquorhub-auth');
      window.location.href = '/auth/login';
    }

    if (status === 403) {
      console.error('Access denied');
    }

    if (status === 429) {
      console.error('Rate limited. Please wait and try again.');
    }

    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    return Promise.reject({ status, message });
  }
);

// ─── API Endpoints ───────────────────────────────────────────────────────────
// These will be used once the FastAPI backend is connected.
// For now, the frontend uses mock data from src/data/mockData.js

export const authAPI = {
  sendOtp: (phone) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
  getByCategory: (category) =>
    api.get('/products', { params: { category } }),
};

export const orderAPI = {
  place: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
  track: (id) => api.get(`/orders/${id}/track`),
};

export const storeAPI = {
  getNearby: (lat, lng) =>
    api.get('/stores/nearby', { params: { lat, lng } }),
  getById: (id) => api.get(`/stores/${id}`),
};

export const reviewAPI = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  create: (data) => api.post('/reviews', data),
};

export default api;
