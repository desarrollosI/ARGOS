import { useEffect, useState } from 'react';

import { insertHistorial } from '../helpers/insertHistorial';

const useMapLayerBuscado = (setFicha,setRemision,setNombre,setInspeccion) => {

    const [mapContainerBuscado, setMapContainerBuscado] = useState();
    const [MapBuscado, setMapBuscado] = useState();
    const [puntosPersona, setPuntosPersona] = useState([])

    useEffect(() => {
        if (MapBuscado) {
          MapBuscado.loadImage(
            "/estaticos-argos/mapa/rojo.png", // URL del ícono personalizado
            (error, image) => {
              if (error) throw error;
              MapBuscado.addImage("marker-hechos", image);
            }
          );
          MapBuscado.loadImage(
            "/estaticos-argos/mapa/verde.png", // URL del ícono personalizado
            (error, image) => {
              if (error) throw error;
              MapBuscado.addImage("marker-detencion", image);
            }
          );
          MapBuscado.loadImage(
            "/estaticos-argos/mapa/azul.png", // URL del ícono personalizado
            (error, image) => {
              if (error) throw error;
              MapBuscado.addImage("marker-domicilio", image);
            }
          );
          MapBuscado.loadImage(
            "/estaticos-argos/mapa/morado.png", // URL del ícono personalizado
            (error, image) => {
              if (error) throw error;
              MapBuscado.addImage("marker-inspecciones", image);
            }
          );
        }
      }, [MapBuscado]);
  
    useEffect(() => {
        console.log('EFECTRO DENTRO DEL HOOK LAYER BUSCADO', puntosPersona);
        console.log(mapContainerBuscado)
        console.log('MAPA TAL CUAL',MapBuscado)
        if (!MapBuscado) return;
        if(puntosPersona.Hechos){

            const allFeatures = [
                ...puntosPersona.Hechos.map((item) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
                    ],
                  },
                  properties: {
                    Ficha: item.Ficha,
                    No_Remision: item.No_Remision,
                    Nombre: item.Nombre,
                    Ap_Paterno: item.Ap_Paterno,
                    Ap_Materno: item.Ap_Materno,
                    tipo: "hechos"
                  },
                })),
                ...puntosPersona.Domicilio.map((item) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
                    ],
                  },
                  properties: {
                    Ficha: item.Ficha,
                    No_Remision: item.No_Remision,
                    Nombre: item.Nombre,
                    Ap_Paterno: item.Ap_Paterno,
                    Ap_Materno: item.Ap_Materno,
                    tipo: "domicilio"
                    },
                })),
                ...puntosPersona.Detencion.map((item) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
                    ],
                  },
                  properties: {
                    Ficha: item.Ficha,
                    No_Remision: item.No_Remision,
                    Nombre: item.Nombre,
                    Ap_Paterno: item.Ap_Paterno,
                    Ap_Materno: item.Ap_Materno,
                    tipo: "detencion"
                    },
                })),
                ...puntosPersona.Inspecciones.map((item) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
                      isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y),
                    ],
                  },
                  properties: {
                    Id_Inspeccion: item.Id_Inspeccion,
                    Nombre: item.Nombre,
                    Ap_Paterno: item.Ap_Paterno,
                    Ap_Materno: item.Ap_Materno,
                    tipo: "inspecciones"
                    },
                })),
              ];

            if (MapBuscado.getLayer('buscado')) {
            MapBuscado.removeLayer('buscado');
            }
    
            if (MapBuscado.getSource('buscado')) {
            MapBuscado.removeSource('buscado');
            }

            console.log('HECHOS',puntosPersona.Hechos)
            MapBuscado.addSource('buscado', {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: allFeatures,
            }
            })
            
            MapBuscado.addLayer({
                        id: 'buscado',
                        type: "symbol",
                        source: 'buscado',
                        layout: {
                          'icon-image': ["match", ["get", "tipo"], "hechos", "marker-hechos", "detencion", "marker-detencion", "domicilio", "marker-domicilio", "inspecciones", "marker-inspecciones", "marker-inspecciones"],
                            'icon-size': 0.20,
                            'icon-allow-overlap': true
                            }
                    })
        }
    },[MapBuscado,puntosPersona])

    useEffect(() => {
        // Verifica que MapBuscado esté definido antes de agregar el evento
        if (MapBuscado) {
          // Agrega el evento de clic a la capa "buscado"
          MapBuscado.on('click', 'buscado', (e) => {
            // Aquí puedes ejecutar la lógica que deseas al hacer clic en el símbolo
            // e.features contendrá información sobre los objetos que fueron clickeados
            const clickedFeatures = e.features;
            console.log('Marcadores clickeados:', clickedFeatures);
      
            // Por ejemplo, puedes mostrar una ventana emergente con información del marcador clickeado
            if (clickedFeatures.length > 0) {
              const feature = clickedFeatures[0]; // Obtén el primer marcador clickeado (puedes ajustar esta lógica según tus necesidades)
              const properties = feature.properties; // Aquí están las propiedades del marcador clickeado
              if(feature.properties.tipo == 'inspecciones'){
                setInspeccion(e.features[0].properties.Id_Inspeccion)
                setNombre(`${ properties.Nombre }  ${properties.Ap_Paterno} ${properties.Ap_Materno}`)
              }else{
                setFicha(properties.No_Remision)
                setRemision(properties.Ficha)
                setNombre(`${ properties.Nombre }  ${properties.Ap_Paterno} ${properties.Ap_Materno}`)
              }
            }
          });
        }
      }, [MapBuscado]);

      
  return {
    mapContainerBuscado,
    // Resto de los estados...

    setMapContainerBuscado,
    setPuntosPersona,
    setMapBuscado
    // Resto de las funciones y efectos...
  };
};

export default useMapLayerBuscado;
