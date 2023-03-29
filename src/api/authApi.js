import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_AUTH } = getEnvVariables()

export const authApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_AUTH
});

// Todo: configurar interceptores
authApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})
