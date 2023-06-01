import React from 'react';

export function GroupBySelector({ handleAgrupacionChange }) {
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Agrupar por :</label>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="Instancia" name="agrupar" />
            <label className="form-check-label">Instancia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="Zona" name="agrupar" />
            <label className="form-check-label">Zona</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="SD" name="agrupar" />
            <label className="form-check-label">Sin Agrupar</label>
          </div>
        </div>
      </div>
    </div>
  );
}
