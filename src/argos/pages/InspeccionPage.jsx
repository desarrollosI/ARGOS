import React from 'react'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Inspeccion } from '../components/';


export const InspeccionPage = () => {

    const { inspeccion } = useParams();
    const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/inspeccion`, `POST`, JSON.stringify({ inspeccion: inspeccion.trim() }));
    console.log('despues del fetch: ', data)



    return (
      <>
        {/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
        {
          (isLoading)
            ? <LoadingSpinner />
            : <Inspeccion data={data.data.Inspeccion}/>
        }
      </>
    )
}
