/* 
    La funcion de este helper es poder exponer las variables de entorno solamente en determinadas piezas de codigo
    el "compilador" de vite, presenta dificultades para utilizar las variables de entorno, sin embargo son necesarias
    para almacenar informacion como alguna contraseña del servidor

    Recordatorio importante todas las viariables de entorno que se requieran exponer deben de compenzar con el 
    prefijo VITE_ 
    
    Lo que hace esta funcion es tomar las variables de entorno y almacenarlas en un objeto de javascript, al cual es 
    mas facil acceder.
*/

export const getEnvVariables = () => {

    //import.meta.env;

    return {
        VITE_BACKEND_SERVER_AUTH: import.meta.env.VITE_BACKEND_SERVER_AUTH,
        VITE_BACKEND_SERVER_BASES: import.meta.env.VITE_BACKEND_SERVER_BASES,
        VITE_BACKEND_SERVER_BUSCADOR_GENERAL: import.meta.env.VITE_BACKEND_SERVER_BUSCADOR_GENERAL,
        VITE_BACKEND_SERVER_GRAFICAS: import.meta.env.VITE_BACKEND_SERVER_GRAFICAS,
        VITE_BACKEND_SERVER_MAPAS: import.meta.env.VITE_BACKEND_SERVER_MAPAS,
        VITE_BACKEND_SERVER_HISTORIAL: import.meta.env.VITE_BACKEND_SERVER_HISTORIAL,
        VITE_BACKEND_SERVER_BASE_PERSONAS: import.meta.env.VITE_BACKEND_SERVER_BASE_PERSONAS,
        VITE_BACKEND_SERVER_CATALOGOS: import.meta.env.VITE_BACKEND_SERVER_CATALOGOS,
        VITE_BACKEND_SERVER_USUARIOS: import.meta.env.VITE_BACKEND_SERVER_USUARIOS
        //...import.meta.env
    }
}

