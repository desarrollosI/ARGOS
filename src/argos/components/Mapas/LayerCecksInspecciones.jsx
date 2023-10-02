//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de inspecciones en formato de 
    puntos y en formato de capa de calor        
*/
export const LayerChecksInspecciones = ({handleCheckboxInspeccionesLayer,showInspeccionesLayer,handleCheckboxInspeccionesHeatLayer,showInspeccionesHeatLayer}) => {
  return (
    <div className="row">
        <div className="ms-3 col-md-5 form-check">
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
