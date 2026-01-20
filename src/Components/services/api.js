// // import axios from 'axios';

// // const API_BASE_URL = 'http://localhost:9005/api/v1';
// // const SERVER_BASE_URL = 'http://localhost:9005';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Add a request interceptor to attach the token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Add a response interceptor to fix image URLs
// // api.interceptors.response.use(
// //   (response) => {
// //     // Fix image and invoice URLs if they're relative paths
// //     if (response.data && response.data.data) {
// //       // Handle single unit response
// //       if (response.data.data.unit) {
// //         const unit = response.data.data.unit;
// //         if (unit.images && Array.isArray(unit.images)) {
// //           unit.images = unit.images.map(img => {
// //             if (img && typeof img === 'string' && !img.startsWith('http')) {
// //               return `${SERVER_BASE_URL}${img}`;
// //             }
// //             return img;
// //           });
// //         }
// //         if (unit.invoices && Array.isArray(unit.invoices)) {
// //           unit.invoices = unit.invoices.map(inv => {
// //             if (inv && typeof inv === 'string' && !inv.startsWith('http')) {
// //               return `${SERVER_BASE_URL}${inv}`;
// //             }
// //             return inv;
// //           });
// //         }
// //       }

// //       // Handle array of units
// //       if (response.data.data.units && Array.isArray(response.data.data.units)) {
// //         response.data.data.units = response.data.data.units.map(unit => {
// //           if (unit.images && Array.isArray(unit.images)) {
// //             unit.images = unit.images.map(img => {
// //               if (img && typeof img === 'string' && !img.startsWith('http')) {
// //                 return `${SERVER_BASE_URL}${img}`;
// //               }
// //               return img;
// //             });
// //           }
// //           if (unit.invoices && Array.isArray(unit.invoices)) {
// //             unit.invoices = unit.invoices.map(inv => {
// //               if (inv && typeof inv === 'string' && !inv.startsWith('http')) {
// //                 return `${SERVER_BASE_URL}${inv}`;
// //               }
// //               return inv;
// //             });
// //           }
// //           return unit;
// //         });
// //       }
// //     }

// //     return response;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // export const authApi = {
// //   login: (credentials) => api.post('/auth/login', credentials),
// //   signup: (userData) => api.post('/auth/signup', userData),
// //   getMe: () => api.get('/auth/me'),
// //   updateDetails: (data) => api.patch('/auth/updatedetails', data),
// // };

// // export const unitsApi = {
// //   getAll: () => api.get('/units'),
// //   getOne: (id) => api.get(`/units/${id}`),
// //   create: (data) => api.post('/units', data),
// //   createWithFiles: (formData) => {
// //     // Create a new config object that doesn't include the Content-Type header
// //     // Let axios/browser automatically set it with boundary for FormData
// //     return api.post('/units', formData, {
// //       headers: {
// //         'Content-Type': undefined,
// //       },
// //     });
// //   },
// //   update: (id, data) => api.patch(`/units/${id}`, data),
// //   updateWithFiles: (id, formData) => {
// //     return api.patch(`/units/${id}`, formData, {
// //       headers: {
// //         'Content-Type': undefined,
// //       },
// //     });
// //   },
// //   delete: (id) => api.delete(`/units/${id}`),
// // };

// // export const investorsApi = {
// //   getAll: () => api.get('/investors'),
// //   getOne: (id) => api.get(`/investors/${id}`),
// //   create: (data) => api.post('/investors', data),
// //   update: (id, data) => api.patch(`/investors/${id}`, data),
// //   delete: (id) => api.delete(`/investors/${id}`),
// // };

// // export const expensesApi = {
// //   getAll: () => api.get('/expenses'),
// //   getOne: (id) => api.get(`/expenses/${id}`),
// //   create: (data) => api.post('/expenses', data),
// //   update: (id, data) => api.patch(`/expenses/${id}`, data),
// //   delete: (id) => api.delete(`/expenses/${id}`),
// // };

// // export const paymentsApi = {
// //   getAll: () => api.get('/payments'),
// //   getOne: (id) => api.get(`/payments/${id}`),
// //   create: (data) => api.post('/payments', data),
// //   update: (id, data) => api.patch(`/payments/${id}`, data),
// //   delete: (id) => api.delete(`/payments/${id}`),
// // };

// // export const reportsApi = {
// //   getAll: () => api.get('/reports'),
// //   getOne: (id) => api.get(`/reports/${id}`),
// //   create: (data) => api.post('/reports', data),
// //   update: (id, data) => api.patch(`/reports/${id}`, data),
// //   delete: (id) => api.delete(`/reports/${id}`),
// // };

// // export default api;








// import axios from 'axios';

// // Use environment variables for different environments
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9005/api/v1';
// const SERVER_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:9005';

// console.log('API Configuration:', {
//   API_BASE_URL,
//   SERVER_BASE_URL,
//   environment: process.env.REACT_APP_ENVIRONMENT || 'development'
// });

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000, // 30 seconds timeout
// });

// // Add a request interceptor to attach the token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Log request in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Request:', {
//         url: config.url,
//         method: config.method,
//         data: config.data
//       });
//     }

