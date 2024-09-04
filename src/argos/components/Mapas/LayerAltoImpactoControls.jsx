//se importa react
import React from 'react'
//se importan los componentes personalizados
import { LayerChecksAltoImpacto } from './LayerChecksAltoImpacto'
import { DateRangePicker } from '../Graficas/DateRangePicker'
import { ZonasPicker } from './ZonasPicker'
import { JuntaAuxiliarPicker } from './JuntaAuxiliarPicker'
import { AutoCompleteFD } from './AutoCompleteFD'

/* Como tal este es un HOC High Order Component pues esta compuesto de otros componentes 
mas pequeños y manejables, solo se reciben los handlers provenientes del componente abuelo para
manejar los cambios en los estados que manipulan los controles o componentes mas pequeños
El retorno es un formulario con todos los controles en uno */
export const LayerAltoImpactoControls = ({
    handleCheckboxAltoImpactoLayer,
    showAltoImpactoLayer,
    handleCheckboxAltoImpactoHeatLayer,
    showAltoImpactoHeatLayer,
    fechaInicioAltoImpacto,
    fechaFinAltoImpacto,
    handleStartDateChangeAltoImpacto,
    handleEndDateChangeAltoImpacto,
    handleZonaAltoImpacto,
    handleJuntaAuxiliarAltoImpacto,
    catalogoFD,
    handleFaltaDelitoEspecifico
}) => {
  return (
    <>
        <div className="container">

            <div className="row">
                <h3 className='text-center'>Ubicaciones de Alto Impacto</h3>
            </div>
            <div className="row mb-2">
                <h6>Opciones de la Capa:</h6>
                <LayerChecksAltoImpacto
                    handleCheckboxAltoImpactoLayer={handleCheckboxAltoImpactoLayer} 
                    showAltoImpactoLayer={showAltoImpactoLayer}  
                    handleCheckboxAltoImpactoHeatLayer={handleCheckboxAltoImpactoHeatLayer} 
                    showAltoImpactoHeatLayer={showAltoImpactoHeatLayer} 
                />
            </div>
            <div className="row  mb-3">
                <hr/>
                <h6>Filtro Temporal:</h6>
                <div className="col">
                    <DateRangePicker
                        fechaInicio={fechaInicioAltoImpacto}
                        fechaFin={fechaFinAltoImpacto}
                        handleStartDateChange={handleStartDateChangeAltoImpacto}
                        handleEndDateChange={handleEndDateChangeAltoImpacto}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <hr />
                <h6>Filtros Espaciales:</h6>
                <div className="col-md-6">
                    <ZonasPicker
                        handleZona={handleZonaAltoImpacto}
                    />
                </div>
                <div className="col-md-6 ">
                    <JuntaAuxiliarPicker
                        handleJuntaAuxiliar={handleJuntaAuxiliarAltoImpacto}
                    />
                </div>
                <hr className='mt-2'/>
            </div>
        </div>
    </>
  )
}
