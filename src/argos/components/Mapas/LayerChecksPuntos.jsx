import React from 'react'

export const LayerChecksPuntos = ({handleCheckboxPuntosIdentificadosLayer,showPuntosIdentificadosLayer,handleCheckboxPuntosIdentificadosHeatLayer,showPuntosIdentificadosHeatLayer}) => {
  return (
    <div className="row">
        <div className="ms-3 col-md-5 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showPuntosIdentificadosLayer}
                onChange={handleCheckboxPuntosIdentificadosLayer}
            />
            <label>Mostrar Puntos Identificados</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showPuntosIdentificadosHeatLayer}
                onChange={handleCheckboxPuntosIdentificadosHeatLayer}
            />
            <label>Mostrar capa de calor Puntos Identificados</label>
        </div>
  </div>
  )
}
