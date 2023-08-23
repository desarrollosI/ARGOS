import React from 'react'

export const LayerChecksUbicacionDetencion = ({handleCheckboxUbicacionDetencionLayer,showUbicacionDetencionLayer,handleCheckboxUbicacionDetencionHeatLayer,showUbicacionDetencionHeatLayer}) => {
    return (
      <div className="row">
          <div className="ms-3 col-md-5">
              <input
                  type="checkbox"
                  checked={showUbicacionDetencionLayer}
                  onChange={handleCheckboxUbicacionDetencionLayer}
              />
              <label>Mostrar Ubicacion de la Detención</label>
          </div>
          <div className="col-md-6">
              <input
                  type="checkbox"
                  checked={showUbicacionDetencionHeatLayer}
                  onChange={handleCheckboxUbicacionDetencionHeatLayer}
              />
              <label>Mostrar capa de calor Ubicacion de la Detención</label>
          </div>
    </div>
    )
  }
  