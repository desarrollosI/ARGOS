import * as turf from "@turf/turf";
export const PuntosEnPoligonoPer = async (poligono, datosHechos,datosDomicilio,datosDetencion) => {
    console.log('ENTRO A LA FUNCION DE PERSONALIZADDO ',{poligono, datosHechos,datosDomicilio,datosDetencion})
    const puntosHechos = turf.featureCollection(
      datosHechos.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.Coordenada_X))
            ? -0.0
            : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : parseFloat(item.Coordenada_Y),
        ];
  
        return turf.point(coordenadas, {
          Ficha: item.Ficha,
          No_Remision: item.No_Remision,
          Nombre: item.Nombre,
          Ap_Paterno: item.Ap_Paterno,
          Ap_Materno: item.Ap_Materno,
        });
      })
    );
    const puntosDomicilio = turf.featureCollection(
        datosDomicilio.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.Coordenada_X))
            ? -0.0
            : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : parseFloat(item.Coordenada_Y),
        ];
  
        return turf.point(coordenadas, {
          Ficha: item.Ficha,
          No_Remision: item.No_Remision,
          Nombre: item.Nombre,
          Ap_Paterno: item.Ap_Paterno,
          Ap_Materno: item.Ap_Materno,
        });
      })
    );
    const puntosDetencion = turf.featureCollection(
        datosDetencion.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.Coordenada_X))
            ? -0.0
            : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : parseFloat(item.Coordenada_Y),
        ];
  
        return turf.point(coordenadas, {
          Ficha: item.Ficha,
          No_Remision: item.No_Remision,
          Nombre: item.Nombre,
          Ap_Paterno: item.Ap_Paterno,
          Ap_Materno: item.Ap_Materno,
        });
      })
    );
  
    // Almacenar puntos separados por zona
    let puntosPorPoligonoPer = {
      hechos: [],
      domicilio:[],
      detencion:[]
    };
  
    console.log("tratados ", puntosHechos);
    const puntosEnPoligonoPer = turf.pointsWithinPolygon(puntosHechos, poligono);
    const puntosEnPoligonoPerDom = turf.pointsWithinPolygon(puntosDomicilio, poligono);
    const puntosEnPoligonoPerDet = turf.pointsWithinPolygon(puntosDetencion, poligono);
    console.log('linea 38:', puntosEnPoligonoPer.features);
  
    let puntosFiltrados = {
      hechos: [],
      domicilio: [],
      detencion:[]
    };
  
    puntosEnPoligonoPer.features.forEach((punto) => {
      const coincidencia = datosHechos.find((data) => {
        return punto.properties.No_Remision === data.No_Remision;
      });
      if (coincidencia) {
        puntosFiltrados.hechos.push(coincidencia);
      }
    });
    puntosEnPoligonoPerDom.features.forEach((punto) => {
        const coincidencia = datosDomicilio.find((data) => {
          return punto.properties.No_Remision === data.No_Remision;
        });
        if (coincidencia) {
          puntosFiltrados.domicilio.push(coincidencia);
        }
      });
    puntosEnPoligonoPerDet.features.forEach((punto) => {
    const coincidencia = datosDetencion.find((data) => {
        return punto.properties.No_Remision === data.No_Remision;
    });
    if (coincidencia) {
        puntosFiltrados.detencion.push(coincidencia);
    }
    });

    console.log(puntosFiltrados);
    return puntosFiltrados;
  };
  
