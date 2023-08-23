import * as turf from '@turf/turf';

export const PuntosEnJuntaAuxiliar = async (JuntaAuxiliar, dataBuscar, lugar ) => {

  try {
    const response = await fetch(`./${JuntaAuxiliar}.geojson`);
    const data = await response.json();

    JuntaAuxiliar = data;
    const capaJuntaAuxiliar = turf.featureCollection(JuntaAuxiliar.features);

    const puntosDataBuscar = turf.featureCollection(dataBuscar.map((item) => {
      let coordenadascase;
      switch (lugar) {
        case 'eventossic':
          coordenadascase = [
              isNaN(parseFloat(item.CoordX))
                  ? -0.0
                  : (parseFloat(item.CoordX) > 0)
                  ? parseFloat(item.CoordY)
                  : parseFloat(item.CoordX),
              isNaN(parseFloat(item.CoordY))
                  ? 0.0
                  : (parseFloat(item.CoordX) > 0)
                  ? parseFloat(item.CoordX)
                  : parseFloat(item.CoordY),
          ];
          break;
      
        default:
          coordenadascase = [
            isNaN(parseFloat(item.Coordenada_X))
                ? -0.0
                : (parseFloat(item.Coordenada_X) > 0)
                ? parseFloat(item.Coordenada_Y)
                : parseFloat(item.Coordenada_X),
            isNaN(parseFloat(item.Coordenada_Y))
                ? 0.0
                : (parseFloat(item.Coordenada_X) > 0)
                ? parseFloat(item.Coordenada_X)
                : parseFloat(item.Coordenada_Y),
          ];
          break;
      }
      const coordenadas = coordenadascase;
      switch (lugar) {
        case 'inspecciones':
          return turf.point(coordenadas, {
            Id_Inspeccion: item.Id_Inspeccion,
            Nombre: item.Nombre,
            Ap_Paterno: item.Ap_Paterno,
            Ap_Materno: item.Ap_Materno
          });
          break;
        case 'eventossic':
          return turf.point(coordenadas, {
            Folio_Infra: item.Folio_Infra
          });
          break;
      
        default:
          return turf.point(coordenadas, {
            Ficha: item.Ficha,
            No_Remision: item.No_Remision,
            Nombre: item.Nombre,
            Ap_Paterno: item.Ap_Paterno,
            Ap_Materno: item.Ap_Materno
          });
          break;
      }
    }));

    // Almacenar puntos separados por zona
    let puntosPorJuntaAuxiliar = {
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

    let puntosFiltrados = {};
      puntosFiltrados = {
        resultados: []
      };

      switch (lugar) {
        case 'inspecciones':
          if (Array.isArray(puntosPorJuntaAuxiliar.resultados)) {
            dataBuscar.forEach((data) => {
              const coincidencia = puntosPorJuntaAuxiliar.resultados.find((punto) => punto.properties && punto.properties.Id_Inspeccion === data.Id_Inspeccion);
              if (coincidencia) {
                puntosFiltrados.resultados.push(data);
              }
            });
          }
          break;
        case 'eventossic':
          if (Array.isArray(puntosPorJuntaAuxiliar.resultados)) {
            dataBuscar.forEach((data) => {
              const coincidencia = puntosPorJuntaAuxiliar.resultados.find((punto) => punto.properties && punto.properties.Folio_Infra === data.Folio_Infra);
              if (coincidencia) {
                puntosFiltrados.resultados.push(data);
              }
            });
          }
          break;
        default:
          if (Array.isArray(puntosPorJuntaAuxiliar.resultados)) {
            dataBuscar.forEach((data) => {
              const coincidencia = puntosPorJuntaAuxiliar.resultados.find((punto) => punto.properties && punto.properties.No_Remision === data.No_Remision);
              if (coincidencia) {
                puntosFiltrados.resultados.push(data);
              }
            });
          }
          break;
      }
      
    return puntosFiltrados;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
