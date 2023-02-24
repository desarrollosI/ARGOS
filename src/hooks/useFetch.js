import { useEffect, useState } from "react";


export const useFetch = ( url, metodo, bodyd ) => {

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

       
        const data = await resp.json();
        //console.log(data)
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