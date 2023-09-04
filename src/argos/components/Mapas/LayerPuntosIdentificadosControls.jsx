import React from 'react'
import { LayerChecksPuntos } from './LayerChecksPuntos'
import { AutoCompletePuntosDelitos } from './AutoCompletePuntosDelitos'
import { AutoCompletePuntosFuente } from './AutoCompletePuntosFuente'
import { AutoCompletePuntosBanda } from './AutoCompletePuntosBanda'
import { AutoCompletePuntosObjetivo } from './AutoCompletePuntosObjetivo'

export const LayerPuntosIdentificadosControls = ({
    handleCheckboxPuntosIdentificadosLayer,
    showPuntosIdentificadosLayer,
    handleCheckboxPuntosIdentificadosHeatLayer,
    showPuntosIdentificadosHeatLayer,
    catalogoFD,
    catalogoFuente,
    catalogoBanda,
    catalogoObjetivo,
    handleFaltaDelitoEspecifico,
    handleFuente,
    handleBanda,
    handleObjetivo
}) => {
  return (
    <>
        <div className="container">

            <div className="row">
                <h3 className='text-center'>Puntos Identificados</h3>
            </div>
            <div className="row mb-2">
                <h6>Opciones de la Capa:</h6>
                <LayerChecksPuntos
                    handleCheckboxPuntosIdentificadosLayer={handleCheckboxPuntosIdentificadosLayer} 
                    showPuntosIdentificadosLayer={showPuntosIdentificadosLayer}  
                    handleCheckboxPuntosIdentificadosHeatLayer={handleCheckboxPuntosIdentificadosHeatLayer} 
                    showPuntosIdentificadosHeatLayer={showPuntosIdentificadosHeatLayer} 
                />
            </div>
            <div className="row mb-3">
                <hr/>
                <h6>Filtros Específicos:</h6>
                <div className="col-md-6">
                    {(catalogoFD.length) && <AutoCompletePuntosDelitos data={catalogoFD} handleFaltaDelitoEspecificoPuntosIdentificados={handleFaltaDelitoEspecifico}/>}
                </div>
                <div className="col-md-6">
                    {(catalogoFuente.length) && <AutoCompletePuntosFuente data={catalogoFuente} handleFuentePuntosIdentificados={handleFuente}/>}
                </div>
                <div className="col-md-6">
                    {(catalogoBanda.length) && <AutoCompletePuntosBanda data={catalogoBanda} handleBandaPuntosIdentificados={handleBanda}/>}
                </div>
                <div className="col-md-6">
                    {(catalogoObjetivo.length) && <AutoCompletePuntosObjetivo data={catalogoObjetivo} handleObjetivoPuntosIdentificados={handleObjetivo}/>}
                </div>
            </div>
        </div>
    </>
  )
}
