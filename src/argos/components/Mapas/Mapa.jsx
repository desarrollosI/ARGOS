import React, { useRef, useEffect, useState } from "react";
//Se importan los componentes  de react router
import { Link } from 'react-router-dom';

import mapboxgl from "mapbox-gl";
import * as turf from '@turf/turf';
import { mapasApi } from "../../../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";
import { LayerHechosControls } from "./LayerHechosControls";
import { LayerDomicilioDetControls } from "./LayerDomicilioDetControls";
import { LayerUbicacionDetencionControls } from "./LayerUbicacionDetencionControls";
import { GeneralControls } from "./GeneralControls";
import { PuntosEnZona,PuntosEnJuntaAuxiliar } from "../../helpers";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg";

export function Mapa() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const [lng, setLng] = useState(-98.20346);
  const [lat, setLat] = useState(19.03793);
  const [zoom, setZoom] = useState(9);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingDataDomicilioDet, setIsLoadingDataDomicilioDet] = useState(true);
  const [isLoadingDataUbicacionDetencion, setIsLoadingDataUbicacionDetencion] = useState(true);
  const [fetchedData3, setFetchedData3] = useState();//DomiciliosDetenido
  const [fetchedData3Respaldo, setFetchedData3Respaldo] = useState();//DomiciliosDetenido
  const [fetchedData2, setFetchedData2] = useState();//Hechos
  const [fetchedData2Respaldo, setFetchedData2Respaldo] = useState();//Hechos
  const [fetchedData4, setFetchedData4] = useState();//Ubicacion Detencion
  const [fetchedData4Respaldo, setFetchedData4Respaldo] = useState();//Hechos
  const [capaVectores, setCapaVectores] = useState();//Capa de vectores usada para el turf js
