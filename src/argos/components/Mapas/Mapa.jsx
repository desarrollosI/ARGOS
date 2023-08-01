import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
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
import { insertHistorial } from "../../../helpers/insertHistorial";
import { SearchPerson } from "./SearchPerson";
import useMapLayerBuscado from "../../../hooks/useMapLayerBuscado";
import KmlToGeoJsonConverter from "./KmlToGeoJsonConverter";
import { LayerInspeccionesControls } from "./LayerInspeccionesControls";
import useMapLayerInspecciones from "../../../hooks/useMapLayerInspecciones";

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

  const [dataPoligonoPersonalizado,setDaltaPoligonoPersonalizado] = useState()

  const [DataResultadoBusqueda, setSetDataResultadoBusqueda] = useState([])
  const [mapaArchivo, setMapaArchivo] = useState(null)

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

  const{ mapContainerBuscado, setMapContainerBuscado,setMapBuscado, setPuntosPersona} = useMapLayerBuscado( setRemision ,setFicha , setNombre )

  const {
    showLayer: showLayerInspecciones,
    showHeatLayer: showHeatLayerInspecciones,
    fechaInicio: fechaInicioInspecciones,
    fechaFin: fechaFinInspecciones,
    Zona: ZonaInspecciones,
    JuntaAuxiliar: JuntaAuxiliarInspecciones,
    fetchedData2: datosInspecciones,
    setMap: setMapInspecciones,
    setMapContainer: setMapContainerInspecciones,
    fetchData: fetchDataInspecciones,
    handleStartDateChange: handleStartDateChangeInspecciones,
    handleEndDateChange: handleEndDateChangeInspecciones,
    handleCheckboxLayer: handleCheckboxLayerInspecciones,
    handleCheckboxHeatLayer: handleCheckboxHeatLayerInspecciones,
    handleZona: handleZonaInspecciones,
    handleJuntaAuxiliar: handleJuntaAuxiliarInspecciones
  } = useMapLayerInspecciones('ubicacion-inspecciones', 'purple', 'inspecciones');

  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };

  const handleZonaGeneral = (event) => {
    setZonaGeneral(event.target.value);
  };

  const handleCapasExcel = (event) =>{
    capasToExcel({hechos:datosUbicacionHechos,domicilio:datosDomicilioDetenido,detencion:datosUbicacionDetencion,inspecciones:datosInspecciones})
  }

  
  const handleCapasPerExcel = async(event) =>{
    console.log(dataPoligonoPersonalizado)
    let resultadosEnPoligonoPer = await PuntosEnPoligonoPer(dataPoligonoPersonalizado,datosUbicacionHechos,datosDomicilioDetenido,datosUbicacionDetencion,datosInspecciones)
    console.log('antes del set poligono personalizado: ', resultadosEnPoligonoPer)
    capasPerToExcel({
      hechos:resultadosEnPoligonoPer.hechos,
      domicilio:resultadosEnPoligonoPer.domicilio,
      detencion:resultadosEnPoligonoPer.detencion,
      inspecciones:resultadosEnPoligonoPer.inspecciones
    })
  }

  useEffect(() => {
    setPuntosPersona(DataResultadoBusqueda)
  },[DataResultadoBusqueda])

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
      setMapContainerUbicacionDetencion(mapContainer.current);
      setMapContainerBuscado(mapContainer.current);
      setMapContainerInspecciones(mapContainer.current);

      setMapDomicilioDetenido(map.current);
      setMapUbicacionDetencion(map.current)
      setMap(map.current);
      setMapBuscado(map.current);
      setMapaArchivo(map.current);
      setMapInspecciones(map.current);

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
        insertHistorial({lugar:'Geoanalisis',tipo:'Poligono Personalizado', poligono: polygon})
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
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            {
            (!isLoadingCatalogo)
            ?(
              <>  
                    <button class="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHechos" aria-expanded="false" aria-controls="collapseHechos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                    </svg>

                      Capa Ubicacion Hechos 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </button>
                    <div className="col-md-12 card shadow mb-3 collapse" id="collapseHechos">
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

                  <button class="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDomicilio" aria-expanded="false" aria-controls="collapseDomicilio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                    </svg>
                      Capa Domicilio Detenido
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                  </button>
                  <div className="col-md-12 card shadow mb-3 collapse" id="collapseDomicilio">
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

                  
                  <button class="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDetencion" aria-expanded="false" aria-controls="collapseDetencion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                    </svg>

                      Capa Ubicacion Detencion
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                  </button>

                  <div className="col-md-12 card shadow mb-3 collapse" id="collapseDetencion">
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

                  <button class="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInspecciones" aria-expanded="false" aria-controls="collapseInspecciones">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="purple" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                    </svg>

                      Capa Inspecciones
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                  </button>

                  <div className="col-md-12 card shadow mb-3 collapse" id="collapseInspecciones">
                    <LayerInspeccionesControls
                      handleCheckboxInspeccionesLayer={handleCheckboxLayerInspecciones} 
                      showInspeccionesLayer={showLayerInspecciones}  
                      handleCheckboxInspeccionesHeatLayer={handleCheckboxHeatLayerInspecciones} 
                      showInspeccionesHeatLayer={showHeatLayerInspecciones}
                      fechaInicioInspecciones={fechaInicioInspecciones}
                      fechaFinInspecciones={fechaFinInspecciones}
                      handleStartDateChangeInspecciones={handleStartDateChangeInspecciones}
                      handleEndDateChangeInspecciones={handleEndDateChangeInspecciones} 
                      handleZonaInspecciones={handleZonaInspecciones}
                      handleJuntaAuxiliarInspecciones={handleJuntaAuxiliarInspecciones}
                    />
                  </div>
              </>

            )
            :<></>
          }
          </div>
          

          <button class="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBusqueda" aria-expanded="false" aria-controls="collapseBusqueda">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-bounding-box me-2" viewBox="0 0 16 16">
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>
            Buscar Persona
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>

          <div className="col-md-12 card shadow mb-3 collapse" id="collapseBusqueda">
            <SearchPerson setSetDataResultadoBusqueda = {setSetDataResultadoBusqueda}/>
          </div>

          <div className="col-md-12">
            <KmlToGeoJsonConverter mapa={mapaArchivo}/>
          </div>
          

        </div>

        <div className="col-md-8">
          <div className="row card shadow">
            <GeneralControls 
              showVectoresLayer={showVectoresLayer} 
              handleCheckboxVectoresLayer={handleCheckboxVectoresLayer} 
              handleZonaGeneral={handleZonaGeneral}
              handleCapasExcel={handleCapasExcel}
              handleCapasPerExcel={handleCapasPerExcel}/>
          </div>
          <div className="row">
            <div ref={mapContainer} className="map-container mt-3" />
            <div className="flotante-derecha">
              {/* <div className="overlaymap">
                Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
              </div> */}
              <div className="col-md-12 card shadow pb-2 px-2" style={{maxHeight: '420px'}}>
                <div className="row mt-3"> 
                  <h4> Foto: </h4>
                </div>
                <div className="row">
                  <img src={`http://187.216.250.245/sarai/public/files/Remisiones/${Ficha}/FotosHuellas/${Remision}/rostro_frente.jpeg`} width="400px" alt="Foto_Detenido"/>
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
          </div>
        </div>
      </div>


    </>
  );
}
