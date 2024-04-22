/*
    Este componente se puede considerar un HOC, su tarea es encapsular el componente <SelectBaseComponent />
    para que se puedan generar multiples instancias del mismo de acuerdo a las búsquedas que sean necesarias
*/

/*Importaciones necesarias, estado y componente*/ 
import  { useEffect, useState } from 'react'
import { SelectBaseComponent, TableConstructor } from '../Table';
import { BuscadorGeneral, NombreSearch } from '../BuscadoGeneral';
import useGeneralSearchControls from '../../../hooks/useGeneralSearchControls';
import { useAuthStore } from '../../../hooks';
import './buscador.css'
import { BaseImporter } from '../BaseImporter/BaseImporter';
/*
    Funciones que estan fuera de el componente para que no se les asigne otro espacio en  memoria al llamarlas
    o en su defecto cuando el componente <BaseMultiplier /> sea redibujado, cada funcion hace referencia a una base de datos
*/ 
const NuevaInstanciasRemisiones = () => {
    return   <SelectBaseComponent  base={'SARAI REMISIONES'} />
  };
const NuevaInstanciasInspecciones = () => {
    return   <SelectBaseComponent  base={'SARAI INSPECCIONES'} />
  };
const NuevaInstanciasHistorico = () => {
    return   <SelectBaseComponent  base={'SARAI HISTORICO'} />
  };
const NuevaInstanciasIncidencia = () => {
    return   <SelectBaseComponent  base={'SARAI INCIDENCIA DELICTIVA'} />
  };

