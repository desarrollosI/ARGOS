/*
    Este componente es exactmente igual al table decider, simplemente se decidio fraccionar en este las peticiones 
    que van hacia los endpoint propios del sistema argos, es decir el historial.
*/
//Se importan los componentes propios de react
import { useEffect, useState } from 'react';
//se importan los helpers necesarios para el historial
import { usuariosApi } from '../../../api';
//se importan los componentes personalizados 
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';

export const TableDeciderArgosUsuarios = ({lugar}) => {

    console.log('LUGAR: ',lugar)

    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async(endpont) => {
        console.log('ENDPOINT:',endpoint)
        setIsLoadingData(true);
        const {data} =  await usuariosApi.post(endpont);
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }

    let endpoint ='';
   
    switch (lugar) {
        case 'Todos los usuarios':
            endpoint = '/todos';
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
                                :   <TableConstructor lugar={lugar} datos={fetchedData.usuarios}/>

                        }
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        )

}
