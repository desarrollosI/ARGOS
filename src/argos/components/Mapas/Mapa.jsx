import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { mapasApi } from "../../../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";
import { MapControls } from "./MapControls";
import { DateRangePicker } from "../Graficas/DateRangePicker";

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
  const [fetchedData, setFetchedData] = useState();
  const [fetchedData2, setFetchedData2] = useState();

  const [fechaInicio, setFechaInicio] = useState('2021-06-24')
  const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])

  const [showUbiHLayer, setShowUbiHLayer] = useState(false);
  const [showZonasLayer, setShowZonasLayer] = useState(true);

  const fetchData = async (endpoint) => {
    setIsLoadingData(true);
    const { data } = await mapasApi.post(endpoint,{fechaInicio,fechaFin});
    console.log(data.data.Remisiones2);
    setFetchedData(data.data.Remisiones);
    setFetchedData2(data.data.Remisiones2);
    setIsLoadingData(false);
  };

  const handleMouseEnter = (e) => {
    map.current.getCanvas().style.cursor = "pointer";
    const feature = e.features[0];
    const coordinates = feature.geometry.coordinates.slice();
    const remision = feature.properties.No_Remision;
    const nombre = `${feature.properties.Nombre} ${feature.properties.Ap_Paterno} ${feature.properties.Ap_Materno}`;

    popup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: "custom-popup",
    })
      .setLngLat(coordinates)
      .setHTML(`<span>No. Remision: ${remision}</br> Nombre: ${nombre}</span>`)
      .addTo(map.current);
  };

  const handleMouseLeave = () => {
    map.current.getCanvas().style.cursor = "";
    if (popup.current) {
      popup.current.remove();
    }
  };

  const handleMouseClick = handleMouseLeave;

  const handleStartDateChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleCheckboxUbiHLayer = () => {
    setShowUbiHLayer(!showUbiHLayer);
  };
  const handleCheckboxZonasLayer = () => {
    setShowZonasLayer(!showZonasLayer);
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
  }, [fechaInicio,fechaFin])
  
 
  //EFECTO PARA MANEJAR LA CAPA DE VECTORES
  useEffect(() => {
    if (!map.current || isLoadingData) return;

    const sourceIDVectores = 'vectores-source';
    console.log('variable de zonas: ', showZonasLayer)
    if (showZonasLayer) {
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
  },[isLoadingData,showZonasLayer])

   //EFECTO PARA MANEJAR LA CAPA DE HECHOS
   useEffect(() => {
    if (!map.current || isLoadingData) return;

      if (map.current.getLayer("ubicaciones-hechos2")) {
        map.current.removeLayer("ubicaciones-hechos2");
      }

      if (map.current.getSource('ubicaciones-hechos2')) {
        map.current.removeSource('ubicaciones-hechos2');
      }


      if (!showUbiHLayer) {

        // Remover la capa de calor si está presente
        if (map.current.getLayer("heatmap")) {
          map.current.removeLayer("heatmap");
        }

        // Remover la fuente de datos de calor si está presente
        if (map.current.getSource("heatmap")) {
          map.current.removeSource("heatmap");
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

        map.current.on("mouseenter", "ubicaciones-hechos2", handleMouseEnter);
        map.current.on("mouseleave", "ubicaciones-hechos2", handleMouseLeave);
        map.current.on("click", "ubicaciones-hechos2", handleMouseClick);

        return () => {
          map.current.off("mouseenter", "ubicaciones-hechos2", handleMouseEnter);
          map.current.off("mouseleave", "ubicaciones-hechos2", handleMouseLeave);
          map.current.off("click", "ubicaciones-hechos2", handleMouseClick);
        };
      }else {
        // Remover la capa de polígonos si está presente
        if (map.current.getLayer("ubicaciones-hechos2")) {
          map.current.removeLayer("ubicaciones-hechos2");
        }

        // Remover la fuente de datos de la capa de polígonos si está presente
        if (map.current.getSource("ubicaciones-hechos2")) {
          map.current.removeSource("ubicaciones-hechos2");
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

      }

  }, [isLoadingData, fetchedData2,showUbiHLayer]);

  return (
    <>
      <MapControls handleCheckboxUbiHLayer={handleCheckboxUbiHLayer} showUbiHLayer={showUbiHLayer} handleCheckboxZonasLayer={handleCheckboxZonasLayer} showZonasLayer={showZonasLayer}/>
      
      <div className="row">
      <DateRangePicker
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        />
      </div>
      <div>
        <div className="overlaymap">
          Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>

    </>
  );
}
