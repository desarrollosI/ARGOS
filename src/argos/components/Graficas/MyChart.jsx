import React, { useEffect,useState } from 'react';
//Se importan los componentes personalizados
import { DateRangePicker, GroupBySelector } from './';
//Se importa nuestro adaptador hacia el backend
import { graficasApi } from '../../../api';
//Se importan los helpers necesarios
import { tratarInformacion } from '../../helpers';
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

const chartComponents = {
  barra: Bar,
  area: Line,
  radar: Radar,
  dona: Doughnut,
};

//Se inicializa una constante con opciones especificas para la grafica.
const chartOptions = {
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

    const ChartComponent = chartComponents[tipo];
    return (
        <>

        {ChartComponent && !isLoadingData && (

          <ChartComponent
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: `${titulo} - REGISTROS: ${fetchedData.length}`,
                },
              },
            }}
            data={tratarInformacion(tipo, fetchedData, 'CANTIDAD DE REMSIONES', x, y, agrupacion)}
          />
        )}

        
        <DateRangePicker
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        />
      

        <GroupBySelector handleAgrupacionChange={handleAgrupacionChange} />
      </>
    );
    
}
