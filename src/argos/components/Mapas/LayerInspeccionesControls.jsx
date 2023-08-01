import React from 'react'
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { LayerChecksInspecciones } from './LayerCecksInspecciones'

export const LayerInspeccionesControls = ({
    handleCheckboxInspeccionesLayer,
    showInspeccionesLayer,
    handleCheckboxInspeccionesHeatLayer,
    showInspeccionesHeatLayer,
    fechaInicioInspecciones,
    fechaFinInspecciones,
    handleStartDateChangeInspecciones,
    handleEndDateChangeInspecciones,
    handleZonaInspecciones,
    handleJuntaAuxiliarInspecciones,
}) => {
  return (
    <>
        <div className="row">
            <h3 className='text-center'>Inspecciones</h3>
        </div>
        <div className="row mb-2">
            <h6>Opciones de la Capa:</h6>
            <LayerChecksInspecciones
                handleCheckboxInspeccionesLayer={handleCheckboxInspeccionesLayer} 
                showInspeccionesLayer={showInspeccionesLayer}  
                handleCheckboxInspeccionesHeatLayer={handleCheckboxInspeccionesHeatLayer} 
                showInspeccionesHeatLayer={showInspeccionesHeatLayer} 
            />
        </div>
        <div className="row  mb-3">
            <hr/>
            <h6>Filtro Temporal:</h6>
            <div className="col">
                <DateRangePicker
                    fechaInicio={fechaInicioInspecciones}
                    fechaFin={fechaFinInspecciones}
                    handleStartDateChange={handleStartDateChangeInspecciones}
                    handleEndDateChange={handleEndDateChangeInspecciones}
                />
            </div>
        </div>
        <div className="row mb-3">
            <hr />
            <h6>Filtros Espaciales:</h6>
            <div className="col-md-6">
                <ZonasPicker
                    handleZona={handleZonaInspecciones}
                />
            </div>
            <div className="col-md-6 ">
                <JuntaAuxiliarPicker
                    handleJuntaAuxiliar={handleJuntaAuxiliarInspecciones}
                />
            </div>
            <hr className='mt-2'/>
        </div>
    </>
  )
}
