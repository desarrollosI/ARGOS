// DefinicionColumnas.js
import React, { useState, useEffect } from 'react';
import {FiltroTexto,FiltroSelect,FiltroFecha} from './Filters';
import {Table} from './Table';
import { Link } from 'react-router-dom';

export const TableDefinition = ({lugar, datos,updateColumnFilters,columnFilters,nxtPage,prevPage,gotoPage,curPage,pageCount,opciones,changePageSize,pageSize}) => {
    console.log('LUGAR: ',lugar,'DATOS: ',datos);
      
      let columns,data;
      switch (lugar) {
        case 'Detenido: Datos Personales':
          columns = React.useMemo(
            () => [
                  {
                    Header:'FECHA',
                    accessor:'Fecha_Hora',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'FICHA',
                    accessor:'Ficha',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'NUM. REMISIÓN',
                    accessor:'No_Remision',
                    Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Detenido: Datos Personales'})} >{props.value}</Link>,
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'STATUS REMISIÓN',
                    accessor:'Status_Remision',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header:'FALTA/DELITO',
                    accessor:'Falta_Delito_Tipo',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header:'INSTANCIA',
                    accessor:'Instancia',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header:'FALTAS DELITOS',
                    accessor:'Faltas_Delitos_Detenido',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'COMERCIO AFECTADO',
                    accessor:'Negocio_Afectado',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'NOMBRE',
                    accessor:'Nombre',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'AP PATERNO',
                    accessor:'Ap_Paterno',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'AP MATERNO',
                    accessor:'Ap_Materno',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'CURP',
                    accessor:'CURP',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'RFC',
                    accessor:'RFC',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'GÉNERO',
                    accessor:'Genero',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header: 'EDAD DE: ',
                    accessor: 'Edad',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header: 'ESCOLARIDAD',
                    accessor: 'Escolaridad',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header:'LUGAR ORIGEN',
                    accessor:'Lugar_Origen',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header: 'ESTADO CIVIL',
                    accessor: 'Estado_Civil',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'TÉLEFONO',
                    accessor:'Telefono',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'EMAIL',
                    accessor:'Correo_Electronico',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'TIPO',
                    accessor:'Tipo',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'COLONIA',
                    accessor:'Colonia',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'CALLE',
                    accessor:'Calle',
                    Filter: FiltroTexto,
                    canFilter: true,
                    minWidth: 200
                  },
                  {
                    Header:'NO. EXT',
                    accessor:'No_Exterior',
                    Filter: FiltroTexto,
                    canFilter: true,
                    minWidth: 100
                  },
                  {
                    Header:'OCUPACIÓN',
                    accessor:'Ocupacion',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header:'ALIAS',
                    accessor:'Alias_Detenido',
                    Filter: FiltroTexto,
                    canFilter: true
                  },
                  {
                    Header: 'ZONA',
                    accessor: 'Zona',
                    Filter: FiltroSelect,
                    canFilter: true
                  },
                  {
                    Header: 'VECTOR',
                    accessor: 'Vector',
                    Filter: FiltroTexto,
                    canFilter: true
                  }
            ],[]
          )
        
          data = React.useMemo(() =>
          datos.Remisiones
          , [curPage])
          
          return (
            <Table 
                columns={columns} 
                data={data} 
                totalRegisters={datos.totalRegisters} 
                base={'Detenido: Datos Personales'} 
                updateColumnFilters={updateColumnFilters } 
                columnFilters={columnFilters} 
                nxtPage={nxtPage} 
                prevPage={prevPage}
                gotoPage={gotoPage}
                curPage={curPage}
                pageCount={pageCount}
                opciones={opciones}
                changePageSize={changePageSize}
                pageSize={pageSize}
            />
          )
      }
    }
  