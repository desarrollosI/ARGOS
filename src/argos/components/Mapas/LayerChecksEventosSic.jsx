//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de eventos sic en formato de 
    puntos y en formato de capa de calor        
*/
export const LayerChecksEventosSic = ({handleCheckboxEventosSicLayer,showEventosSicLayer,handleCheckboxEventosSicHeatLayer,showEventosSicHeatLayer}) => {
  return (
    <div className="row">
        <div className="ms-3 col-md-5 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showEventosSicLayer}
                onChange={handleCheckboxEventosSicLayer}
            />
            <label>Mostrar Ubicacion de Eventos AURA</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showEventosSicHeatLayer}
                onChange={handleCheckboxEventosSicHeatLayer}
            />
            <label>Mostrar capa de calor Eventos AURA</label>
        </div>
  </div>
  )
}
