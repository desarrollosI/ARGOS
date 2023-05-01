//Se importan los componentes propios de react
import React, { useState } from 'react'
//Se importan los componentes personalizados necesarios
import { Table } from './Table';
import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter, fuzzyTextFilterFn,DateRangeColumnFilter, dateBetweenFilterFn } from '../../helpers'
//Se importan los componentes  de react router
import { Link } from 'react-router-dom';
//Se importa el babel-polyfill, es necesario para que funcionen las tablas de react. Es un traductor a hacia javascript mas simple
import "babel-polyfill";
//Se importan los helpers para el manejo del historial
import { insertHistorial } from '../../../helpers/insertHistorial';

  //Se crea la funcion que ayuda a realizar las insersiones en el historial
  const registrarMovimiento = (dataHistorial) => {
    insertHistorial(dataHistorial)
  }
  /*
    Este filtro es necesario mantenerlo en este archivo para poder eliminar los filtros posteriores
  */
    // Define a custom filter filter function!
  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
    }

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

/*
  El componente exportado <TableConstructor /> recibe como parametros, de donde proviene la data que es su segundo parametro
  con esa informacion, se declaran dos variables columas y data, el objetivo de este componente es crear dos objetos, las columas
  y la data que contendra la tabla que se va a visualizar
*/
export const TableConstructor = ({lugar, datos}) => {
  console.log('LUGAR: ',lugar,'DATOS: ',datos);
    
    let columns,data;
    const [filtros, setFiltros] = useState() // se alacena en un estado los filtros aplicados, deberian retornar desde el hijo. No ha habido exito se requiere para el historial
    switch (lugar) {
      //opciones de remisiones
      /*
        El coponente requiere de un switch, para poder decirir como tratar la informacion dependiendo de cada filtro, como ya se menciono el switch tiene el objetivo de crear las columas
        y la data que requerira la tabla posterior, el elemnto de columnas es un arreglo de objetos, cada objeto corresponde a una columna, con parametros cambiantes, los dos minimos
        son el Header, que es el titulo de la columna, y el accesor que indica a la tabla, que informacion de la data se va a renderizar, las columnas pueden tener campos extas
        en el cual se le indica el tipo de filtro que se quiere inyectar a la columna, es algo complejo se recomienda visitar la documentacion de react table, son en si minicomponentes.
        Hay diferentes propiedades diferentes, pudiendo inyercar jsx en determinaadas columnas, como en las que se quiere generar enlaces para obtener mas informacion.       
        */
      case 'Detenido: Datos Personales':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Detenido: Datos Personales'})} >{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTAS DELITOS',
                  accessor:'Faltas_Delitos_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CURP',
                  accessor:'CURP',
                  filter: 'fuzzyText',
                },
                {
                  Header:'RFC',
                  accessor:'RFC',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header: 'ESCOLARIDAD',
                  accessor: 'Escolaridad',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'LUGAR ORIGEN',
                  accessor:'Lugar_Origen',
                  filter: 'fuzzyText',
                },
                {
                  Header: 'ESTADO CIVIL',
                  accessor: 'Estado_Civil',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'TÉLEFONO',
                  accessor:'Telefono',
                  filter: 'fuzzyText',
                },
                {
                  Header:'EMAIL',
                  accessor:'Correo_Electronico',
                  filter: 'fuzzyText',
                },
                {
                  Header:'OCUPACIÓN',
                  accessor:'Ocupacion',
                  filter: 'fuzzyText',
                },
          ],[]
        )
        /*
          Se requiere que la data sea especificamente lo que va a renderizar la posterior tabla, si bien se puede desestructurar, de esta forma se sabe exatamente que informacion
          se esta enviando.
          Como comentario adicional, tanto las columnas y los datos usan el Hook useMemo, el use memo ayuda a react a no pedir nuevamente informacion si no ha habido cambios significativos
          esto con el objetivo de tratar de no perder rendimiento por la gran cantidad de datos.
        */ 
        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        /*
          El retornar del componente es otro componente <Table /> recibe toda la información y las columnas, ligadas a dicha información, junto con que filtro
          se va a renderizar y utilizar par esa tabla
          Este componente sirve para cualquier tipo de tabla, pues tambien es usado para el historial del sistema argos.   
        */
        return (
          <Table columns={columns} data={data} base={'Detenido: Datos Personales'} setFiltros={setFiltros}/>
        )

      case 'Detenido: Media Filiacion':
          columns = React.useMemo(
            () => [
                  {
                    Header:'FECHA',
                    accessor:'Fecha_Hora',
                    Filter: DateRangeColumnFilter,
                    filter: dateBetweenFilterFn
                  },
                  {
                    Header:'FICHA',
                    accessor:'Ficha',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'NUM. REMISIÓN',
                    accessor:'No_Remision',
                    Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Detenido: Media Filiacion'})}>{props.value}</Link>,
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'STATUS REMISIÓN',
                    accessor:'Status_Remision',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'FALTA/DELITO',
                    accessor:'Falta_Delito_Tipo',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'NOMBRE',
                    accessor:'Nombre',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'AP PATERNO',
                    accessor:'Ap_Paterno',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'AP MATERNO',
                    accessor:'Ap_Materno',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'GÉNERO',
                    accessor:'Genero',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header: 'EDAD DE: ',
                    accessor: 'Edad',
                    Filter: NumberRangeColumnFilter,
                    filter: 'between',
                  },
                  {
                    Header:'COMPLEXIÓN',
                    accessor:'Complexion',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'ESTATURA EN CM',
                    accessor:'Estatura_cm',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'COLOR PIEL',
                    accessor:'Color_Piel',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'FORMA CARA',
                    accessor:'Forma_Cara',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'PÓMULOS',
                    accessor:'Pomulos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'CABELLO',
                    accessor:'Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'COLOR_CABELLO',
                    accessor:'Color_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM_CABELLO',
                    accessor:'Tam_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'FORMA CABELLO',
                    accessor:'Forma_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'FRENTE',
                    accessor:'Frente',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'CEJAS',
                    accessor:'Cejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TIPO CEJAS',
                    accessor:'Tipo_Cejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'COLOR OJOS',
                    accessor:'Color Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM OJOS',
                    accessor:'Tam_Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'FORMA OJOS',
                    accessor:'Forma_Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'NARIZ',
                    accessor:'Nariz',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM. BOCA',
                    accessor:'Tam_Boca',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'LABIOS',
                    accessor:'Labios',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'MENTON',
                    accessor:'Menton',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM. OREJAS',
                    accessor:'Tam_Orejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'LOBULOS',
                    accessor:'Lobulos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'BARBA',
                    accessor:'Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM. BARBA',
                    accessor:'Tam_Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'COLOR BARBA',
                    accessor:'Color_Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'BIGOTE',
                    accessor:'Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'TAM. BIGOTE',
                    accessor:'Tam_Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'COLOR BIGOTE',
                    accessor:'Color_Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
            ],[]
          )
  
          data = React.useMemo(() =>
          datos.Remisiones
          , [])
          
          
          return (
            <Table columns={columns} data={data} base={'Detenido: Media Filiacion'}/>
        )
      
      case 'Detenido: Contactos':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Detenido: Contactos'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTAS DELITOS',
                  accessor:'Faltas_Delitos_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE DETENIDO',
                  accessor:'Nombre_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO DETENIDO',
                  accessor:'Ap_Paterno_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO DETENIDO',
                  accessor:'Ap_Materno_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO DETENIDO',
                  accessor:'Genero_Detenido',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DETENIDO DE: ',
                  accessor: 'Edad_Detenido',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TÉLEFONO DETENIDO',
                  accessor:'Telefono_Detenido',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE CONTACTO',
                  accessor:'Nombre_Contacto',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO CONTACTO',
                  accessor:'Ap_Paterno_Contacto',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO CONTACTO',
                  accessor:'Ap_Materno_Contacto',
                  filter: 'fuzzyText',
                },
                {
                  Header:'PARENTESCO',
                  accessor:'Parentesco',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'TÉLEFONO CONTACTO',
                  accessor:'Telefono_Contacto',
                  filter: 'fuzzyText',
                },
                {
                  Header: 'EDAD CONTACTO DE: ',
                  accessor: 'Edad_Contacto',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'GÉNERO CONTACTO',
                  accessor:'Genero_Contacto',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                }
                
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Detenido: Contactos'} />
        )

      case 'Detenido: Senas Particulares':
        console.log('llego al table constructor')
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Detenido: Senas Particulares'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'NOMBRE DETENIDO',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO DETENIDO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO DETENIDO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO DETENIDO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DETENIDO DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TIPO DE SEÑA',
                  accessor:'Tipo_Senia_Particular',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'PERFIL',
                  accessor:'Perfil',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'UBICACION CORPORAL',
                  accessor:'Ubicacion_Corporal',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CLASIFICACION',
                  accessor:'Clasificacion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'COLOR',
                  accessor:'Color',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'DESCRIPCIÓN',
                  accessor:'Descripcion',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        return (
          <Table columns={columns} data={data} base={'Detenido: Senas Particulares'}/>
        )

      case 'Remisiones: Narrativas':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Narrativas'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'ESCOLARIDAD',
                  accessor:'Escolaridad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'EXTRACTO IPH',
                  accessor:'Extracto_IPH',
                  minWidth: 1680,
                  filter: 'fuzzyText',
                  
                },
                {
                  Header:'NARRATIVA DETENIDO',
                  accessor:'Narrativa_Detenido',
                  minWidth: 500,
                  filter: 'fuzzyText',
                },
                {
                  Header:'NARRATIVA PETICIONARIO',
                  accessor:'Narrativa_Peticionario',
                  minWidth: 1000,
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Narrativas'}/>
        )

      case 'Remisiones: Ubicación de Hechos':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Ubicación de Hechos'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTAS DELITOS',
                  accessor:'Faltas_Delitos_Detenido',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'ESCOLARIDAD',
                  accessor:'Escolaridad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'TIPO',
                  accessor:'Tipo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA',
                  accessor:'Colonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE 1',
                  accessor:'Calle_1',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NO. EXT',
                  accessor:'No_Ext',
                  filter: 'fuzzyText',
                  minWidth: 100
                },
                {
                  Header:'C.P.',
                  accessor:'CP',
                  filter: 'fuzzyText',
                  minWidth: 100
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Ubicación de Hechos'}/>
        )

      case 'Remisiones: Ubicación de Detencion':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Ubicación de Detencion'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTAS DELITOS',
                  accessor:'Faltas_Delitos_Detenido',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TIPO',
                  accessor:'Tipo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA',
                  accessor:'Colonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE 1',
                  accessor:'Calle_1',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'CALLE 2',
                  accessor:'Calle_2',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NO. EXT',
                  accessor:'No_Ext',
                  filter: 'fuzzyText',
                  minWidth: 100
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Ubicación de Detencion'}/>
        )

      case 'Remisiones: Ubicación Domicilio Detenido':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Ubicación Domicilio Detenido'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTAS DELITOS',
                  accessor:'Faltas_Delitos_Detenido',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TIPO',
                  accessor:'Tipo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA',
                  accessor:'Colonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE',
                  accessor:'Calle',
                  filter: 'fuzzyText',
                  minWidth: 200
                },
                {
                  Header:'NO. EXT',
                  accessor:'No_Exterior',
                  filter: 'fuzzyText',
                  minWidth: 100
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Ubicación Domicilio Detenido'}/>
        )

      case 'Remisiones: Objetos Asegurados':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Objetos Asegurados'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FOLIO 911',
                  accessor:'Folio_911',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'DESCRIPCIÓN OBJETO',
                  accessor:'Descripcion_Objeto',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Objetos Asegurados'}/>
        )

      case 'Remisiones: Armas Aseguradas':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Armas Aseguradas'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FOLIO 911',
                  accessor:'Folio_911',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TIPO ARMA',
                  accessor:'Tipo_Arma',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CANTIDAD',
                  accessor: 'Cantidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'DESCRIPCIÓN ARMA',
                  accessor:'Descripcion_Arma',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Armas Aseguradas'}/>
        )
        
      case 'Remisiones: Drogas Aseguradas':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Drogas Aaseguradas'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FOLIO 911',
                  accessor:'Folio_911',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'TIPO DROGA',
                  accessor:'Tipo_Droga',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CANTIDAD',
                  accessor: 'Cantidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'UNIDAD',
                  accessor: 'Unidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'DESCRIPCIÓN DROGA',
                  accessor:'Descripcion_Droga',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Drogas Aseguradas'}/>
        )

      case 'Remisiones: Vehiculos Asegurados':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn,
                  
                },
                {
                  Header:'FICHA',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NUM. REMISIÓN',
                  accessor:'No_Remision',
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Remisiones: Vehiculos Asegurados'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito_Tipo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FOLIO 911',
                  accessor:'Folio_911',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'PLACA',
                  accessor:'Placa_Vehiculo',
                  filter: 'equals',
                },
                {
                  Header:'NIV',
                  accessor:'No_Serie',
                  filter: 'equals',
                },
                {
                  Header:'MARCA',
                  accessor: 'Marca',
                  filter: 'fuzzyText',
                },
                {
                  Header:'SUBMARCA',
                  accessor:'Submarca',
                  filter: 'fuzzyText',
                },
                {
                  Header:'TIPO VEHICULO',
                  accessor:'Tipo_Vehiculo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'MODELO',
                  accessor:'Modelo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLOR',
                  accessor:'Color',
                  filter: 'fuzzyText',
                },
                {
                  Header:'SEÑA PARTICULAR',
                  accessor:'Senia_Particular',
                  filter: 'fuzzyText',
                },
                {
                  Header:'PROCEDENCIA',
                  accessor:'Procedencia_Vehiculo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'OBSERVACION',
                  accessor:'Observacion_Vehiculo',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Remisiones: Vehiculos Asegurados'}/>
        )
      //opciones de inspecciones
      case 'Inspecciones: Datos Generales':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora_Inspeccion',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'ID INSPECCIÓN',
                  accessor:'Id_Inspeccion',
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Inspecciones: Datos Generales'})} >{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'SOLICITA',
                  accessor:'Quien_Solicita',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GRUPO',
                  accessor:'Grupo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'ZONA',
                  accessor:'Zona_Sector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'UNIDAD',
                  accessor:'Unidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MOTIVO',
                  accessor:'Motivo_Inspeccion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'RESULTADO INSPECCIÓN',
                  accessor:'Resultado_Inspeccion',
                  filter: 'fuzzyText',
                }
          ],[]
        )

        data = React.useMemo(() =>
        datos.Inspeccion.generales
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Inspecciones: Datos Generales'}/>
        )

      case 'Inspecciones: Personas Inspeccionadas':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora_Inspeccion',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'ID INSPECCIÓN',
                  accessor:'Id_Inspeccion',
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Inspecciones: Personas Inspeccionadas'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'SOLICITA',
                  accessor:'Quien_Solicita',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GRUPO',
                  accessor:'Grupo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'ZONA',
                  accessor:'Zona_Sector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'UNIDAD',
                  accessor:'Unidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MOTIVO',
                  accessor:'Motivo_Inspeccion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'RESULTADO INSPECCIÓN',
                  accessor:'Resultado_Inspeccion',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NOMBRE',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'APELLIDO PATERNO',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'APELLIDO MATERNO',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                }
          ],[]
        )

        data = React.useMemo(() =>
        datos.Inspeccion.generales
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Inspecciones: Personas Inspeccionadas'}/>
        )

      case 'Inspecciones: Vehiculos Inspeccionados':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora_Inspeccion',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'ID INSPECCIÓN',
                  accessor:'Id_Inspeccion',
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Inspecciones: Vehiculos Inspeccionados'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'SOLICITA',
                  accessor:'Quien_Solicita',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GRUPO',
                  accessor:'Grupo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'ZONA',
                  accessor:'Zona_Sector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'UNIDAD',
                  accessor:'Unidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MOTIVO',
                  accessor:'Motivo_Inspeccion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'RESULTADO INSPECCIÓN',
                  accessor:'Resultado_Inspeccion',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NIV',
                  accessor:'NIV',
                  filter: 'fuzzyText',
                },
                {
                  Header:'PLACA',
                  accessor:'Placa',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MARCA',
                  accessor:'Marca',
                  filter: 'fuzzyText',
                },
                {
                  Header:'SUBMARCA',
                  accessor:'Submarca',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MODELO',
                  accessor:'Modelo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLOR',
                  accessor:'Color',
                  filter: 'fuzzyText',
                }
          ],[]
        )

        data = React.useMemo(() =>
        datos.Inspeccion.generales
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Inspecciones: Vehiculos Inspeccionados'}/>
        )
      
      case 'Inspecciones: Ubicaciones':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora_Inspeccion',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'ID INSPECCIÓN',
                  accessor:'Id_Inspeccion',
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Inspecciones: Ubicaciones'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'SOLICITA',
                  accessor:'Quien_Solicita',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GRUPO',
                  accessor:'Grupo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'ZONA',
                  accessor:'Zona_Sector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'UNIDAD',
                  accessor:'Unidad',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MOTIVO',
                  accessor:'Motivo_Inspeccion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CALLE 1',
                  accessor:'Calle_1',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE 2',
                  accessor:'Calle_2',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA',
                  accessor:'Colonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. EXT.',
                  accessor:'No_Ext',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. INT.',
                  accessor:'No_Int',
                  filter: 'fuzzyText',
                },
                {
                  Header:'RESULTADO INSPECCIÓN',
                  accessor:'Resultado_Inspeccion',
                  filter: 'fuzzyText',
                }
          ],[]
        )

        data = React.useMemo(() =>
        datos.Inspeccion.generales
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Inspecciones: Ubicaciones'}/>
        )

      //opciones de historico
      case 'Historico: Datos Generales':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'FOLIO',
                  accessor:'Folio',
                  Cell: props =>  <Link to={`/historico/${props.value}`} target="_blank" onClick={()=>registrarMovimiento({lugar:'Buscador',tipo: 'Mas detalles',folio: props.value,base: 'Historico: Datos Generales'})}>{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'TIPO STATUS',
                  accessor:'Tipo_status',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'FALTA/DELITO',
                  accessor:'Falta_Delito',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'SECTOR',
                  accessor:'Zona',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CIA',
                  accessor:'CIA',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'REMITIDO A',
                  accessor:'Remitido_a',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'NOMBRE D',
                  accessor:'Nombre_de',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO D',
                  accessor:'Ap_paterno_de',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO D',
                  accessor:'Ap_materno_de',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO D',
                  accessor:'Sexo_d',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD DE: ',
                  accessor: 'Edad_d',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'DOMICILIO D',
                  accessor:'Dom_d',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. D',
                  accessor:'No_d',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA D',
                  accessor:'Col_d',
                  filter: 'fuzzyText',
                },
                {
                  Header:'LUGAR ORIGEN D',
                  accessor:'Lugar_Origen_d',
                  filter: 'fuzzyText',
                },
                {
                  Header:'ESCOLARIDAD D',
                  accessor:'Escolaridad_d',
                  filter: 'fuzzyText',
                },
                {
                  Header:'PERTENENCIAS D',
                  accessor:'Pertenencias_d',
                  filter: 'fuzzyText',
                  width: 300
                },
                {
                  Header:'NOMBRE P',
                  accessor:'Nombre_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP PATERNO P',
                  accessor:'Ap_paterno_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'AP MATERNO P',
                  accessor:'Ap_Materno_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'GÉNERO P',
                  accessor:'Sexo_P',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'EDAD P DE: ',
                  accessor: 'Edad_P',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'DOMICILIO P',
                  accessor:'Dom_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. P',
                  accessor:'No_p',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA P',
                  accessor:'Col_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'LUGAR ORIGEN P',
                  accessor:'Lugar_Origen_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'ESCOLARIDAD P',
                  accessor:'Escolaridad_P',
                  filter: 'fuzzyText',
                },
                {
                  Header:'DOM HECHOS',
                  accessor:'Dom_Hechos',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE 2 HECHOS',
                  accessor:'Calle_2',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. HECHOS',
                  accessor:'No_h',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MOTIVO',
                  accessor:'Tipo_Motivo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'DESCRIPCION',
                  accessor:'Descripcion',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CANTIDAD MOTIVO',
                  accessor:'Cantidad Motivo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CARACTERISTICAS',
                  accessor:'Caracteristicas_Motivo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MODALIDAD',
                  accessor:'Modalidad_Motivo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'OBJETOS ADJUNTOS',
                  accessor:'Obj_Adjuntan',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Historico
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Historico: Datos Generales'}/>
        )
      //incidencia delictiva
      case 'Incidencia Delictiva: Datos Generales':
        columns = React.useMemo(
          () => [
                {
                  Header:'FECHA',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'FOLIO',
                  accessor:'Folio',
                  // Cell: props =>  <Link to={`/historico/${props.value}`} target="_blank">{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'DIA',
                  accessor:'Dia',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'TIPO DE ROBO',
                  accessor:'TipodeRobo',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'GIRO',
                  accessor:'Giro',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CARACTERISTICA',
                  accessor:'CaracteristicadelRobo',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MODUS OPERANDI',
                  accessor:'ModusOperandi',
                  filter: 'fuzzyText',
                },
                {
                  Header:'MODO DE FUGRA',
                  accessor:'MododeFuga',
                  filter: 'fuzzyText',
                },
                {
                  Header:'VIOLENCIA',
                  accessor:'Violencia',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'TIPO DE ARMA',
                  accessor:'TipoArma',
                  filter: 'fuzzyText',
                },
                {
                  Header:'OBJETOS RECUPERADOS',
                  accessor:'Obj_Recuperados',
                  filter: 'fuzzyText',
                },
                {
                  Header:'OBSERVACIONES',
                  accessor:'Observaciones',
                  filter: 'fuzzyText',
                },
                {
                  Header:'SITUACION',
                  accessor:'Situacion',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'CIA',
                  accessor:'Cia',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'DETENIDOS',
                  accessor:'CantidadDetenidos',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'RESPONSABLES',
                  accessor:'No_Resp',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'HOMBRES',
                  accessor:'Hombres',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'MUJERES',
                  accessor:'Mujeres',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header:'CALLE 1',
                  accessor:'Calle_1',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CALLE 2',
                  accessor:'Calle_2',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. EXT',
                  accessor:'No_Ext',
                  filter: 'fuzzyText',
                },
                {
                  Header:'NO. INT',
                  accessor:'No_Int',
                  filter: 'fuzzyText',
                },
                {
                  Header:'TIPO COLONIA',
                  accessor:'TipoColonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'COLONIA',
                  accessor:'Colonia',
                  filter: 'fuzzyText',
                },
                {
                  Header:'ZONA',
                  accessor:'Zona',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'VECTOR',
                  accessor:'Vector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'SECTOR',
                  accessor:'Sector',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'OBJETOS',
                  accessor:'Objetos',
                  filter: 'fuzzyText',
                },
                {
                  Header:'RESPONSABLES',
                  accessor:'Responsables',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Incidencia
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Incidencia Delictiva: Datos Generales'}/>
        )
      // ARGOS HISTORIAL
        case 'Reconocimiento Facial: Fotos Subidas':
        columns = React.useMemo(
          () => [
            {
              Header:'ID',
              accessor:'_id',
              filter: 'fuzzyText',
            }, 
            {
              Header:'FECHA',
              accessor:'extra.hora',
              Filter: DateRangeColumnFilter,
              filter: dateBetweenFilterFn
            },
            {
              Header:'USUARIO',
              accessor:'user.nombre',
              filter: 'fuzzyText',
            }, 
            {
              Header:'LUGAR',
              accessor:'extra.lugar',
              Filter: SelectColumnFilter,
              filter: 'equals',
            }, 
            {
              Header:'TIPO',
              accessor:'extra.tipo',
              Filter: SelectColumnFilter,
              filter: 'equals',
            }, 
            {
              Header:'IMAGEN',
              accessor:'extra.imagen',
              Cell: props =>  (<img src={props.value} width={100} />),
            }, 
          ],[]
        )

        data = React.useMemo(() =>
        datos
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Reconocimiento Facial: Fotos Subidas'} setFiltros={setFiltros}/>
        )
        case 'Inicio de Sesion':
        columns = React.useMemo(
          () => [
            {
              Header:'ID',
              accessor:'_id',
              filter: 'fuzzyText',
            }, 
            {
              Header:'FECHA',
              accessor:'extra.hora',
              Filter: DateRangeColumnFilter,
              filter: dateBetweenFilterFn
            },
            {
              Header:'USUARIO',
              accessor:'user.nombre',
              filter: 'fuzzyText',
            }, 
            {
              Header:'LUGAR',
              accessor:'extra.lugar',
              Filter: SelectColumnFilter,
              filter: 'equals',
            }, 
            {
              Header:'TIPO',
              accessor:'extra.tipo',
              Filter: SelectColumnFilter,
              filter: 'equals',
            }
          ],[]
        )

        data = React.useMemo(() =>
        datos
        , [])
        
        
        return (
          <Table columns={columns} data={data} base={'Reconocimiento Facial: Fotos Subidas'} setFiltros={setFiltros}/>
        )
        case 'Buscador: Exportacion a Excel':
          columns = React.useMemo(
            () => [
              {
                Header:'ID',
                accessor:'_id',
                filter: 'fuzzyText',
              }, 
              {
                Header:'FECHA',
                accessor:'extra.hora',
                Filter: DateRangeColumnFilter,
                filter: dateBetweenFilterFn
              },
              {
                Header:'USUARIO',
                accessor:'user.nombre',
                filter: 'fuzzyText',
              }, 
              {
                Header:'LUGAR',
                accessor:'extra.lugar',
                Filter: SelectColumnFilter,
                filter: 'equals',
              }, 
              {
                Header:'TIPO',
                accessor:'extra.tipo',
                Filter: SelectColumnFilter,
                filter: 'equals',
              },
              {
                Header:'BASE',
                accessor:'extra.base',
                Filter: SelectColumnFilter,
                filter: 'equals',
              }
            ],[]
          )
  
          data = React.useMemo(() =>
          datos
          , [])
          
          
          return (
            <Table columns={columns} data={data} base={'Reconocimiento Facial: Fotos Subidas'} setFiltros={setFiltros}/>
          )
          case 'Vista de Ficha: Mas Detalles':
          columns = React.useMemo(
            () => [
              {
                Header:'ID',
                accessor:'_id',
                filter: 'fuzzyText',
              }, 
              {
                Header:'FECHA',
                accessor:'extra.hora',
                Filter: DateRangeColumnFilter,
                filter: dateBetweenFilterFn
              },
              {
                Header:'USUARIO',
                accessor:'user.nombre',
                filter: 'fuzzyText',
              }, 
              {
                Header:'LUGAR',
                accessor:'extra.lugar',
                Filter: SelectColumnFilter,
                filter: 'equals',
              }, 
              {
                Header:'TIPO',
                accessor:'extra.tipo',
                Filter: SelectColumnFilter,
                filter: 'equals',
              },
              {
                Header:'BASE',
                accessor:'extra.base',
                Filter: SelectColumnFilter,
                filter: 'equals',
              },
              {
                Header:'FOLIO',
                accessor:'extra.folio',
                filter: 'fuzzyText',
              }, 
            ],[]
          )
  
          data = React.useMemo(() =>
          datos
          , [])
          
          
          return (
            <Table columns={columns} data={data} base={'Reconocimiento Facial: Fotos Subidas'} setFiltros={setFiltros}/>
          )
      default:
        break;
    }
    



}