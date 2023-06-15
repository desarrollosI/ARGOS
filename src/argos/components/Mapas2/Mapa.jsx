import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { mapasApi } from "../../../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";

mapboxgl.accessToken = 'pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg';

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

  const fetchData = async (endpoint) => {
    setIsLoadingData(true);
    const { data } = await mapasApi.post(endpoint, {});
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

    popup.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: "custom-popup" })
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
      const fullscreen = new mapboxgl.FullscreenControl()
      map.current.addControl(fullscreen,"top-right");

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      map.current.on("load", () => {
        map.current.addSource("vectores", {
          type: "geojson",
          data: "./map.geojson",
        });

        map.current.addLayer({
          id: "vectores",
          type: "fill",
          source: "vectores",
          paint: {
            "fill-color": ["get", "fill"],
            "fill-opacity": ["get", "fill-opacity"],
            "fill-outline-color": ["get", "stroke"],
          },
        });
      });

      fetchData("ubicacion-hechos");
    };

    loadMap();
  }, []);

  useEffect(() => {
    if (!map.current || isLoadingData) return;

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
                isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
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
