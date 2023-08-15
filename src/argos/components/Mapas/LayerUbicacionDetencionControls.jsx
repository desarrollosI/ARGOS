import React from 'react'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { LayerChecksUbicacionDetencion } from './LayerChecksUbicacionDetencion'
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'
import { AutoCompleteFD } from './AutoCompleteFD'

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
    handleZonaUbicacionDetencion,
    handleJuntaAuxiliarUbicacionDetencion,
    catalogoFD,
    handleFaltaDelitoEspecifico
}) => {
  return (
    <> 
        <div className="container">

            <div className="row">
                <h3 className='text-center'>Ubicación Detencion</h3>
            </div>
            <div className="row  mb-2">
                <h6>Opciones de la Capa:</h6>
                <LayerChecksUbicacionDetencion
                    handleCheckboxUbicacionDetencionLayer={handleCheckboxUbicacionDetencionLayer} 
                    showUbicacionDetencionLayer={showUbicacionDetencionLayer}  
                    handleCheckboxUbicacionDetencionHeatLayer={handleCheckboxUbicacionDetencionHeatLayer} 
                    showUbicacionDetencionHeatLayer={showUbicacionDetencionHeatLayer} 
                />
            </div>
            <div className="row  mb-3">
                <hr/>
                <h6>Filtro Temporal:</h6>
                <div className="col">
                    <DateRangePicker
                        fechaInicio={fechaInicioUbicacionDetencion}
                        fechaFin={fechaFinUbicacionDetencion}
                        handleStartDateChange={handleStartDateChangeUbicacionDetencion}
                        handleEndDateChange={handleEndDateChangeUbicacionDetencion}
                    />
                </div>
            </div>
            <div className="row  mb-3">
                <hr/>
                <h6>Filtros Específiscos:</h6>
                <div className="col-md-5">
                    <FaltaDelitoPicker
                        handleFaltaDelito={handleFaltaDelitoUbicacionDetencion}
                    />
                </div>
                <div className="col-md-5">
                    <AutoCompleteFD data={catalogoFD} handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}/>
                </div>
            </div>
            <div className="row">
                <hr/>
                <h6>Filtros Espaciales:</h6>
                <div className="col-md-6">
                    <ZonasPicker
                        handleZona={handleZonaUbicacionDetencion}
                    />
                </div>
                <div className="col-md-6">
                    <JuntaAuxiliarPicker
                        handleJuntaAuxiliar={handleJuntaAuxiliarUbicacionDetencion}
                    />
                </div>
                <hr className='mt-2'/>
            </div>
        </div>
    </>
  )
}
