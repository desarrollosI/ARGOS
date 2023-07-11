/*
      Helper cuya funcion es recibir un arreglo con la informacion que se requiere
      para la expotacion de determinado filtro a excel
*/

// Se importa la biblioteca encargada de generar los archivos excel
import * as XLSX from 'xlsx';
// Se importa el helper para el manejo del historial


// la funcion que se exporta  recibe la informacion que se plasmara en el excel
// asi como la inofrmacion para ingresar en el historial del argos
export const capasToExcel = ({hechos,domicilio,detencion}) => {

      console.log(hechos,domicilio,detencion)
      const fields = Object.keys(hechos[0]);
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(hechos, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Mapa_Hechos"); //sheet name

      const ws1 = XLSX.utils.json_to_sheet(domicilio, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws1, "Resultrados_Mapa_Domicilio"); //sheet name

      const ws2 = XLSX.utils.json_to_sheet(detencion, { header: fields }); // sheet
      XLSX.utils.book_append_sheet(wb, ws2, "Resultrados_Mapa_Detencion"); //sheet name
      insertHistorial({lugar:'Geoanalisis',tipo:'Exportacion CSV', descripcion:'Exportacion datos de un poligono predeterminado'});

      XLSX.writeFile(wb, "Resultados_Mapa.xlsx");
}