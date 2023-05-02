/* 
  Este componente es la pagina que renderiza los detalles de un folio de historico,
  se utiliza tanto en el buscador como en el reconocimiento facial, realiza una peticion al backedn
  por un folio espeficio para obtener la informació necesaria
*/

//importacion de los componentes por react
import React, { useEffect, useState } from 'react'
/* 
  Estas paginas requieren un id  para poder sacar la informacion desde el backend 
  para poder pasar este id se usa el url, para poder leer parametros de la url se necesita usar 
  el react-router-doom, con el hook useParams podemos sacar de la ur los parametros que vengan en ella
*/
import { useParams } from 'react-router-dom';
//Importamos los componentes personalizados necesarios
import { LoadingSpinner, Detenido } from '../components/';
//Se importa el conector hacia la base de datos
import { basesApi } from '../../api';

const remisionPrincipal = (remisiones = [], remision) => remisiones.filter(rem => rem.No_Remision == remision);

export const RemisionPage = () => {

	const { remision } = useParams();//se lee el prametro por el url

    const [isLoadingData, setIsLoadingData] = useState(true)//se se crea el estado bandera para saber cuando se esta cargando informacion
    const [fetchedData, setFetchedData] = useState();// estado que almacena la informacion 
/*
  esta funcion se encagra de hacer la solicitud de la informacion hacia el backend 
*/
    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont,{remision: remision});
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }
//este efecto se dispara cada que el parametro de l aurl cambia, para poder redibujar el componente
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