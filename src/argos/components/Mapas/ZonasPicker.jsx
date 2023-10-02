//se importa react
import React from 'react';
/*
  El componente aqui exportado no es mas que un selector con las opciones de zona por las que se puede
  filtrar la informacio de una capa, es una parte de todos los controles de las capas
*/
export function ZonasPicker({handleZona }) {
  return (
    <div className="row mt-2">
    <div className="col-md-12">
      <div className="form-group">
        <label htmlFor="zona">Mostrar Zona :</label>
        <div onChange={handleZona}>
          <select className="form-select form-select-sm" name="zona" id="zona" >
            <option value="todas">TODAS LAS OPCIONES</option>
            <option value="ZONA 1">ZONA 1</option>
            <option value="ZONA 2">ZONA 2</option>
            <option value="ZONA 3">ZONA 3</option>
            <option value="ZONA 4">ZONA 4</option>
            <option value="ZONA 5">ZONA 5</option>
            <option value="ZONA 6">ZONA 6</option>
            <option value="ZONA 7">ZONA 7</option>
            <option value="ZONA 8">ZONA 8</option>
            <option value="ZONA 9">ZONA 9</option>
            <option value="ZONA 10">ZONA 10</option>
            <option value="ZONA CH">ZONA CH</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );
}