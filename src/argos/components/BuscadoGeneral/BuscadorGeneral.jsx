import React, { useEffect, useState } from 'react';
import { CheckTypeSearch } from './CheckTypeSearch';
import { NombreSearch } from './NombreSearch';
import { DireccionSearch } from './DireccionSearch';
import { AliasSearch } from './AliasSearch';
import { PlacaNivSearch } from './PalacaNivSearch';
import { TelefonoSearch } from './TelefonoSearch';
import useGeneralSearchControls from '../../../hooks/useGeneralSearchControls';

export const BuscadorGeneral = () => {
    const [selectedOption, setSelectedOption] = useState('nombre');

    // Se llama al hook encargado de la búsqueda general
    const { GenerateObject, generarTablas, showTables,tablasResultado,isLoadingData } = useGeneralSearchControls();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
      console.log('desde el general: ', tablasResultado)
    }, [tablasResultado])
    
    return (
        <>
            <div className="row">
              <div className="col">
                  <div className="alert alert-info" role="alert">
                    Nota: Si la busqueda no se ve reflejada o actualizada, actualice la pagina, se esta buscando una solución
                  </div>
              </div>
            </div>
            <CheckTypeSearch
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
            />

            {(selectedOption === 'nombre') && <NombreSearch GenerateObject={GenerateObject} isLoadingData={isLoadingData}/>}
            {(selectedOption === 'direccion') && <DireccionSearch GenerateObject={GenerateObject} isLoadingData={isLoadingData}/>}
            {(selectedOption === 'alias') && <AliasSearch GenerateObject={GenerateObject} isLoadingData={isLoadingData}/>}
            {(selectedOption === 'placaniv') && <PlacaNivSearch GenerateObject={GenerateObject} isLoadingData={isLoadingData}/>}
            {(selectedOption === 'telefono') && <TelefonoSearch GenerateObject={GenerateObject} isLoadingData={isLoadingData}/>}

            {showTables && (
                <div>
                    {/* Aquí se renderizarán las tablas generadas por el hook */}
                    {tablasResultado}
                </div>
            )}
        </>
    );
};
