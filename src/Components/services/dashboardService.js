// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// // Create axios instance with default config
// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add token to requests
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export const dashboardService = {
//     // Get dashboard statistics
//     getDashboardStats: async () => {
//         try {
//             const response = await api.get('/dashboard/stats');
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching dashboard stats:', error);
//             throw error;
//         }
//     },

//     // Get monthly performance
//     getMonthlyPerformance: async (year) => {
//         try {
//             const params = year ? { year } : {};
//             const response = await api.get('/dashboard/monthly-performance', { params });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching monthly performance:', error);
//             throw error;
//         }
//     },

//     // Get sales summary
//     getSalesSummary: async (startDate, endDate) => {
//         try {
//             const params = {};
//             if (startDate) params.startDate = startDate;
//             if (endDate) params.endDate = endDate;

//             const response = await api.get('/dashboard/sales-summary', { params });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching sales summary:', error);
//             throw error;
//         }
//     },

//     // Get investor performance
//     getInvestorPerformance: async () => {
//         try {
//             const response = await api.get('/dashboard/investor-performance');
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching investor performance:', error);
//             throw error;
//         }
//     }
// };