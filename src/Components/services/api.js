// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const handleResponse = async (response) => {
//     const data = await response.json();
//     if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong');
//     }
//     return data;
// };

// // Add token to requests if available
// const getHeaders = () => {
//     const token = localStorage.getItem('token');
//     const headers = {
//         'Content-Type': 'application/json',
//     };
//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }
//     return headers;
// };

// // Dashboard API calls
// export const dashboardApi = {
//     // Get dashboard statistics
//     getDashboardStats: async () => {
//         const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
//             headers: getHeaders(),
//         });
//         return handleResponse(response);
//     },

//     // Get monthly performance
//     getMonthlyPerformance: async (year) => {
//         const url = new URL(`${API_BASE_URL}/dashboard/monthly-performance`);
//         if (year) {
//             url.searchParams.append('year', year);
//         }
//         const response = await fetch(url, {
//             headers: getHeaders(),
//         });
//         return handleResponse(response);
//     },

//     // Get sales summary
//     getSalesSummary: async (startDate, endDate) => {
//         const url = new URL(`${API_BASE_URL}/dashboard/sales-summary`);
//         if (startDate) url.searchParams.append('startDate', startDate);
//         if (endDate) url.searchParams.append('endDate', endDate);

//         const response = await fetch(url, {
//             headers: getHeaders(),
//         });
//         return handleResponse(response);
//     },

//     // Get investor performance
//     getInvestorPerformance: async () => {
//         const response = await fetch(`${API_BASE_URL}/dashboard/investor-performance`, {
//             headers: getHeaders(),
//         });
//         return handleResponse(response);
//     },
// };

// // Utility function for error handling
// export const handleApiError = (error) => {
//     console.error('API Error:', error);
//     // You can add toast notifications here if needed
//     return { success: false, message: error.message };
// };