import React, { useEffect,useState } from 'react';
//Se importa nuestro adaptador hacia el backend
import { graficasApi } from '../../../api';
//Se importan los helpers necesarios
import { getRandomColor } from '../../helpers/Graficas/getRandomColor';
//Se importan las bibliotecas y componentes de terceros
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar,Line,Radar,Doughnut } from 'react-chartjs-2';
//Se inicializa la grafica diciendole que elementos va a tener
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

//Se inicializa una constante con opciones especificas para la grafica.
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
/* 
  Esta funcion tiene de objetivo de recibir la informacion obtenida de de la base de datos,
  especificar de dicha informacion que campos van a ser los ejes de la grafca, con dichos ejes tratar y pasar la informacion
  para poder crear los dataSets, con los data sets se generan las graficas.
*/
const tratarInformacion = (tipo,data,label,x,y,agrupacion) => {
  console.log('agrupado por :', x)
  let etiqueta = x;
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
  

  const dataResultado = {
    labels:  (data.length > 1) ? data.map(item => item[agrupacion]): ['Remisiones totales'],
    datasets: datasetsGenerados.map(dataSet => dataSet)
  }

  return dataResultado;
}

export function MyChart({tipo,endpoint,titulo,x,y}) {
    // console.log('inicio: ', fechaInicio, 'final: ', fechaFin);
    const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
    const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
    const [fechaInicio, setFechaInicio] = useState('2021-06-24')
    const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])
    const [agrupacion, setAgrupacion] = useState()
    //Esta función se dispara gracias al efecto, pone en estado de carga de infotmacion
    //hace la peticion al adaptador por la información y espera la informacion
    //cuando la informacion es recibida, se guarda la informacion en el estado y se sale del estdio de carga 


    const handleStartDateChange = (event) => {
      setFechaInicio(event.target.value);
    };

    const handleEndDateChange = (event) => {
      setFechaFin(event.target.value);
    };

    const handleAgrupacionChange = (event) => {
      setAgrupacion(event.target.value);
    };

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await graficasApi.post(endpont,{fechaInicio,fechaFin,agrupacion});
        console.log(data.data.Remisiones)
        setFetchedData(data.data.Remisiones);
        setIsLoadingData(false);
    }

    useEffect(() => {
        fetchData(endpoint)
    }, [fechaInicio,fechaFin,agrupacion])

    return (
        <>

        {
          tipo === 'barra' && !isLoadingData && (
            <Bar
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins.title,
                    text: `${titulo} - REGISTROS: ${fetchedData.length}`
                  }
                }
              }}
              data={tratarInformacion(tipo,fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacion)}
            />
          )
        }

        { 
          tipo === 'area' && !isLoadingData && (
            <Line
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins.title,
                    text: `${titulo} - REGISTROS: ${fetchedData.length}`
                  }
                }
              }}
              data={tratarInformacion(tipo,fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacion)}
            />
          )
        }

        { 
          tipo === 'radar' && !isLoadingData && (
            <Radar
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins.title,
                    text: `${titulo} - REGISTROS: ${fetchedData.length}`
                  }
                }
              }}
              data={tratarInformacion(tipo,fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacion)}
            />
          )
        }

        { 
          tipo === 'dona' && !isLoadingData && (
            <Doughnut
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins.title,
                    text: `${titulo} - REGISTROS: ${fetchedData.length}`
                  }
                }
              }}
              data={tratarInformacion(tipo, fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacion)}
            />
          )
        }
        
      <div className="row">
        <div className="col-md-6">
          <div class="form-group">
            <label htmlFor="start">Fecha inicio:</label>
            <input
              className="form-control"
              type="date"
              id="start"
              name="trip-start"
              defaultValue={fechaInicio}
              min={fechaInicio}
              max={(new Date()).toISOString().split('T')[0]}
              onChange={handleStartDateChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div class="form-group">
            <label htmlFor="end">Fecha Fin:</label>
            <input
              className="form-control"
              type="date"
              id="end"
              name="trip-end"
              defaultValue={fechaFin}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      </div>
      

      <div className="row mt-2">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="agrupar">Agrupar por :</label>
            <div onChange={handleAgrupacionChange} className='form-check form-check-inline'>
              <input className="form-check-input" type="radio" value="Instancia" name="agrupar" />
              <label className="form-check-label" >Instancia</label>
            </div>
            <div onChange={handleAgrupacionChange} className='form-check form-check-inline'>
              <input className="form-check-input" type="radio" value="Zona" name="agrupar" />
              <label className="form-check-label" >Zona</label>
            </div>
            <div onChange={handleAgrupacionChange} className='form-check form-check-inline'>
              <input className="form-check-input" type="radio" value="SD" name="agrupar" />
              <label className="form-check-label" >Sin Agrupar</label>
            </div>
          </div>
        </div>
      </div>
      </>
    );
    
}
