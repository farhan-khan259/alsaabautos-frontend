import axios from 'axios';

const API_BASE_URL = 'http://localhost:9005/api/v1';
const SERVER_BASE_URL = 'http://localhost:9005';

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

// Add a response interceptor to fix image URLs
api.interceptors.response.use(
  (response) => {
    // Fix image and invoice URLs if they're relative paths
    if (response.data && response.data.data) {
      // Handle single unit response
      if (response.data.data.unit) {
        const unit = response.data.data.unit;
        if (unit.images && Array.isArray(unit.images)) {
          unit.images = unit.images.map(img => {
            if (img && typeof img === 'string' && !img.startsWith('http')) {
              return `${SERVER_BASE_URL}${img}`;
            }
            return img;
          });
        }
        if (unit.invoices && Array.isArray(unit.invoices)) {
          unit.invoices = unit.invoices.map(inv => {
            if (inv && typeof inv === 'string' && !inv.startsWith('http')) {
              return `${SERVER_BASE_URL}${inv}`;
            }
            return inv;
          });
        }
      }

      // Handle array of units
      if (response.data.data.units && Array.isArray(response.data.data.units)) {
        response.data.data.units = response.data.data.units.map(unit => {
          if (unit.images && Array.isArray(unit.images)) {
            unit.images = unit.images.map(img => {
              if (img && typeof img === 'string' && !img.startsWith('http')) {
                return `${SERVER_BASE_URL}${img}`;
              }
              return img;
            });
          }
          if (unit.invoices && Array.isArray(unit.invoices)) {
            unit.invoices = unit.invoices.map(inv => {
              if (inv && typeof inv === 'string' && !inv.startsWith('http')) {
                return `${SERVER_BASE_URL}${inv}`;
              }
              return inv;
            });
          }
          return unit;
        });
      }
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
  updateDetails: (data) => api.patch('/auth/updatedetails', data),
};

export const unitsApi = {
  getAll: () => api.get('/units'),
  getOne: (id) => api.get(`/units/${id}`),
  create: (data) => api.post('/units', data),
  createWithFiles: (formData) => {
    // Create a new config object that doesn't include the Content-Type header
    // Let axios/browser automatically set it with boundary for FormData
    return api.post('/units', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
  },
  update: (id, data) => api.patch(`/units/${id}`, data),
  updateWithFiles: (id, formData) => {
    return api.patch(`/units/${id}`, formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
  },
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
