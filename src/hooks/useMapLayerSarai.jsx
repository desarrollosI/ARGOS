import { useEffect, useState, useRef } from 'react';
import { mapasApi } from '../api';

import mapboxgl from "mapbox-gl";
import { PuntosEnJuntaAuxiliar, PuntosEnZona } from '../argos/helpers';

const useMapLayerSARAI = (endpoint,color,capa) => {
    const [mapContainer, setMapContainer] = useState();
    const [map, setMap] = useState(null);
    const [popup, setPopup] = useState(null);
    const [lng, setLng] = useState(-98.20346);
    const [lat, setLat] = useState(19.03793);
    const [zoom, setZoom] = useState(9);
  // Resto de los estados...
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [fechaInicio, setFechaInicio] = useState('2021-06-24')
    const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])
    const [showLayer, setShowLayer] = useState(true);
    const [showHeatLayer, setShowHeatLayer] = useState(false);
    const [FaltaDelito, setFaltaDelito] = useState('todas')
    const [Zona, setZona] = useState('todas')
    const [JuntaAuxiliar, setJuntaAuxiliar] = useState('todas')
    const [fetchedData2, setFetchedData2] = useState();//Hechos
    const [fetchedData2Respaldo, setFetchedData2Respaldo] = useState();//Hechos
    const [resultadosTurf, setResultadosTurf] = useState()
    const [resultadosTurfJuntaAuxiliar, setResultadosTurfJuntaAuxiliar] = useState()
    
    const [capaVectores, setCapaVectores] = useState();//Capa de vectores usada para el turf js
    const [Remision, setRemision] = useState(258086);
    const [Ficha, setFicha] = useState(14931);
    const [Nombre, setNombre] = useState('');

  const fetchData = async (endpoint) => {
        setIsLoadingData(true);
        let response = await mapasApi.post(endpoint,{fechaInicio,fechaFin,FaltaDelito});
        console.log('data enpoint capa  '+capa,response.data.data.Remisiones2)
        setFetchedData2(response.data.data.Remisiones2);
        setIsLoadingData(false)
  };
//PARA CAMBIAR DE FECHAS
  const handleStartDateChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setFechaFin(event.target.value);
  };
 
  //PARA MOSTRAR LA CAPA
  const handleCheckboxLayer = () => {
    setShowLayer(!showLayer);
  };
  
//PARA MOSTRAR LA CAPA DE CALOR
  const handleCheckboxHeatLayer = () => {
    setShowHeatLayer(!showHeatLayer);
  };
// PARA FILTRAR POR FALTA DELITO  
  const handleFaltaDelito = (event) => {
    setFaltaDelito(event.target.value)
  }
//PARA FILTRAR POR POLIGONO ZONA
  const handleZona = (event) => {
    setZona(event.target.value)
  }
