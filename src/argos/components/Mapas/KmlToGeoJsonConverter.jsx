//Se importa react y sus hook necesarios
import React, { useEffect, useState } from 'react';
//se importa la biblioteca de toGeoJSON para convertir el kml a GeoJSON
import toGeoJSON from 'togeojson';
/*
  El componente recibe como entrada la referencia hacia el mapa pues ahi se pintara
  la capa que se reciba de entrada

*/
const KmlToGeoJsonConverter = ({mapa}) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  // la biblioteca se encarga de la mayoria con sus funciones, aca simplemente se genera una capa con el archivo y se añade al mapa
  const addGeoJsonLayerToMap = (mapa, geoJsonData) => {

    if (mapa.getLayer('pointLayer')) {
      mapa.removeLayer('pointLayer');
      }

      if (mapa.getSource('geojsonSource')) {
      mapa.removeSource('geojsonSource');
      }


    mapa.addSource('geojsonSource', {
      type: 'geojson',
      data: geoJsonData,
    });

    mapa.addLayer({
      id: 'pointLayer',
      type: 'circle',
      source: 'geojsonSource',
      paint: {
        'circle-color': 'yellow',
        'circle-radius': 5,
      },
    });
  };
  /*
    En este handler se detectan cambios en el input de entrada,
    se invoda el filereader y ya que se tiene el archivo, se utlian las funciones
    para convertir esa entrada en un geoJSON valido a partir de un kml de entrada
  */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const domParser = new DOMParser();
      const kml = domParser.parseFromString(content, 'text/xml');
      const geoJson = toGeoJSON.kml(kml);

      setGeoJsonData(geoJson);
    };

    reader.readAsText(file);
  };
  //se añade la capa al mapa
  useEffect(() => {
    console.log('EFECTO DE ADD JSON')
    if (mapa && geoJsonData) {
      addGeoJsonLayerToMap(mapa, geoJsonData);
    }
  }, [mapa, geoJsonData]);
  //por ultimo el retorno no es mas que el input de tipo file, que de momento solo acpeta archivos KML
  return (
    <div className='my-3'>
      <input type="file" className="form-control form-control-lg" accept=".kml" onChange={handleFileChange} />
    </div>
  );
};

export default KmlToGeoJsonConverter;