//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to fix image URLs and handle errors
// api.interceptors.response.use(
//   (response) => {
//     // Log response in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Response:', {
//         url: response.config.url,
//         status: response.status,
//         data: response.data
//       });
//     }

//     // Fix image and invoice URLs if they're relative paths
//     if (response.data && response.data.data) {
//       // Handle single unit response
//       if (response.data.data.unit) {
//         const unit = response.data.data.unit;
//         fixUnitUrls(unit);
//       }

//       // Handle array of units
//       if (response.data.data.units && Array.isArray(response.data.data.units)) {
//         response.data.data.units = response.data.data.units.map(fixUnitUrls);
//       }

//       // Handle single investor response (profile picture)
//       if (response.data.data.investor) {
//         const investor = response.data.data.investor;
//         fixInvestorUrls(investor);
//       }

//       // Handle array of investors
//       if (response.data.data.investors && Array.isArray(response.data.data.investors)) {
//         response.data.data.investors = response.data.data.investors.map(fixInvestorUrls);
//       }
//     }

//     return response;
//   },
//   (error) => {
//     console.error('API Error:', {
//       message: error.message,
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data
//     });

//     // Handle common errors
//     if (error.response) {
//       // Server responded with error status
//       switch (error.response.status) {
//         case 401:
//           // Unauthorized - clear token and redirect to login
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/login';
//           break;
//         case 403:
//           // Forbidden
//           console.error('Access forbidden');
//           break;
//         case 404:
//           // Not found
//           console.error('Resource not found');
//           break;
//         case 500:
//           // Server error
//           console.error('Server error occurred');
//           break;
//         default:
//           console.error(`HTTP error: ${error.response.status}`);
//       }
//     } else if (error.request) {
//       // Request made but no response
//       console.error('No response from server. Check your network connection.');
//     } else {
//       // Something else happened
//       console.error('Request setup error:', error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// // Helper functions to fix URLs
// function fixUnitUrls(unit) {
//   if (!unit) return unit;

//   if (unit.images && Array.isArray(unit.images)) {
//     unit.images = unit.images.map(img => fixUrl(img));
//   }

//   if (unit.invoices && Array.isArray(unit.invoices)) {
//     unit.invoices = unit.invoices.map(inv => fixUrl(inv));
//   }

//   return unit;
// }

// function fixInvestorUrls(investor) {
//   if (!investor) return investor;

//   if (investor.profilePicture && typeof investor.profilePicture === 'string') {
//     investor.profilePicture = fixUrl(investor.profilePicture);
//   }

//   return investor;
// }

// function fixUrl(url) {
//   if (!url || typeof url !== 'string') return url;

//   // If it's already a full URL, return as is
//   if (url.startsWith('http://') || url.startsWith('https://')) {
//     return url;
//   }

//   // If it starts with /uploads, prepend the server base URL
//   if (url.startsWith('/uploads')) {
//     return `${SERVER_BASE_URL}${url}`;
//   }

//   // If it's just a filename, assume it's in uploads
//   if (!url.startsWith('/')) {
//     return `${SERVER_BASE_URL}/uploads/${url}`;
//   }

//   return url;
// }

// // File upload helper
// export const uploadFile = async (file, endpoint, onProgress = null) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress: onProgress
//   };

//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   const response = await api.post(endpoint, formData, config);
//   return response.data;
// };

// // Health check
// export const checkBackendHealth = async () => {
//   try {
//     const response = await axios.get(`${SERVER_BASE_URL}/health`, {
//       timeout: 5000
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Backend health check failed:', error);
//     return {
//       status: 'unhealthy',
//       error: error.message,
//       url: SERVER_BASE_URL
//     };
//   }
// };

// // Export API endpoints
// export const authApi = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   signup: (userData) => api.post('/auth/signup', userData),
//   getMe: () => api.get('/auth/me'),
//   updateDetails: (data) => api.patch('/auth/updatedetails', data),
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }
// };

// export const unitsApi = {
//   getAll: () => api.get('/units'),
//   getOne: (id) => api.get(`/units/${id}`),
//   create: (data) => api.post('/units', data),
//   createWithFiles: (formData, onProgress = null) => {
//     return uploadFile(formData, '/units', onProgress);
//   },
//   update: (id, data) => api.patch(`/units/${id}`, data),
//   updateWithFiles: (id, formData, onProgress = null) => {
//     return uploadFile(formData, `/units/${id}`, onProgress);
//   },
//   delete: (id) => api.delete(`/units/${id}`),
// };

// export const investorsApi = {
//   getAll: () => api.get('/investors'),
//   getOne: (id) => api.get(`/investors/${id}`),
//   create: (data) => api.post('/investors', data),
//   createWithFile: (formData, onProgress = null) => {
//     return uploadFile(formData, '/investors', onProgress);
//   },
//   update: (id, data) => api.patch(`/investors/${id}`, data),
//   updateWithFile: (id, formData, onProgress = null) => {
//     return uploadFile(formData, `/investors/${id}`, onProgress);
//   },
//   delete: (id) => api.delete(`/investors/${id}`),
// };

