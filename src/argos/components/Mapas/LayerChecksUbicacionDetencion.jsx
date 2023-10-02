//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de ubicaciones de detencion en formato de 
    puntos y en formato de capa de calor        
*/
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
  