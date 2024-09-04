import * as turf from "@turf/turf";
export const PuntosEnPoligonoPer = async (poligono, datosHechos,datosDomicilio,datosDetencion,datosInspecciones,datosSicEventos,datosPuntosIdentificados,datosAltoImpacto) => {
    console.log('ENTRO A LA FUNCION DE PERSONALIZADDO ',{datosAltoImpacto});
    const puntosHechos = turf.featureCollection(
      datosHechos.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.Coordenada_X))
            ? -0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_Y)
                : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_X)
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
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_Y)
                : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_X)
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
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_Y)
                : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_X)
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
    const puntosInspecciones = turf.featureCollection(
        datosInspecciones.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.Coordenada_X))
            ? -0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_Y)
                : parseFloat(item.Coordenada_X),
          isNaN(parseFloat(item.Coordenada_Y))
            ? 0.0
            : (parseFloat(item.Coordenada_X)>0)
                ? parseFloat(item.Coordenada_X)
                : parseFloat(item.Coordenada_Y),
        ];
  
        return turf.point(coordenadas, {
          Id_Inspeccion: item.Id_Inspeccion,
          Nombre: item.Nombre,
          Ap_Paterno: item.Ap_Paterno,
          Ap_Materno: item.Ap_Materno,
        });
      })
    );
    const puntosSicEventos = turf.featureCollection(
        datosSicEventos.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item.CoordX))
            ? -0.0
            : (parseFloat(item.CoordX)>0)
                ? parseFloat(item.CoordY)
                : parseFloat(item.CoordX),
          isNaN(parseFloat(item.CoordY))
            ? 0.0
            : (parseFloat(item.CoordX)>0)
                ? parseFloat(item.CoordX)
                : parseFloat(item.CoordY),
        ];
  
        return turf.point(coordenadas, {
          Folio_Infra: item.Folio_infra
        });
      })
    );
    const puntosPuntosIdentificados = turf.featureCollection(
      datosPuntosIdentificados.map((item) => {
        const coordenadas = [
          isNaN(parseFloat(item["COORDENADAS X"]))
            ? -0.0
            : (parseFloat(item["COORDENADAS X"])>0)
                ? parseFloat(item["COORDENADAS Y"])
                : parseFloat(item["COORDENADAS X"]),
          isNaN(parseFloat(item["COORDENADAS Y"]))
            ? 0.0
            : (parseFloat(item["COORDENADAS X"])>0)
                ? parseFloat(item["COORDENADAS X"])
                : parseFloat(item["COORDENADAS Y"]),
        ];
  
        return turf.point(coordenadas, {
          Folio: item["FOLIO"],
          Fuente: item["FUENTE"],
          Delito: item["DELITO ASOCIADO"],
          Banda: item["NOMBRE DE LA BANDA"],
          Objetivo: item["OBJETIVO"],
        });
      })
    );
    const puntosAltoImpacto = turf.featureCollection(
      datosAltoImpacto.map((item) => {
        const coordenadas = [
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
        return turf.point(coordenadas, {
          id: item.Id_Punto,
          narrativa: item.Narrativa,
          remision: item.Remision,
        });
      })
    );
    // Almacenar puntos separados por zona
    console.log({puntosAltoImpacto})
    let puntosPorPoligonoPer = {
      hechos: [],
      domicilio:[],
      detencion:[],
      inspecciones:[],
      siceventos:[],
      puntosidentificados:[]
    };
  
    //console.log("tratados ", puntosHechos);
    const puntosEnPoligonoPer = turf.pointsWithinPolygon(puntosHechos, poligono);
    const puntosEnPoligonoPerDom = turf.pointsWithinPolygon(puntosDomicilio, poligono);
    const puntosEnPoligonoPerDet = turf.pointsWithinPolygon(puntosDetencion, poligono);
    const puntosEnPoligonoPerInsp = turf.pointsWithinPolygon(puntosInspecciones, poligono);
    const puntosEnPoligonoPerSicEv = turf.pointsWithinPolygon(puntosSicEventos, poligono);
    const puntosEnPoligonoPerPuntIden = turf.pointsWithinPolygon(puntosPuntosIdentificados, poligono);
    const puntosAltoImpactoPer = turf.pointsWithinPolygon(puntosAltoImpacto, poligono);
    console.log('DESPUES DEL TURF:',{ puntosAltoImpactoPer})
    console.log('linea 38:', puntosEnPoligonoPerPuntIden.features);
  
    let puntosFiltrados = {
      hechos: [],
      domicilio: [],
      detencion:[],
      inspecciones:[],
      siceventos:[],
      puntosidentificados:[],
      altoimpacto:[]
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
    puntosEnPoligonoPerInsp.features.forEach((punto) => {
    const coincidencia = datosInspecciones.find((data) => {
        return punto.properties.Id_Inspeccion === data.Id_Inspeccion;
    });
    if (coincidencia) {
        puntosFiltrados.inspecciones.push(coincidencia);
    }
    });
    puntosEnPoligonoPerSicEv.features.forEach((punto) => {
    const coincidencia = datosSicEventos.find((data) => {
        return punto.properties.Folio_Infra === data.Folio_infra;
    });
    if (coincidencia) {
        puntosFiltrados.siceventos.push(coincidencia);
    }
    });
    puntosEnPoligonoPerPuntIden.features.forEach((punto) => {
      const coincidencia = datosPuntosIdentificados.find((data) => {
          return punto.properties.Folio === data.FOLIO;
      });
      if (coincidencia) {
          puntosFiltrados.puntosidentificados.push(coincidencia);
      }
      });
      puntosAltoImpactoPer.features.forEach((punto) => {
      const coincidencia = datosAltoImpacto.find((data) => {
          return punto.properties.id == data.Id_Punto;
      });
      if (coincidencia) {
          console.log('COINCIDENCIA: ',coincidencia);
          puntosFiltrados.altoimpacto.push(coincidencia);
      }
      });

    console.log(puntosFiltrados);
    return puntosFiltrados;
  };
  
