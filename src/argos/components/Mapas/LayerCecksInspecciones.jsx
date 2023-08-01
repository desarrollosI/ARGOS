import React from 'react'

export const LayerChecksInspecciones = ({handleCheckboxInspeccionesLayer,showInspeccionesLayer,handleCheckboxInspeccionesHeatLayer,showInspeccionesHeatLayer}) => {
  return (
    <div className="row">
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showInspeccionesLayer}
                onChange={handleCheckboxInspeccionesLayer}
            />
            <label>Mostrar Ubicacion de Inspecciones</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showInspeccionesHeatLayer}
                onChange={handleCheckboxInspeccionesHeatLayer}
            />
            <label>Mostrar capa de calor Inspecciones</label>
        </div>
  </div>
  )
}
