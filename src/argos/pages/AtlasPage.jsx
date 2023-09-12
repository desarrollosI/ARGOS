/* 
  Este componente es la pagina que renderiza los detalles de un registro de Atlas,
  se utiliza en el buscador, como en el modulo de geo analisis
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
import { LoadingSpinner, PersonaAtlas } from '../components/';
//Se importa el conector hacia la base de datos
import { basesApi } from '../../api';


export const AtlasPage = () => {

    const { id_persona } = useParams();//se lee el prametro por el url

    const [isLoadingData, setIsLoadingData] = useState(true)//se se crea el estado bandera para saber cuando se esta cargando informacion
    const [fetchedData, setFetchedData] = useState();// estado que almacena la informacion 
/*
  esta funcion se encagra de hacer la solicitud de la informacion hacia el backend 
*/
    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont,{id_persona: id_persona});
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }
//este efecto se dispara cada que el parametro de l aurl cambia, para poder redibujar el componente
	useEffect(() => { 
        fetchData('persona-atlas')
      }, [id_persona])




    return (
      <>
        {/* recuerda, el is loading debe de ir en las condicionales, o react se sigue como secuencial */}
        {
          (isLoadingData)
            ? <LoadingSpinner />
            : <PersonaAtlas data={fetchedData.data}/>
        }
      </>
    )
}