//PARA FILTRAR POR JUNTA AUXILIAR
  const handleJuntaAuxiliar = (event) => {
    setJuntaAuxiliar(event.target.value)
  }

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint,fechaInicio, fechaFin, FaltaDelito]);

  // Implementa el resto de los efectos...

    //EFECTO PARA MANEJAR LA CAPA DE HECHOS
    useEffect(() => {
        if (!map || isLoadingData) return;
    
        if (showLayer) {
         
          if (map.getLayer(capa)) {
            map.removeLayer(capa);
          }
    
          if (map.getSource(capa)) {
            map.removeSource(capa);
          }
    
          map.addSource(capa, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: fetchedData2.map((item) => {
                return {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      isNaN(parseFloat(item.Coordenada_X))
                        ? -0.0
                        : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y))
                        ? 0.0
                        : parseFloat(item.Coordenada_Y),
                    ],
                  },
                  properties: {
                    Ficha: item.Ficha,
                    No_Remision: item.No_Remision,
                    Nombre: item.Nombre,
                    Ap_Paterno: item.Ap_Paterno,
                    Ap_Materno: item.Ap_Materno,
                  },
                };
              }),
            },
          });
    
          map.addLayer({
            id: capa,
            type: "circle",
            source: capa,
            paint: {
              "circle-color": color,
              "circle-radius": 5,
            },
          });
    
          map.on('click', capa, (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = `Remision: ${e.features[0].properties.No_Remision} Nombre: ${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`;
            
            setFicha(e.features[0].properties.Ficha)
            setRemision(e.features[0].properties.No_Remision)
            setNombre(`${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`)
            
            new mapboxgl.Popup({className: "custom-popup"}) 
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
            });
    
        } else {
          if (map.getLayer(capa)) {
            map.removeLayer(capa);
          }
    
          if (map.getSource(capa)) {
            map.removeSource(capa);
          }
        }
      },[isLoadingData,fetchedData2,showLayer])
    
       //EFECTO PARA MANEJAR LA CAPA DE CALOR DE HECHOS HECHOS
       useEffect(() => {
        if (!map || isLoadingData) return;
    
          if (showHeatLayer) {
    
            // Remover la capa de calor si está presente
            if (map.getLayer("heatmap"+capa)) {
              map.removeLayer("heatmap"+capa);
            }
    
            // Remover la fuente de datos de calor si está presente
            if (map.getSource("heatmap"+capa)) {
              map.removeSource("heatmap"+capa);
            }
    
                    // Agregar la capa de calor
                    map.addSource("heatmap"+capa, {
                      type: "geojson",
                      data: {
                        type: "FeatureCollection",
                        features: fetchedData2.map((item) => {
                          return {
                            type: "Feature",
                            geometry: {
                              type: "Point",
                              coordinates: [
                                isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                                isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
                              ],
                            },
                          };
                        }),
                      },
                    });
            
                    map.addLayer(
                      {
                        id: "heatmap"+capa,
                        type: "heatmap",
                        source: "heatmap"+capa,
                        paint: {
                          "heatmap-weight": {
                            property: "mag",
                            type: "exponential",
                            stops: [
                              [0, 0],
                              [6, 1],
                            ],
                          },
                          "heatmap-color": [
                            "interpolate",
                            ["linear"],
                            ["heatmap-density"],
                            0,
                            "rgba(33,102,172,0)",
                            0.2,
                            "rgb(103,169,207)",
                            0.4,
                            "rgb(209,229,240)",
                            0.6,
                            "rgb(253,219,199)",
                            0.8,
                            "rgb(239,138,98)",
                            1,
                            "rgb(178,24,43)",
                          ],
                          "heatmap-radius": {
                            property: "mag",
                            type: "exponential",
                            stops: [
                              [0, 2],
                              [6, 20],
                            ],
                          },
                          "heatmap-opacity": 1, // Establecer la opacidad en 1
                        },
                      },
                      "waterway-label"
                    );
    
          }else {
             // Remover la capa de calor si está presente
            if (map.getLayer("heatmap"+capa)) {
              map.removeLayer("heatmap"+capa);
            }
    
            // Remover la fuente de datos de calor si está presente
            if (map.getSource("heatmap"+capa)) {
              map.removeSource("heatmap"+capa);
            }
          }
    
      }, [isLoadingData, fetchedData2,showHeatLayer]);
    
        /*---------------------EFECTOS DE CAPA DE HECHOS --------------------------------------------- */
    //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO 
    useEffect(() => {
        setTimeout(async () => {
        if (!isLoadingData) {
            if(Zona === 'todas'){
            setFetchedData2(fetchedData2Respaldo)
            }else {
            setFetchedData2Respaldo(fetchedData2)
            setResultadosTurf(await PuntosEnZona(capaVectores, fetchedData2, Zona,'hechos'));

            }
            
        }
        }, 3000);
    }, [Zona]);  
    //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
    useEffect(() => {
        if (resultadosTurf){
        setTimeout( () => {
            setFetchedData2(resultadosTurf.resultados);
        }, 3000);
        }
    }, [resultadosTurf]);

/*---------------------EFECTOS DE CAPA DE HECHOS JUNTSA AUXILIARES --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO JUNTA AUXILIAR
  useEffect(() => {
    console.log('efecto 1 de junta auxiliar');
    setTimeout(async () => {
      if ( !isLoadingData ) {
        console.log('entre al efecto 1 dentro del if')
        if(JuntaAuxiliar === 'todas'){
            console.log('if 1 de junta')
          setFetchedData2(fetchedData2Respaldo)
        }else {
            console.log('else de junta')
          setFetchedData2Respaldo(fetchedData2)
          console.log('LINEA 290 : ',await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'hechos'))
          setResultadosTurfJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'hechos'));

        }
          
      }
    }, 3000);
  }, [JuntaAuxiliar]);  
  //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
  useEffect(() => {
    console.log('efecto 2 de junta auxiliar')
    if (resultadosTurfJuntaAuxiliar){
      setTimeout( () => {
        console.log(resultadosTurfJuntaAuxiliar.resultados)
        setFetchedData2(resultadosTurfJuntaAuxiliar.resultados);
      }, 3000);
    }
  }, [resultadosTurfJuntaAuxiliar]);



  return {
    mapContainer,
    showLayer,
    showHeatLayer,
    fechaInicio,
    fechaFin,
    Zona,
    JuntaAuxiliar,
    Remision,
    Ficha,
    Nombre,
    fetchedData2,
    // Resto de los estados...
    setMap,
    setMapContainer,
    fetchData,
    handleStartDateChange,
    handleEndDateChange,
    handleCheckboxLayer,
    handleCheckboxHeatLayer,
    handleFaltaDelito,
    handleZona,
    handleJuntaAuxiliar
    // Resto de las funciones y efectos...
  };
};

export default useMapLayerSARAI;
