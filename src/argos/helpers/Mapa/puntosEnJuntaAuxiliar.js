import * as turf from '@turf/turf';

export const PuntosEnJuntaAuxiliar = async (JuntaAuxiliar, dataBuscar, lugar ) => {

    console.log('entro en la funcion : ',JuntaAuxiliar, dataBuscar, lugar)
  try {
    const response = await fetch(`./${JuntaAuxiliar}.geojson`);
    const data = await response.json();

    JuntaAuxiliar = data;
    const capaJuntaAuxiliar = turf.featureCollection(JuntaAuxiliar.features);

    const puntosDataBuscar = turf.featureCollection(dataBuscar.map((item) => {
      const coordenadas = [
        isNaN(parseFloat(item.Coordenada_X)) ? -0.0 : parseFloat(item.Coordenada_X),
        isNaN(parseFloat(item.Coordenada_Y)) ? 0.0 : parseFloat(item.Coordenada_Y)
      ];

      return turf.point(coordenadas, {
        Ficha: item.Ficha,
        No_Remision: item.No_Remision,
        Nombre: item.Nombre,
        Ap_Paterno: item.Ap_Paterno,
        Ap_Materno: item.Ap_Materno
      });
    }));

    console.log('Cantidad de puntos de data buscar:', puntosDataBuscar.features.length);

    console.log('Cantidad de polígonos (JuntaAuxiliar):', capaJuntaAuxiliar.features.length);

    // Almacenar puntos separados por zona
    const  puntosPorJuntaAuxiliar = {
        resultados: []
      };

    capaJuntaAuxiliar.features.forEach((poligono) => {
      
        if (!puntosPorJuntaAuxiliar) {
          puntosPorJuntaAuxiliar = {
            resultados: []
          };
        }
      
        const puntosEnPoligonoDataBuscar = turf.pointsWithinPolygon(puntosDataBuscar, poligono);
        
        if (puntosPorJuntaAuxiliar.resultados) {
          puntosPorJuntaAuxiliar.resultados.push(...puntosEnPoligonoDataBuscar.features);
        }
      });

    console.log('RESULTADOS:', puntosPorJuntaAuxiliar);
      //console.log('voy a regresar de una zona especifica: ', puntosPorZona[zonaGeneral]);
    let puntosFiltrados = {};
      puntosFiltrados = {
        resultados: []
      };

      dataBuscar.forEach((data) => {
        
        if (Array.isArray(puntosPorJuntaAuxiliar.resultados)) {
            const coincidencia = puntosPorJuntaAuxiliar.resultados.find((punto, index) => punto.properties && punto.properties.No_Remision === data.No_Remision);
            if (coincidencia) {
              puntosFiltrados.resultados.push(data);
            }
          }
      });
  
    return puntosFiltrados;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
