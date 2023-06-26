import React from 'react'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { LayerChecksDomicilioDet } from './LayerChecksDomicilioDet'
import { ZonasPicker } from './ZonasPicker'

export const LayerDomicilioDetControls = ({
    handleCheckboxDomicilioDetLayer,
    showDomicilioDetLayer,
    handleCheckboxDomicilioDetHeatLayer,
    showDomicilioDetHeatLayer,
    fechaInicioDomicilioDet,
    fechaFinDomicilioDet,
    handleStartDateChangeDomicilioDet,
    handleEndDateChangeDomicilioDet,
    handleFaltaDelitoDomicilioDet,
    handleZonaDomicilioDet
}) => {
  return (
    <>
        <div className="row">
            <h3 className='text-center'>Domicilio Detenido</h3>
        </div>
        <div className="row">
            <LayerChecksDomicilioDet
                handleCheckboxDomicilioDetLayer={handleCheckboxDomicilioDetLayer} 
                showDomicilioDetLayer={showDomicilioDetLayer}  
                handleCheckboxDomicilioDetHeatLayer={handleCheckboxDomicilioDetHeatLayer} 
                showDomicilioDetHeatLayer={showDomicilioDetHeatLayer} 
            />
        </div>
        <div className="row">
            <div className="col">
                <DateRangePicker
                    fechaInicio={fechaInicioDomicilioDet}
                    fechaFin={fechaFinDomicilioDet}
                    handleStartDateChange={handleStartDateChangeDomicilioDet}
                    handleEndDateChange={handleEndDateChangeDomicilioDet}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <FaltaDelitoPicker
                    handleFaltaDelito={handleFaltaDelitoDomicilioDet}
                />
            </div>
            <div className="col-md-6">
                <ZonasPicker
                    handleZona={handleZonaDomicilioDet}
                />
            </div>
        </div>
    </>
  )
}
