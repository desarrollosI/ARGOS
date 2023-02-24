import { useEffect, useState } from "react";


export const useFetch = ( url, metodo, body ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    })


    const getFetch = async () => {
        let resp;
        setState({
            ...state,
            isLoading: true,
        });
      
        if(metodo == 'POST'){
            resp = await fetch(url,{
                method: metodo,
                body: body,
              });
        }else {
            resp = await fetch(url,{
                method: metodo,
              });
        }
        const data = await resp.json();

        setState({
            data,
            isLoading: false,
            hasError: null,
        });
    }


    useEffect(() => {
        getFetch();
    }, [url])
    


    return {
        data:      state.data,
        isLoading: state.isLoading,
        hasError:  state.hasError,
    };
}