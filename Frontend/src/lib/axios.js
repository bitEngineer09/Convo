import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://convo-rv26.onrender.com/api",
    withCredentials: true
})