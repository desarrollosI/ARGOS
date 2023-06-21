import React, { useRef, useEffect, useState } from "react";
//Se importan los componentes  de react router
import { Link } from 'react-router-dom';

import mapboxgl from "mapbox-gl";
import { mapasApi } from "../../../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";
import { LayerHechosControls } from "./LayerHechosControls";
import { LayerDomicilioDetControls } from "./LayerDomicilioDetControls";
import { GeneralControls } from "./GeneralControls";

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
  const [fetchedData3, setFetchedData3] = useState();//DomiciliosDetenido
  const [fetchedData2, setFetchedData2] = useState();//Hechos
// Estados para la capa de Hechos
  const [fechaInicio, setFechaInicio] = useState('2021-06-24')
  const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])
  const [showUbiHechosLayer, setShowUbiHechosLayer] = useState(true);
  const [showUbiHechosHeatLayer, setShowUbiHechosHeatLayer] = useState(false);
  const [FaltaDelito, setFaltaDelito] = useState('todas')
  //Estados para la capa de DomicilioDetenido
  const [fechaInicioDomicilioDet, setFechaInicioDomicilioDet] = useState('2021-06-24')
  const [fechaFinDomicilioDet, setFechaFinDomicilioDet] = useState((new Date()).toISOString().split('T')[0])
  const [showDomicilioDetLayer, setShowDomicilioDetLayer] = useState(true);
  const [showDomicilioDetHeatLayer, setShowDomicilioDetHeatLayer] = useState(false);
  const [FaltaDelitoDomicilioDet, setFaltaDelitoDomicilioDet] = useState('todas')
  //Capas Generales
  const [showVectoresLayer, setShowVectoresLayer] = useState(true);
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
  //Funciones Generales
  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };
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
  
 
  //EFECTO PARA MANEJAR LA CAPA DE VECTORES
  useEffect(() => {
    if (!map.current || isLoadingData) return;

    const sourceIDVectores = 'vectores-source';
    console.log('variable de zonas: ', showVectoresLayer)
    if (showVectoresLayer) {
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
  },[isLoadingData,showUbiHechosLayer])

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
  },[isLoadingDataDomicilioDet,showDomicilioDetLayer])

     //EFECTO PARA MANEJAR LA CAPA DE CALOR DE DOMICILIO DETENIDO
     useEffect(() => {
      if (!map.current || isLoadingDataDomicilioDet) return;
        console.log('variable de calor de domicilio: ', showDomicilioDetHeatLayer)
        if (showDomicilioDetHeatLayer) {
  
          // Remover la capa de calor si está presente
          if (map.current.getLayer("heatmap-domicilio-detenido")) {
            map.current.removeLayer("heatmap-domicilio-detenido");
          }
  
          // Remover la fuente de datos de calor si está presente
          if (map.current.getSource("heatmap-domicilio-detenido")) {
            map.current.removeSource("heatmap-domicilio-detenido");
          }
                console.log('llego a antes del add source de heat det')
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
  
    // useEffect(() => {

    //   const headers = new Headers();
    //   headers.append('Content-Type', 'application/json');

    //   fetch(`http://172.18.0.25/sarai/public/files/Remisiones/1232312311/FotosHuellas/${Remision}/rostro_frente.jpeg`,
    //     { 
    //       headers: headers,
    //       method: 'POST'
    //     }
    //   )
    //   .then(response => {
    //     // Verificar si la solicitud fue exitosa (código de estado 200)
    //     console.log(response);
    //     if (response.ok) {
    //       // Devolver la respuesta en formato de imagen
    //       return response.json();
    //     } else {
    //       // En caso de error, lanzar una excepción
    //       throw new Error('Error en la solicitud');
    //     }
    //   })
    //   .then(response => {
    //     // Hacer algo con la imagen recibida, por ejemplo, mostrarla en una etiqueta img
    //     console.log(response)
    //     // const imgElement = document.createElement('img');
    //     // imgElement.src = URL.createObjectURL(blob);
    //     // document.body.appendChild(imgElement);
    //   })
    //   .catch(error => {
    //     // Capturar y manejar cualquier error ocurrido durante la solicitud
    //     console.log('Error:', error);
    //   });
    // }, [Remision])
    
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
          />
        </div>
      </div>  
      <div className="row">
        <div className="col mt-2">
          <GeneralControls showVectoresLayer={showVectoresLayer} handleCheckboxVectoresLayer={handleCheckboxVectoresLayer}/>
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
            <img src={`http://172.18.0.25/sarai/public/files/Remisiones/${Ficha}/FotosHuellas/${Remision}/rostro_frente.jpeg`} width="400px" alt="" srcset="" />
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
