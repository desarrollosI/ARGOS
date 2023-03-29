//primero de react

import { useEffect, useState } from 'react';
import { basesApi } from '../../../api';
//hooks
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros

export const TableDecider = ({lugar}) => {

    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

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


    useEffect(() => { 
        fetchData(endpoint)
      }, [lugar])

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
