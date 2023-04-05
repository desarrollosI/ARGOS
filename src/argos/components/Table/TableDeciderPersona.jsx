//primero de react

import { useEffect, useState } from 'react';
import { personasApi } from '../../../api';
//hooks
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros

export const TableDeciderPersona = ({lugar}) => {

    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const res =  await personasApi.post(endpont);
        console.log(res)
        setFetchedData(data);
        setIsLoadingData(false);
    }

    let endpoint ='';
   
    switch (lugar) {
        case 'Personas: Puebla':
            endpoint = '/puebla';
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
