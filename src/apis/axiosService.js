import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API base URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors if needed
// axiosService.interceptors.request.use(
//     (config) => {
//         // Add auth token if required
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

axiosService.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosService;
