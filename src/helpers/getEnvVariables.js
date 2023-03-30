

export const getEnvVariables = () => {

    //import.meta.env;

    return {
        VITE_BACKEND_SERVER_AUTH: import.meta.env.VITE_BACKEND_SERVER_AUTH,
        VITE_BACKEND_SERVER_BASES: import.meta.env.VITE_BACKEND_SERVER_BASES,
        VITE_BACKEND_SERVER_HISTORIAL: import.meta.env.VITE_BACKEND_SERVER_HISTORIAL
        //...import.meta.env
    }
}

