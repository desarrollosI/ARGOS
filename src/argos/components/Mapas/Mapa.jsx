import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import * as turf from '@turf/turf';
import { catalogosApi, mapasApi } from "../../../api";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Mapa/mapa.css";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { LayerHechosControls } from "./LayerHechosControls";
import { LayerDomicilioDetControls } from "./LayerDomicilioDetControls";
import { LayerUbicacionDetencionControls } from "./LayerUbicacionDetencionControls";
import { GeneralControls } from "./GeneralControls";
import { PuntosEnZona, PuntosEnJuntaAuxiliar, capasToExcel, capasPerToExcel } from "../../helpers";
import useMapLayerSARAI from "../../../hooks/useMapLayerSarai";
import { PuntosEnPoligonoPer } from "../../helpers/Mapa/puntosEnPoligonoPer";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg";

export function Mapa() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const [lng, setLng] = useState(-98.20346);
  const [lat, setLat] = useState(19.03793);
  const [zoom, setZoom] = useState(9);
  const [mapaCargado,setMapaCargado] = useState(false);

  const [showVectoresLayer, setShowVectoresLayer] = useState(true);
  const [Remision, setRemision] = useState(258086);
  const [Ficha, setFicha] = useState(14931);
  const [Nombre, setNombre] = useState('');

  const [catalogoFD, setCatalogoFD] = useState()
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true)

  // const [FaltaDelitoEspecifico,setFaltaDelitoEspecifico] = useState('')

  const [dataPoligonoPersonalizado,setDaltaPoligonoPersonalizado] = useState()

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
    handleJuntaAuxiliar,
    handleFaltaDelitoEspecifico: handleFaltaDelitoEspecificoHechos
  } = useMapLayerSARAI('ubicacion-hechos', 'red', 'ubicacion-hechos',setRemision,setFicha,setNombre,'');

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
    handleJuntaAuxiliar: handleJuntaAuxiliarDomicilioDetenido,
    handleFaltaDelitoEspecifico: handleFaltaDelitoEspecificoDomicilio
  } = useMapLayerSARAI('domicilio-detenido', 'blue', 'domicilio-detenido', setRemision, setFicha, setNombre, 'FaltaDelitoEspecifico');

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
    handleJuntaAuxiliar: handleJuntaAuxiliarUbicacionDetencion,
    handleFaltaDelitoEspecifico: handleFaltaDelitoEspecificoDetencion
  } = useMapLayerSARAI('ubicacion-detencion', 'green', 'ubicacion-detencion', setRemision, setFicha, setNombre, 'FaltaDelitoEspecifico');

  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };

  const handleZonaGeneral = (event) => {
    setZonaGeneral(event.target.value);
  };

  const handleCapasExcel = (event) =>{
    capasToExcel({hechos:datosUbicacionHechos,domicilio:datosDomicilioDetenido,detencion:datosUbicacionDetencion})
  }

  
  const handleCapasPerExcel = async(event) =>{
    console.log(dataPoligonoPersonalizado)
    let resultadosEnPoligonoPer = await PuntosEnPoligonoPer(dataPoligonoPersonalizado,datosUbicacionHechos,datosDomicilioDetenido,datosUbicacionDetencion)
    console.log('antes del set poligono personalizado: ', resultadosEnPoligonoPer)
    capasPerToExcel({
      hechos:resultadosEnPoligonoPer.hechos,
      domicilio:resultadosEnPoligonoPer.domicilio,
      detencion:resultadosEnPoligonoPer.detencion
    })
  }
/*
  const handleFaltaDelitoEspecifico = (delito) => {
    console.log('delito',delito)
    setFaltaDelitoEspecifico(delito.name)
  }
*/
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

      map.current.on('style.load', () => {
        setMapaCargado(true)
      })

      const draw = new MapboxDraw();
      map.current.addControl(draw);

      // Escucha el evento de creación de un polígono
      map.current.on('draw.create', async (event) => {
        const polygon = event.features[0];
        // Realiza alguna acción con el polígono creado
        console.log('Polígono creado:', polygon);
        setDaltaPoligonoPersonalizado(polygon)
      });
    };

    loadMap();
  }, []);


   //EFECTO PARA MANEJAR LA CAPA DE VECTORES
   useEffect(() => {
    if(mapaCargado === false) return
    if(mapaCargado === true ){
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
                // setCapaVectores(geojson)
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
    }
  },[showVectoresLayer,mapaCargado])


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
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecificoHechos}
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
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecificoDomicilio}
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
                    handleFaltaDelitoEspecifico={handleFaltaDelitoEspecificoDetencion}
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
            handleCapasExcel={handleCapasExcel}
            handleCapasPerExcel={handleCapasPerExcel}/>
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