// export const expensesApi = {
//   getAll: () => api.get('/expenses'),
//   getOne: (id) => api.get(`/expenses/${id}`),
//   create: (data) => api.post('/expenses', data),
//   update: (id, data) => api.patch(`/expenses/${id}`, data),
//   delete: (id) => api.delete(`/expenses/${id}`),
// };

// export const paymentsApi = {
//   getAll: () => api.get('/payments'),
//   getOne: (id) => api.get(`/payments/${id}`),
//   create: (data) => api.post('/payments', data),
//   update: (id, data) => api.patch(`/payments/${id}`, data),
//   delete: (id) => api.delete(`/payments/${id}`),
// };

// export const reportsApi = {
//   getAll: () => api.get('/reports'),
//   getOne: (id) => api.get(`/reports/${id}`),
//   create: (data) => api.post('/reports', data),
//   update: (id, data) => api.patch(`/reports/${id}`, data),
//   delete: (id) => api.delete(`/reports/${id}`),
// };

// // Utility function to get full file URL
// export const getFileUrl = (filename) => {
//   if (!filename) return '';

//   // If already a full URL, return as is
//   if (filename.startsWith('http://') || filename.startsWith('https://')) {
//     return filename;
//   }

//   // If starts with /uploads, prepend base URL
//   if (filename.startsWith('/uploads')) {
//     return `${SERVER_BASE_URL}${filename}`;
//   }

//   // Otherwise, assume it's just a filename
//   return `${SERVER_BASE_URL}/uploads/${filename}`;
// };

// export default api;









// new updated 

// services/api.js - FIXED VERSION FOR RENDER
import axios from 'axios';

// Use environment variables for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9005/api/v1';
const SERVER_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:9005';

console.log('API Configuration:', {
  API_BASE_URL,
  SERVER_BASE_URL,
  environment: process.env.REACT_APP_ENVIRONMENT || 'development'
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data
      });
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to fix image URLs and handle errors
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }

    // Fix image and invoice URLs if they're relative paths
    if (response.data && response.data.data) {
      // Handle single unit response
      if (response.data.data.unit) {
        const unit = response.data.data.unit;
        fixUnitUrls(unit);
      }

      // Handle array of units
      if (response.data.data.units && Array.isArray(response.data.data.units)) {
        response.data.data.units = response.data.data.units.map(fixUnitUrls);
      }

      // Handle single investor response (profile picture)
      if (response.data.data.investor) {
        const investor = response.data.data.investor;
        fixInvestorUrls(investor);
      }

      // Handle array of investors
      if (response.data.data.investors && Array.isArray(response.data.data.investors)) {
        response.data.data.investors = response.data.data.investors.map(fixInvestorUrls);
      }
    }

    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle common errors
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error occurred');
          break;
        default:
          console.error(`HTTP error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server. Check your network connection.');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions to fix URLs
function fixUnitUrls(unit) {
  if (!unit) return unit;

  if (unit.images && Array.isArray(unit.images)) {
    unit.images = unit.images.map(img => fixUrl(img));
  }

  if (unit.invoices && Array.isArray(unit.invoices)) {
    unit.invoices = unit.invoices.map(inv => fixUrl(inv));
  }

  return unit;
}

function fixInvestorUrls(investor) {
  if (!investor) return investor;

  if (investor.profilePicture && typeof investor.profilePicture === 'string') {
    investor.profilePicture = fixUrl(investor.profilePicture);
  }

  return investor;
}

function fixUrl(url) {
  if (!url || typeof url !== 'string') return url;

  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it starts with /uploads, prepend the server base URL
  if (url.startsWith('/uploads')) {
    return `${SERVER_BASE_URL}${url}`;
  }

  // If it's just a filename, assume it's in uploads
  if (!url.startsWith('/')) {
    return `${SERVER_BASE_URL}/uploads/${url}`;
  }

  return url;
}

// REMOVED the broken uploadFile function completely
// The problem was it was wrapping FormData inside another FormData

// Health check
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/health`, {
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return {
      status: 'unhealthy',
      error: error.message,
      url: SERVER_BASE_URL
    };
  }
};

// Export API endpoints
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
  updateDetails: (data) => api.patch('/auth/updatedetails', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const unitsApi = {
  getAll: () => api.get('/units'),
  getOne: (id) => api.get(`/units/${id}`),
  create: (data) => api.post('/units', data),

  // ✅ FIXED: Send FormData directly without wrapping
  createWithFiles: (formData) => {
    return api.post('/units', formData, {
      headers: {
        'Content-Type': undefined, // Let browser set it automatically
      },
    });
  },

  update: (id, data) => api.patch(`/units/${id}`, data),

  // ✅ FIXED: Same fix for update
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

  // ✅ FIXED: Remove the broken file upload function
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

// Utility function to get full file URL
export const getFileUrl = (filename) => {
  if (!filename) return '';

  // If already a full URL, return as is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  // If starts with /uploads, prepend base URL
  if (filename.startsWith('/uploads')) {
    return `${SERVER_BASE_URL}${filename}`;
  }

  // Otherwise, assume it's just a filename
  return `${SERVER_BASE_URL}/uploads/${filename}`;
};

export default api;