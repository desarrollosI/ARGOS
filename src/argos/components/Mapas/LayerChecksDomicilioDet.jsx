//se importa react
import React from 'react'
/*
    El componente son las opciones para poder mostrar/ocultar las capa de domicilio detenido en formato de 
    puntos y en formato de capa de calor        
*/
export const LayerChecksDomicilioDet = ({handleCheckboxDomicilioDetLayer,showDomicilioDetLayer,handleCheckboxDomicilioDetHeatLayer,showDomicilioDetHeatLayer}) => {
    return (
      <div className="row">
          <div className="col-md-6">
              <input
                  type="checkbox"
                  checked={showDomicilioDetLayer}
                  onChange={handleCheckboxDomicilioDetLayer}
              />
              <label>Mostrar Domicilio Detenido</label>
          </div>
          <div className="col-md-6">
              <input
                  type="checkbox"
                  checked={showDomicilioDetHeatLayer}
                  onChange={handleCheckboxDomicilioDetHeatLayer}
              />
              <label>Mostrar capa de calor Domicilio Detenido</label>
          </div>
    </div>
    )
  }
  