import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Detenido } from '../components/';
import { basesApi } from '../../api';

const remisionPrincipal = (remisiones = [], remision) => remisiones.filter(rem => rem.No_Remision == remision);

export const RemisionPage = () => {

	const { remision } = useParams();
	// console.log('Params: ', remision)
	// const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/remision`, `POST`, JSON.stringify({ remision: remision.trim() }));


    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont,{remision: remision});
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }

	useEffect(() => { 
        fetchData('remision')
      }, [remision])


	return (
    <>
			{/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
			{
				(isLoadingData)
					? <LoadingSpinner />
					: <Detenido data={remisionPrincipal(fetchedData.data.Remisiones, remision)[0]}/>
	
        	}
			{	(isLoadingData == false && fetchedData.data.Remisiones.length>1) &&<h1 className='titulo'>REMISIONES DE LA FICHA</h1>}
			{
				(isLoadingData)
					? <LoadingSpinner />
					: fetchedData.data.Remisiones.map(rem => {
						if(rem.No_Remision != remision){
							return <Detenido key={rem.No_Remision} data={rem}/>
						}
					})
			}

	</>

  )
}