// FiltroFecha.jsx

import React, { useState, useCallback, useEffect, useMemo  } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const FiltroTexto = ({ column, onFilterChange,opciones }) => {
  const { filterValue = '' } = column;
  const [inputValue, setInputValue] = useState(filterValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onFilterChange(column.id, inputValue);
    }
  };

  return <input value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} />;
};


export const FiltroSelect = ({ column, onFilterChange, opciones }) => {
    const { filterValue = '', id } = column;
  
    // Obtener las opciones específicas para el column.id
    const options = useMemo(() => {
        const columnOptions = opciones.find((option) => option.nombre === id);
        const columnOptionsList = columnOptions ? columnOptions.opciones : [];
        
        // Agregar la opción "TODAS" al inicio
        return [{ value: '', label: 'TODAS' }, ...columnOptionsList.map((option) => ({ value: option, label: option }))];
      }, [id, opciones]);
  
    return (
      <Select
        options={options}
        value={{ value: filterValue, label: filterValue }}
        onChange={(selectedOption) => onFilterChange(column.id, selectedOption.value)}
      />
    );
  };


export const FiltroFecha = ({ column, onFilterChange,opciones }) => {
  const { filterValue = [] } = column;

  return (
    <DatePicker
      selected={filterValue[0]}
      onChange={(date) => onFilterChange(column.id, [date, filterValue[1]])}
      selectsStart
      startDate={filterValue[0]}
      endDate={filterValue[1]}
      inline
    />
  );
};
