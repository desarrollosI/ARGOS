import React, { useState } from 'react'
import { useForm } from '../../../hooks';

const registerFormFields = {
    calle_1:    '',
    calle_2: '',
    colonia: ''
}



export const DireccionSearch = ({GenerateObject,isLoadingData}) => {

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { calle_1, calle_2, colonia, onInputChange } = useForm( registerFormFields );  

    const handleSubmit = (event) => {
        event.preventDefault();
        // Puedes pasar los parámetros necesarios a la función GenerateObject aquí
        const parametros = {
            calle_1,
            calle_2,
            colonia
        };
        // Llama a la función GenerateObject pasándole los parámetros
        GenerateObject(parametros,'direccion');
    };

  return (
    <>
        <div className="container">
            <form onSubmit={ handleSubmit } className='my-3'>
            <div className="row">
                <div className="col-md-12">
                    <h3>Busqueda por Dirección</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Calle 1:</label>
                        <input 
                            type="text" 
                            name="calle_1" 
                            id="calle_1" 
                            className='form-control' 
                            value={calle_1}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Calle 2:</label>
                        <input 
                            type="text" 
                            name="calle_2" 
                            id="calle_2" 
                            className='form-control' 
                            value={calle_2}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Colonia:</label>
                        <input 
                            type="text" 
                            name="colonia" 
                            id="colonia" 
                            className='form-control' 
                            value={colonia}
                            onChange={onInputChange}
                            />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 my-2">
                    <button className='btn btn-primary float-end' disabled={isLoadingData}>{isLoadingData?'Cargando':'Buscar'}</button>
                </div>
            </div>
            </form>
        </div>
    </>
  )
}
