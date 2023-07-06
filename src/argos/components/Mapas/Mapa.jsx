import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import * as turf from '@turf/turf';
import { catalogosApi, mapasApi } from "../../../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";
import { LayerHechosControls } from "./LayerHechosControls";
import { LayerDomicilioDetControls } from "./LayerDomicilioDetControls";
import { LayerUbicacionDetencionControls } from "./LayerUbicacionDetencionControls";
import { GeneralControls } from "./GeneralControls";
import { PuntosEnZona, PuntosEnJuntaAuxiliar, capasToExcel } from "../../helpers";
import useMapLayerSARAI from "../../../hooks/useMapLayerSarai";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg";

export function Mapa() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const [lng, setLng] = useState(-98.20346);
  const [lat, setLat] = useState(19.03793);
  const [zoom, setZoom] = useState(9);

  const [showVectoresLayer, setShowVectoresLayer] = useState(true);
  const [Remision, setRemision] = useState(258086);
  const [Ficha, setFicha] = useState(14931);
  const [Nombre, setNombre] = useState('');

  const [catalogoFD, setCatalogoFD] = useState()
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true)

  const [FaltaDelitoEspecifico,setFaltaDelitoEspecifico] = useState('')

  const fetchDataCatalogo = async (endpoint) => {
    setIsLoadingCatalogo(true);
    let response = await catalogosApi.post(endpoint);
    console.log('catalogo  ',response.data.data.catalogo)
    setCatalogoFD(response.data.data.catalogo);
    setIsLoadingCatalogo(false)
};

  const {
    showLayer,
    showHeatLayer,
    fechaInicio,
    fechaFin,
    Zona,
    JuntaAuxiliar,
    fetchedData2: datosUbicacionHechos,
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
  } = useMapLayerSARAI('ubicacion-hechos', 'red', 'ubicacion-hechos',setRemision,setFicha,setNombre,FaltaDelitoEspecifico);

  const {
    showLayer: showLayerDomicilioDetenido,
    showHeatLayer: showHeatLayerDomiclioDetenido,
    fechaInicio: fechaInicioDomicilioDetenido,
    fechaFin: fechaFinDomicilioDetenido,
    Zona: ZonaDomicilioDetenido,
    JuntaAuxiliar: JuntaAuxiliarDomicilioDetenido,
    fetchedData2: datosDomicilioDetenido,
    setMap: setMapDomicilioDetenido,
    setMapContainer: setMapContainerDomicilioDetenido,
    fetchData: fetchDataDomicilioDetenido,
    handleStartDateChange: handleStartDateChangeDomicilioDetenido,
    handleEndDateChange: handleEndDateChangeDomicilioDetenido,
    handleCheckboxLayer: handleCheckboxLayerDomicilioDetenido,
    handleCheckboxHeatLayer: handleCheckboxHeatLayerDomicilioDetenido,
    handleFaltaDelito: handleFaltaDetlitoDomicilioDetenido,
    handleZona: handleZonaDomicilioDetenido,
    handleJuntaAuxiliar: handleJuntaAuxiliarDomicilioDetenido
  } = useMapLayerSARAI('domicilio-detenido', 'blue', 'domicilio-detenido', setRemision, setFicha, setNombre, FaltaDelitoEspecifico);

  const {
    showLayer: showLayerUbicacionDetencion,
    showHeatLayer: showHeatLayerUbicacionDetencion,
    fechaInicio: fechaInicioUbicacionDetencion,
    fechaFin: fechaFinUbicacionDetencion,
    Zona: ZonaUbicacionDetencion,
    JuntaAuxiliar: JuntaAuxiliarUbicacionDetencion,
    fetchedData2: datosUbicacionDetencion,
    setMap: setMapUbicacionDetencion,
    setMapContainer: setMapContainerUbicacionDetencion,
    fetchData: fetchDataUbicacionDetencion,
    handleStartDateChange: handleStartDateChangeUbicacionDetencion,
    handleEndDateChange: handleEndDateChangeUbicacionDetencion,
    handleCheckboxLayer: handleCheckboxLayerUbicacionDetencion,
    handleCheckboxHeatLayer: handleCheckboxHeatLayerUbicacionDetencion,
    handleFaltaDelito: handleFaltaDetlitoUbicacionDetencion,
    handleZona: handleZonaUbicacionDetencion,
    handleJuntaAuxiliar: handleJuntaAuxiliarUbicacionDetencion
  } = useMapLayerSARAI('ubicacion-detencion', 'green', 'ubicacion-detencion', setRemision, setFicha, setNombre, FaltaDelitoEspecifico);

  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };

  const handleZonaGeneral = (event) => {
    setZonaGeneral(event.target.value);
  };

  const handleCapasExcel = (event) =>{
    capasToExcel({hechos:datosUbicacionHechos,domicilio:datosDomicilioDetenido,detencion:datosUbicacionDetencion})
  }

  const handleFaltaDelitoEspecifico = (delito) => {
    console.log('delito',delito)
    setFaltaDelitoEspecifico(delito.name)
  }

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

      setMapContainer(mapContainer.current);
      setMapContainerDomicilioDetenido(mapContainer.current);
      setMapContainerUbicacionDetencion(mapContainer.current)

      setMapDomicilioDetenido(map.current);
      setMapUbicacionDetencion(map.current)
      setMap(map.current);
    };

    loadMap();
  }, []);


  useEffect(() => {
    fetchDataCatalogo('faltas-delitos');
  }, []);

  return (
    <>
      <div className="row mb-3 ">

        {
          (!isLoadingCatalogo)
          ?(
            <>
              <div className="row d-flex justify-content-around">
                  <div className="col-md-5 card shadow mb-3">
                  <LayerHechosControls 
                    handleCheckboxUbiHechosLayer={handleCheckboxLayer} 
                    showUbiHechosLayer={showLayer}  
                    handleCheckboxUbiHechosHeatLayer={handleCheckboxHeatLayer} 
                    showUbiHechosHeatLayer={showHeatLayer}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange} 
                    handleFaltaDelito={handleFaltaDelito}
                    handleZona={handleZona}
                    handleJuntaAuxiliar={handleJuntaAuxiliar}
                    catalogoFD={catalogoFD}
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}
                  />
                </div>
                <div className="col-md-5 card shadow mb-3">
                  <LayerDomicilioDetControls
                    handleCheckboxDomicilioDetLayer={handleCheckboxLayerDomicilioDetenido} 
                    showDomicilioDetLayer={showLayerDomicilioDetenido}  
                    handleCheckboxDomicilioDetHeatLayer={handleCheckboxHeatLayerDomicilioDetenido} 
                    showDomicilioDetHeatLayer={showHeatLayerDomiclioDetenido}
                    fechaInicioDomicilioDet={fechaInicioDomicilioDetenido}
                    fechaFinDomicilioDet={fechaFinDomicilioDetenido}
                    handleStartDateChangeDomicilioDet={handleStartDateChangeDomicilioDetenido}
                    handleEndDateChangeDomicilioDet={handleEndDateChangeDomicilioDetenido} 
                    handleFaltaDelitoDomicilioDet={handleFaltaDetlitoDomicilioDetenido}
                    handleZonaDomicilioDet={handleZonaDomicilioDetenido}
                    handleJuntaAuxiliarDomicilioDet={handleJuntaAuxiliarDomicilioDetenido}
                    catalogoFD={catalogoFD}
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}
                  />
                </div>
                <div className="col-md-5 card shadow mb-3">
                  <LayerUbicacionDetencionControls
                    handleCheckboxUbicacionDetencionLayer={handleCheckboxLayerUbicacionDetencion} 
                    showUbicacionDetencionLayer={showLayerUbicacionDetencion}  
                    handleCheckboxUbicacionDetencionHeatLayer={handleCheckboxHeatLayerUbicacionDetencion} 
                    showUbicacionDetencionHeatLayer={showHeatLayerUbicacionDetencion}
                    fechaInicioUbicacionDetencion={fechaInicioUbicacionDetencion}
                    fechaFinUbicacionDetencion={fechaFinUbicacionDetencion}
                    handleStartDateChangeUbicacionDetencion={handleStartDateChangeUbicacionDetencion}
                    handleEndDateChangeUbicacionDetencion={handleEndDateChangeUbicacionDetencion} 
                    handleFaltaDelitoUbicacionDetencion={handleFaltaDetlitoUbicacionDetencion}
                    handleZonaUbicacionDetencion={handleZonaUbicacionDetencion}
                    handleJuntaAuxiliarUbicacionDetencion={handleJuntaAuxiliarUbicacionDetencion}
                    catalogoFD={catalogoFD}
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecifico}
                  />
                </div>
              </div>
            </>

          )
          :<></>
        }
        
      </div>  
      <div className="row card shadow">
        <div className="col my-2">
          <GeneralControls 
            showVectoresLayer={showVectoresLayer} 
            handleCheckboxVectoresLayer={handleCheckboxVectoresLayer} 
            handleZonaGeneral={handleZonaGeneral}
            handleCapasExcel={handleCapasExcel}/>
        </div>
      </div>
      <div className="row ">
        {/* <div className="overlaymap">
          Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
        </div> */}
        <div className="col-md-10 card shadow">
          <div ref={mapContainer} className="map-container mt-3" />
        </div>
        <div className="col-md-2 card shadow" style={{maxHeight: '420px'}}>
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
