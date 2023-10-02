//se importa react 
import React from 'react';
//Este componente es el cual se encarga de manejar la agrupacion  de la data de la grafica
export function GroupBySelectorSIC({ agrupacionData,handleAgrupacionChange }) {

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Agrupar por :</label>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="CSviolencia" name="agrupar" defaultChecked={agrupacionData === "CSviolencia"}/>
            <label className="form-check-label">Con / Sin violencia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="Tipo_Violencia" name="agrupar" defaultChecked={agrupacionData === "Tipo_Violencia"}/>
            <label className="form-check-label">Tipo de Violencia</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="Zona" name="agrupar" defaultChecked={agrupacionData === "Zona"}/>
            <label className="form-check-label">Zona</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="Hora_trunca" name="agrupar" defaultChecked={agrupacionData === "Hora_trunca"}/>
            <label className="form-check-label">Hora</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="Dia_semana" name="agrupar" defaultChecked={agrupacionData === "Dia_semana"}/>
            <label className="form-check-label">Dia Semana</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" value="Vector" name="agrupar" defaultChecked={agrupacionData === "Vector"}/>
            <label className="form-check-label">Vector</label>
          </div>
          <div onChange={handleAgrupacionChange} className="form-check form-check-inline" checked={agrupacionData === "SD"}>
            <input className="form-check-input" type="radio" value="SD" name="agrupar"/>
            <label className="form-check-label">Sin Agrupar</label>
          </div>
        </div>
      </div>
    </div>
  );
}
