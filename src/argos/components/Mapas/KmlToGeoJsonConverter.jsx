import React, { useEffect, useState } from 'react';
import toGeoJSON from 'togeojson';

const KmlToGeoJsonConverter = ({mapa}) => {
  const [geoJsonData, setGeoJsonData] = useState(null);


  const addGeoJsonLayerToMap = (mapa, geoJsonData) => {
    console.log('DENTRO DE LA FUNCION,', mapa,geoJsonData)

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

  useEffect(() => {
    console.log('EFECTO DE ADD JSON')
    if (mapa && geoJsonData) {
      addGeoJsonLayerToMap(mapa, geoJsonData);
    }
  }, [mapa, geoJsonData]);

  return (
    <div className='mt-3'>
      <input type="file" className="form-control form-control-lg" accept=".kml" onChange={handleFileChange} />
    </div>
  );
};

export default KmlToGeoJsonConverter;
