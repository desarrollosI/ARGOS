//se importa react
import React from 'react'
//se importan los componentes personalizados
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { LayerChecksEventosSic } from './LayerChecksEventosSic'
import { AutoCompleteFD } from './AutoCompleteFD'

/* Como tal este es un HOC High Order Component pues esta compuesto de otros componentes 
mas pequeños y manejables, solo se reciben los handlers provenientes del componente abuelo para
manejar los cambios en los estados que manipulan los controles o componentes mas pequeños
El retorno es un formulario con todos los controles en uno */
export const LayerSicEventosControls = ({
    handleCheckboxEventosSicLayer,
    showEventosSicLayer,
    handleCheckboxEventosSicHeatLayer,
    showEventosSicHeatLayer,
    fechaInicioEventosSic,
    fechaFinEventosSic,
    handleStartDateChangeEventosSic,
    handleEndDateChangeEventosSic,
    handleZonaEventosSic,
    handleJuntaAuxiliarEventosSic,
    catalogoFD,
    handleFaltaDelitoEspecifico
}) => {
  return (
    <>
        <div className="container">

            <div className="row">
                <h3 className='text-center'>Eventos AURA</h3>
            </div>
            <div className="row mb-2">
                <h6>Opciones de la Capa:</h6>
                <LayerChecksEventosSic
                    handleCheckboxEventosSicLayer={handleCheckboxEventosSicLayer} 
                    showEventosSicLayer={showEventosSicLayer}  
                    handleCheckboxEventosSicHeatLayer={handleCheckboxEventosSicHeatLayer} 
                    showEventosSicHeatLayer={showEventosSicHeatLayer} 
                />
            </div>
            <div className="row  mb-3">
                <hr/>
                <h6>Filtro Temporal:</h6>
                <div className="col">
                    <DateRangePicker
                        fechaInicio={fechaInicioEventosSic}
                        fechaFin={fechaFinEventosSic}
                        handleStartDateChange={handleStartDateChangeEventosSic}
                        handleEndDateChange={handleEndDateChangeEventosSic}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <hr/>
                <h6>Filtros Específicos:</h6>
                <div className="col-md-6">
                    <AutoCompleteFD data={catalogoFD} handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}/>
                </div>
            </div>
            <div className="row mb-3">
                <hr />
                <h6>Filtros Espaciales:</h6>
                <div className="col-md-6">
                    <ZonasPicker
                        handleZona={handleZonaEventosSic}
                    />
                </div>
                <div className="col-md-6 ">
                    <JuntaAuxiliarPicker
                        handleJuntaAuxiliar={handleJuntaAuxiliarEventosSic}
                    />
                </div>
                <hr className='mt-2'/>
            </div>
        </div>
    </>
  )
}
