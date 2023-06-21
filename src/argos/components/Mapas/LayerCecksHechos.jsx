import React from 'react'

export const LayerChecksHechos = ({handleCheckboxUbiHechosLayer,showUbiHechosLayer,handleCheckboxUbiHechosHeatLayer,showUbiHechosHeatLayer}) => {
  return (
    <div className="row">
        <div className="col-md-6">
            <input
                type="checkbox"
                checked={showUbiHechosLayer}
                onChange={handleCheckboxUbiHechosLayer}
            />
            <label>Mostrar Ubicacion de Hechos</label>
        </div>
        <div className="col-md-6">
            <input
                type="checkbox"
                checked={showUbiHechosHeatLayer}
                onChange={handleCheckboxUbiHechosHeatLayer}
            />
            <label>Mostrar capa de calor Ubicacion de Hechos</label>
        </div>
  </div>
  )
}
