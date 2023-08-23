import React, { useState } from 'react'
import { useForm } from '../../../hooks';

const registerFormFields = {
    telefono:    '',
}



export const TelefonoSearch = ({GenerateObject, isLoadingData}) => {

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { telefono, onInputChange } = useForm( registerFormFields );  

    const handleSubmit = (event) => {
        event.preventDefault();
        // Puedes pasar los parámetros necesarios a la función GenerateObject aquí
        const parametros = {
            telefono,
        };
        // Llama a la función GenerateObject pasándole los parámetros
        GenerateObject(parametros,'telefono');
    };

  return (
    <>
        <div className="container">
            <form onSubmit={ handleSubmit } className='my-3'>
            <div className="row">
                <div className="col-md-12">
                    <h3>Busqueda por Telefono</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Telefono:</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            id="telefono" 
                            className='form-control' 
                            value={telefono}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 my-2">
                    <button className='btn btn-primary float-end' disabled={isLoadingData}>{isLoadingData?'Cargando...':'Buscar'}</button>
                </div>
            </div>
            </form>
        </div>
    </>
  )
}
