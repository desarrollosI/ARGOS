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
const useMapLayerAltoImpacto = (endpoint,color,capa,setRemision,setFicha,setNombre,FaltaDelitoEspecificoProp) => {
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
        let response = await mapasApi.post(endpoint,{fechaInicio,fechaFin});
        insertHistorial({lugar:'Geoanalisis',tipo:'Petición de información',endpoint,fechaInicio,fechaFin})
        //console.log('data enpoint capa  '+capa,response.data.data.Remisiones2)
        setFetchedData2(response.data.data.Alto_Impacto);
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

//PARA FILTRAR POR POLIGONO ZONA
  const handleZonaAltoImpacto = (event) => {
    setZona(event.target.value)
  }
//PARA FILTRAR POR JUNTA AUXILIAR
  const handleJuntaAuxiliarAltoImpacto = (event) => {
    setJuntaAuxiliar(event.target.value)
  }
  useEffect(() => {
    console.log('cambio fecha',fechaInicio,fechaFin)
    fetchData(endpoint);
  }, [endpoint,fechaInicio, fechaFin]);

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
                    Nombre: item.Nombre_Detenido,
                    Narrativa: item.Narrativa,
                    Identificador: item.Identificador,
                    Estatus_Punto: item.Estatus_Punto,
                    Colonia: item.Colonia,
                    Distribuidor: item.Distribuidor,
                    Grupo_OP: item.Grupo_OP,
                    Descripcion_Adicional: item.Descripcion_Adicional
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
            Swal.fire({
              title: 'Datos del Punto',
              html: `<div>
              <b>Nombre Detenido: </b>${(e.features[0].properties.Nombre_Detenido != undefined && e.features[0].properties.Nombre_Detenido != null) ? e.features[0].properties.Nombre_Detenido : 'SD'}
              <br>
              <b>Narrativa: </b>${(e.features[0].properties.Narrativa != undefined && e.features[0].properties.Narrativa != null) ? e.features[0].properties.Narrativa : 'SD'}
              <br>
              <b>Identificador: </b>${(e.features[0].properties.Identificador != undefined && e.features[0].properties.Identificador != null) ? e.features[0].properties.Identificador : 'SD'}
              <br>
              <b>Estatus Punto: </b>${(e.features[0].properties.Estatus_Punto != undefined && e.features[0].properties.Estatus_Punto != null) ? e.features[0].properties.Estatus_Punto : 'SD'}
              <br>
              <b>Colonia: </b>${(e.features[0].properties.Colonia != undefined && e.features[0].properties.Colonia != null) ? e.features[0].properties.Colonia : 'SD'}
              <br>
              <b>Distribuidor: </b>${(e.features[0].properties.Distribuidor != undefined && e.features[0].properties.Distribuidor != null) ? e.features[0].properties.Distribuidor : 'SD'}
              <br>
              <b>Grupo_OP: </b>${(e.features[0].properties.Grupo_OP != undefined && e.features[0].properties.Grupo_OP != null) ? e.features[0].properties.Grupo_OP : 'SD'}
              <br>
              <b>Descripcion_Adicional: </b>${(e.features[0].properties.Descripcion_Adicional != undefined && e.features[0].properties.Descripcion_Adicional != null) ? e.features[0].properties.Descripcion_Adicional : 'SD'}
              </div>`,
              width: '50%'
            });
            
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
                                isNaN(parseFloat(item.CoordX)) ? -0.0 : parseFloat(item.CoordX),
                                isNaN(parseFloat(item.CoordY)) ? 0.0 : parseFloat(item.CoordY),
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
            setResultadosTurf(await PuntosEnZona(capaVectores, fetchedData2, Zona,'alto-impacto'));
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
          setResultadosTurfJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'alto-impacto'));

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
    handleZonaAltoImpacto,
    handleJuntaAuxiliarAltoImpacto,
    // Resto de las funciones y efectos...
  };
};

export default useMapLayerAltoImpacto;
