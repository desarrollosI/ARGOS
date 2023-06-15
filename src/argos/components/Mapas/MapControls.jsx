import React from 'react'

export const MapControls = ({handleCheckboxUbiHLayer,showUbiHLayer,handleCheckboxZonasLayer,showZonasLayer}) => {
  return (
    <div className="row">
        <div className="col-md-3">
            <input
                type="checkbox"
                checked={showUbiHLayer}
                onChange={handleCheckboxUbiHLayer}
            />
            <label>Mostrar capa de calor Ubicacion de Hechos</label>
        </div>
        <div className="col-md-3">
            <input
                type="checkbox"
                checked={showZonasLayer}
                onChange={handleCheckboxZonasLayer}
            />
            <label>Mostrar capa de Zonas</label>
        </div>
  </div>
  )
}
