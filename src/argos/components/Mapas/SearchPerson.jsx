import React, { useState } from 'react'
import { useForm } from '../../../hooks';
import { mapasApi } from '../../../api';

const registerFormFields = {
    nombre:    '',
    ap_paterno: '',
    ap_materno: ''
}



export const SearchPerson = ({setSetDataResultadoBusqueda}) => {

    const [isLoadingData, setIsLoadingData] = useState(false);

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { nombre, ap_paterno, ap_materno, onInputChange } = useForm( registerFormFields );


    const fetchPerson = async (endpoint) => {
        try {
            setIsLoadingData(true)
            const response = await mapasApi.post(endpoint,{nombre,ap_paterno,ap_materno});
            console.log(response)
            setSetDataResultadoBusqueda(response.data.data)
            setIsLoadingData(false)
            } catch (error) {
            console.log(error.response);
            }
    }    

    const SearchPerson = ( event ) => {
        event.preventDefault();
        fetchPerson('/buscar-persona')
    }

  return (
    <>
        <div className="container">
            <form onSubmit={ SearchPerson } className='my-3'>
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
                    <button className='btn btn-primary float-end'>Buscar</button>
                </div>
            </div>
            </form>
        </div>
    </>
  )
}
