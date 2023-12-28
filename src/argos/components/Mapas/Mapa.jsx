//se importa react y los componentes necesarios del mismo
import React, { useRef, useEffect, useState } from "react";
//se importa el link de el router
import { Link } from 'react-router-dom';
//se importan las bibliotecas de terceros asi como sus estilos
import mapboxgl from "mapbox-gl";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import KmlToGeoJsonConverter from "./KmlToGeoJsonConverter";
//se importa el adaptador para conectarnos a la base de datos
import { catalogosApi } from "../../../api";
//se importan los hooks necesarios para cada una de las capas que presenta el mapa
import useMapLayerSARAI from "../../../hooks/useMapLayerSarai";
import useMapLayerBuscado from "../../../hooks/useMapLayerBuscado";
import useMapLayerInspecciones from "../../../hooks/useMapLayerInspecciones";
import useMapLayerSic from "../../../hooks/useMapLayerSic";
import useMapLayerPuntos from "../../../hooks/useMapLayerPuntos";
//se importan los componentes 
import { LayerHechosControls } from "./LayerHechosControls";
import { LayerDomicilioDetControls } from "./LayerDomicilioDetControls";
import { LayerUbicacionDetencionControls } from "./LayerUbicacionDetencionControls";
import { LayerInspeccionesControls } from "./LayerInspeccionesControls";
import { LayerPuntosIdentificadosControls } from "./LayerPuntosIdentificadosControls";
import { LayerSicEventosControls } from "./LayerSicEventosControls";
import { GeneralControls } from "./GeneralControls";
import { SearchPerson } from "./SearchPerson";
import { FlyTo } from "./FlyTo";
import { ImageZoom } from "../Shared";

//se importan los helpers necesarios 
import { capasToExcel, capasPerToExcel } from "../../helpers";
import { PuntosEnPoligonoPer } from "../../helpers/Mapa/puntosEnPoligonoPer";
import { insertHistorial } from "../../../helpers/insertHistorial";
//se importan los estilos generales del modulo
import "../css/Mapa/mapa.css";
import { FormKnn } from "./FormKnn";

//se asigna el token para el componente del mapa de mapbox 
mapboxgl.accessToken =
  "pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg";
