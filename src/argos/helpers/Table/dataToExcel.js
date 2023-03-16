import * as XLSX from 'xlsx';

export const dataToExcel = (data) => {

      const fields = Object.keys(data[0]);
  
      const wb = XLSX.utils.book_new(); // book
      const ws = XLSX.utils.json_to_sheet(data, { header: fields }); // sheet
  
      XLSX.utils.book_append_sheet(wb, ws, "Resultrados_Filtrados"); //sheet name
      XLSX.writeFile(wb, "Resultados.xlsx");
}