import React from 'react'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { LayerChecksUbicacionDetencion } from './LayerChecksUbicacionDetencion'
import { ZonasPicker } from './ZonasPicker'

export const LayerUbicacionDetencionControls = ({
    handleCheckboxUbicacionDetencionLayer,
    showUbicacionDetencionLayer,
    handleCheckboxUbicacionDetencionHeatLayer,
    showUbicacionDetencionHeatLayer,
    fechaInicioUbicacionDetencion,
    fechaFinUbicacionDetencion,
    handleStartDateChangeUbicacionDetencion,
    handleEndDateChangeUbicacionDetencion,
    handleFaltaDelitoUbicacionDetencion,
    handleZonaUbicacionDetencion
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
            <div className="col-md-6">
                <ZonasPicker
                    handleZona={handleZonaUbicacionDetencion}
                />
            </div>
        </div>
    </>
  )
}
