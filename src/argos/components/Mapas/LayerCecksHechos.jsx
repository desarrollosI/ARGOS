//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de ubicaciones de hechos en formato de 
    puntos y en formato de capa de calor        
*/
export const LayerChecksHechos = ({handleCheckboxUbiHechosLayer,showUbiHechosLayer,handleCheckboxUbiHechosHeatLayer,showUbiHechosHeatLayer}) => {
  return (
    <div className="row">
        <div className="ms-3 col-md-5 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showUbiHechosLayer}
                onChange={handleCheckboxUbiHechosLayer}
            />
            <label>Mostrar Ubicacion de Hechos</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showUbiHechosHeatLayer}
                onChange={handleCheckboxUbiHechosHeatLayer}
            />
            <label>Mostrar capa de calor Ubicacion de Hechos</label>
        </div>
  </div>
  )
}
