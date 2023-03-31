//primero de react

import { useEffect, useState } from 'react';
import { historialApi } from '../../../api';
//hooks
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros

export const TableDeciderArgos = ({lugar}) => {

    const [isLoadingData, setIsLoadingData] = useState(true)
    const [fetchedData, setFetchedData] = useState();

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await historialApi.post(endpont);
        console.log(data)
        setFetchedData(data);
        setIsLoadingData(false);
    }

    let endpoint ='';
   
    switch (lugar) {
        case 'Reconocimiento Facial: Fotos Subidas':
            endpoint = '/subida-facial';
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
                                :   <TableConstructor lugar={lugar} datos={fetchedData.movimientos}/>

                        }
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        )

}
