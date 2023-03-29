

export const getEnvVariables = () => {

    //import.meta.env;

    return {
        VITE_BACKEND_SERVER_BASES: import.meta.env.VITE_BACKEND_SERVER_BASES
        //...import.meta.env
    }
}

