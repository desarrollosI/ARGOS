import React from 'react'

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
            <label>Mostrar Ubicacion de Eventos Sic</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showEventosSicHeatLayer}
                onChange={handleCheckboxEventosSicHeatLayer}
            />
            <label>Mostrar capa de calor Eventos Sic</label>
        </div>
  </div>
  )
}
