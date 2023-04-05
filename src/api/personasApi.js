import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_BASE_PERSONAS } = getEnvVariables() // de momento se maneja la misma ip 

export const personasApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_BASE_PERSONAS
});


personasApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


 personasApi.interceptors.response.use(
     response => response,
     error => {
       if (error.response.status === 401) {
         window.location.href = '/argos';
       }
     });
  