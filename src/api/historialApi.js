import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_HISTORIAL } = getEnvVariables()

export const historialApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_HISTORIAL
});


historialApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

historialApi.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.href = '/argos';
      }
    });