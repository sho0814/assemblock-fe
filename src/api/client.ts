import axios from 'axios';
import { useAuthStore } from '@stores';

// 엑세스토큰 필요없는 api
// import api from './client';
// const fetchbBlocks = () => api.get('/blocks');
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


// 엑세스토큰 필요한 api
// import apiAuth from './authClient';
// const fetchUserBlocks = () => apiAuth.get('/user/blocks');
export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});


apiAuth.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

