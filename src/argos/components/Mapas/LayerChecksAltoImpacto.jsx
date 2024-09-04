//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de ubicaciones alto impacto en formato de 
    puntos y en formato de capa de calor        
*/
export const LayerChecksAltoImpacto = ({handleCheckboxAltoImpactoLayer,showAltoImpactoLayer,handleCheckboxAltoImpactoHeatLayer,showAltoImpactoHeatLayer}) => {
  return (
    <div className="row">
        <div className="ms-3 col-md-5 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showAltoImpactoLayer}
                onChange={handleCheckboxAltoImpactoLayer}
            />
            <label>Mostrar Ubicacion de Alto Impacto</label>
        </div>
        <div className="col-md-6 form-check">
            <input
                className='form-check-input form-check-input-sm'
                type="checkbox"
                checked={showAltoImpactoHeatLayer}
                onChange={handleCheckboxAltoImpactoHeatLayer}
            />
            <label>Mostrar capa de calor Alto Impacto</label>
        </div>
  </div>
  )
}
