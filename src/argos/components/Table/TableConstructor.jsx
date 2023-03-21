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
                  accessor:'Fecha_Rem',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'FOLIO',
                  accessor:'Folio',
                  Cell: props =>  <Link to={`/historico/${props.value}`} target="_blank">{props.value}</Link>,
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