import React from 'react'

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
  