//Se realizan las importaciónes necesarias para el funcionamiento de la función
import axios from 'axios';
//Se importa el helper que expone las variables de entorno
import { getEnvVariables } from '../helpers';
//Llamando a dicha funcion se obtiene la variable necesaria
const { VITE_BACKEND_SERVER_BUSCADOR_GENERAL, VITE_BACKEND_SERVER_BUSCADOR_GENERAL_LOCAL } = getEnvVariables()
//Se crea y exporta la funcion que genera nuestro intermediario entre el frontend
//y el backend
export const buscadorGeneralApi = axios.create({
    baseURL: VITE_BACKEND_SERVER_BUSCADOR_GENERAL
});

//Con nuestra funcion creada se le añade la posibilidad de interceptar las solicitudes
//del backend al servidor añadoendole los headers y el x-token necesario pra el backend
buscadorGeneralApi.interceptors.request.use( config => {
    const url = window.location.href;

    if (url.includes('187.216.250.252')) {
      config.baseURL = VITE_BACKEND_SERVER_BUSCADOR_GENERAL;
  } else if (url.includes('172.18.110.90')) {
      config.baseURL = VITE_BACKEND_SERVER_BUSCADOR_GENERAL_LOCAL;
  } else if (url.includes('localhost')) {
      config.baseURL = VITE_BACKEND_SERVER_BUSCADOR_GENERAL_LOCAL;
  }

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

//De igual manera se añade el interceptor de las respuestas, para que en caso de respuestas
// con status 400, manejadas por el servidor sacar al usuario no autenticado de la aplicación
 buscadorGeneralApi.interceptors.response.use(
     response => response,
     error => {
       if (error.response.status === 401) {
         window.location.href = '/sia';
       }
     });
  