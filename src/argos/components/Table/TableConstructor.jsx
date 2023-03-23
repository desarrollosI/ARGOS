import React from 'react'

import { Table } from './Table';

import "babel-polyfill";
import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter, fuzzyTextFilterFn,DateRangeColumnFilter, dateBetweenFilterFn } from '../../helpers'
import { Link } from 'react-router-dom';

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

export const TableConstructor = ({lugar, datos}) => {
  console.log('LUGAR: ',lugar,'DATOS: ',datos);
    
    let columns,data;

    switch (lugar) {
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
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

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} />
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
                    Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'STATUS REMISIÓN',
                    accessor:'Status_Remision',
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
            <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
                  filter: 'fuzzyText',
                },
                {
                  Header:'STATUS REMISIÓN',
                  accessor:'Status_Remision',
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
        
        console.log('ANTES DE LA CREACION DE LA TABLA',data)
        return (
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/remision/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/inspeccion/${props.value}`} target="_blank">{props.value}</Link>,
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
          <Table columns={columns} data={data} />
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
                  Cell: props =>  <Link to={`/historico/${props.value}`} target="_blank">{props.value}</Link>,
                  filter: 'fuzzyText',
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
          <Table columns={columns} data={data} />
        )
      default:
        break;
    }
    



}