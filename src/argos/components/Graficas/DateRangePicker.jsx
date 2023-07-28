import React from 'react';

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
          />
        </div>
      </div>
    </div>
  );
}
