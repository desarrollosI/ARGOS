import React from 'react'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { LayerChecksUbicacionDetencion } from './LayerChecksUbicacionDetencion'

export const LayerUbicacionDetencionControls = ({
    handleCheckboxUbicacionDetencionLayer,
    showUbicacionDetencionLayer,
    handleCheckboxUbicacionDetencionHeatLayer,
    showUbicacionDetencionHeatLayer,
    fechaInicioUbicacionDetencion,
    fechaFinUbicacionDetencion,
    handleStartDateChangeUbicacionDetencion,
    handleEndDateChangeUbicacionDetencion,
    handleFaltaDelitoUbicacionDetencion
}) => {
  return (
    <>
        <div className="row">
            <h3 className='text-center'>Ubicación Detencion</h3>
        </div>
        <div className="row">
            <LayerChecksUbicacionDetencion
                handleCheckboxUbicacionDetencionLayer={handleCheckboxUbicacionDetencionLayer} 
                showUbicacionDetencionLayer={showUbicacionDetencionLayer}  
                handleCheckboxUbicacionDetencionHeatLayer={handleCheckboxUbicacionDetencionHeatLayer} 
                showUbicacionDetencionHeatLayer={showUbicacionDetencionHeatLayer} 
            />
        </div>
        <div className="row">
            <div className="col">
                <DateRangePicker
                    fechaInicio={fechaInicioUbicacionDetencion}
                    fechaFin={fechaFinUbicacionDetencion}
                    handleStartDateChange={handleStartDateChangeUbicacionDetencion}
                    handleEndDateChange={handleEndDateChangeUbicacionDetencion}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <FaltaDelitoPicker
                    handleFaltaDelito={handleFaltaDelitoUbicacionDetencion}
                />
            </div>
        </div>
    </>
  )
}
