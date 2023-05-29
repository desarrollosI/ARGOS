import React, { useEffect,useState } from 'react';
//Se importa nuestro adaptador hacia el backend
import { graficasApi } from '../../../api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


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

const getRandomColor = () =>  {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.5; // Valor fijo para la transparencia

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const tratarInformacion = (data,label,x,y) => {
  // console.log('VALORES: ',Object.values(data),'KEYS: ',Object.values(data))
  let etiqueta = x;
  let sets = y.split(',')
  let datasetsGenerados = [];
  datasetsGenerados = sets.map(set => {
    console.log(set)
    let newDataSet = {
      label: label,
      data: data.map(item => item[set]),
      backgroundColor: data.map(item => getRandomColor())
    }
    console.log('antes de hacer el push del set generado: ', newDataSet);
    return newDataSet;
  })
  console.log('asi luce el consumible: ',datasetsGenerados)
  const dataResultado = {
    labels: data.map(item => item[etiqueta]),
    datasets: datasetsGenerados.map(dataSet => dataSet)
  }
  console.log('el resultado casi final: ', dataResultado);
  return dataResultado;
}

export function MyChart({endpoint,titulo,x,y}) {

    const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
    const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
    //Esta función se dispara gracias al efecto, pone en estado de carga de infotmacion
    //hace la peticion al adaptador por la información y espera la informacion
    //cuando la informacion es recibida, se guarda la informacion en el estado y se sale del estdio de carga 

    console.log(endpoint)

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await graficasApi.post(endpont);
        console.log(data);
        setFetchedData(data.data.Remisiones);
        setIsLoadingData(false);
    }

    useEffect(() => {
        fetchData(endpoint)
        console.log('al final',fetchedData)
    }, [])

    return !isLoadingData && <Bar options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: titulo } } }} data={tratarInformacion(fetchedData,'CANTIDAD DE REMSIONES',x,y)} />;
}
