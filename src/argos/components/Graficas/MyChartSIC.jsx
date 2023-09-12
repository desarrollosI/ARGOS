/* Este componente queda aislado a base de datos SIC
*/
/*
  Tipos de graficas:
  1- controles de agrupacion, ver uno en especifico
  2. sin controles de agrupacion, ver uno en especifico, asendente o desendente
  3. sin controles, solo rango de fechas
*/ 

import React, { useEffect,useState } from 'react';
//Se importan los componentes personalizados
import { CheckSelect, DateRangePicker, GroupBySelector, GroupBySelectorSIC, SpecifyGroupBySelector, SpecifyOrderBySelector } from './';
//Se importa nuestro adaptador hacia el backend
import { graficasApi } from '../../../api';
//Se importan los helpers necesarios
import { dataToExcel, tratarInformacion, tratarInformacionSIC } from '../../helpers';
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
import { insertHistorial } from '../../../helpers/insertHistorial';
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


export function MyChartSIC({configuracion}) {
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

    const [opcionesZona, setOpcionesZona] = useState([
      "CENTRO HISTÓRICO",
      "ZONA 1",
      "ZONA 10",
      "ZONA 2",
      "ZONA 3",
      "ZONA 4",
      "ZONA 5",
      "ZONA 6",
      "ZONA 7",
      "ZONA 8",
      "ZONA 9"
  ])

    const [opcionesViolencia, setOpcionesViolencia] = useState([
      "CON VIOLENCIA",
      "SIN VIOLENCIA"
  ])

    const [opcionesTipoViolencia, setOpcionesTipoViolencia] = useState([
      "AMAGUE VERBAL",
      "ARMA BLANCA(PUNZOCORTANTE)",
      "ARMA CONTUNDENTE",
      "ARMA DE FUEGO",
      "EN AUSENCIA",
      "FALTA ADMINISTRATIVA",
      "FÍSICA"
  ])


  const [opcionesHora, setOpcionesHora] = useState([
    "0-HR",
    "1-HR",
    "2-HR",
    "3-HR",
    "4-HR",
    "5-HR",
    "6-HR",
    "7-HR",
    "8-HR",
    "9-HR",
    "10-HR",
    "11-HR",
    "12-HR",
    "13-HR",
    "14-HR",
    "15-HR",
    "16-HR",
    "17-HR",
    "18-HR",
    "19-HR",
    "20-HR",
    "21-HR",
    "22-HR",
    "23-HR"
])

  const [opcionesDia, setopcionesDia] = useState([
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO"
  ])

  const [opcionesVector, setOpcionesVector] = useState([
    "CH-01","CH-02","CH-03","CH-04","CH-05","CH-06","CH-07","CH-08","CH-09","CH-10","CH-11","CH-12","CH-13","CH-14","CH-15","CH-16","CH-17","VP-101","VP-102","VP-103","VP-104","VP-105","VP-106","VP-107","VP-108","VP-109","VP-110","VP-111","VP-112","VP-113","VP-114","VP-115","VP-116","VP-117","VP-118","VP-201","VP-202","VP-203","VP-204","VP-205","VP-206","VP-207","VP-208","VP-209","VP-210","VP-211","VP-212","VP-213","VP-214","VP-215","VP-216","VP-217","VP-301","VP-302","VP-303","VP-304","VP-305","VP-306","VP-307","VP-308","VP-309","VP-310","VP-311","VP-312","VP-313","VP-314","VP-315","VP-316","VP-317","VP-318","VP-319","VP-320","VP-321","VP-322","VP-323","VP-324","VP-401","VP-402","VP-403","VP-404","VP-405","VP-406","VP-407","VP-408","VP-409","VP-410","VP-411","VP-412","VP-413","VP-414","VP-415","VP-416","VP-417","VP-418","VP-419","VP-501","VP-502","VP-503","VP-504","VP-505","VP-506","VP-507","VP-508","VP-509","VP-510","VP-511","VP-512","VP-513","VP-514","VP-515","VP-516","VP-517","VP-518","VP-519","VP-520","VP-521","VP-601","VP-602","VP-603","VP-604","VP-605","VP-606","VP-607","VP-608","VP-609","VP-610","VP-611","VP-612","VP-613","VP-614","VP-615","VP-616","VP-617","VP-701","VP-702","VP-703","VP-704","VP-705","VP-706","VP-707","VP-708","VP-709","VP-710","VP-711","VP-712","VP-713","VP-714","VP-715","VP-716","VP-717","VP-718","VP-719","VP-720","VP-801","VP-802","VP-803","VP-804","VP-805","VP-806","VP-807","VP-808","VP-809","VP-810","VP-811","VP-812","VP-813","VP-814","VP-815","VP-816","VP-817","VP-818","VP-819","VP-901","VP-902","VP-903","VP-904","VP-905","VP-906","VP-907","VP-908","VP-909","VP-910","VP-911","VP-912","VP-913","VP-914","VP-915","VP-916","VPN-01","VPN-02","VPN-03","VPN-04","VPN-05","VPN-06","VPN-07","VPN-08","VPN-09","VPN-10","VPN-11","VPN-12","VPN-13","VPN-14","VPN-15","VPN-16"
  ])



    const [selectedOption, setSelectedOption] = useState();

    const [dataResCSV, setDataResCSV] = useState();
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
      setSelectedOption()
      setAgrupacion(event.target.value);
    };

    const handleSpecifyAgrupacionChange = (event) => {
      setSpecifyAgrupacion(event.target.value);
    };

    const  handeSpecifyOrderByChange = (event) => {
      setSpecifyOrderBy(event.target.value);
    }

    const handleGenerateCSV = async (endpoint) => {
      const {data} = await graficasApi.post(endpoint+'-csv',{fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,selectedOption,SpecifyOrderBy})
      dataToExcel(data.data.Remisiones,{lugar:'Estádistica',tipo: 'Exportación Excel', base: endpoint+'-csv', filtros: {fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,selectedOption,SpecifyOrderBy}})
    }

    const fetchData = async(endpont) => {
        setIsLoadingData(true);
        insertHistorial({lugar:'Estádistica',tipo:'Petición de información',endpoint,fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion})
        console.log('LE ESTOY MANDANDO AL BACKEND: ',endpont,{fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,selectedOption,SpecifyOrderBy})
        const {data} =  await graficasApi.post(endpont,{fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,selectedOption,SpecifyOrderBy});
        console.log('EL BACKEND ME REGRESA: ',data.data.Remisiones )
        setFetchedData(data.data.Remisiones);
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
    }, [fechaInicio,fechaFin,agrupacionData,SpecifyAgrupacion,SpecifyOrderBy,selectedOption])

    useEffect(() => {
      if ( isLoadingData ) {
        //Swal.fire('Haciendo Consulta', 'Paciencia se esta procesando la información', 'info');
      }    
      if( !isLoadingData ){
        Swal.close();
      }
    }, [isLoadingData])

    let opciones = [];

    switch (agrupacionData) {
      case 'Tipo_Violencia':
        opciones = opcionesTipoViolencia.map((item) => ({ value: item, label: item }));
        break;
      case 'Zona':
        opciones = opcionesZona.map((item) => ({ value: item, label: item }));
        break;
      case 'Hora_trunca':
        opciones = opcionesHora.map((item) => ({ value: item, label: item }));
        break;
      case 'Dia_semana':
        opciones = opcionesDia.map((item) => ({ value: item, label: item }));
        break;
      case 'Vector':
        opciones = opcionesVector.map((item) => ({ value: item, label: item }));
        break;
      default:
        opciones = opcionesViolencia.map((item) => ({ value: item, label: item }));
        break;
    }
    
      


    //TODO realizar el useEffect necesario para altenar entre tipo de grafica

    const ChartComponent = chartComponents[tipoGrafica];
    
    // Llamamos a la función tratarInformacion y almacenamos el resultado en una variable
    const totalRegistros = fetchedData ? tratarInformacionSIC(
      tipoGrafica,
      fetchedData,
      'CANTIDAD DE EVENTOS',
      x,
      y,
      agrupacionData,
      SpecifyAgrupacion,
      etiquetaEjeX
    ) : null;

    if(!isLoadingData){
        
        return (
           <>
           <div className="row">
             <div className="col-md-4">
               <button 
                 className='btn btn-primary mt-2'
                 onClick={() => handleGenerateCSV(endpoint)}>
                   Exportar
               </button>
             </div>
           </div>
           <div className="row">
             {totalRegistros && <p><strong>Total de registros: {totalRegistros.totalRegistros}</strong></p>}
           </div>
           <div className="row my-3">
   
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
                data={totalRegistros }
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
               avanzada == 1 && <GroupBySelectorSIC agrupacion={agrupacionData} handleAgrupacionChange={handleAgrupacionChange} />
             }
             {
               (agrupacion!='SD') && 
               (!isLoadingData) && 
               (avanzada == 1) &&
   
                           <>
                             <CheckSelect
                               selectedOption={selectedOption}
                               setSelectedOption={setSelectedOption}
                               opciones={opciones}
                             />
                           
                           </>
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
    
}
