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

  return (
    <>
    <div>
        <button onClick={onAddInstanciaRemisiones} className="ms-2 btn btn-reset-filters">AÑADIR INSTANCIA SARAI REMISIONES </button>
        <button onClick={onAddInstanciaInspecciones} className="ms-2 btn btn-reset-filters">AÑADIR INSTANCIA SARAIINSPECCIONES </button>
        <button onClick={onAddInstanciaHistorico} className="ms-2 btn btn-reset-filters">AÑADIR INSTANCIA HISTORICO </button>
        <button onClick={onAddInstanciaEventosDelictivos} className="ms-2 btn btn-reset-filters">AÑADIR INSTANCIA EVENTOS DELICTIVOS </button>
        
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
