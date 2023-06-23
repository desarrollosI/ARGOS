import React from 'react'

export const MapControls = ({handleCheckboxUbiHechosLayer,showUbiHechosLayer,handleCheckboxUbiHechosHeatLayer,showUbiHechosHeatLayer,handleCheckboxZonasLayer,showZonasLayer}) => {
  return (
    <div className="row">
        <div className="col-md-3">
            <input
                type="checkbox"
                checked={showUbiHechosLayer}
                onChange={handleCheckboxUbiHechosLayer}
            />
            <label>Mostrar Ubicacion de Hechos</label>
        </div>
        <div className="col-md-3">
            <input
                type="checkbox"
                checked={showUbiHechosHeatLayer}
                onChange={handleCheckboxUbiHechosHeatLayer}
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
