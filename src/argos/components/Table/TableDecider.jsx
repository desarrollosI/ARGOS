//Se importan los componentes Propios de react
import { useEffect, useState } from 'react';
//Se importa nuestro adaptador hacia el backend
import { basesApi } from '../../../api';
//Se importan los componentes personalizados 
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros
 /* 
    La funcion de este compoenente es recibir el nombre del filtro que se requiere,
    con ese nombre se sabe hacia que endpoint del backend dirigir la petición para 
    obtener la información desea.
 */
export const TableDecider = ({lugar}) => {

    const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
    const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
    //Esta función se dispara gracias al efecto, pone en estado de carga de infotmacion
    //hace la peticion al adaptador por la información y espera la informacion
    //cuando la informacion es recibida, se guarda la informacion en el estado y se sale del estdio de carga 
    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont);
        setFetchedData(data);
        setIsLoadingData(false);
    }

    let endpoint ='';
   
    switch (lugar) {
        case 'Detenido: Datos Personales':
            endpoint = '/datos-personales-detenidos';
            break;
        case 'Detenido: Media Filiacion':
            endpoint = '/detenido-media-filiacion';
            break;
        case 'Detenido: Contactos':
            endpoint = '/detenido-contactos';
            break;
        case 'Detenido: Senas Particulares':
            endpoint = '/detenido-senas';
            break;
        case 'Remisiones: Narrativas':
            endpoint = '/remision-generales';
            break;
        case 'Remisiones: Objetos Asegurados':
            endpoint = '/objetos-asegurados';
            break;
        case 'Remisiones: Armas Aseguradas':
            endpoint = '/armas-aseguradas';
            break;
        case 'Remisiones: Drogas Aseguradas':
            endpoint = '/drogas-aseguradas';
            break;
        case 'Remisiones: Vehiculos Asegurados':
            endpoint = '/vehiculos-asegurados';
            break;
        case 'Remisiones: Ubicación de Hechos':
            endpoint = '/ubicacion-hechos';
            break;
        case 'Remisiones: Ubicación de Detencion':
            endpoint = '/ubicacion-detencion';
            break;
        case 'Remisiones: Ubicación Domicilio Detenido':
            endpoint = '/ubicacion-domicilio-detenido';
            break;
        //casos de inspecciones
        case 'Inspecciones: Datos Generales':
            endpoint = '/inspecciones';
            break;
        case 'Inspecciones: Personas Inspeccionadas':
            endpoint = '/personas-inspeccionadas';
            break;
        case 'Inspecciones: Vehiculos Inspeccionados':
            endpoint = '/inspecciones';
            break;
        case 'Inspecciones: Ubicaciones':
            endpoint = '/inspecciones';
            break;
        //casos de historico
        case 'Historico: Datos Generales':
            endpoint = '/all-historico';
            break;
        case 'Incidencia Delictiva: Datos Generales':
            endpoint = '/incidencia-general';
            break;
        default:
            break;

    }

    //Efecto que se dispara cuando hay un cambio en el filtro, su funcion es relizar la peticion de la infromacion al backend
    useEffect(() => { 
        fetchData(endpoint)
      }, [lugar])
    
    //El retorno del componente es el placeholder, <TableLoader /> mientas la petición siga cargando
    //cuando la información deja de cargar , se invoca al componente <TableConstructor /> con el filtro, y la información
    //obtenida del backend  
    return (
        <>  
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className='text-center titulo'>TABLA DE {`${lugar}`.toUpperCase()}</h3>
                            <hr className='decorator'/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                        {
                            (isLoadingData) 
                                ? <>
                                     {Array(10)
                                        .fill("")
                                        .map((e, i) => (
                                            <TableLoader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
                                        ))}
                                    </>
                                : <TableConstructor lugar={lugar} datos={fetchedData.data}/>
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        )

}
