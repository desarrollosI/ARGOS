import { useEffect, useState, useRef } from 'react';
import { mapasApi } from '../api';

import Swal from 'sweetalert2';
import mapboxgl from "mapbox-gl";
import { PuntosEnJuntaAuxiliar, PuntosEnZona } from '../argos/helpers';
import { insertHistorial } from '../helpers/insertHistorial';

const useMapLayerSic = (endpoint,color,capa,setFolioSic) => {
    const [mapContainer, setMapContainer] = useState();
    const [map, setMap] = useState(null);
    const [popup, setPopup] = useState(null);
    const [lng, setLng] = useState(-98.20346);
    const [lat, setLat] = useState(19.03793);
    const [zoom, setZoom] = useState(9);
  // Resto de los estados...
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingDataCapa, setIsLoadingDataCapa] = useState(true);
    const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
    const [fechaInicio, setFechaInicio] = useState(
      new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0]
    );
    const [showLayer, setShowLayer] = useState(true);
    const [showHeatLayer, setShowHeatLayer] = useState(false);
    const [Zona, setZona] = useState('todas')
    const [JuntaAuxiliar, setJuntaAuxiliar] = useState('todas')
    const [fetchedData2, setFetchedData2] = useState();//Hechos
    const [fetchedData2Respaldo, setFetchedData2Respaldo] = useState();//Hechos
    const [resultadosTurf, setResultadosTurf] = useState()
    const [resultadosTurfJuntaAuxiliar, setResultadosTurfJuntaAuxiliar] = useState()
    
    const [capaVectores, setCapaVectores] = useState();//Capa de vectores usada para el turf js

  const fetchData = async (endpoint) => {
        setIsLoadingData(true);
        let response = await mapasApi.post(endpoint,{fechaInicio,fechaFin});
        insertHistorial({lugar:'Geoanalisis',tipo:'Petición de información',endpoint,fechaInicio,fechaFin})
        // console.log('data enpoint capa  '+capa,response.data.data.EventosSic)
        setFetchedData2(response.data.data.EventosSic);
        setIsLoadingData(false)
  };

  useEffect(() => {
    //console.log('cambio el fetched data', fetchedData2)
  },[fetchedData2])
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
  }, [endpoint,fechaInicio, fechaFin]);

  // Implementa el resto de los efectos...

    //EFECTO PARA MANEJAR LA CAPA DE INSPECCIONES
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
                      isNaN(parseFloat(item.CoordX))
                        ? -0.0
                        : (parseFloat(item.CoordX)>0)
                            ? parseFloat(item.CoordY)
                            : parseFloat(item.CoordX),
                      isNaN(parseFloat(item.CoordY))
                        ? 0.0
                        : (parseFloat(item.CoordX)>0)
                            ? parseFloat(item.CoordX)
                            : parseFloat(item.CoordY),
                    ],
                  },
                  properties: {
                     Folio_Infra: item.Folio_infra,
                //     Nombre: item.Nombre,
                //     Ap_Paterno: item.Ap_Paterno,
                //     Ap_Materno: item.Ap_Materno,
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
              "circle-radius": 8,
            },
          });
    
          map.on('click', capa, (e) => {
            setFolioSic(e.features[0].properties.Folio_Infra)

            });
    
        } else {
          if (map.getLayer(capa)) {
            map.removeLayer(capa);
          }
    
          if (map.getSource(capa)) {
            map.removeSource(capa);
          }
        }

        // Cambia el cursor cuando el mouse entra en la capa de puntos
        map.on('mouseenter', capa, () => {
          map.getCanvas().style.cursor = 'pointer'; // Cambia el cursor a "pointer"
        });

        // Cambia el cursor de nuevo cuando el mouse sale de la capa de puntos
        map.on('mouseleave', capa, () => {
          map.getCanvas().style.cursor = ''; // Restablece el cursor al valor predeterminado
        });

      },[isLoadingData,fetchedData2,showLayer,])
    
       //EFECTO PARA MANEJAR LA CAPA DE CALOR
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
                                isNaN(parseFloat(item.CoordX))
                                ? -0.0
                                : (parseFloat(item.CoordX)>0)
                                    ? parseFloat(item.CoordY)
                                    : parseFloat(item.CoordX),
                              isNaN(parseFloat(item.CoordY))
                                ? 0.0
                                : (parseFloat(item.CoordX)>0)
                                    ? parseFloat(item.CoordX)
                                    : parseFloat(item.CoordY),
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
    
        /*---------------------EFECTOS DE CAPA DE EVENTOS SIC --------------------------------------------- */
    //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO 
    useEffect(() => {
        setTimeout(async () => {
        if (!isLoadingData) {
            if(Zona === 'todas'){
            setFetchedData2(fetchedData2Respaldo)
            }else {
            setFetchedData2Respaldo(fetchedData2)
            setResultadosTurf(await PuntosEnZona(capaVectores, fetchedData2, Zona,'eventossic'));
            //console.log('QUEME REGRESA EL AWAIT ',await PuntosEnZona(capaVectores, fetchedData2, Zona,'eventossic'))
            }
            
        }
        }, 500);
    }, [Zona]);  
    //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
    useEffect(() => {
        if (resultadosTurf){
        setTimeout( () => {
            //console.log('SE DEBERIA DE REFLEJAR EN EL MAPA PERO NO LOS VEO',resultadosTurf.resultados)
            setFetchedData2(resultadosTurf.resultados);
        }, 500);
        }
    }, [resultadosTurf]);

/*---------------------EFECTOS DE CAPA DE HECHOS JUNTSA AUXILIARES --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO JUNTA AUXILIAR
  useEffect(() => {
    //console.log('efecto 1 de junta auxiliar');
    setTimeout(async () => {
      if ( !isLoadingData ) {
        //console.log('entre al efecto 1 dentro del if')
        if(JuntaAuxiliar === 'todas'){
            //console.log('if 1 de junta')
          setFetchedData2(fetchedData2Respaldo)
        }else {
           //console.log('else de junta')
          setFetchedData2Respaldo(fetchedData2)
          //console.log('LINEA 290 : ',await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'eventossic'))
          setResultadosTurfJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'eventossic'));

        }
          
      }
    }, 500);
  }, [JuntaAuxiliar]);  
  //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
  useEffect(() => {
    //console.log('efecto 2 de junta auxiliar')
    if (resultadosTurfJuntaAuxiliar){
      setTimeout( () => {
        //console.log(resultadosTurfJuntaAuxiliar.resultados)
        setFetchedData2(resultadosTurfJuntaAuxiliar.resultados);
      }, 500);
    }
  }, [resultadosTurfJuntaAuxiliar]);

  //Este efecto se usa para mostrar una alerta cuando esta cargando informacion o modificando el mapa 
  useEffect(() => {
    if ( isLoadingData || isLoadingDataCapa) {
      Swal.fire('Haciendo Consulta', 'Paciencia se esta procesando la información', 'info');
    }    
    if( !isLoadingData || !isLoadingDataCapa){
      Swal.close();
    }
  }, [isLoadingData,isLoadingDataCapa])

  return {
    mapContainer,
    showLayer,
    showHeatLayer,
    fechaInicio,
    fechaFin,
    Zona,
    JuntaAuxiliar,
    fetchedData2,
    // Resto de los estados...
    setMap,
    setMapContainer,
    fetchData,
    handleStartDateChange,
    handleEndDateChange,
    handleCheckboxLayer,
    handleCheckboxHeatLayer,
    handleZona,
    handleJuntaAuxiliar,
    // Resto de las funciones y efectos...
  };
};

export default useMapLayerSic;
