import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { reportesApi } from '../../../api/reportesApi';
import { TableConstructor } from './TableConstructor';
import { TableLoader } from '../Shared';

export const TableDeciderWithParams = ({ lugar }) => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    const fetchData = async (endpoint, searchData) => {
        console.log(endpoint)
        setIsLoadingData(true);
        try {
            const { data } = await reportesApi.post(endpoint, searchData);
            setFetchedData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoadingData(false);
        }
    }

    let endpoint = '';
    let inputFields = null;
    console.log('LUGAR ANTES DEL SWITCH', lugar)
    switch (lugar) {
        case 'Reporte: Reincidentes por semana':
            endpoint = '/reincidencia-semana';
            inputFields = (
                <>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label  className="form-label"  htmlFor="inicioSemana">Fecha de inicio:</label>
                            <input className="form-control" type="date" id="inicioSemana" {...register('inicioSemana')} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="finSemana">Fecha de fin:</label>
                            <input className="form-control" type="date" id="finSemana" {...register('finSemana')} />
                        </div>
                    </div>
                </>
            );
            break;
        case 'Reporte: Reincidentes general':
            endpoint = '/reincidencia-general';
            console.warn('ENTRE A GENERAL:', endpoint)
            inputFields = (
                <>
                    <div class="alert alert-warning" role="alert">
                    Este tipo de reportes realiza calculos muy pesados, tiempo estimado de generación 5-7 minutos. Sea paciente.
                    </div>
                </>
            )
            break;
        default:
            break;
    }

    const onSubmit = (data) => {
        console.log(endpoint,data)
        fetchData(endpoint, data);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className='text-center titulo'>TABLA DE {`${lugar}`.toUpperCase()}</h3>
                            <hr className='decorator' />
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                                <div className="row">

                                {inputFields}
                                <div className="col-md-2">

                                    <button type="submit" className='btn btn-success'>Buscar</button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {isLoadingData ? (
                    <>
                     {Array(10)
                        .fill("")
                        .map((e, i) => (
                            <TableLoader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
                        ))}
                    </>
                ) : fetchedData ? (
                    <TableConstructor lugar={lugar} datos={fetchedData.data} />
                ) : null}
            </div>
        </>
    )
}
