import React, { useEffect, useState } from 'react';
import { buscadorGeneralApi } from '../api';
import { TableConstructor } from '../argos/components/Table';
import Swal from 'sweetalert2';

const useGeneralSearchControls = () => {
  const [DataResultadoBusquedaGeneral, setDataResultadoBusquedaGeneral] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [lugarSearch, setLugarSearch] = useState('');
  const [tablasResultado, setTablasResultado] = useState([]);

  const fetchData = async (endpoint, objeto, lugar) => {
    try {
      setIsLoadingData(true);
      const response = await buscadorGeneralApi.post(endpoint, { ...objeto });
      if (response.status === 200) {
        setDataResultadoBusquedaGeneral(response.data.data);
        generarTablas(lugar);
        setIsLoadingData(false);
      } else {
        console.log(response);
      }
    } catch (error) {
      Swal.fire('Incorrecto', 'La búsqueda fue demasiado general, llene más campos', 'error');
    }
  };

  const GenerateObject = (objeto, lugar) => {
    setLugarSearch(lugar);
    switch (lugar) {
      case 'nombre':
        fetchData('/busqueda-nombre-general', objeto, lugar);
        break;
      case 'direccion':
        fetchData('/busqueda-direccion-general', objeto, lugar);
        break;
      case 'alias':
        fetchData('/busqueda-alias-general', objeto, lugar);
        break;
      case 'placaniv':
        fetchData('/busqueda-placaniv-general', objeto, lugar);
        break;
      case 'telefono':
        fetchData('/busqueda-telefono-general', objeto, lugar);
        break;
      default:
        break;
    }
  };

  const generarTablas = (lugar) => {
    let newTablasResultado = [];
  
    switch (lugar) {
      case 'nombre':
        //console.log('si entre al caso de nombre')
      
        // Verifica si Remisiones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Remisiones && DataResultadoBusquedaGeneral.Remisiones.length > 0) {
          newTablasResultado.push(
            <div key="remisiones">
                <div className="row mb-4">
                    <h3 className="titulo">Remisiones</h3>
                </div>
              <TableConstructor lugar={'Detenido: Datos Personales'} datos={{ Remisiones:DataResultadoBusquedaGeneral.Remisiones }} />
              {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
            </div>
          );
        }
      
        // Verifica si Inspecciones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Inspecciones && DataResultadoBusquedaGeneral.Inspecciones.length > 0) {
           newTablasResultado.push(
             <div key="inspecciones">
                <div className="row mb-4">
                    <h3 className="titulo">Inspecciones</h3>
                </div>
               <TableConstructor lugar={'Inspecciones: Personas Inspeccionadas General'} datos={{ Inspecciones:DataResultadoBusquedaGeneral.Inspecciones }} />
               {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
             </div>
           );
        }
    
        // Verifica si Historico está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Historico && DataResultadoBusquedaGeneral.Historico.length > 0) {
            newTablasResultado.push(
              <div key="historico">
                <div className="row mb-4">
                    <h3 className="titulo">Historico</h3>
                </div>
                <TableConstructor lugar={'Historico: Datos Generales'} datos={{ Historico:DataResultadoBusquedaGeneral.Historico }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
        }
    
        // Verifica si Incidencia está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Incidencia && DataResultadoBusquedaGeneral.Incidencia.length > 0) {
            newTablasResultado.push(
              <div key="incidencia">
                <div className="row mb-4">
                    <h3 className="titulo">Incidencia</h3>
                </div>
                <TableConstructor lugar={'Incidencia Delictiva: Personas'} datos={{ Incidencia:DataResultadoBusquedaGeneral.Incidencia }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
        }
        
        // Verifica si Alertas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Alertas && DataResultadoBusquedaGeneral.Alertas.length > 0) {
            newTablasResultado.push(
                <div key="alertas">
                <div className="row mb-4">
                    <h3 className="titulo">Alertas</h3>
                </div>
                <TableConstructor lugar={'Alertas: Personas'} datos={{ Alertas:DataResultadoBusquedaGeneral.Alertas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Atlas && DataResultadoBusquedaGeneral.Atlas.length > 0) {
            newTablasResultado.push(
                <div key="atlas">
                <div className="row mb-4">
                    <h3 className="titulo">Atlas</h3>
                </div>
                <TableConstructor lugar={'Atlas: Personas'} datos={{ Atlas:DataResultadoBusquedaGeneral.Atlas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.SIC && DataResultadoBusquedaGeneral.SIC.length > 0) {
            newTablasResultado.push(
                <div key="sic">
                <div className="row mb-4">
                    <h3 className="titulo">SIC</h3>
                </div>
                <TableConstructor lugar={'SIC: Personas'} datos={{ SIC:DataResultadoBusquedaGeneral.SIC }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Puebla && DataResultadoBusquedaGeneral.Puebla.length > 0) {
            let PueblaPegada = DataResultadoBusquedaGeneral.Puebla.concat(DataResultadoBusquedaGeneral.Puebla1)
            newTablasResultado.push(
                <div key="puebla">
                <div className="row mb-4">
                    <h3 className="titulo">Personas</h3>
                </div>
                <TableConstructor lugar={'Puebla: Personas'} datos={{ PueblaPegada }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }

        break;
      case 'direccion':
          //console.log('si entre al caso de DIRECCION',DataResultadoBusquedaGeneral)

          if (DataResultadoBusquedaGeneral.Remisiones_Hechos && DataResultadoBusquedaGeneral.Remisiones_Hechos.length > 0) {
            newTablasResultado.push(
              <div key="remisiones_hechos">
                  <div className="row mb-4">
                      <h3 className="titulo">Remisiones Hechos</h3>
                  </div>
                <TableConstructor lugar={'Remisiones: Ubicación de Hechos'} datos={{ Remisiones: DataResultadoBusquedaGeneral.Remisiones_Hechos }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }
          
          if (DataResultadoBusquedaGeneral.Remisiones_Detencion && DataResultadoBusquedaGeneral.Remisiones_Detencion.length > 0) {
            newTablasResultado.push(
              <div key="remisiones_detencion">
                  <div className="row mb-4">
                      <h3 className="titulo">Remisiones Detencion</h3>
                  </div>
                <TableConstructor lugar={'Remisiones: Ubicación de Detencion'} datos={{ Remisiones: DataResultadoBusquedaGeneral.Remisiones_Detencion }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }

          if (DataResultadoBusquedaGeneral.Remisiones_Domicilio && DataResultadoBusquedaGeneral.Remisiones_Domicilio.length > 0) {
            newTablasResultado.push(
              <div key="remisiones_domicilio">
                  <div className="row mb-4">
                      <h3 className="titulo">Remisiones Domicilio</h3>
                  </div>
                <TableConstructor lugar={'Remisiones: Ubicación Domicilio Detenido'} datos={{ Remisiones: DataResultadoBusquedaGeneral.Remisiones_Domicilio }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }


          if (DataResultadoBusquedaGeneral.Inspecciones && DataResultadoBusquedaGeneral.Inspecciones.length > 0) {
            newTablasResultado.push(
              <div key="inspecciones">
                  <div className="row mb-4">
                      <h3 className="titulo">Ubicacion Inspeccion</h3>
                  </div>
                <TableConstructor lugar={'Inspecciones: Ubicaciones'} datos={{ Inspeccion: {generales: DataResultadoBusquedaGeneral.Inspecciones } }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }

          if (DataResultadoBusquedaGeneral.Historico_Domicilio && DataResultadoBusquedaGeneral.Historico_Domicilio.length > 0) {
            newTablasResultado.push(
              <div key="historico_domicilio">
                  <div className="row mb-4">
                      <h3 className="titulo">Historico Domicilio</h3>
                  </div>
                <TableConstructor lugar={'Historico: Datos Generales'} datos={{ Historico: DataResultadoBusquedaGeneral.Historico_Domicilio  }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }
          if (DataResultadoBusquedaGeneral.Historico_Hechos && DataResultadoBusquedaGeneral.Historico_Hechos.length > 0) {
            newTablasResultado.push(
              <div key="historico_hechos">
                  <div className="row mb-4">
                      <h3 className="titulo">Historico Hechos</h3>
                  </div>
                <TableConstructor lugar={'Historico: Datos Generales'} datos={{ Historico: DataResultadoBusquedaGeneral.Historico_Hechos  }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }


          if (DataResultadoBusquedaGeneral.Historico_Peticionario && DataResultadoBusquedaGeneral.Historico_Peticionario.length > 0) {
            newTablasResultado.push(
              <div key="historico_peticionario">
                  <div className="row mb-4">
                      <h3 className="titulo">Historico Peticionario</h3>
                  </div>
                <TableConstructor lugar={'Historico: Datos Generales'} datos={{ Historico: DataResultadoBusquedaGeneral.Historico_Peticionario  }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
          }

          // Verifica si SIC está definida y tiene elementos antes de acceder a 'length'
          if (DataResultadoBusquedaGeneral.SIC_Eventos && DataResultadoBusquedaGeneral.SIC_Eventos.length > 0) {
            newTablasResultado.push(
                <div key="sic_eventos">
                <div className="row mb-4">
                    <h3 className="titulo">SIC EVENTOS</h3>
                </div>
                <TableConstructor lugar={'SIC: Eventos'} datos={{ SIC:DataResultadoBusquedaGeneral.SIC_Eventos }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
          }

           // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
          if (DataResultadoBusquedaGeneral.Atlas && DataResultadoBusquedaGeneral.Atlas.length > 0) {
            newTablasResultado.push(
                <div key="atlas">
                <div className="row mb-4">
                    <h3 className="titulo">Atlas</h3>
                </div>
                <TableConstructor lugar={'Atlas: Personas'} datos={{ Atlas:DataResultadoBusquedaGeneral.Atlas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
          }

           // Verifica si Puebla está definida y tiene elementos antes de acceder a 'length'
          if (DataResultadoBusquedaGeneral.Puebla && DataResultadoBusquedaGeneral.Puebla.length > 0) {
            let PueblaPegada = DataResultadoBusquedaGeneral.Puebla.concat(DataResultadoBusquedaGeneral.Puebla1)
            newTablasResultado.push(
                <div key="puebla">
                <div className="row mb-4">
                    <h3 className="titulo">Personas</h3>
                </div>
                <TableConstructor lugar={'Puebla: Personas'} datos={{ PueblaPegada }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
          }
        break;
      case 'alias':
        //console.log('si entre al caso de nombre')
      
        // Verifica si Remisiones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Remisiones && DataResultadoBusquedaGeneral.Remisiones.length > 0) {
          newTablasResultado.push(
            <div key="remisiones">
                <div className="row mb-4">
                    <h3 className="titulo">Remisiones</h3>
                </div>
              <TableConstructor lugar={'Detenido: Datos Personales'} datos={{ Remisiones:DataResultadoBusquedaGeneral.Remisiones }} />
              {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
            </div>
          );
        }
      
        // Verifica si Inspecciones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Inspecciones && DataResultadoBusquedaGeneral.Inspecciones.length > 0) {
           newTablasResultado.push(
             <div key="inspecciones">
                <div className="row mb-4">
                    <h3 className="titulo">Inspecciones</h3>
                </div>
               <TableConstructor lugar={'Inspecciones: Personas Inspeccionadas General'} datos={{ Inspecciones:DataResultadoBusquedaGeneral.Inspecciones }} />
               {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
             </div>
           );
        }
        
        // Verifica si Alertas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Alertas && DataResultadoBusquedaGeneral.Alertas.length > 0) {
            newTablasResultado.push(
                <div key="alertas">
                <div className="row mb-4">
                    <h3 className="titulo">Alertas</h3>
                </div>
                <TableConstructor lugar={'Alertas: Personas'} datos={{ Alertas:DataResultadoBusquedaGeneral.Alertas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Atlas && DataResultadoBusquedaGeneral.Atlas.length > 0) {
            newTablasResultado.push(
                <div key="atlas">
                <div className="row mb-4">
                    <h3 className="titulo">Atlas</h3>
                </div>
                <TableConstructor lugar={'Atlas: Personas'} datos={{ Atlas:DataResultadoBusquedaGeneral.Atlas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.SIC && DataResultadoBusquedaGeneral.SIC.length > 0) {
            newTablasResultado.push(
                <div key="sic">
                <div className="row mb-4">
                    <h3 className="titulo">SIC</h3>
                </div>
                <TableConstructor lugar={'SIC: Personas'} datos={{ SIC:DataResultadoBusquedaGeneral.SIC }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        break;
      case 'placaniv':
        //console.log('si entre al caso de placaniv')
      
        // Verifica si Remisiones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Remisiones && DataResultadoBusquedaGeneral.Remisiones.length > 0) {
          newTablasResultado.push(
            <div key="remisiones_vehiculos">
                <div className="row mb-4">
                    <h3 className="titulo">Remisiones Vehiculos</h3>
                </div>
              <TableConstructor lugar={'Remisiones: Vehiculos Asegurados'} datos={{ Remisiones:DataResultadoBusquedaGeneral.Remisiones }} />
              {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
            </div>
          );
        }
      
        // Verifica si Inspecciones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Inspecciones && DataResultadoBusquedaGeneral.Inspecciones.length > 0) {
           newTablasResultado.push(
             <div key="inspecciones">
                <div className="row mb-4">
                    <h3 className="titulo">Inspecciones Vehiculos</h3>
                </div>
               <TableConstructor lugar={'Inspecciones: Vehiculos Inspeccionados'} datos={{ Inspeccion: {generales: DataResultadoBusquedaGeneral.Inspecciones } }} />
               {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
             </div>
           );
        }
        
        // Verifica si Alertas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Alertas && DataResultadoBusquedaGeneral.Alertas.length > 0) {
            newTablasResultado.push(
                <div key="alertas">
                <div className="row mb-4">
                    <h3 className="titulo">Alertas Vehiculos</h3>
                </div>
                <TableConstructor lugar={'Alertas: Vehiculos'} datos={{ Alertas:DataResultadoBusquedaGeneral.Alertas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
      

        break;
      case 'telefono':
        //console.log('si entre al caso de telefono ',DataResultadoBusquedaGeneral)
        
        // Verifica si Remisiones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Remisiones && DataResultadoBusquedaGeneral.Remisiones.length > 0) {
          newTablasResultado.push(
            <div key="remisiones">
                <div className="row mb-4">
                    <h3 className="titulo">Remisiones</h3>
                </div>
              <TableConstructor lugar={'Detenido: Datos Personales'} datos={{ Remisiones:DataResultadoBusquedaGeneral.Remisiones }} />
              {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
            </div>
          );
        }
      
        // Verifica si Inspecciones está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Contactos_Remitidos && DataResultadoBusquedaGeneral.Contactos_Remitidos.length > 0) {
          //console.log('debe de haber contactos de detenido')
            newTablasResultado.push(
              <div key="remisiones_contactos">
                <div className="row mb-4">
                    <h3 className="titulo">Contactos Detenido</h3>
                </div>
                <TableConstructor lugar={'Detenido: Contactos'} datos={{ Remisiones:DataResultadoBusquedaGeneral.Contactos_Remitidos }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
              </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.Atlas && DataResultadoBusquedaGeneral.Atlas.length > 0) {
            newTablasResultado.push(
                <div key="atlas">
                <div className="row mb-4">
                    <h3 className="titulo">Atlas</h3>
                </div>
                <TableConstructor lugar={'Atlas: Personas'} datos={{ Atlas:DataResultadoBusquedaGeneral.Atlas }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
    
        // Verifica si Atlas está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.SIC && DataResultadoBusquedaGeneral.SIC.length > 0) {
            newTablasResultado.push(
                <div key="sic">
                <div className="row mb-4">
                    <h3 className="titulo">SIC</h3>
                </div>
                <TableConstructor lugar={'SIC: Personas'} datos={{ SIC:DataResultadoBusquedaGeneral.SIC }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
        // Verifica si TelefonoSSC está definida y tiene elementos antes de acceder a 'length'
        if (DataResultadoBusquedaGeneral.TelefonoSSC && DataResultadoBusquedaGeneral.TelefonoSSC.length > 0) {
            newTablasResultado.push(
                <div key="llamadas911">
                <div className="row mb-4">
                    <h3 className="titulo">Llamadas 911</h3>
                </div>
                <TableConstructor lugar={'Telefonos: Llamadas'} datos={{ Llamadas:DataResultadoBusquedaGeneral.TelefonoSSC }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }
        if (DataResultadoBusquedaGeneral.Contactos && DataResultadoBusquedaGeneral.Contactos.length > 0) {
            newTablasResultado.push(
                <div key="llamadas911">
                <div className="row mb-4">
                    <h3 className="titulo">Contactos Extracciones</h3>
                </div>
                <TableConstructor lugar={'Telefonos: Contactos'} datos={{ Contactos:DataResultadoBusquedaGeneral.Contactos }} />
                {/* Aquí puedes añadir más componentes TableConstructor con diferentes datos si es necesario */}
                </div>
            );
        }

        break;
      default:
        break;
    }
    // Puedes continuar verificando y agregando más conjuntos de datos aquí
    setTablasResultado(newTablasResultado);
    setShowTables(true);
    
  };
  useEffect(() => {
    generarTablas(lugarSearch);
  }, [DataResultadoBusquedaGeneral, lugarSearch]);

  return {
    DataResultadoBusquedaGeneral,
    showTables,
    tablasResultado,
    isLoadingData,
    GenerateObject,
    generarTablas,
  };
};

export default useGeneralSearchControls;