/*
  Componente que multiplica las instancias de las bases de datos al realizar un click en el boton para cada base de datos
  para poder saber cuantas instancias tenemos el componente usa estados que funcionan a manera similar a un contador.
*/
export const BaseMultiplier = () => {
    //Se crean cada uno de los estados que alamacenaran las instancias
    const [InstanciasRemisiones, setInstanciasRemisiones] = useState([]);
    const [InstanciasInspecciones, setInstanciasInspecciones] = useState([]);
    const [InstanciasHistorico, setInstanciasHistorico] = useState([]);
    const [InstanciasEventosDelictivos, setInstanciasEventosDelictivos] = useState([]);

    //Se añaden las funciones de modificacion del estado especifico para cada base datos,
    //El stado es un arreglo, simplemente se le agrega otra instancia de la base de datos al estado para mantenerindependencia
    const onAddInstanciaRemisiones = event => {
        setInstanciasRemisiones(InstanciasRemisiones.concat(<NuevaInstanciasRemisiones key={InstanciasRemisiones.length} />));
    };
    const onAddInstanciaInspecciones = event => {
        setInstanciasInspecciones(InstanciasInspecciones.concat(<NuevaInstanciasInspecciones key={InstanciasInspecciones.length} />));
    };
    const onAddInstanciaHistorico = event => {
        setInstanciasHistorico(InstanciasHistorico.concat(<NuevaInstanciasHistorico key={InstanciasHistorico.length} />));
    };
    const onAddInstanciaEventosDelictivos = event => {
        setInstanciasEventosDelictivos(InstanciasEventosDelictivos.concat(<NuevaInstanciasIncidencia key={InstanciasEventosDelictivos.length} />));
    };
    //Esta funcion regresa los estados a su estado incial, es decir sin instancias extra cuando ya no se requieran.
    const onClearAll = event => {
        setInstanciasRemisiones([]);
        setInstanciasInspecciones([]);
        setInstanciasHistorico([]);
        setInstanciasEventosDelictivos([]);
    };
    /*
        Retorno del componente, es autoexplicativo, por defecto el componente devuelve los botones y para agregar instancias,
        así como tambien regresa una instancia de cada base de datos, que no es alamacenada en los estados del mismo, de esta manera
        aunque se eliminen las instancias siempre harba una de cada base de datos para realizar búsquedas.
    */
    const { status, user, startLogout } = useAuthStore();
  return (
    <>
    {(user.permisos.buscador.remisiones || user.permisos.buscador.inspecciones || user.permisos.buscador.historico || user.permisos.buscador.eventos) &&(
    <div className='row my-3 card shadow'>
        <div className="col-md-12 my-4">
            <button onClick={onClearAll} className="ms-2 btn btn-reset-filters">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-recycle" viewBox="0 0 16 16">
                    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                </svg>
                LIMPIAR INSTANCIAS
            </button>
        </div>
        
    </div>
     )}
    <div className="row card shadow d-flex align-items-start min-space">
        <div className="row">
            <div className="col-md-1  botones-busqueda">
                <div className="nav flex-column nav-pills me-3 col-md-1 mt-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {(user.permisos.buscador.global) &&(
                    <button 
                        className="nav-link active bd-selector" 
                        id="v-pills-general-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-general" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-general" 
                        aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                            <b>GENERAL</b>
                    </button>
                    )}
                    {(user.permisos.buscador.remisiones) &&(
                    <button 
                        className="nav-link bd-selector" 
                        id="v-pills-remisiones-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-remisiones" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-remisiones" 
                        aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-person-exclamation" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                            </svg>
                            <b>REMISIONES</b>
                    </button>
                    )}
                    {(user.permisos.buscador.inspecciones) &&(
                    <button 
                        className="nav-link bd-selector" 
                        id="v-pills-inspecciones-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-inspecciones" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-inspecciones" 
                        aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-binoculars" viewBox="0 0 16 16">
                            <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z"/>
                            </svg>
                            <b>CONSULTAS</b>
                    </button>
                    )}
                    {(user.permisos.buscador.historico) &&(
                    <button 
                        className="nav-link bd-selector" 
                        id="v-pills-historico-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-historico" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-historico" 
                        aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z"/>
                            </svg>
                            <b>HISTORICO</b>
                    </button>
                    )}
                    {(user.permisos.buscador.eventos) &&(
                    <button 
                        className="nav-link bd-selector" 
                        id="v-pills-eventos-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-eventos" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-eventos" 
                        aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                            <b>EVENTOS DELICTIVOS</b>
                    </button>
                    )}
                    {(user.permisos.buscador.global) &&(
                    <button 
                        className="nav-link bd-selector" 
                        id="v-pills-importar-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-importar" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-importar" 
                        aria-selected="true">
                           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
                            <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
                            </svg>
                            <b>IMPORTAR BASE</b>
                    </button>
                    )}
                </div>
            </div>
            <div className="ms-3 col-md-10">
                <div className="tab-content" id="v-pills-tabContent">
                    {(user.permisos.buscador.global) &&(
                    <div className="tab-pane fade show active" id="v-pills-general" role="tabpanel" aria-labelledby="v-pills-general-tab">
                        <div className="row my-3">
                            <div className="row">
                                <div className="col">
                                   {/* aca va el componente de buscador general */}
                                   <BuscadorGeneral/>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {(user.permisos.buscador.remisiones) &&(
                    <div className="tab-pane fade show" id="v-pills-remisiones" role="tabpanel" aria-labelledby="v-pills-remisiones-tab">
                        <div className="row my-3">
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <button onClick={onAddInstanciaRemisiones} className="ms-2 btn btn-reset-filters"
                                        disabled={(InstanciasRemisiones.length<4)?false:true}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        SARAI REMISIONES 
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <SelectBaseComponent  base={'SARAI REMISIONES'} />
                                    {InstanciasRemisiones}  {/*En esta parte se esta inyectando el estado de esas instancias,  para poder multiplicarlas*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {(user.permisos.buscador.inspecciones) &&(
                    <div className="tab-pane fade" id="v-pills-inspecciones" role="tabpanel" aria-labelledby="v-pills-inspecciones-tab">
                        <div className="row my-3">
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <button onClick={onAddInstanciaInspecciones} className="ms-2 btn btn-reset-filters"
                                        disabled={(InstanciasInspecciones.length<4)?false:true}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        CONSULTAS
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <SelectBaseComponent  base={'SARAI INSPECCIONES'} />
                                    {InstanciasInspecciones}
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {(user.permisos.buscador.historico) &&(
                    <div className="tab-pane fade" id="v-pills-historico" role="tabpanel" aria-labelledby="v-pills-historico-tab">
                        <div className="row my-3">
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <button onClick={onAddInstanciaHistorico} className="ms-2 btn btn-reset-filters"
                                        disabled={(InstanciasHistorico.length<4)?false:true}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        SARAI HISTORICO 
                                    </button>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <SelectBaseComponent  base={'SARAI HISTORICO'} />
                                    {InstanciasHistorico}
                                </div>
                            </div>

                        </div>
                    </div>
                    )}
                    {(user.permisos.buscador.eventos) &&(
                    <div className="tab-pane fade" id="v-pills-eventos" role="tabpanel" aria-labelledby="v-pills-eventos-tab">
                    <div className="row my-3">
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <button onClick={onAddInstanciaEventosDelictivos} className="ms-2 btn btn-reset-filters"
                                        disabled={(InstanciasEventosDelictivos.length<4)?false:true}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        SARAI EVENTOS DELICTIVOS 
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <SelectBaseComponent  base={'SARAI INCIDENCIA DELICTIVA'} />
                                    {InstanciasEventosDelictivos}
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                      {(user.permisos.buscador.global) &&(
                    <div className="tab-pane fade show" id="v-pills-importar" role="tabpanel" aria-labelledby="v-pills-importar-tab">
                        <div className="row my-3">
                            <div className="row">
                                <div className="col">
                                   {/* aca va el componente de importar bases */}
                                   <BaseImporter/>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}
