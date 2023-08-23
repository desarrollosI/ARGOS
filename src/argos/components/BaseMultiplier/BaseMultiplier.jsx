/*
    Este componente se puede considerar un HOC, su tarea es encapsular el componente <SelectBaseComponent />
    para que se puedan generar multiples instancias del mismo de acuerdo a las búsquedas que sean necesarias
*/

/*Importaciones necesarias, estado y componente*/ 
import  { useEffect, useState } from 'react'
import { SelectBaseComponent, TableConstructor } from '../Table';
import { BuscadorGeneral, NombreSearch } from '../BuscadoGeneral';
import useGeneralSearchControls from '../../../hooks/useGeneralSearchControls';
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
  return (
    <>
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
    <div className="row card shadow d-flex align-items-start">
        <div className="row">
            <div className="col-md-1 mt-2">
                <div className="nav flex-column nav-pills me-3 col-md-1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-general-tab" data-bs-toggle="pill" data-bs-target="#v-pills-general" type="button" role="tab" aria-controls="v-pills-general" aria-selected="true">GENERAL</button>
                    <button className="nav-link" id="v-pills-remisiones-tab" data-bs-toggle="pill" data-bs-target="#v-pills-remisiones" type="button" role="tab" aria-controls="v-pills-remisiones" aria-selected="true">REMISIONES</button>
                    <button className="nav-link" id="v-pills-inspecciones-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inspecciones" type="button" role="tab" aria-controls="v-pills-inspecciones" aria-selected="false">INSPECCIONES</button>
                    <button className="nav-link" id="v-pills-historico-tab" data-bs-toggle="pill" data-bs-target="#v-pills-historico" type="button" role="tab" aria-controls="v-pills-historico" aria-selected="false">HISTORICO</button>
                    <button className="nav-link" id="v-pills-eventos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-eventos" type="button" role="tab" aria-controls="v-pills-eventos" aria-selected="false">EVENTOS DELICTIVOS</button>
                </div>
            </div>
            <div className="ms-3 col-md-10">
                <div className="tab-content" id="v-pills-tabContent">
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
                                        SARAI INSPECCIONES 
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
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}
