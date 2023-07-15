import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import { authApi, usuariosApi } from '../../api';
import { insertHistorial } from '../../helpers/insertHistorial';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const registerFormFields = {
    nombre:    '',
    correo: '',
    password: '123456',
    rol: 'USER_ROLE',
    mac: ''
}

export const UsuarioPage = () => {
    const { uid } = useParams();//se lee el prametro por el url
    console.log('DE PARAMETROS',uid)

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { nombre, correo, password, mac, rol, onInputChange } = useForm( registerFormFields );
    const [fetchedData, setFetchedData] = useState()
    const [isLoadingData, setIsLoadingData] = useState(true)
    
    const fetchData = async (endpoint) => {
        switch (endpoint) {
            case '/nuevo':
                try {
                    const response = await usuariosApi.post(endpoint, { nombre, correo, password, mac, rol });
                    console.log(response);
                    Swal.fire('Correcto','Usuario registrado correctamente','success')
                  } catch (error) {
                    console.log(error.response);
                    Swal.fire('Incorrecto',error.response.data.errors[0].msg,'error')
                  }
                break;

            case '/actualizar':
                try {
                    const response = await usuariosApi.put(endpoint+'/'+uid, { nombre, correo, password, mac, rol });
                    console.log(response);
                    Swal.fire('Correcto','Usuario actualizado correctamente','success')
                  } catch (error) {
                    console.log(error.response);
                    Swal.fire('Incorrecto',error.response.data.errors[0].msg,'error')
                  }
                break;

            default:
                break;
        }
    };
    
    const registerSubmit = ( event ) => {
        event.preventDefault();
        if(uid === undefined){
            fetchData('/nuevo')
        }else{
            fetchData('/actualizar')
        }
    }

    useEffect(() => {
        if(fetchedData?.msg == 'post API usuario creado correctamente '){
            Swal.fire('Correcto','Usuario creado correctamente en el sistema','success')
        }
    }, [fetchedData])
    

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 card shadow">
                <h1 className='titulo'>NUEVO USUARIO</h1>
                <hr/>
            </div>
            <div className="col-md-6 card shadow mb-3">
                <form onSubmit={ registerSubmit } className='my-3'>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Nombre Completo"
                            name="nombre"
                            value={ nombre }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="correo"
                            value={ correo }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Contraseña"
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección MAC"
                            name="mac"
                            value={ mac }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <select 
                            className="form-select"
                            name="rol"
                            onChange={ onInputChange }
                            >
                            <option defaultValue value={'USER_ROLE'}>USUARIO</option>
                            <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                        </select>
                    </div>
                    <div className="d-grid gap-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Registrar" 
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
