import React, { useState, useEffect } from 'react';
import toGeoJSON from 'togeojson';
import Swal from 'sweetalert2';

export const KmlToGeoJsonConverter = ({ mapa }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [geoType, setGeoType] = useState(null);
  const [layerName, setLayerName] = useState('');
  const [featureProperties, setFeatureProperties] = useState(null)

  const addGeoJsonLayerToMap = (mapa, geoJsonData) => {
    if (mapa.getLayer(layerName)) {
      mapa.removeLayer(layerName);
    }

    if (mapa.getSource(layerName)) {
      mapa.removeSource(layerName);
    }

    mapa.addSource(layerName, {  // Cambio: Usar el nombre del archivo para el nombre del source
      type: 'geojson',
      data: geoJsonData,
    });

    if (geoType === 'Point') {
      // Capa de puntos
      mapa.addLayer({
        id: layerName,
        type: 'circle',
        source: layerName,
        paint: {
          'circle-color': '#'+Math.floor(Math.random()*16777215).toString(16),
          'circle-radius': 8,
        },
      });
    } else if (geoType === 'Polygon') {
      // Capa de polígonos
      mapa.addLayer({
        id: layerName,
        type: 'fill',
        source: layerName,
        paint: {
          'fill-color': ['get', 'fill'] || '#'+Math.floor(Math.random()*16777215).toString(16) ,
          'fill-opacity': 0.3,
        },
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const domParser = new DOMParser();
      const kml = domParser.parseFromString(content, 'text/xml');
      const geoJson = toGeoJSON.kml(kml);

      
      console.log('GeoJSON:', geoJson);

      // Determinar el tipo de geometría (punto, polígono, etc.)
      const geometryType = geoJson.features[0].geometry.type;
      console.log('Tipo de geometría:', geometryType);

      // Acceder a las propiedades de la primera geometría
      const properties = geoJson.features[0].properties;
      console.log('Propiedades de la geometría:', properties);

      const uniqueProperties = Object.keys(Object.assign({}, ...geoJson.features.map(feature => feature.properties)));
      setFeatureProperties(uniqueProperties)
      console.log('UNICAS: ', uniqueProperties);


      setGeoJsonData(geoJson);
      setGeoType(geometryType)

      // Obtener el nombre del archivo sin la extensión
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      setLayerName(fileName);
    };

    reader.readAsText(file);
  };

  const removeGeoJsonLayerFromMap = () => {
    if (mapa.getLayer(layerName)) {
      mapa.removeLayer(layerName);
    }

    if (mapa.getSource(layerName)) {
      mapa.removeSource(layerName);
    }

    setGeoJsonData(null);
  };

  useEffect(() => {
    if (mapa && geoJsonData) {
      addGeoJsonLayerToMap(mapa, geoJsonData);
    }

          // Agregar evento de clic al mapa
          mapa.on('click', layerName, (e) => {
            console.log(e.features[0].properties);
          
            // Utilizamos la función map para crear un nuevo array con los elementos formateados
            const propshtml = Object.entries(e.features[0].properties).map(([key, value]) => {
              return `<strong>${key}</strong>: ${value}<br>`;
            }).join(''); // Usamos join() para convertir el array en un string
          
            Swal.fire({
              title: 'Propiedades de la feature:',
              html: `${propshtml}`,
              confirmButtonText: 'Cerrar'
            });
          });
  
  }, [mapa, geoJsonData]);



  return (
    <div className='my-3'>
      <input type="file" className="form-control form-control-lg" accept=".kml" onChange={handleFileChange} />
      <button className="btn btn-danger mt-2" onClick={removeGeoJsonLayerFromMap}>Eliminar Capa</button>
    </div>
  );
};
