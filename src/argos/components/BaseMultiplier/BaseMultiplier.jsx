import  { useState } from 'react'
import { SelectBaseComponent } from '../Table';

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

export const BaseMultiplier = () => {

    const [InstanciasRemisiones, setInstanciasRemisiones] = useState([]);
    const [InstanciasInspecciones, setInstanciasInspecciones] = useState([]);
    const [InstanciasHistorico, setInstanciasHistorico] = useState([]);
    const [InstanciasEventosDelictivos, setInstanciasEventosDelictivos] = useState([]);

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
    const onClearAll = event => {
        setInstanciasRemisiones([]);
        setInstanciasInspecciones([]);
        setInstanciasHistorico([]);
        setInstanciasEventosDelictivos([]);
    };

  return (
    <>
    <div>
        <button onClick={onAddInstanciaRemisiones} className="ms-2 btn btn-reset-filters"
         disabled={(InstanciasRemisiones.length<4)?false:true}
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            SARAI REMISIONES 
        </button>
        <button onClick={onAddInstanciaInspecciones} className="ms-2 btn btn-reset-filters"
            disabled={(InstanciasInspecciones.length<4)?false:true}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            SARAI INSPECCIONES 
        </button>
        <button onClick={onAddInstanciaHistorico} className="ms-2 btn btn-reset-filters"
            disabled={(InstanciasHistorico.length<4)?false:true}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            SARAI HISTORICO 
        </button>
        <button onClick={onAddInstanciaEventosDelictivos} className="ms-2 btn btn-reset-filters"
            disabled={(InstanciasEventosDelictivos.length<4)?false:true}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            SARAI EVENTOS DELICTIVOS 
        </button>
        <button onClick={onClearAll} className="ms-2 btn btn-reset-filters">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-recycle" viewBox="0 0 16 16">
                <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
            </svg>
            LIMPIAR INSTANCIAS
        </button>
        
    </div>
    <div className="row mt-3">
        <div className="col">
            <SelectBaseComponent  base={'SARAI REMISIONES'} />
            {InstanciasRemisiones}
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <SelectBaseComponent  base={'SARAI INSPECCIONES'} />
            {InstanciasInspecciones}
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <SelectBaseComponent  base={'SARAI HISTORICO'} />
            {InstanciasHistorico}
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <SelectBaseComponent  base={'SARAI INCIDENCIA DELICTIVA'} />
            {InstanciasEventosDelictivos}
        </div>
    </div>
     
    </>
  )
}
