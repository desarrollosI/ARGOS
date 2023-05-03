/* 
    Este hook ya se encuentra en desuso, se mantiene puesto que puede ser de utilidad en futuro
    Sun funcion era realizar las peticiones al backend formateando las peticiones, y exponiendo
    estados de carga, cuando se se espera la informacion, la informacion y errores si es 
    que hubiese alguno 
*/

//Se importan los componentes propios de react
import { useEffect, useState } from "react";

export const useFetch = ( url, metodo, bodyd ) => {
    //se genera el estado del hook mismo estado es el que se va a exponer para su uso
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    })

    //esta funcion realiza un cambio en el estado, poniendo en estado de carga 
    const getFetch = async () => {
        let resp;
        setState({
            ...state,
            isLoading: true,
        });
    // se disparan las peticiones al backebd 
        if(metodo == 'POST'){
            //console.log(bodyd)
            resp = await fetch(url,{
                method: metodo,
                body:bodyd,
                headers: { 'Content-Type': 'application/json' }
              });
        }else {
            resp = await fetch(url,{
                method: metodo,
              });
        }

       //cuando se tiene respuesta del backend se cambia el estado con dicha informacion
        const data = await resp.json();
        //console.log(data)
        setState({
            data,
            isLoading: false,
            hasError: null,
        });
    }

    //Este efecto se usa para disparar las peticiones al backend al detectar un cambio en la url de peticion
    useEffect(() => {
        getFetch();
    }, [url])
    
    //Se retorna la informacion dobtenida de la peticion
    return {
        data:      state.data,
        isLoading: state.isLoading,
        hasError:  state.hasError,
    };
}