import React from 'react';

export function ZonasPicker({handleZona }) {
  return (
    <div className="row mt-2">
    <div className="col-md-12">
      <div className="form-group">
        <label htmlFor="zona">Mostrar Zona :</label>
        <div onChange={handleZona} className="form-check form-check-inline">
          <select className="form-select" name="zona" id="zona" >
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