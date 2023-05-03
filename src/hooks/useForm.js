//se importan los componentes propios de react 
import { useState } from 'react';
/* 
    Esta funcion hook se encaga de manejar los formularios tener sus estados
    restear el mismo y manejar los cambios en cada input del mismo 

    Se termina exponiendo el estado del formulario, la funcion para manejar los cambios
    en los input, y otra funcion para poder resear el el formulario en caso de que sea necesario

*/
export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}