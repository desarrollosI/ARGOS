/*
  Tipos de graficas:
  1- controles de agrupacion, ver uno en especifico
  2. sin controles de agrupacion, ver uno en especifico, asendente o desendente
  3. sin controles, solo rango de fechas
*/ 

import React, { useEffect,useState } from 'react';
//Se importan los componentes personalizados
import { DateRangePicker, GroupBySelector, SpecifyGroupBySelector, SpecifyOrderBySelector } from './';
//Se importa nuestro adaptador hacia el backend
import { graficasApi } from '../../../api';
//Se importan los helpers necesarios
import { tratarInformacion } from '../../helpers';
//Se importan las bibliotecas y componentes de terceros
import Swal from 'sweetalert2';
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

const chartComponents = {
  barra: Bar,
  area: Line,
  radar: Radar,
  dona: Doughnut,
};

//Se inicializa una constante con opciones especificas para la grafica.
const chartOptions = {
    indexAxis: 'x',
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


export function MyChart({configuracion}) {
    //Des estructuro de la propiedad de configuracion como quiero que luzca la grafica   
    const {tipo,endpoint,titulo,x,y,agrupacion,etiqueta,indexAxis,avanzada} = configuracion;
    console.log({tipo,endpoint,titulo,x,y,agrupacion,etiqueta,avanzada})

    //Estados por defecto, no requeridos en primera insancia como propiedad para poder iniciar la grafica
    const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
    const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
    const [fechaInicio, setFechaInicio] = useState('2021-06-24')
    const [fechaFin, setFechaFin] = useState((new Date()).toISOString().split('T')[0])

    //Estados que almacenan las props de configuracion, para matener independencia y poder realizar la mutacion del componente mediante el hook useEffect
    const [tipoGrafica, setTipoGrafica] = useState(tipo)
    const [agrupacionData, setAgrupacion] = useState(agrupacion)
    const [etiquetaEjeX, setEtiquetaEjeX] = useState(etiqueta); //este estado va  a manejar los label de las columnas del eje x en el caso de que se requiera algo mas que lo generico
    const [SpecifyAgrupacion, setSpecifyAgrupacion] = useState('todas')//aunque este no se pide como prop, se pone aca pues es un estado que muta la grafica
    const [SpecifyOrderBy, setSpecifyOrderBy] = useState('desc')
    //las demas props no  es necesario almacenarlas en estado puesto que no suelen mutar demasiado con respecto a la data de la grafica

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

    const handleSpecifyAgrupacionChange = (event) => {
      setSpecifyAgrupacion(event.target.value);
    };

    const  handeSpecifyOrderByChange = (event) => {
      setSpecifyOrderBy(event.target.value);
    }

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        // setAgrupacion(agrupacion);
        console.log('LINEA 101: ',endpont,{fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion})
        const {data} =  await graficasApi.post(endpont,{fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,SpecifyOrderBy});
        console.log(data.data.Remisiones)
        setFetchedData(data.data.Remisiones);
        // setEtiquetaEjeX(etiqueta);
        setIsLoadingData(false);
    }

    useEffect(() => {
      setEtiquetaEjeX(etiqueta)
    },[])
    
    useEffect(() => {
        setSpecifyAgrupacion('todas')
    },[agrupacionData])

    useEffect(() => {
        fetchData(endpoint)
    }, [fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,SpecifyOrderBy])

    useEffect(() => {
      if ( isLoadingData ) {
        Swal.fire('Haciendo Consulta', 'Paciencia se esta procesando la información', 'info');
      }    
      if( !isLoadingData ){
        Swal.close();
      }
    }, [isLoadingData])

    //TODO realizar el useEffect necesario para altenar entre tipo de grafica

    const ChartComponent = chartComponents[tipoGrafica];
    return (
        <>
        <div className="my-3">

          {ChartComponent && !isLoadingData && (

            <ChartComponent
              options={{
                ...chartOptions,
                indexAxis:indexAxis,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: `${titulo}`,
                  },
                },
              }}
              data={tratarInformacion(tipoGrafica, fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacionData,SpecifyAgrupacion,etiquetaEjeX)}
            />
          )}

          
          <DateRangePicker
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          />
          {/* Controles personalizados para cada tipo de grafica  
            /*
            Tipos de graficas:
            1- controles de agrupacion, ver uno en especifico
            2. sin controles de agrupacion, ver uno en especifico, asendente o desendente
            3. sin controles, solo rango de fechas
          */}
          {
            avanzada == 1 && <GroupBySelector agrupacion={agrupacionData} handleAgrupacionChange={handleAgrupacionChange} />
          }
          {
            (agrupacion!='SD') && 
            (!isLoadingData) && 
            (avanzada == 1) &&
                          <SpecifyGroupBySelector 
                          handleSpecifyAgrupacionChange={handleSpecifyAgrupacionChange} 
                          opciones={
                            (etiquetaEjeX != '') 
                              ? fetchedData.map(item => item[etiquetaEjeX]) 
                              : fetchedData.map(item => item[agrupacionData])
                            }
                            />
          }
          {
            (!isLoadingData) &&
            (avanzada == 2) &&
                          <SpecifyOrderBySelector
                          handeSpecifyOrderByChange={handeSpecifyOrderByChange}
                          />
          }
        </div>

      </>
    );
    
}
