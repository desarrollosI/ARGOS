import React, { useState } from 'react'
import { useForm } from '../../../hooks';

const coordenadasFormFields = {
    coordx: '',
    coordy: ''
}


export const FlyTo = ({setCoordenadasFlyTo}) => {

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { coordx, coordy, onInputChange } = useForm( coordenadasFormFields );

    const FlyTo = (event) => {
        event.preventDefault();
        setCoordenadasFlyTo([Number(coordx),Number(coordy)])
    }

  return (
    <>
         <div className="container">
            <form onSubmit={ FlyTo } className='my-3'>
            <div className="row">
                <div className="col-md-12">
                    <h3>Buscar coordenadas</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Coordenada X, Negativa:</label>
                        <input 
                            type="text" 
                            name="coordx" 
                            id="coordx" 
                            className='form-control' 
                            value={coordx}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className='form-label'>Coordenada Y, Positiva:</label>
                        <input 
                            type="text" 
                            name="coordy" 
                            id="coordy" 
                            className='form-control' 
                            value={coordy}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-2">
                    <button className='btn btn-primary float-end'>Buscar</button>
                </div>
            </div>
            </form>
        </div>
    
    </>
  )
}
