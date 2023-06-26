import * as turf from '@turf/turf';

export const PuntosEnZona = async (vectores, dataBuscar, zonaGeneral, lugar ) => {

    console.log('entro en la funcion : ',vectores, dataBuscar, zonaGeneral, lugar)
  try {
    const response = await fetch('./195_VECTORES.geojson');
    const data = await response.json();

    vectores = data;
    const capaVectores = turf.featureCollection(vectores.features);

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

    console.log('Cantidad de polígonos (vectores):', capaVectores.features.length);

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
        
        if (puntosPorZona[zona].resultados) {
          puntosPorZona[zona].resultados.push(...puntosEnPoligonoDataBuscar.features);
        }
      });

    console.log('RESULTADOS:', puntosPorZona);

    if (zonaGeneral === 'todas') {
      //console.log('voy a regresar por todas las zonas', puntosPorZona);
      return puntosPorZona;
    } else {
      //console.log('voy a regresar de una zona especifica: ', puntosPorZona[zonaGeneral]);
    let puntosFiltrados = {};
      puntosFiltrados[zonaGeneral] = {
        resultados: []
      };

      dataBuscar.forEach((data) => {
        
        if (puntosPorZona[zonaGeneral]) {
          const coincidencia = puntosPorZona[zonaGeneral].resultados.find((punto) => punto.properties.No_Remision === data.No_Remision);
          if (coincidencia) {
            puntosFiltrados[zonaGeneral].resultados.push(data);
          }
        }
      });
  
     
      //console.log('PUNTOS FILTRADOS A MANDAR', puntosFiltrados)
    return puntosFiltrados[zonaGeneral];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
