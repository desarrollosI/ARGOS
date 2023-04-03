import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Inspeccion } from '../components/';
import { basesApi } from '../../api';


export const InspeccionPage = () => {

    const { inspeccion } = useParams();
    // const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/inspeccion`, `POST`, JSON.stringify({ inspeccion: inspeccion.trim() }));
    // console.log('despues del fetch: ', data)

    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont,{inspeccion: inspeccion});
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }

	useEffect(() => { 
        fetchData('inspeccion')
      }, [inspeccion])




    return (
      <>
        {/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
        {
          (isLoadingData)
            ? <LoadingSpinner />
            : <Inspeccion data={fetchedData.data.Inspeccion}/>
        }
      </>
    )
}
