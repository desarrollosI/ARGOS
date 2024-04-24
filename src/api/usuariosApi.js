import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_USUARIOS,VITE_BACKEND_SERVER_USUARIOS_LOCAL } = getEnvVariables()

export const usuariosApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_USUARIOS
});


usuariosApi.interceptors.request.use( config => {
    const url = window.location.href;

    if (url.includes('187.216.250.252')) {
        config.baseURL = VITE_BACKEND_SERVER_USUARIOS;
    } else if (url.includes('172.18.110.90')) {
        config.baseURL = VITE_BACKEND_SERVER_USUARIOS_LOCAL;
    } 

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

// usuariosApi.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response.status === 401) {
//         window.location.href = '/argos';
//       }
//     });