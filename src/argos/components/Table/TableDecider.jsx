//primero de react

import { useEffect, useState,useCallback } from 'react';
//hooks
import { useFetch } from '../../../hooks';
//import { TableConFiltro } from './TableConFiltro';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros


export const TableDecider = ({lugar}) => {

    let url = '';
   
    //llamar la data con un el hook useFetch
    switch (lugar) {
        case 'Detenido: Datos Personales':
            url = `http://172.18.10.71:9090/api/base/datos-personales-detenidos`;
           
            break;
        case 'Detenido: Media Filiacion':
            url = `http://172.18.10.71:9090/api/base/detenido-media-filiacion`;

            break;
        case 'Detenido: Contactos':
            url = `http://172.18.10.71:9090/api/base/detenido-contactos`;

            break;
        default:
            break;

    }


    const { data, isLoading, hasError } = useFetch(url,'POST')
    console.log({data,isLoading,hasError});
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
                            (!isLoading) && <TableConstructor lugar={lugar} datos={data.data}/>
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        )

}
