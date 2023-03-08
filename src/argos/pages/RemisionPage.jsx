import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Detenido } from '../components/';

const remisionPrincipal = (remisiones = [], remision) => remisiones.filter(rem => rem.No_Remision == remision);

export const RemisionPage = () => {

	const { remision } = useParams();
	console.log('Params: ', remision)
	const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/remision`, `POST`, JSON.stringify({ remision: remision.trim() }));
	console.log('despues del fetch: ', data)

	return (
    <>
			{/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
			{
				(isLoading)
					? <LoadingSpinner />
					: <Detenido data={remisionPrincipal(data.data.Remisiones, remision)[0]}/>
	
        	}
			{	(isLoading == false && data.data.Remisiones.length>1) &&<h1 className='titulo'>REMISIONES DE LA FICHA</h1>}
			{
				(isLoading)
					? <LoadingSpinner />
					: data.data.Remisiones.map(rem => {
						if(rem.No_Remision != remision){
							return <Detenido key={rem.No_Remision} data={rem}/>
						}
					})
			}

	</>

  )
}