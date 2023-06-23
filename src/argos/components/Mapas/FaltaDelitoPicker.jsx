import React from 'react';

export function FaltaDelitoPicker({handleFaltaDelito }) {
  return (
    <div className="row mt-2">
    <div className="col-md-12">
      <div className="form-group">
        <label htmlFor="agrupar">Mostrar Faltas o Delitos :</label>
        <div onChange={handleFaltaDelito} className="form-check form-check-inline">
          <select className="form-select" name="falta-delito" id="falta-delito" >
            <option value="todas">TODAS LAS OPCIONES</option>
            <option value="F">FALTAS</option>
            <option value="D">DELITOS</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );
}
