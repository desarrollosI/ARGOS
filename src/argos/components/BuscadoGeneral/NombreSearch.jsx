import React, { useState } from 'react'
import { useForm } from '../../../hooks';

const registerFormFields = {
    nombre:    '',
    ap_paterno: '',
    ap_materno: ''
}



export const NombreSearch = ({GenerateObject,isLoadingData}) => {

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { nombre, ap_paterno, ap_materno, onInputChange } = useForm( registerFormFields );  

    const handleSubmit = (event) => {
        event.preventDefault();
        // Puedes pasar los parámetros necesarios a la función GenerateObject aquí
        const parametros = {
            nombre,
            ap_paterno,
            ap_materno
        };
        // Llama a la función GenerateObject pasándole los parámetros
        GenerateObject(parametros,'nombre');
    };

  return (
    <>
        <div className="container">
            <form onSubmit={ handleSubmit } className='my-3'>
            <div className="row">
                <div className="col-md-12">
                    <h3>Busqueda por Nombre</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Nombre:</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            className='form-control' 
                            value={nombre}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Apellido Paterno:</label>
                        <input 
                            type="text" 
                            name="ap_paterno" 
                            id="ap_paterno" 
                            className='form-control' 
                            value={ap_paterno}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Apellido Materno:</label>
                        <input 
                            type="text" 
                            name="ap_materno" 
                            id="ap_materno" 
                            className='form-control' 
                            value={ap_materno}
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
