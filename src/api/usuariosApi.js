import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_USUARIOS } = getEnvVariables()

export const usuariosApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_USUARIOS
});


usuariosApi.interceptors.request.use( config => {

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