/*
      Helper cuya funcion es recibir un arreglo con la informacion que se requiere
      para la expotacion de determinado filtro a excel
*/

// Se importa la biblioteca encargada de generar los archivos excel
import * as XLSX from 'xlsx';
// Se importa el helper para el manejo del historial
import { insertHistorial } from '../../../helpers/insertHistorial';

// la funcion que se exporta  recibe la informacion que se plasmara en el excel
// asi como la inofrmacion para ingresar en el historial del argos
export const dataToExcel = (data, dataHistorial) => {

      const fields = Object.keys(data[0]);
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(data, { header: fields }); // sheet
  
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Filtrados"); //sheet name
      insertHistorial(dataHistorial);
      XLSX.writeFile(wb, "Resultados.xlsx");
}