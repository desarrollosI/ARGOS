import React, { useState } from 'react';
import Select from 'react-select';

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