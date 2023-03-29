import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_SERVER_BASES } = getEnvVariables()

export const basesApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_BASES
});

// Todo: configurar interceptores
/*basesApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})*/
