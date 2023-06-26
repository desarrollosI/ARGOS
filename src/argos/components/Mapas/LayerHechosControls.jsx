import React from 'react'
import { LayerChecksHechos } from './LayerCecksHechos'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'

export const LayerHechosControls = ({
    handleCheckboxUbiHechosLayer,
    showUbiHechosLayer,
    handleCheckboxUbiHechosHeatLayer,
    showUbiHechosHeatLayer,
    fechaInicio,
    fechaFin,
    handleStartDateChange,
    handleEndDateChange,
    handleFaltaDelito,
    handleZona,
    handleJuntaAuxiliar
}) => {
  return (
    <>
        <div className="row">
            <h3 className='text-center'>Ubicaciones de Hechos</h3>
        </div>
        <div className="row">
            <LayerChecksHechos
                handleCheckboxUbiHechosLayer={handleCheckboxUbiHechosLayer} 
                showUbiHechosLayer={showUbiHechosLayer}  
                handleCheckboxUbiHechosHeatLayer={handleCheckboxUbiHechosHeatLayer} 
                showUbiHechosHeatLayer={showUbiHechosHeatLayer} 
            />
        </div>
        <div className="row">
            <div className="col">
                <DateRangePicker
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <FaltaDelitoPicker
                    handleFaltaDelito={handleFaltaDelito}
                />
            </div>
            <div className="col-md-6">
                <ZonasPicker
                    handleZona={handleZona}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <JuntaAuxiliarPicker
                    handleJuntaAuxiliar={handleJuntaAuxiliar}
                />
            </div>
        </div>
    </>
  )
}
