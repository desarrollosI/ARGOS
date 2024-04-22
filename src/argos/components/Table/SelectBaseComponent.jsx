/*
    La funcionalidad de este componente es la de tener un selector con los diferentes filtros 
    habilitados de las diferentes bases de datos, seleccionado el filtro el compoente se encarga
    de requerir el SkeletonLoader y al contar con la información mostrar la tabla correspondiente
*/
//Se importan los componentes Propios de react
import React, { useState } from 'react'
//Se importan los componentes que requiere este componente
import { TableDecider } from './TableDecider'; //En el table decider hace referencia  a filtros de bases de datos oficiales
import { TableHolder } from './TableHolder'; //Este componente encapsula el Skeleton Loader
import { TableDeciderArgos } from './TableDeciderArgos'; //Este componente encapsula las tablas en este caso del historial
import { TableDeciderArgosUsuarios } from './TableDeciderArgosUsuarios';
import { TableDeciderWithParams } from './TableDeciderWithParams';

/* 
    El componente recibe la base de la que se quieren acceder los filtros del que se quiere obtener la información
    tiene que ser un estado para poder detectar cambios en la selección.
*/
export const SelectBaseComponent = ({base}) => {

    const [baseSelect, setBaseSelect] = useState(' ')

    const handleChange = (event) => {
        console.log(event.target.value)
        setBaseSelect(event.target.value);
      };

    switch (base) {
        case 'SARAI REMISIONES':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Detenido: Datos Personales">DETENIDO: DATOS PERSONALES</option>
                                <option value="Detenido: Media Filiacion">DETENIDO: MEDIA FILIACION</option>
                                <option value="Detenido: Contactos">DETENIDO: CONTACTOS</option>
                                <option value="Detenido: Senas Particulares">DETENIDO: SEÑAS PARTICULARES</option>
                                <option value="Remisiones: Narrativas">REMISION: NARRATIVAS</option>
                                <option value="Remisiones: Objetos Asegurados">REMISION: OBJETOS ASEGURADOS</option>
                                {/* <option value="Remisiones: Armas Aseguradas">REMISION: ARMAS ASEGURADAS</option> */}
                                <option value="Remisiones: Drogas Aseguradas">REMISION: DROGAS ASEGURADAS</option>
                                <option value="Remisiones: Vehiculos Asegurados">REMISION: VEHICULOS ASEGURADOS</option>
                                <option value="Remisiones: Ubicación de Hechos">REMISION: UBICACIÓN HECHOS</option>
                                <option value="Remisiones: Ubicación de Detencion">REMISION: UBICACIÓN DETENCION</option>
                                <option value="Remisiones: Ubicación Domicilio Detenido">REMISION: UBICACIÓN DOMICILIO DETENIDO</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDecider lugar={baseSelect}/> //Si hay algun cambio en el estado se invoca al componente TableDecider con el filtro que se desa como parametro de entrada
                        : <TableHolder />
                }
            </>
            
        )

        case 'SARAI INSPECCIONES':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE CONSULTAS:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Inspecciones: Datos Generales">CONSULTAS: DATOS GENERALES</option>
                                <option value="Inspecciones: Personas Inspeccionadas">CONSULTAS: PERSONAS CONSULTADAS</option>
                                <option value="Inspecciones: Vehiculos Inspeccionados">CONSULTAS: VEHICULOS CONSULTADOS</option>
                                <option value="Inspecciones: Ubicaciones">CONSULTAS: UBICACIONES</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDecider lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )

        case 'SARAI HISTORICO':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Historico: Datos Generales">HSITORICO: DATOS GENERALES</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDecider lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )

        case 'SARAI INCIDENCIA DELICTIVA':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Incidencia Delictiva: Datos Generales">INCIDENCIA DELICTIVA: DATOS GENERALES</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDecider lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )

        case 'ARGOS HISTORIAL':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Inicio de Sesion">INICIO DE SESIÓN</option>
                                <option value="Buscador General: Busqueda Realizada">BUSCADOR GENERAL: BUSQUEDAS REALIZADAS</option>
                                <option value="Buscador: Exportacion a Excel">BUSCADOR: EXPORTACION A EXCEL</option>
                                <option value="Vista de Ficha: Mas Detalles">VISTA DE FICHA: MAS DETALLES</option>
                                <option value="Reconocimiento Facial: Fotos Subidas">RECONOCIMIENTO FACIAL: FOTOS SUBIDAS</option>
                                <option value="Peticiones Estádistica">PETICIONES ESTADISTICA</option>
                                <option value="Peticiones Geoanalisis">PETICIONES GEOANALISIS</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDeciderArgos lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )

        case 'ARGOS USUARIOS':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Todos los usuarios">TODOS LOS USUARIOS</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDeciderArgosUsuarios lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )
    
        case 'REPORTES ESPECIALES':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Reporte: Reincidentes por semana">REINCIDENTES POR SEMANA</option>
                                <option value="Reporte: Reincidentes general">REINCIDENTES GENERAL</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDeciderWithParams lugar={baseSelect} /> //Si hay algun cambio en el estado se invoca al componente TableDecider con el filtro que se desa como parametro de entrada
                        : <TableHolder />
                }
            </>
            
        )

        default:
            break;
    }

}