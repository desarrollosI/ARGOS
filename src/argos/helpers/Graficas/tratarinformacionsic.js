import { getRandomColor } from "./getRandomColor";

/* 
  Esta funcion tiene de objetivo de recibir la informacion obtenida de de la base de datos,
  especificar de dicha informacion que campos van a ser los ejes de la grafca, con dichos ejes tratar y pasar la informacion
  para poder crear los dataSets, con los data sets se generan las graficas.
*/
export const tratarInformacionSIC = (tipo,data,label,x,y,agrupacion,SpecifyAgrupacion,etiquetaSeleccionada) => {
    
    let etiqueta = (etiquetaSeleccionada != '') ? etiquetaSeleccionada: x;
    let sets = y.split(',')
    let datasetsGenerados = [];
    
    datasetsGenerados = sets.map(set => {
      let colores = (sets.length > 1) ? getRandomColor() : data.map(item => getRandomColor())//si solo hay un data set, generame un color random c/u cols, si no solo un color para cada dataset 
      let newDataSet = {
        label: set,
        data: data.map(item => parseInt(item[set])),
        borderColor: colores,
        backgroundColor: colores
      }
      return newDataSet;
    })
    //console.log('desde el helper ', SpecifyAgrupacion);

    let etiquetas = ['Eventos Totales']
    if(data.length > 1){      
      if(etiquetaSeleccionada != ''){
        etiquetas = data.map(item => item[etiquetaSeleccionada])
        //console.log('if de etiqueta seleccionada, ',etiquetas )
      }else{
        etiquetas = data.map(item => item[agrupacion])
      }
    }else{
      etiquetas = ['Eventos Totales']
      if(SpecifyAgrupacion != 'todas'){
        etiquetas = [SpecifyAgrupacion]
      }
    }
    let sumaTotal = 0;
    console.log('DATAASETS GENERADOS: ',datasetsGenerados)
    datasetsGenerados.map(dataSet => {
      dataSet.data.map( valor => {
        sumaTotal+=(isNaN(Number(valor)))? 0:Number(valor);
      })
    });
    console.log('SUMA TOTALES', sumaTotal);
    const dataResultado = {
      labels:  etiquetas,
      datasets: datasetsGenerados.map(dataSet => dataSet)
    }
    
    dataResultado.totalRegistros = sumaTotal;
    console.log('GRAFICA: ', dataResultado)
    return dataResultado;
  }