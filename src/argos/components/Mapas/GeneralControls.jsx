import React from 'react'

export const GeneralControls = ({showVectoresLayer,handleCheckboxVectoresLayer,handleZonaGeneral}) => {
  return (
    <>
        <div className="row">
            <h3 className='text-center'>Controles Generales</h3>
        </div>
        <div className="row">
            <div className="col-md-3">
                <input
                    type="checkbox"
                    checked={showVectoresLayer}
                    onChange={handleCheckboxVectoresLayer}
                />
                <label>Mostrar capa de Vectores</label>
            </div>
        </div>
    </>
  )
}
