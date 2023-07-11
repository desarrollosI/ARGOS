// Se importa la biblioteca encargada de generar los archivos excel
import * as XLSX from 'xlsx';
import { insertHistorial } from '../../../helpers/insertHistorial';
// Se importa el helper para el manejo del historial


// la funcion que se exporta  recibe la informacion que se plasmara en el excel
// asi como la inofrmacion para ingresar en el historial del argos
export const capasPerToExcel = ({hechos,detencion,domicilio}) => {

      const fields = [ 'No_Remision','Fecha_Hora','Nombre','Ap_Paterno','Ap_Materno','Edad','Genero','Escolaridad','Fecha_Registro_Detenido',	'Id_Domicilio','Lugar_Origen','Fecha_Nacimiento','Ficha','Falta_Delito_Tipo','Status_Remision','Folio_911','Averiguacion_Previa','Instancia','Tipo','Colonia','Calle_1','No_Ext','CP','Municipio','Faltas_Delitos_Detenido','Alias_Detenido','Negocio_Afectado','Zona','Vector','Coordenada_X','Coordenada_Y']
      
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(hechos, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Mapa_Hechos"); //sheet name

      const ws1 = XLSX.utils.json_to_sheet(domicilio, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws1, "Resultrados_Mapa_Domicilio"); //sheet name

      const ws2 = XLSX.utils.json_to_sheet(detencion, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws2, "Resultrados_Mapa_Detencion"); //sheet name
      insertHistorial({lugar:'Geoanalisis',tipo:'Exportacion CSV', descripcion:'Exportacion datos de poligono personalizado'});

      XLSX.writeFile(wb, "Resultados_Mapa.xlsx");
}