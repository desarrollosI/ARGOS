//se importa react
import React from 'react'
/* 
    El retorno de este componente son todos los controles generales no especificos a una capa,
    como mostrar u ocultar la capa de vectores, y ya exportacion a csv general o poligono personalziado
*/
export const GeneralControls = ({showVectoresLayer,handleCheckboxVectoresLayer,handleZonaGeneral,handleCapasExcel,handleCapasPerExcel}) => {
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

            <div className="col-md-3">
                <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleCapasExcel}
                >
                    Exportar CSV
                </button>
            </div>

            <div className="col-md-6  mb-3">
                <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleCapasPerExcel}
                >
                    Exportar CSV Poligono Perzonalizado
                </button>
            </div>

        </div>
    </>
  )
}
