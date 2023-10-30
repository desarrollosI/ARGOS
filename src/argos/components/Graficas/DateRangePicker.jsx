//se importa react
import React from 'react';
/*
  El componente es el encargado de manejar los cambios de fechas de dos input,
  como el nombre lo indica es el selecctor para filtrar entre un rango de fechas 
*/
export function DateRangePicker({ fechaInicio, fechaFin, handleStartDateChange, handleEndDateChange }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="start">Fecha inicio:</label>
          <input
            className="form-control form-control-sm"
            type="date"
            id="start"
            name="trip-start"
            value={fechaInicio}
            onChange={handleStartDateChange}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="end">Fecha Fin:</label>
          <input
            className="form-control form-control-sm"
            type="date"
            id="end"
            name="trip-end"
            value={fechaFin}
            onChange={handleEndDateChange}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}
