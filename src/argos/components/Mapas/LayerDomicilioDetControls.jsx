//se importa react
import React from 'react'
//se importan los demas componentes personalizados
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { FaltaDelitoPicker } from './FaltaDelitoPicker'
import { LayerChecksDomicilioDet } from './LayerChecksDomicilioDet'
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'
import { AutoCompleteFD } from './AutoCompleteFD'

/* Como tal este es un HOC High Order Component pues esta compuesto de otros componentes 
mas pequeños y manejables, solo se reciben los handlers provenientes del componente abuelo para
manejar los cambios en los estados que manipulan los controles o componentes mas pequeños
El retorno es un formulario con todos los controles en uno */
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
    handleZonaDomicilioDet,
    handleJuntaAuxiliarDomicilioDet,
    catalogoFD,
    handleFaltaDelitoEspecifico
}) => {
  return (
    <>
        <div className="container">

            <div className="row">
                <h3 className='text-center'>Domicilio Detenido</h3>
            </div>
            <div className="row mb-2">
                <h6>Opciones de la Capa:</h6>
                <LayerChecksDomicilioDet
                    handleCheckboxDomicilioDetLayer={handleCheckboxDomicilioDetLayer} 
                    showDomicilioDetLayer={showDomicilioDetLayer}  
                    handleCheckboxDomicilioDetHeatLayer={handleCheckboxDomicilioDetHeatLayer} 
                    showDomicilioDetHeatLayer={showDomicilioDetHeatLayer} 
                />
            </div>
            <div className="row mb-3">
                <hr/>
                <h6>Filtro Temporal:</h6>
                <div className="col">
                    <DateRangePicker
                        fechaInicio={fechaInicioDomicilioDet}
                        fechaFin={fechaFinDomicilioDet}
                        handleStartDateChange={handleStartDateChangeDomicilioDet}
                        handleEndDateChange={handleEndDateChangeDomicilioDet}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <hr/>
                <h6>Filtros Específicos:</h6>
                <div className="col-md-5">
                    <FaltaDelitoPicker
                        handleFaltaDelito={handleFaltaDelitoDomicilioDet}
                    />
                </div>
                <div className="col-md-6">
                    <AutoCompleteFD data={catalogoFD} handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}/>
                </div>
            </div>
            <div className="row">
                <hr/>
                <h6>Filtros Espaciales:</h6>
                <div className="col-md-6">
                    <ZonasPicker
                        handleZona={handleZonaDomicilioDet}
                    />
                </div>
                <div className="col-md-6">
                    <JuntaAuxiliarPicker
                        handleJuntaAuxiliar={handleJuntaAuxiliarDomicilioDet}
                    />
                </div>
                <hr className='mt-2'/>
            </div>
        </div>
    </>
  )
}
