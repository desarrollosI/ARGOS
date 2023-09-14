import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import { authApi, usuariosApi } from '../../api';
import { insertHistorial } from '../../helpers/insertHistorial';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const registerFormFields = {
    nombre: '',
    correo: '',
    password: '123456',
    rol: 'USER_ROLE',
    mac: '',
    permisos: {
        buscador: {
            general: {
                nombre: true,
                direcciones: true,
                alias: true,
                placa: true,
                telefono: true
            },
            eventos: true,
            historico: true,
            inspecciones: true,
            remisiones: true,
            global: true
        },
        estadistica: true,
        geoanalisis: true,
        historial: true,
        reconocimiento: true,
        usuarios: true,
        buscar: true
    }
}


export const UsuarioPage = () => {
    const { uid } = useParams();//se lee el prametro por el url
    console.log('DE PARAMETROS',uid)

    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { nombre, correo, password, mac, rol, onInputChange } = useForm( registerFormFields );
    const [fetchedData, setFetchedData] = useState()
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [usuario, setUsuario] = useState()
    const [tempUsuario, setTempUsuario] = useState()
    
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
                    const response = await usuariosApi.put(endpoint+'/'+uid, tempUsuario);
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

    const fetchUser = async (endpoint,uid) => {
        try {
            setIsLoadingData(true)
            const response = await usuariosApi.post(endpoint, { uid });
            console.log(response.data.usuario);
            setUsuario(response.data.usuario)
            setTempUsuario(response.data.usuario)
            console.log(usuario)
            console.log(tempUsuario)
            setIsLoadingData(false)
          } catch (error) {
            console.log(error.response);
          }
    }
    
    const registerSubmit = ( event ) => {
        event.preventDefault();
        if(uid === undefined){
            fetchData('/nuevo')
        }else{
            console.log('si entro antes del update')
            fetchData('/actualizar')
        }
    }

    useEffect(() => {
        if(fetchedData?.msg == 'post API usuario creado correctamente '){
            Swal.fire('Correcto','Usuario creado correctamente en el sistema','success')
        }
    }, [fetchedData])

    useEffect(() => {
        fetchUser('/usuario',uid)
    }, [])
    

  return (

    (uid === undefined )? (
        <div className="container">
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
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            value="Registrar" 
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    ): (!isLoadingData) &&
    (   
    
        <div className="container">
            <div className="row">
                <div className="col-md-12 card shadow">
                    <h1 className='titulo'>EDICION DE USUARIO</h1>
                    <hr />
                </div>
            </div>

            <form onSubmit={registerSubmit} className='my-3'>
                <div className="row">
                    <div className="col-md-6 card shadow mb-3">
                        <div className="form-group mb-2 mt-3">
                            <label className="form-check-label" htmlFor="nombre">Nombre completo: </label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre Completo"
                                name="nombre"
                                value={  tempUsuario.nombre }
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        nombre: e.target.value,
                                    });
                                } }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-check-label" htmlFor="nombre">Correo Electrónico: </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="correo"
                                value={ tempUsuario.correo }
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        correo: e.target.value,
                                    });
                                } }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-check-label" htmlFor="password">Contraseña: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={ tempUsuario.password }
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        password: e.target.value,
                                    });
                                } }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-check-label" htmlFor="mac">Dirección MAC: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Dirección MAC"
                                name="mac"
                                value={ tempUsuario.mac }
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        mac: e.target.value,
                                    });
                                } }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-check-label" htmlFor="rol">Rol del Usuario: </label>
                            <select 
                                className="form-select"
                                name="rol"
                                value={ tempUsuario.rol}
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        rol: e.target.value,
                                    });
                                } }
                                >
                                <option value={'USER_ROLE'}>USUARIO</option>
                                <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-check-label" htmlFor="estado">Estado del Usuario: </label>
                            <select 
                                className="form-select"
                                name="estado"
                                value={ tempUsuario.estado}
                                onChange={ (e) => {
                                    setTempUsuario({
                                        ...tempUsuario,
                                        estado: e.target.value,
                                    });
                                } }
                                >
                                <option value={true}>ACTIVO</option>
                                <option value={false}>INACTIVO</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button 
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Guardar Cambios" 
                                >
                                    Guardar Cambios 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 card shadow mb-3">

                        <div className="row">
                            <div className="col-md-12 my-2">
                                <h4>Permisos del Usuario</h4>
                            </div>
                        </div>

                        {/* renglon de los switches */}
                        <div className="row">
                            <div className="col-md-12">

                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="buscar" 
                                            name="buscar" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        buscar: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.buscar}/>
                                    <label className="form-check-label" htmlFor="buscar">Modulo Buscador</label>
                                </div>
                                <div className="ms-3 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="global"
                                        name="global"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        global: e.target.checked,
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.global}
                                    />
                                    <label className="form-check-label" htmlFor="global">Seccion Buscador (General)</label>
                                </div>

                                <div className="ms-5 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="nombre"
                                        name="nombre"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        general: {
                                                            ...tempUsuario.permisos.buscador.general,
                                                            nombre: e.target.checked,
                                                        },
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.general.nombre}
                                    />
                                    <label className="form-check-label" htmlFor="nombre">Buscador General por Nombre</label>
                                </div>
                                <div className="ms-5 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="direcciones"
                                        name="direcciones"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        general: {
                                                            ...tempUsuario.permisos.buscador.general,
                                                            direcciones: e.target.checked,
                                                        },
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.general.direcciones}
                                    />
                                    <label className="form-check-label" htmlFor="direcciones">Buscador General por Direcciones</label>
                                </div>
                                <div className="ms-5 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="alias"
                                        name="alias"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        general: {
                                                            ...tempUsuario.permisos.buscador.general,
                                                            alias: e.target.checked,
                                                        },
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.general.alias}
                                    />
                                    <label className="form-check-label" htmlFor="alias">Buscador General por Alias</label>
                                </div>

                                <div className="ms-5 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="placa"
                                        name="placa"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        general: {
                                                            ...tempUsuario.permisos.buscador.general,
                                                            placa: e.target.checked,
                                                        },
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.general.placa}
                                    />
                                    <label className="form-check-label" htmlFor="placa">Buscador General por Placa / Niv</label>
                                </div>

                                <div className="ms-5 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="telefono"
                                        name="telefono"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        general: {
                                                            ...tempUsuario.permisos.buscador.general,
                                                            telefono: e.target.checked,
                                                        },
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.general.telefono}
                                    />
                                    <label className="form-check-label" htmlFor="telefono">Buscador General por Telefono</label>
                                </div>

                                <div className="ms-3 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="remisiones"
                                        name="remisiones"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        remisiones: e.target.checked,
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.remisiones}
                                    />
                                    <label className="form-check-label" htmlFor="remisiones">Seccion Buscador (Remisiones)</label>
                                </div>

                                <div className="ms-3 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="inspecciones"
                                        name="inspecciones"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        inspecciones: e.target.checked,
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.inspecciones}
                                    />
                                    <label className="form-check-label" htmlFor="inspecciones">Seccion Buscador (Inspecciones)</label>
                                </div>

                                <div className="ms-3 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="eventos"
                                        name="eventos"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        eventos: e.target.checked,
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.eventos}
                                    />
                                    <label className="form-check-label" htmlFor="eventos">Seccion Buscador (Eventos Delictivos)</label>
                                </div>

                                <div className="ms-3 form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="historico"
                                        name="historico"
                                        onChange={(e) => {
                                            setTempUsuario({
                                                ...tempUsuario,
                                                permisos: {
                                                    ...tempUsuario.permisos,
                                                    buscador: {
                                                        ...tempUsuario.permisos.buscador,
                                                        historico: e.target.checked,
                                                    },
                                                },
                                            });
                                        }}
                                        checked={tempUsuario.permisos.buscador.historico}
                                    />
                                    <label className="form-check-label" htmlFor="historico">Seccion Buscador (Historico)</label>
                                </div>

                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="reconocimiento" 
                                            name="reconocimiento" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        reconocimiento: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.reconocimiento}/>
                                    <label className="form-check-label" htmlFor="reconocimiento">Modulo Reconocimiento Facial</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="geoanalisis" 
                                            name="geoanalisis" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        geoanalisis: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.geoanalisis}/>
                                    <label className="form-check-label" htmlFor="geoanalisis">Modulo Geoanalisis</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="estadistica" 
                                            name="estadistica" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        estadistica: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.estadistica}/>
                                    <label className="form-check-label" htmlFor="estadistica">Modulo Estádistica</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="usuarios" 
                                            name="usuarios" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        usuarios: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.usuarios}/>
                                    <label className="form-check-label" htmlFor="usuarios">Modulo Usuarios</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input  className="form-check-input" 
                                            type="checkbox" 
                                            id="historial" 
                                            name="historial" 
                                            onChange={ (e) => {
                                                setTempUsuario({
                                                    ...tempUsuario,
                                                    permisos: {
                                                        ...tempUsuario.permisos,
                                                        historial: e.target.checked,
                                                    },
                                                });
                                            } } 
                                            checked={tempUsuario.permisos.historial}/>
                                    <label className="form-check-label" htmlFor="historial">Modulo Historial</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
                    
        )  
    )
}
