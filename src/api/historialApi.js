import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_HISTORIAL, VITE_BACKEND_SERVER_HISTORIAL_LOCAL } = getEnvVariables()

export const historialApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_HISTORIAL
});


historialApi.interceptors.request.use( config => {
  const url = window.location.href;

    if (url.includes('187.216.250.252')) {
      config.baseURL = VITE_BACKEND_SERVER_HISTORIAL;
  } else if (url.includes('172.18.110.90')) {
      config.baseURL = VITE_BACKEND_SERVER_HISTORIAL_LOCAL;
  }

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
        window.location.href = '/sia';
      }
    });