/*
      Helper cuya funcion es recibir un arreglo con la informacion que se requiere
      para la expotacion de determinado filtro a excel
*/

// Se importa la biblioteca encargada de generar los archivos excel
import * as XLSX from 'xlsx';
import { insertHistorial } from '../../../helpers/insertHistorial';
// Se importa el helper para el manejo del historial


// la funcion que se exporta  recibe la informacion que se plasmara en el excel
// asi como la inofrmacion para ingresar en el historial del argos
export const capasToExcel = ({hechos,domicilio,detencion,inspecciones,siceventos,puntosidentificados}) => {

      //console.log(hechos,domicilio,detencion)
      const fields = Object.keys(hechos[0]);
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(hechos, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Mapa_Hechos"); //sheet name

      const ws1 = XLSX.utils.json_to_sheet(domicilio, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws1, "Resultrados_Mapa_Domicilio"); //sheet name

      const ws2 = XLSX.utils.json_to_sheet(detencion, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws2, "Resultrados_Mapa_Detencion"); //sheet name

      const fieldsInsp = [ 'Id_Inspeccion','Fecha_Hora_Inspeccion','Nombre','Ap_Paterno','Ap_Materno','Coordenada_X','Coordenada_Y']
      const ws3 = XLSX.utils.json_to_sheet(inspecciones, { header: fieldsInsp }); // sheet
      XLSX.utils.book_append_sheet(wb, ws3, "Resultrados_Mapa_Inspecciones"); //sheet name

      const fieldsSicEv = ['Folio_infra','Elemento_Captura','Folio_911','FechaHora_Captura','FechaHora_Recepcion','Zona','Vector','Colonia','Calle','Calle2','NoExt','CP','CoordX','CoordY','CSviolencia','Tipo_Violencia','FechaHora_Activacion','Fuente','Status_Cancelado','Status','Quien_Habilito','Id_Seguimiento','Conteo_Masculinos','Conteo_Femeninas','Conteo_Vehiculos','Status_Evento','ClaveSeguimiento','SeguimientoTerminado','hechos_concat','hechos_concathoras','delitos_concat','delito_giro','responsables_concat','Tipoarma_concat','Tipos_Vehiculos','vehiculos_involucrados','vehiculos_concat','entrevistas_seguimiento_concat','fotos_seguimiento_concat','Dia_semana','Hora_trunca','Hora_trunca2']
      const ws4 = XLSX.utils.json_to_sheet(siceventos, { header: fieldsSicEv }); // sheet
      XLSX.utils.book_append_sheet(wb, ws4, "Resultrados_Mapa_SicEventos"); //sheet name

      const fieldsPI = Object.keys(puntosidentificados[0]);
      const ws5 = XLSX.utils.json_to_sheet(puntosidentificados, { header: fieldsPI }); // sheet
      XLSX.utils.book_append_sheet(wb, ws5, "Resultrados_Puntos"); //sheet name
      insertHistorial({lugar:'Geoanalisis',tipo:'Exportacion CSV', descripcion:'Exportacion datos de un poligono predeterminado'});

      XLSX.writeFile(wb, "Resultados_Mapa.xlsx");
}