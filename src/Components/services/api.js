import axios from 'axios';

const API_BASE_URL = 'http://localhost:9005/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
};

export const unitsApi = {
  getAll: () => api.get('/units'),
  getOne: (id) => api.get(`/units/${id}`),
  create: (data) => api.post('/units', data),
  update: (id, data) => api.patch(`/units/${id}`, data),
  delete: (id) => api.delete(`/units/${id}`),
};

export const investorsApi = {
  getAll: () => api.get('/investors'),
  getOne: (id) => api.get(`/investors/${id}`),
  create: (data) => api.post('/investors', data),
  update: (id, data) => api.patch(`/investors/${id}`, data),
  delete: (id) => api.delete(`/investors/${id}`),
};

export const expensesApi = {
  getAll: () => api.get('/expenses'),
  getOne: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.patch(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

export const paymentsApi = {
  getAll: () => api.get('/payments'),
  getOne: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.patch(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
};

export const reportsApi = {
  getAll: () => api.get('/reports'),
  getOne: (id) => api.get(`/reports/${id}`),
  create: (data) => api.post('/reports', data),
  update: (id, data) => api.patch(`/reports/${id}`, data),
  delete: (id) => api.delete(`/reports/${id}`),
};

export default api;
