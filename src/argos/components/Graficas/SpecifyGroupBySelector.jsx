//se importa react
import React from 'react';
/*Este componente exporta un selector basado en un arreglo de opciones que recibe de entrada
  solo soporta una opcion a la vez por lo que fue reemplazado por el componente CheckSelect
*/
export function SpecifyGroupBySelector({ handleSpecifyAgrupacionChange,opciones = [] }) {
  opciones = [...new Set(opciones)]
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Ver especifico :</label>
          <div onChange={handleSpecifyAgrupacionChange} className="form-check form-check-inline">
            <select className="form-select" name="especifico" id="especifico" defaultValue={(opciones.length==1) && opciones[0]}>
              <option value="todas">TODAS LAS OPCIONES</option>
              {
                opciones.map(opcion =>  <option key={opcion} value={opcion} >{opcion}</option>)
              }
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
