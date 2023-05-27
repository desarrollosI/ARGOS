import React, { useEffect,useState } from 'react';
//Se importa nuestro adaptador hacia el backend
import { basesApi } from '../../../api';
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

const data = {
  datasets: [
    {
      label: 'CANTIDAD',
      data: {'SIN CLASIFICAR':'16', 'ADOLESCENTES I.':'292', 'JUEZ DE JUSTICIA CÍVICA':'1552', 'M.P. FEDERAL':'306', 'M.P. FUERO COMÚN':'6946'},
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(150, 120, 132, 0.5)', 'rgba(114, 186, 98, 0.5)', 'rgba(221, 170, 45, 0.5)', 'rgba(100, 120, 220, 0.5)'],
    }
  ],
};

export function MyChart({endpoint,titulo}) {

    const [isLoadingData, setIsLoadingData] = useState(true) //Estado bandera para saber cuando se sigue esperando una respuesta del backend
    const [fetchedData, setFetchedData] = useState();// En este estado se va a almacenar la información proveeida por el backend
    //Esta función se dispara gracias al efecto, pone en estado de carga de infotmacion
    //hace la peticion al adaptador por la información y espera la informacion
    //cuando la informacion es recibida, se guarda la informacion en el estado y se sale del estdio de carga 

    console.log(endpoint)

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        const {data} =  await basesApi.post(endpont);
        console.log('llego hasta el data')
        setFetchedData(data);
        setIsLoadingData(false);
    }

    useEffect(() => {
        fetchData(endpoint)
        console.log(fetchedData)
    }, [])

    return;
    // return <Bar options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: titulo } } }} data={data} />;
}
