//se importa react
import React, { useState } from 'react';
//se importa el componente del filtro 
import Select from 'react-select';
//este componente es el encargado de poder seleccionar multples opciones de una lista para realizar el filtrado de informacion
export const CheckSelect = ({opciones,selectedOption,setSelectedOption}) => {
    //console.log({opciones,selectedOption,setSelectedOption})
  return (
    <div className="App">
      <Select
        defaultValue={null}
        onChange={setSelectedOption}
        value={selectedOption}
        options={opciones}
        placeholder={'SELECCIONE UNA OPCION'}
        isMulti
      />
    </div>
  );
}