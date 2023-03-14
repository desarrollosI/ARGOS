import React from 'react'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Historico } from '../components/';

export const HistoricoPage = () => {

  const { folio } = useParams();
  const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/historico`, `POST`, JSON.stringify({ folio: folio.trim() }));
  console.log('despues del fetch: ', data)



  return (
    <>
      {/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
      {
        (isLoading)
          ? <LoadingSpinner />
          : <Historico data={data.data.Historico}/>
      }
    </>
  )
}
