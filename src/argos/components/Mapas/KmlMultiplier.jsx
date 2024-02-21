import React, { useState } from 'react';
import {KmlToGeoJsonConverter}  from './KmlToGeoJsonConverter'

// Componente que se instancia dinámicamente
const NewLayer = ({ index,mapa }) => {
  return <KmlToGeoJsonConverter mapa={mapa}/>;
};

// Componente principal que maneja la creación de nuevas instancias
export const AddLayer = ({mapa}) => {
  const [componentCount, setComponentCount] = useState(0);

  // Función para agregar una nueva instancia del componente
  const addNewComponent = () => {
    setComponentCount(componentCount + 1);
  };

  return (
    <div>
      <button className="btn btn-success mt-2"onClick={addNewComponent}><strong>+ Añadir capa</strong></button>
      {Array.from({ length: componentCount }, (_, index) => (
        <NewLayer key={index} index={index + 1} mapa={mapa}/>
      ))}
    </div>
  );
};

