//Se importan los componentes de react
import { useEffect, useState, useRef } from 'react';
//se importa el adaptador hacia la base de datos
import { mapasApi } from '../api';
// se importan los componentes de terceros
import Swal from 'sweetalert2';
import mapboxgl from "mapbox-gl";
//se importan los helpers necesarios
import { PuntosEnJuntaAuxiliar, PuntosEnZona } from '../argos/helpers';
import { insertHistorial } from '../helpers/insertHistorial';
/*
  Este hook y todos los hook que representan un layer tienen como objetivo manipular la informacion de un determinado tipo de ubicaciones
  en este caso pueden ser hechos, domicilios o detencion, y dicha informacions transformarla  a una capa geojson pata poderla poner en 
  el mapa
*/
const useMapLayerSARAI = (endpoint,color,capa,setRemision,setFicha,setNombre,FaltaDelitoEspecificoProp) => {
    const [mapContainer, setMapContainer] = useState();
    const [map, setMap] = useState(null);
    const [popup, setPopup] = useState(null);
    const [lng, setLng] = useState(-98.20346);
    const [lat, setLat] = useState(19.03793);
    const [zoom, setZoom] = useState(9);
  // Resto de los estados...
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingDataCapa, setIsLoadingDataCapa] = useState(true);
    const [fechaInicio, setFechaInicio] = useState('2021-06-24')
    const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])
    const [showLayer, setShowLayer] = useState(false);
    const [showHeatLayer, setShowHeatLayer] = useState(false);
    const [rangeValue, setRangeValue] = useState(0);
    const [FaltaDelito, setFaltaDelito] = useState('todas')
    const [FaltaDelitoEspecifico,setFaltaDelitoEspecifico] = useState('')
    const [Zona, setZona] = useState('todas')
    const [JuntaAuxiliar, setJuntaAuxiliar] = useState('todas')
    const [fetchedData2, setFetchedData2] = useState();//Hechos
    const [fetchedData2Respaldo, setFetchedData2Respaldo] = useState();//Hechos
    const [resultadosTurf, setResultadosTurf] = useState()
    const [resultadosTurfJuntaAuxiliar, setResultadosTurfJuntaAuxiliar] = useState()
    
    const [capaVectores, setCapaVectores] = useState();//Capa de vectores usada para el turf js

  const fetchData = async (endpoint) => {
        setIsLoadingData(true);
        let response = await mapasApi.post(endpoint,{fechaInicio,fechaFin,FaltaDelito,FaltaDelitoEspecifico});
        insertHistorial({lugar:'Geoanalisis',tipo:'Petición de información',endpoint,fechaInicio,fechaFin,FaltaDelito,FaltaDelitoEspecifico})
        //console.log('data enpoint capa  '+capa,response.data.data.Remisiones2)
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

//PARA EN RANGO DE INFLUENCIA DE LA CAPA DE CALOR 
  const handleRange = (event) => {
    console.log('VALOR DEL RANGE :',event.target.value)
    setRangeValue(event.target.value)
  }

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

  //PARA FILTRAR POR UN DELITO
  const handleFaltaDelitoEspecifico = (delito) => {
    setFaltaDelitoEspecifico(delito.name)
  }

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint,fechaInicio, fechaFin, FaltaDelito,FaltaDelitoEspecifico]);

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
                        : (parseFloat(item.Coordenada_X)>0)
                            ? parseFloat(item.Coordenada_Y)
                            : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y))
                        ? 0.0
                        : (parseFloat(item.Coordenada_X)>0)
                            ? parseFloat(item.Coordenada_X)
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
              "circle-radius": 8,
            },
          });
    
          map.on('click', capa, (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = `Remision: ${e.features[0].properties.No_Remision} Nombre: ${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`;
            
            setFicha(e.features[0].properties.Ficha)
            setRemision(e.features[0].properties.No_Remision)
            setNombre(`${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`)
            
            // new mapboxgl.Popup({className: "custom-popup"}) 
            // .setLngLat(e.lngLat)
            // .setHTML(description)
            // .addTo(map);
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
      },[isLoadingData,fetchedData2,showLayer,FaltaDelitoEspecifico])
    
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
                        // Definir una función para calcular el radio del heatmap de manera más gradual
                  
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
            
                    map.addLayer({
                      id: "heatmap" + capa,
                      type: "heatmap",
                      source: "heatmap" + capa,
                      paint: {
                        "heatmap-weight": 1, // Puedes mantener esto como lo tienes si no necesitas ajustar el peso
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
                        "heatmap-radius":{
                          "base": 2.17,
                          "stops": [
                            [
                              10,
                              2.17
                            ],
                            [
                              19,
                              1066.9
                            ]
                          ]
                        },
                        "heatmap-opacity": 1, // Establecer la opacidad en 1
                        "heatmap-radius-transition": {
                          duration: 0, // Transición rápida para evitar cambios bruscos al hacer zoom
                        },
                      },
                    }, "waterway-label");
                    
                 
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
    
      }, [isLoadingData, fetchedData2,showHeatLayer,rangeValue]);
    
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
        }, 500);
    }, [Zona]);  
    //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
    useEffect(() => {
        if (resultadosTurf){
        setTimeout( () => {
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
          //console.log('LINEA 290 : ',await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'hechos'))
          setResultadosTurfJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'hechos'));

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
    rangeValue,
    // Remision,
    // Ficha,
    // Nombre,
    fetchedData2,
    // Resto de los estados...
    setMap,
    setMapContainer,
    handleRange,
    fetchData,
    handleStartDateChange,
    handleEndDateChange,
    handleCheckboxLayer,
    handleCheckboxHeatLayer,
    handleFaltaDelito,
    handleZona,
    handleJuntaAuxiliar,
    handleFaltaDelitoEspecifico
    // Resto de las funciones y efectos...
  };
};

export default useMapLayerSARAI;
