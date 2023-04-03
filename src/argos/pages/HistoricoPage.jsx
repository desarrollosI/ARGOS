import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Historico } from '../components/';
import { basesApi } from '../../api';

export const HistoricoPage = () => {

  const { folio } = useParams();
  // const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/historico`, `POST`, JSON.stringify({ folio: folio.trim() }));
  // console.log('despues del fetch: ', data)

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [fetchedData, setFetchedData] = useState();

  const fetchData = async(endpont) => {
      setIsLoadingData(true);
      const {data} =  await basesApi.post(endpont,{folio: folio});
      console.log(data)
      setFetchedData(data);
      setIsLoadingData(false);
  }

useEffect(() => { 
      fetchData('historico')
    }, [folio])


  return (
    <>
      {/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
      {
        (isLoadingData)
          ? <LoadingSpinner />
          : <Historico data={fetchedData.data.Historico}/>
      }
    </>
  )
}
