import React, { useRef, useEffect, useState } from "react";

//Se importa nuestro adaptador hacia el backend
import { mapasApi } from '../../../api';

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/Mapa/mapa.css'


mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg";

export function Mapa() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const [lng, setLng] = useState(-98.20346);
  const [lat, setLat] = useState(19.03793);
  const [zoom, setZoom] = useState(9);

  const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
  const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
  const [fetchedData2, setFetchedData2] = useState();// En este estado se va a almacenar la información proveeida por el backend

  const fetchData = async(endpont) => {
    setIsLoadingData(true);
    const {data} =  await mapasApi.post(endpont,{});
    console.log(data.data.Remisiones2)
    setFetchedData(data.data.Remisiones);
    setFetchedData2(data.data.Remisiones2)
    setIsLoadingData(false);
}


    useEffect(() => {
        fetchData('ubicacion-hechos')
    }, [])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
        });
        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, 'top-right'); // Ajustar la posición de los controles
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
    });

       
    useEffect(() => {
        if (!map.current) return;
  
    map.current.on("load", () => {
      map.current.addSource("vectores", {
        type: "geojson",
        // Use a URL for the value for the `data` property.
        data: "./map.geojson",
      });
  
    // map.current.addSource("ubicaciones-hechos", {
    // type: "geojson",
    // // Use a URL for the value for the `data` property.
    // data: "./map2.geojson",
    // });
  
    map.current.addLayer({
    id: "vectores",
    type: "fill",
    source: "vectores",
    paint: {
        "fill-color": ["get", "fill"], // Establece el color de relleno según la propiedad 'fill'
        "fill-opacity": ["get", "fill-opacity"],
        "fill-outline-color": ["get", "stroke"],
    },
    });
  
    // map.current.addLayer({
    // id: "ubicaciones-hechos",
    // type: "circle",
    // source: "ubicaciones-hechos",
    // paint: {
    //     "circle-color": "red", // Establece el color de los puntos
    //     "circle-radius": 5, // Establece el tamaño de los puntos
    // },
    // });
  
     
    });
  }, []);
  

  useEffect(() => {
    if (!map.current || isLoadingData) return;
  
    // Agregar la capa "ubicaciones-hechos2" al mapa aquí
    map.current.addSource("ubicaciones-hechos2", {
        type: "geojson",
        // Use a URL for the value for the `data` property.
        data: {
            type: "FeatureCollection",
            features: fetchedData2.map(item => {
              return {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [ isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X), 
                                 isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y)]
                },
                properties: {
                  No_Remision: item.No_Remision,
                  Nombre: item.Nombre,
                  Ap_Paterno: item.Ap_Paterno,
                  Ap_Materno: item.Ap_Materno
                }
              };
            })
           }
        });

    
    map.current.addLayer({
        id: "ubicaciones-hechos2",
        type: "circle",
        source: "ubicaciones-hechos2",
        paint: {
            "circle-color": "red", // Establece el color de los puntos
            "circle-radius": 3, // Establece el tamaño de los puntos
        },
        });

        const handleMouseEnter = (e) => {
            map.current.getCanvas().style.cursor = "pointer";
            const feature = e.features[0];
            const coordinates = feature.geometry.coordinates.slice();
            const remision = feature.properties.No_Remision;
            const nombre = feature.properties.Nombre + ' ' + feature.properties.Ap_Paterno + ' ' + feature.properties.Ap_Materno;
      
            popup.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: "custom-popup"  })
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
      
          map.current.on("mouseenter", "ubicaciones-hechos2", handleMouseEnter);
      
          map.current.on("mouseleave", "ubicaciones-hechos2", handleMouseLeave);
      
          map.current.on("click", "ubicaciones-hechos2", handleMouseLeave);
  
  }, [isLoadingData, fetchedData2]);


    

  return (
    <div>
      <div className="overlaymap">
        Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
