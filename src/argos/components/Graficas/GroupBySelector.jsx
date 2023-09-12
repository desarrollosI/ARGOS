import React from 'react';

export function GroupBySelector({ agrupacion,handleAgrupacionChange }) {
  //console.log(agrupacion,'desde el group by')
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Agrupar por :</label>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Instancia"}>
            <input className="form-check-input" type="radio" value="Instancia" name="agrupar"/>
            <label className="form-check-label">Instancia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Zona"}>
            <input className="form-check-input" type="radio" value="Zona" name="agrupar"/>
            <label className="form-check-label">Zona</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "SD"}>
            <input className="form-check-input" type="radio" value="SD" name="agrupar"/>
            <label className="form-check-label">Sin Agrupar</label>
          </div>
        </div>
      </div>
    </div>
  );
}
