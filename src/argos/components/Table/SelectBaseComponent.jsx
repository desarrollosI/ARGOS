import React, { useState } from 'react'
import { TableDecider } from './TableDecider';
import { TableHolder } from './TableHolder';
 
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
                    <div className="row mt-5 mb-5">
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
        case 'SARAI INSPECCIONES':
       
        return (
            <>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Inspecciones: Datos Generales">INSPECCIONES: DATOS GENERALES</option>
                                <option value="Inspecciones: Personas Inspeccionadas">INSPECCIONES: PERSONAS INSPECCIONADAS</option>
                                <option value="Inspecciones: Vehiculos Inspeccionados">INSPECCIONES: VEHICULOS INSPECCIONADOS</option>
                                <option value="Inspecciones: Ubicaciones">INSPECCIONES: UBICACIONES</option>
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
                    <div className="row mt-5 mb-5">
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
                    <div className="row mt-5 mb-5">
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
    
        default:
            break;
    }

}