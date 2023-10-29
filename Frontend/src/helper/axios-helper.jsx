import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:6543', // your API base URL
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