/* Este componente es de los mas complejos que maneja el sistema por lo que se ira explicando dentro del mismo 
   La funcionalidad general: es un mapa con diferentes capas con informacion obtenida de bases de datos 
*/
export function Mapa() {
  /*primero se necesitan referencias hacia las entidades html para tratar de evitar rerenderizados inecesarios los nombres son descriptivos*/
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  
  //tambien se necesitan estados iniciales para el mapa, como el nivel de zoom asi como donde estara el centro
  const [lng, setLng] = useState(-98.20346);
  const [lat, setLat] = useState(19.03793);
  const [zoom, setZoom] = useState(9);
  const [mapaCargado,setMapaCargado] = useState(false);
  const [marker, setMarker] = useState(null);

  /*
    aqui comienzan los estados de los controles o interfaces del mapa
    showVectoresLayer es para ocultar/mostrar la capa generar de zonas vectores
    Los siguientes estados son para poder alternar en la tarjeta de detalles cuando
    se hace click en un punto del mapa dependiendo de la capa
  */
  const [showVectoresLayer, setShowVectoresLayer] = useState(true);
  const [Remision, setRemision] = useState(258086);
  const [Ficha, setFicha] = useState(14931);
  const [Nombre, setNombre] = useState('');
  const [Inspeccion, setInspeccion] = useState(0);
  const [FolioSic, setFolioSic] = useState(0);
  const [FolioPunto, setFolioPunto] = useState(0);
  /* 
    Aunque se cuenta con los estados, a estos tres se les tiene que hacer referencia 
    para que se pueda cambiar de manera adecuada la tarjeta de informacion
  */
  const prevInspeccionRef = useRef(Inspeccion);
  const prevFolioSicRef = useRef(FolioSic);
  const prevRemisionRef = useRef(Remision);

  /* 
    Los siguientes estados hacen referencia a catalogos de opciones que se necesitan para 
    los componentes de los controles de las capas, son almacenadores de la informacion
    asi como indicadores de cuando ya cuentan con informacion para poder reenderizar el 
    componente en cuestion que los utilice.
  */
  const [catalogoFD, setCatalogoFD] = useState()
  const [catalogoFaltasDelitosPuntos, setCatalogoFaltasDelitosPuntos] = useState([])
  const [catalogoFuentePuntos, setCatalogoFuentePuntos] = useState([])
  const [catalogoBandaPuntos, setCatalogoBandaPuntos] = useState([])
  const [catalogoObjetivoPuntos, setCatalogoObjetivoPuntos] = useState([])
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true)
  const [isLoadingCatalogoFuente, setIsLoadingCatalogoFuente] = useState(true)
  const [isLoadingCatalogoBanda, setIsLoadingCatalogoBanda] = useState(true)
  const [isLoadingCatalogoObjetivo, setIsLoadingCatalogoObjetivo] = useState(true)
  // Este estado se utliza para disparar el flyto del mapa
  const [CoordenadasFlyTo,setCoordenadasFlyTo] = useState([-98.20346,19.03793])
  // En este estado se almacena la informacion de un poligono creado por usuario
  const [dataPoligonoPersonalizado,setDaltaPoligonoPersonalizado] = useState()
  //en este estado se almacenan los resultados de una busqueda por nombre
  const [DataResultadoBusqueda, setSetDataResultadoBusqueda] = useState([])
  //en este estado se detecta si hay o no un archivo cargado para mostrarlo, por defecto solo se muestran capas de puntos
  const [mapaArchivo, setMapaArchivo] = useState(null)
  //la siguiente funcion busca la informacion de un catalogo dandole como entrada el endpoint al cual debe de llamar
  const fetchDataCatalogo = async (endpoint) => {
    setIsLoadingCatalogo(true);
    let response = await catalogosApi.post(endpoint);
    //console.log('catalogo  ',response.data.data.catalogo)
    setCatalogoFD(response.data.data.catalogo);
    setIsLoadingCatalogo(false)
};
  //esta funcion determina que endpoint es al que hay que llamar y asigna la informacion obtenida a los estados correspondientes
  const fetchDataCatalogoPuntos = async (endpoint) => {
    try {
      let response = await catalogosApi.post(endpoint);
      console.log(endpoint,response.data.data)
      switch (endpoint) {
        case 'puntos-delitos-asociados':
          setCatalogoFaltasDelitosPuntos(response.data.data);
          setIsLoadingCatalogo(false);
          break;
        case 'puntos-fuentes':
          setCatalogoFuentePuntos(response.data.data);
          setIsLoadingCatalogoFuente(false)
          break;
        case 'puntos-banda':
          setCatalogoBandaPuntos(response.data.data);
          setIsLoadingCatalogoBanda(false)
          break;
        case 'puntos-objetivo':
          setCatalogoObjetivoPuntos(response.data.data);
          setIsLoadingCatalogoObjetivo(false)
          break;
      
        default:
          break;
      }
    } catch (error) {
      console.log('Error al cargar los catalogos', error)
    }    
};
  /* 
    En las siguientes lineas se llama a acada uno de los hook de las capas, recodemos que lo hook son segmentos de codigo 
    que buscan tomar toda la logica necesaria y que mas se pueda para dejar al componente mas simple, en cada uno de los hook
    se exponen los estados y funciones necesarias para que funcione la capa asi como en concreto los estados que se alteran 
    interactuando con los  controles de la capa, para mas detalles ir a cada archivo de cada hook, todos funcionan de manera 
    muy similar, se decanto por un hook por base de datos, de manera que el hook de sarai maneja tres capas, sic 1, ubicaciones
    1, etc.
    Por el motivo de que usan el mismo hook se les tiene que dar un alias a estados y funciones para no tener conflictos 
    con el manejo de la informacion nombre original : alias
  */

  //Hook para la capa de hechos
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

  //Hook para la capa del domicilio
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

  //Hook para la capa de ubicacion de la detencion
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

  //Hook para la capa de Personas buscadas
  const{ mapContainerBuscado, puntosPersona,setMapContainerBuscado,setMapBuscado, setPuntosPersona} = useMapLayerBuscado( setRemision ,setFicha , setNombre,setInspeccion )
  //Hook para la capa de Inspecciones
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
  } = useMapLayerInspecciones('ubicacion-inspecciones', 'purple', 'inspecciones', setInspeccion);
  //Hook para la capa de eventos sic
  const {
    showLayer: showLayerSicEventos,
    showHeatLayer: showHeatLayerSicEventos,
    fechaInicio: fechaInicioSicEventos,
    fechaFin: fechaFinSicEventos,
    Zona: ZonaSicEventos,
    JuntaAuxiliar: JuntaAuxiliarSicEventos,
    fetchedData2: datosSicEventos,
    setMap: setMapSicEventos,
    setMapContainer: setMapContainerSicEventos,
    fetchData: fetchDataSicEventos,
    handleStartDateChange: handleStartDateChangeSicEventos,
    handleEndDateChange: handleEndDateChangeSicEventos,
    handleCheckboxLayer: handleCheckboxLayerSicEventos,
    handleCheckboxHeatLayer: handleCheckboxHeatLayerSicEventos,
    handleZona: handleZonaSicEventos,
    handleJuntaAuxiliar: handleJuntaAuxiliarSicEventos,
    handleFaltaDelitoEspecifico: handleFaltaDelitoEspecificoSicEventos
  } = useMapLayerSic('ubicacion-sic-eventos', 'orange', 'sic', setFolioSic);
  //Hook para la capa de puntos identificados
  const {
    showLayer: showLayerPuntosIdentificados,
    showHeatLayer: showHeatLayerPuntosIdentificados,
    fechaInicio: fechaInicioPuntosIdentificados,
    fechaFin: fechaFinPuntosIdentificados,
    Zona: ZonaPuntosIdentificados,
    JuntaAuxiliar: JuntaAuxiliarPuntosIdentificados,
    fetchedData2: datosPuntosIdentificados,
    setMap: setMapPuntosIdentificados,
    setMapContainer: setMapContainerPuntosIdentificados,
    fetchData: fetchDataPuntosIdentificados,
    handleStartDateChange: handleStartDateChangePuntosIdentificados,
    handleEndDateChange: handleEndDateChangePuntosIdentificados,
    handleCheckboxLayer: handleCheckboxLayerPuntosIdentificados,
    handleCheckboxHeatLayer: handleCheckboxHeatLayerPuntosIdentificados,
    handleZona: handleZonaPuntosIdentificados,
    handleJuntaAuxiliar: handleJuntaAuxiliarPuntosIdentificados,
    handleFaltaDelitoEspecifico: handleFaltaDelitoEspecificoPuntosIdentificados,
    handleFuente,
    handleBanda,
    handleObjetivo
  } = useMapLayerPuntos('puntos-identificados', 'brown', 'puntosidentificados', setFolioPunto);


  //Handler para ocultar/mostrar la capa de vectores
  const handleCheckboxVectoresLayer = () => {
    setShowVectoresLayer(!showVectoresLayer);
  };
  //Handler de zonas
  const handleZonaGeneral = (event) => {
    setZonaGeneral(event.target.value);
  };
  //Handler para exportar la informacion de las capas hacia un csv
  const handleCapasExcel = (event) =>{
    capasToExcel({hechos:datosUbicacionHechos,domicilio:datosDomicilioDetenido,detencion:datosUbicacionDetencion,inspecciones:datosInspecciones,siceventos:datosSicEventos,puntosidentificados:datosPuntosIdentificados})
  }

  //Handler para pasar la informacion que se encuentre en un poligono personalizado a csv
  const handleCapasPerExcel = async(event) =>{
    let resultadosEnPoligonoPer = await PuntosEnPoligonoPer(dataPoligonoPersonalizado,datosUbicacionHechos,datosDomicilioDetenido,datosUbicacionDetencion,datosInspecciones,datosSicEventos,datosPuntosIdentificados)
    capasPerToExcel({
      hechos:resultadosEnPoligonoPer.hechos,
      domicilio:resultadosEnPoligonoPer.domicilio,
      detencion:resultadosEnPoligonoPer.detencion,
      inspecciones:resultadosEnPoligonoPer.inspecciones,
      siceventos:resultadosEnPoligonoPer.siceventos,
      puntosidentificados:resultadosEnPoligonoPer.puntosidentificados
    })
  }
  //Handler para pasar la informacion de una persona buscada a csv
  const handleCapasPersonaExcel = async(event) =>{
    capasPerToExcel({
      hechos:DataResultadoBusqueda.Hechos,
      domicilio:DataResultadoBusqueda.Domicilio,
      detencion:DataResultadoBusqueda.Detencion,
      inspecciones:DataResultadoBusqueda.Inspecciones
    })
  }

  //Efecto para almacenar los resultados de busqueda persona
  useEffect(() => {
    setPuntosPersona(DataResultadoBusqueda)
  },[DataResultadoBusqueda])

  //Efecto principal, en este se inicializa todo lo necesario para el mapa, se recomienda consultar la documentacion de MapBox
  useEffect(() => {
    //se inicializa el mapa
    const loadMap = async () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      //se agregan los controles
      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, "top-right");
      const fullscreen = new mapboxgl.FullscreenControl();
      map.current.addControl(fullscreen, "top-right");
      //se agrega la funcion del move del mapa (ya no se usa existia una barra para mostrar las coordenadas en todo momento )
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      /*
        En las siguientes lineas  se asignar a los estados de los hooks las referencias al contenedor del mapa
        asi como la referencia al mapa como tal, esto con el fin de que la informacion de las capas que se cambien
        se vea reflejada en el mismo mapa.
      */
      setMapContainer(mapContainer.current);
      setMapContainerDomicilioDetenido(mapContainer.current);
      setMapContainerUbicacionDetencion(mapContainer.current);
      setMapContainerBuscado(mapContainer.current);
      setMapContainerInspecciones(mapContainer.current);
      setMapContainerSicEventos(map.current);
      setMapContainerPuntosIdentificados(map.current);

      setMapDomicilioDetenido(map.current);
      setMapUbicacionDetencion(map.current)
      setMap(map.current);
      setMapBuscado(map.current);
      setMapaArchivo(map.current);
      setMapInspecciones(map.current);
      setMapSicEventos(map.current);
      setMapPuntosIdentificados(map.current);
      //Hay un error con determiandos estilos provenientes de mapbox esta funcion busca hacer tiempo hasta que cargue
      map.current.on('style.load', () => {
        setMapaCargado(true)
      })
      //Se crean los controles de dibujo de los poligonos personalizados y se añaden al mapa
      const draw = new MapboxDraw();
      map.current.addControl(draw);

      // Escucha el evento de creación de un polígono
      map.current.on('draw.create', async (event) => {
        const polygon = event.features[0];
        // Realiza alguna acción con el polígono creado
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
            var geojsonFile = './capas/195_VECTORES.geojson';
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
              data: './capas/195_VECTORES.geojson'
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

  //efecto para llamar el catalogo de faltas delitos
  useEffect(() => {
    fetchDataCatalogo('faltas-delitos');
  }, []);

 // efecto para disparar la obtencion de todos los catalogos para la capa de puntos
  useEffect(() => {
    fetchDataCatalogoPuntos('puntos-delitos-asociados');
    fetchDataCatalogoPuntos('puntos-fuentes');
    fetchDataCatalogoPuntos('puntos-banda');
    fetchDataCatalogoPuntos('puntos-objetivo');
  }, []);

    /* Observar cambios en los estados Inspeccion, FolioSic y Remision aqui se usan las referencias 
    a los estados anteriores para detectar correctamente los cambios*/
    useEffect(() => {
      if (Remision !== 0 && prevRemisionRef.current !== Remision) {
        setFolioSic(0);
        setInspeccion(0);
      } else if (Inspeccion !== 0 && prevInspeccionRef.current !== Inspeccion) {
        setRemision(0);
        setFolioSic(0);
      } else if (FolioSic !== 0 && prevFolioSicRef.current !== FolioSic) {
        setRemision(0);
        setInspeccion(0);
      }
      //se actualizan los estados previos 
      prevInspeccionRef.current = Inspeccion;
      prevFolioSicRef.current = FolioSic;
      prevRemisionRef.current = Remision;
  
    }, [Inspeccion, FolioSic, Remision]);
  
    //EFECTO ENCARGADO DE REALIZAR EL FLY TO y COLOCAR  EL MARCADOR
    useEffect(() => {

      if (map.current ) {

        // Elimina el marcador anterior si existe
        if (marker) {
          marker.remove();
        } 
        //se crea el nuevo marcador
        const newMarker = new mapboxgl.Marker()
        .setLngLat(CoordenadasFlyTo)
        .addTo(map.current);

        // Establecer el índice z del nuevo marcador mediante CSS
        newMarker.getElement().style.zIndex = '9999'; // Ajusta el valor según sea necesario

        // Actualiza la referencia del marcador en el estado
        setMarker(newMarker);
        // por ultimo se realiza el movimiento en el mapa
        map.current.flyTo({
          center: CoordenadasFlyTo,
          zoom: 15,
          essential: true
        });
      console.log('MARKER', marker);
      }
    
    }, [CoordenadasFlyTo]);
  
    /*
      El retorno el componente, son todos los controles de la capa, asi como el mapa para la visualizacion del mismo
    */
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            {/* Para evitar errores es necesario esperar a que ya se cuente con la informacion de los catalogos para poder renderizar ciertas partes del componente
                como los controles por ejemplo */}
            {
            (!isLoadingCatalogo && catalogoFD.length)
            ?(
              <>
                <div className="row">   
                  <div className="col-md-12">
                      <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHechos" aria-expanded="false" aria-controls="collapseHechos">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>

                        Capa Ubicacion Hechos 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                      </button>
                      <div className="col-md-12 card shadow mb-3 collapse" id="collapseHechos">
                        {/* El patron es general y se repite para todos los controles, tienen que recibir los handler de los hook, asi como los estados, o catalgos
                        que necesiten estos controles, depende mucho de que es lo que se requiera y que funcionalidad se le quere asignar a la capa */}
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
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDomicilio" aria-expanded="false" aria-controls="collapseDomicilio">
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
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDetencion" aria-expanded="false" aria-controls="collapseDetencion">
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
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInspecciones" aria-expanded="false" aria-controls="collapseInspecciones">
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
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSic" aria-expanded="false" aria-controls="collapseSic">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>

                        Capa Eventos SIC
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </button>

                    <div className="col-md-12 card shadow mb-3 collapse" id="collapseSic">
                      <LayerSicEventosControls
                        handleCheckboxEventosSicLayer={handleCheckboxLayerSicEventos} 
                        showEventosSicLayer={showLayerSicEventos}  
                        handleCheckboxEventosSicHeatLayer={handleCheckboxHeatLayerSicEventos} 
                        showEventosSicHeatLayer={showHeatLayerSicEventos}
                        fechaInicioEventosSic={fechaInicioSicEventos}
                        fechaFinEventosSic={fechaFinSicEventos}
                        handleStartDateChangeEventosSic={handleStartDateChangeSicEventos}
                        handleEndDateChangeEventosSic={handleEndDateChangeSicEventos} 
                        handleZonaEventosSic={handleZonaSicEventos}
                        handleJuntaAuxiliarEventosSic={handleJuntaAuxiliarSicEventos}
                        catalogoFD={catalogoFD}
                        handleFaltaDelitoEspecifico={handleFaltaDelitoEspecificoSicEventos}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePuntosIdentificados" aria-expanded="false" aria-controls="collapsePuntosIdentificados">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="brown" className="bi bi-square-fill me-2" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>

                        Capa Puntos Identificados
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </button>
                    {(!isLoadingCatalogo) && !(isLoadingCatalogoFuente) && !(isLoadingCatalogoBanda)  && !(isLoadingCatalogoObjetivo) &&(

                    <div className="col-md-12 card shadow mb-3 collapse" id="collapsePuntosIdentificados">
                      <LayerPuntosIdentificadosControls
                        handleCheckboxPuntosIdentificadosLayer={handleCheckboxLayerPuntosIdentificados} 
                        showPuntosIdentificadosLayer={showLayerPuntosIdentificados}  
                        handleCheckboxPuntosIdentificadosHeatLayer={handleCheckboxHeatLayerPuntosIdentificados} 
                        showPuntosIdentificadosHeatLayer={showHeatLayerPuntosIdentificados}
                        catalogoFD={catalogoFaltasDelitosPuntos}
                        catalogoFuente={catalogoFuentePuntos}
                        catalogoBanda={catalogoBandaPuntos}
                        catalogoObjetivo={catalogoObjetivoPuntos}
                        handleFaltaDelitoEspecifico={handleFaltaDelitoEspecificoPuntosIdentificados}
                        handleFuente={handleFuente}
                        handleBanda={handleBanda}
                        handleObjetivo={handleObjetivo}
                      />
                    </div>
                    )}
                  </div>

                </div>  
              </>

            )
            :<></>
          }
          </div>
          
          <div className="col-md-12">
            <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFlyTo" aria-expanded="false" aria-controls="collapseFlyTo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pin-map-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
              <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
            </svg>
              Mover Mapa
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </button>
          </div>

          <div className="col-md-12 card shadow mb-3 collapse" id="collapseFlyTo">
            <FlyTo setCoordenadasFlyTo={setCoordenadasFlyTo}/>
          </div>


          <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBusqueda" aria-expanded="false" aria-controls="collapseBusqueda">
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
            <SearchPerson setSetDataResultadoBusqueda = {setSetDataResultadoBusqueda} handleCapasPersonaExcel={handleCapasPersonaExcel}/>
          </div>

          <button className=" col-md-12 btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseKNN" aria-expanded="false" aria-controls="collapseKNN">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-bounding-box me-2" viewBox="0 0 16 16">
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>
            KNN
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>

          <div className="col-md-12 card shadow mb-3 collapse" id="collapseKNN">
            <FormKnn setCoordenadasFlyTo={setCoordenadasFlyTo} />
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
              <div className="col-md-12 card shadow pb-2 px-2" style={{maxHeight: '420px', width:'290px'}}>
                <div className="row mt-3"> 
                  <h4> Foto: </h4>
                </div>
                <div className="row">
                {Remision != 0 ? (
                  <ImageZoom  url={`http://187.216.250.245/sarai/public/files/Remisiones/${Ficha}/FotosHuellas/${Remision}/rostro_frente.jpeg`} width={'270'} height={'180'}/>
                ) : (
                  <></>
                )}
                </div>
                <div className="row mt-3">
                  {Remision !== 0 ? (
                    <>
                      <strong>Ficha: {Ficha}</strong>
                      <strong>Remision: {Remision}</strong>
                      <strong>Nombre: {Nombre}</strong>
                    </>
                  ) : Inspeccion !== 0 ? (
                    <>
                      <strong>Inspeccion: {Inspeccion}</strong>
                    </>
                  ) : (
                    <>
                      <strong>Folio Infra: {FolioSic}</strong>
                    </>
                  )}
                </div>

                <div className="row">
                  {Remision !== 0 ? (
                    <Link to={`/remision/${Remision}`} target="_blank">Mas Detalles...</Link>
                  ) : Inspeccion !== 0 ? (
                    <>
                      <Link to={`/inspeccion/${Inspeccion}`} target="_blank">Mas Detalles...</Link>
                    </>
                  ) : (
                    <>
                      <Link to={`/evento/${FolioSic}`} target="_blank">Mas Detalles...</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
