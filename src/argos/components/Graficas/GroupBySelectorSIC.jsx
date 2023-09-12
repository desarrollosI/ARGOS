import React from 'react';

export function GroupBySelectorSIC({ agrupacion,handleAgrupacionChange }) {
  console.log(agrupacion,'desde el group by')
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Agrupar por :</label>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "CSviolencia"}>
            <input className="form-check-input" type="radio" value="CSviolencia" name="agrupar"/>
            <label className="form-check-label">Con / Sin violencia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Tipo_Violencia"}>
            <input className="form-check-input" type="radio" value="Tipo_Violencia" name="agrupar"/>
            <label className="form-check-label">Tipo de Violencia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Zona"}>
            <input className="form-check-input" type="radio" value="Zona" name="agrupar"/>
            <label className="form-check-label">Zona</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Hora_trunca"}>
            <input className="form-check-input" type="radio" value="Hora_trunca" name="agrupar"/>
            <label className="form-check-label">Hora</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Dia_semana"}>
            <input className="form-check-input" type="radio" value="Dia_semana" name="agrupar"/>
            <label className="form-check-label">Dia Semana</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacion === "Vector"}>
            <input className="form-check-input" type="radio" value="Vector" name="agrupar"/>
            <label className="form-check-label">Vector</label>
          </div>
        </div>
      </div>
    </div>
  );
}
