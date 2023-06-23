import { getRandomColor } from "./getRandomColor";

/* 
  Esta funcion tiene de objetivo de recibir la informacion obtenida de de la base de datos,
  especificar de dicha informacion que campos van a ser los ejes de la grafca, con dichos ejes tratar y pasar la informacion
  para poder crear los dataSets, con los data sets se generan las graficas.
*/
export const tratarInformacion = (tipo,data,label,x,y,agrupacion,SpecifyAgrupacion,etiquetaSeleccionada) => {
    console.log('agrupado por :', x)
    console.log('etiqueta seleccionada', etiquetaSeleccionada)
    let etiqueta = (etiquetaSeleccionada != '') ? etiquetaSeleccionada: x;
    let sets = y.split(',')
    let datasetsGenerados = [];
    
    datasetsGenerados = sets.map(set => {
      let colores = (sets.length > 1) ? getRandomColor() : data.map(item => getRandomColor())//si solo hay un data set, generame un color random c/u cols, si no solo un color para cada dataset 
      let newDataSet = {
        label: set,
        data: data.map(item => item[set]),
        borderColor: colores,
        backgroundColor: colores
      }
      return newDataSet;
    })
    
    console.log('desde el helper ', SpecifyAgrupacion);

    let etiquetas = ['Remisiones totales']
    if(data.length > 1){      
      if(etiquetaSeleccionada != ''){
        etiquetas = data.map(item => item[etiquetaSeleccionada])
        console.log('if de etiqueta seleccionada, ',etiquetas )
      }else{
        etiquetas = data.map(item => item[agrupacion])
      }
    }else{
      etiquetas = ['Remisiones totales']
      if(SpecifyAgrupacion != 'todas'){
        etiquetas = [SpecifyAgrupacion]
      }
    }
  
    console.log('ETIQUETAS:',etiquetas);
    const dataResultado = {
      labels:  etiquetas,
      datasets: datasetsGenerados.map(dataSet => dataSet)
    }
  
    return dataResultado;
  }