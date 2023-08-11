import React, { useState } from 'react'
import { useForm } from '../../../hooks';

const registerFormFields = {
    placa:    '',
    niv:    '',
    marca:    '',
    submarca:    '',
    modelo:    '',
}



export const PlacaNivSearch = ({GenerateObject,isLoadingData}) => {

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { placa, niv,marca,modelo, submarca, onInputChange } = useForm( registerFormFields );  

    const handleSubmit = (event) => {
        event.preventDefault();
        // Puedes pasar los parámetros necesarios a la función GenerateObject aquí
        const parametros = {
            placa,
            niv,
            marca,
            submarca,
            modelo
        };
        // Llama a la función GenerateObject pasándole los parámetros
        GenerateObject(parametros,'placaniv');
    };

  return (
    <>
        <div className="container">
            <form onSubmit={ handleSubmit } className='my-3'>
            <div className="row">
                <div className="col-md-12">
                    <h3>Busqueda por Placa Niv</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label className='form-label'>Placa:</label>
                        <input 
                            type="text" 
                            name="placa" 
                            id="placa" 
                            className='form-control' 
                            value={placa}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className='form-label'>NIV:</label>
                        <input 
                            type="text" 
                            name="niv" 
                            id="niv" 
                            className='form-control' 
                            value={niv}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className='form-label'>Marca:</label>
                        <input 
                            type="text" 
                            name="marca" 
                            id="marca" 
                            className='form-control' 
                            value={marca}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className='form-label'>Submarca:</label>
                        <input 
                            type="text" 
                            name="submarca" 
                            id="submarca" 
                            className='form-control' 
                            value={submarca}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className='form-label'>Modelo:</label>
                        <input 
                            type="text" 
                            name="modelo" 
                            id="modelo" 
                            className='form-control' 
                            value={modelo}
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
