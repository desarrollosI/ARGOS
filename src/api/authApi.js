import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_AUTH, VITE_BACKEND_SERVER_AUTH_LOCAL } = getEnvVariables();

export const authApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_AUTH
});

// Configurar interceptores
authApi.interceptors.request.use(config => {
    const url = window.location.href;

    if (url.includes('187.216.250.252')) {
        config.baseURL = VITE_BACKEND_SERVER_AUTH;
    } else if (url.includes('172.18.110.90')) {
        config.baseURL = VITE_BACKEND_SERVER_AUTH_LOCAL;
    }

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };

    return config;
});
