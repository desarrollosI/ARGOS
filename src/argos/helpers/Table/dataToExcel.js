import * as XLSX from 'xlsx';
import { insertHistorial } from '../../../helpers/insertHistorial';

export const dataToExcel = (data, dataHistorial) => {

      const fields = Object.keys(data[0]);
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(data, { header: fields }); // sheet
  
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Filtrados"); //sheet name
      insertHistorial(dataHistorial);
      XLSX.writeFile(wb, "Resultados.xlsx");
}