import * as turf from '@turf/turf';

export const PuntosEnZona = async (vectores, dataBuscar, zonaGeneral, lugar ) => {

    console.log('entro en la funcion : ',vectores, dataBuscar, zonaGeneral, lugar)
  try {
    const response = await fetch('./capas/195_VECTORES.geojson');
    const data = await response.json();

    vectores = data;
    const capaVectores = turf.featureCollection(vectores.features);

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
        case 'alto-impacto':
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
      //console.log('COORDENADAS: ', coordenadas,lugar);
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
            Folio_Infra: item.Folio_infra
          });
          break;
        
        case 'alto-impacto':
          return turf.point(coordenadas, {
            narrativa: item.Narrativa,
            remision: item.Remision,
            id: item.Id_Punto
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
    const puntosPorZona = {};
    capaVectores.features.forEach((poligono) => {
        const zona = poligono.properties.ZONA;
      
        if (!puntosPorZona[zona]) {
          puntosPorZona[zona] = {
            resultados: []
          };
        }
        
        const puntosEnPoligonoDataBuscar = turf.pointsWithinPolygon(puntosDataBuscar, poligono);
        
        if (puntosEnPoligonoDataBuscar.features.length > 0) {
          if (puntosPorZona[zona].resultados) {
            puntosPorZona[zona].resultados.push(...puntosEnPoligonoDataBuscar.features);
          }
        }
        if (puntosPorZona[zona].resultados) {
          puntosPorZona[zona].resultados.push(...puntosEnPoligonoDataBuscar.features);
        }
      });
      //console.log({puntosPorZona})

    if (zonaGeneral === 'todas') {
      //console.log('voy a regresar por todas las zonas', puntosPorZona);
      return puntosPorZona;
    } else {
      //console.log('voy a regresar de una zona especifica: ', puntosPorZona[zonaGeneral]);
    let puntosFiltrados = {};
      puntosFiltrados[zonaGeneral] = {
        resultados: []
      };

      

      switch (lugar) {
        case 'inspecciones':
          dataBuscar.forEach((data) => {
          
            if (puntosPorZona[zonaGeneral]) {
              const coincidencia = puntosPorZona[zonaGeneral].resultados.find((punto) => punto.properties.Id_Inspeccion === data.Id_Inspeccion);
              if (coincidencia) {
                puntosFiltrados[zonaGeneral].resultados.push(data);
              }
            }
          });
          break;
        case 'eventossic':
          dataBuscar.forEach((data) => {
          
            if (puntosPorZona[zonaGeneral]) {
              const coincidencia = puntosPorZona[zonaGeneral].resultados.find((punto) => punto.properties.Folio_Infra === data.Folio_infra);
              if (coincidencia) {
                puntosFiltrados[zonaGeneral].resultados.push(data);
              }
            }
          });
          break;
        case 'alto-impacto':
          dataBuscar.forEach((data) => {
          
            if (puntosPorZona[zonaGeneral]) {
              //console.log('entre al if de puntos por zona')
              const coincidencia = puntosPorZona[zonaGeneral].resultados.find((punto) =>{
                //console.log('entre al find de coincidencia')
                return punto.properties.id === data.Id_Punto
              });
                //console.log({coincidencia})
                if (coincidencia) {
                  puntosFiltrados[zonaGeneral].resultados.push(data);
              }
            }
          });
          break;
      
        default:
          dataBuscar.forEach((data) => {
          
            if (puntosPorZona[zonaGeneral]) {
              const coincidencia = puntosPorZona[zonaGeneral].resultados.find((punto) => punto.properties.No_Remision === data.No_Remision);
              if (coincidencia) {
                puntosFiltrados[zonaGeneral].resultados.push(data);
              }
            }
          });
          break;
      }
      console.log('PUNTOS FILTRADOS: ', puntosFiltrados)
    return puntosFiltrados[zonaGeneral];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