// Estados para la capa de Hechos
  const [fechaInicio, setFechaInicio] = useState('2021-06-24')
  const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])
  const [showUbiHechosLayer, setShowUbiHechosLayer] = useState(true);
  const [showUbiHechosHeatLayer, setShowUbiHechosHeatLayer] = useState(false);
  const [FaltaDelito, setFaltaDelito] = useState('todas')
  const [Zona, setZona] = useState('todas')
  const [JuntaAuxiliar, setJuntaAuxiliar] = useState('todas')
  //Estados para la capa de DomicilioDetenido
  const [fechaInicioDomicilioDet, setFechaInicioDomicilioDet] = useState('2021-06-24')
  const [fechaFinDomicilioDet, setFechaFinDomicilioDet] = useState((new Date()).toISOString().split('T')[0])
  const [showDomicilioDetLayer, setShowDomicilioDetLayer] = useState(true);
  const [showDomicilioDetHeatLayer, setShowDomicilioDetHeatLayer] = useState(false);
  const [FaltaDelitoDomicilioDet, setFaltaDelitoDomicilioDet] = useState('todas')
  const [ZonaDomicilioDet, setZonaDomicilioDet] = useState('todas')
  const [JuntaAuxiliarDomicilioDet, setJuntaAuxiliarDomicilioDet] = useState('todas')
  //Estados para la capa de DomicilioDetenido
  const [fechaInicioUbicacionDetencion, setFechaInicioUbicacionDetencion] = useState('2021-06-24')
  const [fechaFinUbicacionDetencion, setFechaFinUbicacionDetencion] = useState((new Date()).toISOString().split('T')[0])
  const [showUbicacionDetencionLayer, setShowUbicacionDetencionLayer] = useState(true);
  const [showUbicacionDetencionHeatLayer, setShowUbicacionDetencionHeatLayer] = useState(false);
  const [FaltaDelitoUbicacionDetencion, setFaltaDelitoUbicacionDetencion] = useState('todas')
  const [ZonaUbicacionDetencion, setZonaUbicacionDetencion] = useState('todas')
  const [JuntaAuxiliarUbicacionDetencion, setJuntaAuxiliarUbicacionDetencion] = useState('todas')
  //Capas Generales
  const [showVectoresLayer, setShowVectoresLayer] = useState(true);
  const [ZonaGeneral, setZonaGeneral] = useState('todas')
  const [resultadosTurf, setResultadosTurf] = useState()
  const [resultadosTurfDomicilioDet, setResultadosTurfDomicilioDet] = useState()
  const [resultadosTurfUbicacionDetencion, setResultadosTurfUbicacionDetencion] = useState()
  const [resultadosTurfHechosJuntaAuxiliar, setResultadosTurfHechosJuntaAuxiliar] = useState()
  const [resultadosTurfDomicilioDetJuntaAuxiliar, setResultadosTurfDomicilioDetJuntaAuxiliar] = useState()
  const [resultadosTurfUbicacionDetencionJuntaAuxiliar, setResultadosTurfUbicacionDetencionJuntaAuxiliar] = useState()
  //estados para el panel lateral fotos
  const [Remision, setRemision] = useState(258086)
  const [Ficha, setFicha] = useState(14931)
  const [Nombre, setNombre] = useState('')

  const fetchData = async (endpoint) => {
    let response
    // const { data } = await mapasApi.post(endpoint,{fechaInicio,fechaFin,FaltaDelito});
    // console.log(data.data.Remisiones2);
    switch (endpoint) {
      case 'ubicacion-hechos':
        setIsLoadingData(true);
        response = await mapasApi.post(endpoint,{fechaInicio,fechaFin,FaltaDelito});
        console.log('ubicaciones hechos',response.data.data.Remisiones2)
        setFetchedData2(response.data.data.Remisiones2);
        setIsLoadingData(false);
        break;
      case 'domicilio-detenido':
        setIsLoadingDataDomicilioDet(true);
        response = await mapasApi.post(endpoint,{fechaInicioDomicilioDet,fechaFinDomicilioDet,FaltaDelitoDomicilioDet});
        console.log('domicilio detenido: ',response.data.data.Remisiones2)
        setFetchedData3(response.data.data.Remisiones2);
        setIsLoadingDataDomicilioDet(false);
        break;
      case 'ubicacion-detencion':
        setIsLoadingDataUbicacionDetencion(true);
        response = await mapasApi.post(endpoint,{fechaInicioUbicacionDetencion,fechaFinUbicacionDetencion,FaltaDelitoUbicacionDetencion});
        console.log('ubicacion detencion: ',response.data.data.Remisiones2)
        setFetchedData4(response.data.data.Remisiones2);
        setIsLoadingDataUbicacionDetencion(false);
        break;
    
      default:
        break;
    }
  };

  //Funciones de Ubicaciones de Hechos
  const handleStartDateChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleCheckboxUbiHechosLayer = () => {
    setShowUbiHechosLayer(!showUbiHechosLayer);
  };

  const handleCheckboxUbiHechosHeatLayer = () => {
    setShowUbiHechosHeatLayer(!showUbiHechosHeatLayer);
  };
  
  const handleFaltaDelito = (event) => {
    setFaltaDelito(event.target.value)
  }
  const handleZona = (event) => {
    setZona(event.target.value)
  }
  const handleZonaDomicilioDet = (event) => {
    setZonaDomicilioDet(event.target.value)
  }
  const handleZonaUbicacionDetencion = (event) => {
    setZonaUbicacionDetencion(event.target.value)
  }
  //funciones de juntsa auxiliares
  const handleJuntaAuxiliar = (event) => {
    setJuntaAuxiliar(event.target.value)
  }
  const handleJuntaAuxiliarDomicilioDet = (event) => {
    setJuntaAuxiliarDomicilioDet(event.target.value)
  }
  const handleJuntaAuxiliarUbicacionDetencion = (event) => {
    setJuntaAuxiliarUbicacionDetencion(event.target.value)
  }

  //Funciones de Domicilio Detenido
  const handleStartDateChangeDomicilioDet = (event) => {
    setFechaInicioDomicilioDet(event.target.value);
  };

  const handleEndDateChangeDomicilioDet = (event) => {
    setFechaFinDomicilioDet(event.target.value);
  };

  const handleCheckboxDomicilioDetLayer = () => {
    setShowDomicilioDetLayer(!showDomicilioDetLayer);
  };

  const handleCheckboxDomicilioDetHeatLayer = () => {
    setShowDomicilioDetHeatLayer(!showDomicilioDetHeatLayer);
  };
  
  const handleFaltaDelitoDomicilioDet = (event) => {
    setFaltaDelitoDomicilioDet(event.target.value)
  }
  //Funciones de Ubicacion Detencion
  const handleStartDateChangeUbicacionDetencion = (event) => {
    setFechaInicioUbicacionDetencion(event.target.value);
  };

  const handleEndDateChangeUbicacionDetencion = (event) => {
    setFechaFinUbicacionDetencion(event.target.value);
  };

  const handleCheckboxUbicacionDetencionLayer = () => {
    setShowUbicacionDetencionLayer(!showUbicacionDetencionLayer);
  };

  const handleCheckboxUbicacionDetencionHeatLayer = () => {
    setShowUbicacionDetencionHeatLayer(!showUbicacionDetencionHeatLayer);
  };
  
  const handleFaltaDelitoUbicacionDetencion = (event) => {
    setFaltaDelitoUbicacionDetencion(event.target.value)
  }
  //Funciones Generales
  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };

  const handleZonaGeneral = (event) => {
    setZonaGeneral(event.target.value)
  }

 /* este efecto es para cargar el mapa y su estado por defecto  */
  useEffect(() => {
    const loadMap = async () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, "top-right");
      const fullscreen = new mapboxgl.FullscreenControl();
      map.current.addControl(fullscreen, "top-right");

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      
    };

    loadMap();
  }, []);
  /* EFECTO PARA CARGAR LA DATA DE ACUERDO A UN RANGO DE FECHAS */
  useEffect(() => {
    fetchData("ubicacion-hechos");
  }, [fechaInicio,fechaFin,FaltaDelito])
  /* EFECTO PARA CARGAR LA DATA DE ACUERDO A UN RANGO DE FECHAS */
  useEffect(() => {
    fetchData("domicilio-detenido");
  }, [fechaInicioDomicilioDet,fechaFinDomicilioDet,FaltaDelitoDomicilioDet])
    /* EFECTO PARA CARGAR LA DATA DE ACUERDO A UN RANGO DE FECHAS */
    useEffect(() => {
      fetchData("ubicacion-detencion");
    }, [fechaInicioUbicacionDetencion,fechaFinUbicacionDetencion,FaltaDelitoUbicacionDetencion])
    
 
  //EFECTO PARA MANEJAR LA CAPA DE VECTORES
  useEffect(() => {
    if (!map.current || isLoadingData) return;

    const sourceIDVectores = 'vectores-source';
    
      if (showVectoresLayer) {
        // Supongamos que tienes el objeto GeoJSON almacenado en una variable llamada 'geojsonFile'
        var geojsonFile = './195_VECTORES.geojson';
        // Utilizamos el método fetch para cargar el archivo GeoJSON
        fetch(geojsonFile)
          .then(function(response) {
            return response.json();
          })
          .then(function(geojson) {
    
            setCapaVectores(geojson)

          })
          .catch(function(error) {
            console.log('Error al cargar el archivo GeoJSON:', error);
          });

      if (!map.current.getSource(sourceIDVectores)) {
        map.current.addSource(sourceIDVectores, {
          type: "geojson",
          data: './195_VECTORES.geojson'
        });
      }

      if (!map.current.getLayer("vectores-layer")) {
        map.current.addLayer({
          id: "vectores-layer",
          type: "fill",
          source: sourceIDVectores,
          paint: {
            'fill-opacity': 0.2,
          },
        });
      }
       // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.current.on('click', 'vectores-layer', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name + ' ' + e.features[0].properties.ZONA ;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        
        new mapboxgl.Popup({className: "custom-popup"}) 
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map.current);
        });      
    } else {
      if (map.current.getLayer("vectores-layer")) {
       map.current.removeLayer("vectores-layer");
      }

      if (map.current.getSource(sourceIDVectores)) {
        map.current.removeSource(sourceIDVectores);
      }
    }
    
  },[isLoadingData,showVectoresLayer])

  //EFECTO PARA MANEJAR LA CAPA DE HECHOS
  useEffect(() => {
    if (!map.current || isLoadingData) return;

    if (showUbiHechosLayer) {
     
      if (map.current.getLayer("ubicaciones-hechos2")) {
        map.current.removeLayer("ubicaciones-hechos2");
      }

      if (map.current.getSource('ubicaciones-hechos2')) {
        map.current.removeSource('ubicaciones-hechos2');
      }

      map.current.addSource("ubicaciones-hechos2", {
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

      map.current.addLayer({
        id: "ubicaciones-hechos2",
        type: "circle",
        source: "ubicaciones-hechos2",
        paint: {
          "circle-color": "red",
          "circle-radius": 5,
        },
      });

      map.current.on('click', 'ubicaciones-hechos2', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = `Remision: ${e.features[0].properties.No_Remision} Nombre: ${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`;
        
        setFicha(e.features[0].properties.Ficha)
        setRemision(e.features[0].properties.No_Remision)
        setNombre(`${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`)
        
        new mapboxgl.Popup({className: "custom-popup"}) 
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map.current);
        });

    } else {
      if (map.current.getLayer("ubicaciones-hechos2")) {
        map.current.removeLayer("ubicaciones-hechos2");
      }

      if (map.current.getSource('ubicaciones-hechos2')) {
        map.current.removeSource('ubicaciones-hechos2');
      }
    }
  },[isLoadingData,fetchedData2,showUbiHechosLayer])

   //EFECTO PARA MANEJAR LA CAPA DE CALOR DE HECHOS HECHOS
   useEffect(() => {
    if (!map.current || isLoadingData) return;

      if (showUbiHechosHeatLayer) {

        // Remover la capa de calor si está presente
        if (map.current.getLayer("heatmap")) {
          map.current.removeLayer("heatmap");
        }

        // Remover la fuente de datos de calor si está presente
        if (map.current.getSource("heatmap")) {
          map.current.removeSource("heatmap");
        }

                // Agregar la capa de calor
                map.current.addSource("heatmap", {
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
        
                map.current.addLayer(
                  {
                    id: "heatmap",
                    type: "heatmap",
                    source: "heatmap",
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
        if (map.current.getLayer("heatmap")) {
          map.current.removeLayer("heatmap");
        }

        // Remover la fuente de datos de calor si está presente
        if (map.current.getSource("heatmap")) {
          map.current.removeSource("heatmap");
        }
      }

  }, [isLoadingData, fetchedData2,showUbiHechosHeatLayer]);

  //EFECTO PARA MANEJAR LA CAPA DE DOMICILIOS DETENIDOS
  useEffect(() => {
    if (!map.current || isLoadingDataDomicilioDet) return;

    if (showDomicilioDetLayer) {
     
      if (map.current.getLayer("domicilios-detenidos")) {
        map.current.removeLayer("domicilios-detenidos");
      }

      if (map.current.getSource('domicilios-detenidos')) {
        map.current.removeSource('domicilios-detenidos');
      }

      map.current.addSource("domicilios-detenidos", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: fetchedData3.map((item) => {
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

      map.current.addLayer({
        id: "domicilios-detenidos",
        type: "circle",
        source: "domicilios-detenidos",
        paint: {
          "circle-color": "blue",
          "circle-radius": 5,
        },
      });

      map.current.on('click', 'domicilios-detenidos', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = `Remision: ${e.features[0].properties.No_Remision} Nombre: ${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`;
        
        setFicha(e.features[0].properties.Ficha)
        setRemision(e.features[0].properties.No_Remision)
        setNombre(`${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`)
        

        new mapboxgl.Popup({className: "custom-popup"}) 
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map.current);
        });

      
    } else {
      if (map.current.getLayer("domicilios-detenidos")) {
        map.current.removeLayer("domicilios-detenidos");
      }

      if (map.current.getSource('domicilios-detenidos')) {
        map.current.removeSource('domicilios-detenidos');
      }

  }
  },[isLoadingDataDomicilioDet,fetchedData3,showDomicilioDetLayer])

     //EFECTO PARA MANEJAR LA CAPA DE CALOR DE DOMICILIO DETENIDO
     useEffect(() => {
      if (!map.current || isLoadingDataDomicilioDet) return;
       
        if (showDomicilioDetHeatLayer) {
  
          // Remover la capa de calor si está presente
          if (map.current.getLayer("heatmap-domicilio-detenido")) {
            map.current.removeLayer("heatmap-domicilio-detenido");
          }
  
          // Remover la fuente de datos de calor si está presente
          if (map.current.getSource("heatmap-domicilio-detenido")) {
            map.current.removeSource("heatmap-domicilio-detenido");
          }
                  // Agregar la capa de calor
                  map.current.addSource("heatmap-domicilio-detenido", {
                    type: "geojson",
                    data: {
                      type: "FeatureCollection",
                      features: fetchedData3.map((item) => {
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
          
                  map.current.addLayer(
                    {
                      id: "heatmap-domicilio-detenido",
                      type: "heatmap",
                      source: "heatmap-domicilio-detenido",
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
                          "rgb(54,144,192)",
                          0.6,
                          "rgb(5,112,176)",
                          0.8,
                          "rgb(8,81,156)",
                          1,
                          "rgb(8,48,107)",
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
          if (map.current.getLayer("heatmap-domicilio-detenido")) {
            map.current.removeLayer("heatmap-domicilio-detenido");
          }
  
          // Remover la fuente de datos de calor si está presente
          if (map.current.getSource("heatmap-domicilio-detenido")) {
            map.current.removeSource("heatmap-domicilio-detenido");
          }
        }
  
    }, [isLoadingDataDomicilioDet, fetchedData3,showDomicilioDetHeatLayer]);
  
     //EFECTO PARA MANEJAR LA CAPA DE UBICACION DETENCION
  useEffect(() => {
    if (!map.current || isLoadingDataUbicacionDetencion) return;

    if (showUbicacionDetencionLayer) {
     
      if (map.current.getLayer("ubicacion-detencion")) {
        map.current.removeLayer("ubicacion-detencion");
      }

      if (map.current.getSource('ubicacion-detencion')) {
        map.current.removeSource('ubicacion-detencion');
      }

      map.current.addSource("ubicacion-detencion", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: fetchedData4.map((item) => {
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

      map.current.addLayer({
        id: "ubicacion-detencion",
        type: "circle",
        source: "ubicacion-detencion",
        paint: {
          "circle-color": "green",
          "circle-radius": 5,
        },
      });

      map.current.on('click', 'ubicacion-detencion', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = `Remision: ${e.features[0].properties.No_Remision} Nombre: ${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`;
        
        setFicha(e.features[0].properties.Ficha)
        setRemision(e.features[0].properties.No_Remision)
        setNombre(`${ e.features[0].properties.Nombre }  ${e.features[0].properties.Ap_Paterno} ${e.features[0].properties.Ap_Materno}`)
        
        new mapboxgl.Popup({className: "custom-popup"}) 
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map.current);
        });

    } else {
      if (map.current.getLayer("ubicacion-detencion")) {
        map.current.removeLayer("ubicacion-detencion");
      }

      if (map.current.getSource('ubicacion-detencion')) {
        map.current.removeSource('ubicacion-detencion');
      }
    }
  },[isLoadingDataUbicacionDetencion,fetchedData4,showUbicacionDetencionLayer])

   //EFECTO PARA MANEJAR LA CAPA DE CALOR DE UBICACION DETENCION
   useEffect(() => {
    if (!map.current || isLoadingDataUbicacionDetencion) return;
      if (showUbicacionDetencionHeatLayer) {

        // Remover la capa de calor si está presente
        if (map.current.getLayer("heatmap-ubicacion-detencion")) {
          map.current.removeLayer("heatmap-ubicacion-detencion");
        }

        // Remover la fuente de datos de calor si está presente
        if (map.current.getSource("heatmap-ubicacion-detencion")) {
          map.current.removeSource("heatmap-ubicacion-detencion");
        }
                // Agregar la capa de calor
                map.current.addSource("heatmap-ubicacion-detencion", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: fetchedData4.map((item) => {
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
        
                map.current.addLayer(
                  {
                    id: "heatmap-ubicacion-detencion",
                    type: "heatmap",
                    source: "heatmap-ubicacion-detencion",
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
                        "rgb(0,128,0)",
                        0.4,
                        "rgb(50,205,50)",
                        0.6,
                        "rgb(0,255,0)",
                        0.8,
                        "rgb(50,205,50)",
                        1,
                        "rgb(0,128,0)"
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
        if (map.current.getLayer("heatmap-ubicacion-detencion")) {
          map.current.removeLayer("heatmap-ubicacion-detencion");
        }

        // Remover la fuente de datos de calor si está presente
        if (map.current.getSource("heatmap-ubicacion-detencion")) {
          map.current.removeSource("heatmap-ubicacion-detencion");
        }
      }

  }, [isLoadingDataUbicacionDetencion, fetchedData4,showUbicacionDetencionHeatLayer]);

/*---------------------EFECTOS DE CAPA DE HECHOS --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO 
  useEffect(() => {
    setTimeout(async () => {
      if (!isLoadingDataDomicilioDet && !isLoadingData && !isLoadingDataUbicacionDetencion && capaVectores) {
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


  /* ---------------------------- EFECTOS CAPA DE DOMICILIO DETENIDO -------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO 
 // Primer efecto
useEffect(() => {
  console.log('efecto de capa de domicilio detenido selector de zonas');
  let isMounted = true; // Variable para evitar actualizaciones en componentes desmontados
  
  setTimeout(async () => {
    if (!isLoadingDataDomicilioDet && !isLoadingData && !isLoadingDataUbicacionDetencion && capaVectores) {
      if (ZonaDomicilioDet === 'todas') {
        setFetchedData3(fetchedData3Respaldo);
      } else {
        setFetchedData3Respaldo(fetchedData3);
        const results = await PuntosEnZona(capaVectores, fetchedData3, ZonaDomicilioDet, 'domicilio');
        
        if (isMounted) {
          setResultadosTurfDomicilioDet(results);
        }
      }
    }
  }, 3000);

  return () => {
    // Limpiar la variable al desmontar el componente para evitar actualizaciones
    isMounted = false;
  };
}, [ZonaDomicilioDet]);

// Segundo efecto
useEffect(() => {
  if (resultadosTurfDomicilioDet) {
    setFetchedData3(resultadosTurfDomicilioDet.resultados);
  }
}, [resultadosTurfDomicilioDet]);

  useEffect(() => {
    console.log('fetchedData3 actualizado:', fetchedData3);
  }, [fetchedData3]);

  /* ---------------------------- EFECTOS CAPA DE UBICACION DETENCION -------------------------- */
//EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO 
 // Primer efecto
useEffect(() => {
  console.log('efecto de capa de ubicacion detencion selector de zonas');
  let isMounted = true; // Variable para evitar actualizaciones en componentes desmontados
  
  setTimeout(async () => {
    if (!isLoadingDataUbicacionDetencion && !isLoadingData && capaVectores) {
      if (ZonaUbicacionDetencion === 'todas') {
        setFetchedData4(fetchedData4Respaldo);
      } else {
        setFetchedData4Respaldo(fetchedData4);
        const results = await PuntosEnZona(capaVectores, fetchedData4, ZonaUbicacionDetencion, 'detencion');
        
        if (isMounted) {
          setResultadosTurfUbicacionDetencion(results);
        }
      }
    }
  }, 3000);

  return () => {
    // Limpiar la variable al desmontar el componente para evitar actualizaciones
    isMounted = false;
  };
}, [ZonaUbicacionDetencion]);

// Segundo efecto
useEffect(() => {
  if (resultadosTurfUbicacionDetencion) {
    setFetchedData4(resultadosTurfUbicacionDetencion.resultados);
  }
}, [resultadosTurfUbicacionDetencion]);

  useEffect(() => {
    console.log('fetchedData4 actualizado:', fetchedData4);
  }, [fetchedData4]);
  

/*---------------------EFECTOS DE CAPA DE HECHOS JUNTSA AUXILIARES --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO JUNTA AUXILIAR
  useEffect(() => {
    setTimeout(async () => {
      if (!isLoadingDataDomicilioDet && !isLoadingData && !isLoadingDataUbicacionDetencion && capaVectores) {
        if(JuntaAuxiliar === 'todas'){
          setFetchedData2(fetchedData2Respaldo)
        }else {
          setFetchedData2Respaldo(fetchedData2)
          setResultadosTurfHechosJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliar, fetchedData2,'hechos'));

        }
          
      }
    }, 3000);
  }, [JuntaAuxiliar]);  
  //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
  useEffect(() => {
    if (resultadosTurfHechosJuntaAuxiliar){
      setTimeout( () => {
        setFetchedData2(resultadosTurfHechosJuntaAuxiliar.resultados);
      }, 3000);
    }
  }, [resultadosTurfHechosJuntaAuxiliar]);


/*---------------------EFECTOS DE CAPA DE DOMICILIO DETENIDO JUNTSA AUXILIARES --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO JUNTA AUXILIAR
  useEffect(() => {
    setTimeout(async () => {
      if (!isLoadingDataDomicilioDet && !isLoadingData && !isLoadingDataUbicacionDetencion && capaVectores) {
        if(JuntaAuxiliarDomicilioDet === 'todas'){
          setFetchedData3(fetchedData3Respaldo)
        }else {
          setFetchedData3Respaldo(fetchedData3)
          setResultadosTurfDomicilioDetJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliarDomicilioDet, fetchedData3,'domicilio'));

        }
          
      }
    }, 3000);
  }, [JuntaAuxiliarDomicilioDet]);  
  //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
  useEffect(() => {
    if (resultadosTurfDomicilioDetJuntaAuxiliar){
      setTimeout( () => {
        setFetchedData3(resultadosTurfDomicilioDetJuntaAuxiliar.resultados);
      }, 3000);
    }
  }, [resultadosTurfDomicilioDetJuntaAuxiliar]);

  /*---------------------EFECTOS DE CAPA DE UBICACION DETENCION JUNTSA AUXILIARES --------------------------------------------- */
  //EFECTO PARA DISPARAR EL FILTRADO DE LOS PUNTOS CON BASE EN POLIGONO JUNTA AUXILIAR
  useEffect(() => {
    setTimeout(async () => {
      if (!isLoadingDataUbicacionDetencion && !isLoadingData && capaVectores) {
        if(JuntaAuxiliarUbicacionDetencion === 'todas'){
          setFetchedData4(fetchedData4Respaldo)
        }else {
          setFetchedData4Respaldo(fetchedData4)
          setResultadosTurfUbicacionDetencionJuntaAuxiliar(await PuntosEnJuntaAuxiliar(JuntaAuxiliarUbicacionDetencion, fetchedData4,'detencion'));

        }
          
      }
    }, 3000);
  }, [JuntaAuxiliarUbicacionDetencion]);  
  //EFECTO PARA ACTUALIZAR LA INFORMACION FILTRADA Y SE PUEDA REFLEJAR EN EL MAPA 
  useEffect(() => {
    if (resultadosTurfUbicacionDetencionJuntaAuxiliar){
      setTimeout( () => {
        setFetchedData4(resultadosTurfUbicacionDetencionJuntaAuxiliar.resultados);
      }, 3000);
    }
  }, [resultadosTurfUbicacionDetencionJuntaAuxiliar]);


  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <LayerHechosControls 
            handleCheckboxUbiHechosLayer={handleCheckboxUbiHechosLayer} 
            showUbiHechosLayer={showUbiHechosLayer}  
            handleCheckboxUbiHechosHeatLayer={handleCheckboxUbiHechosHeatLayer} 
            showUbiHechosHeatLayer={showUbiHechosHeatLayer}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange} 
            handleFaltaDelito={handleFaltaDelito}
            handleZona={handleZona}
            handleJuntaAuxiliar={handleJuntaAuxiliar}
          />
        </div>
        <div className="col-md-6">
          <LayerDomicilioDetControls
            handleCheckboxDomicilioDetLayer={handleCheckboxDomicilioDetLayer} 
            showDomicilioDetLayer={showDomicilioDetLayer}  
            handleCheckboxDomicilioDetHeatLayer={handleCheckboxDomicilioDetHeatLayer} 
            showDomicilioDetHeatLayer={showDomicilioDetHeatLayer}
            fechaInicioDomicilioDet={fechaInicioDomicilioDet}
            fechaFinDomicilioDet={fechaFinDomicilioDet}
            handleStartDateChangeDomicilioDet={handleStartDateChangeDomicilioDet}
            handleEndDateChangeDomicilioDet={handleEndDateChangeDomicilioDet} 
            handleFaltaDelitoDomicilioDet={handleFaltaDelitoDomicilioDet}
            handleZonaDomicilioDet={handleZonaDomicilioDet}
            handleJuntaAuxiliarDomicilioDet={handleJuntaAuxiliarDomicilioDet}
          />
        </div>
        <div className="col-md-6">
          <LayerUbicacionDetencionControls
            handleCheckboxUbicacionDetencionLayer={handleCheckboxUbicacionDetencionLayer} 
            showUbicacionDetencionLayer={showUbicacionDetencionLayer}  
            handleCheckboxUbicacionDetencionHeatLayer={handleCheckboxUbicacionDetencionHeatLayer} 
            showUbicacionDetencionHeatLayer={showUbicacionDetencionHeatLayer}
            fechaInicioUbicacionDetencion={fechaInicioUbicacionDetencion}
            fechaFinUbicacionDetencion={fechaFinUbicacionDetencion}
            handleStartDateChangeUbicacionDetencion={handleStartDateChangeUbicacionDetencion}
            handleEndDateChangeUbicacionDetencion={handleEndDateChangeUbicacionDetencion} 
            handleFaltaDelitoUbicacionDetencion={handleFaltaDelitoUbicacionDetencion}
            handleZonaUbicacionDetencion={handleZonaUbicacionDetencion}
            handleJuntaAuxiliarUbicacionDetencion={handleJuntaAuxiliarUbicacionDetencion}
          />
        </div>
      </div>  
      <div className="row">
        <div className="col mt-2">
          <GeneralControls showVectoresLayer={showVectoresLayer} handleCheckboxVectoresLayer={handleCheckboxVectoresLayer} handleZonaGeneral={handleZonaGeneral}/>
        </div>
      </div>
      <div className="row">
        {/* <div className="overlaymap">
          Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
        </div> */}
        <div className="col-md-10">
          <div ref={mapContainer} className="map-container mt-3" />
        </div>
        <div className="col-md-2 shadow " style={{maxHeight: '400px'}}>
          <div className="row mt-3"> 
            <h4> Foto: </h4>
          </div>
          <div className="row">
            <img src={`http://172.18.0.25/sarai/public/files/Remisiones/${Ficha}/FotosHuellas/${Remision}/rostro_frente.jpeg`} width="400px" alt="Foto_Detenido"/>
          </div>
          <div className="row mt-3">
            <strong>Ficha: {Ficha}</strong>
            <strong>Remision: {Remision}</strong>
            <strong>Nombre: {Nombre}</strong>
          </div>
          <div className="row">
            <Link to={`/remision/${Remision}`} target="_blank">Mas Detalles...</Link>
          </div>
        </div>
      </div>

    </>
  );
}
