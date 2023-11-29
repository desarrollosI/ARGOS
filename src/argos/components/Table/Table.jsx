/*
    Este componente es muy muy complejo, recordatorio todo lo que inicie con useXXXXXX por norma general se trata de un hook
    la biblioteca de react table nos facilita muchos hooks para poder manipular la tabla y extender o acortar funcionalidad
    no es necesaio saber que es lo que contienen solo lo que regresan o como se pueden utilizar, nuevamente en el repositorio
    de github, la pagina del paquete npm o su página oficial se encuentra mas documentacion al respecto

    Para hacer la tabla deseada se requieren determinados hooks con nombres adoc a lo que se quiere lograr se quieren filtros
    se llama el useFilters, se quiere paginacion se usa el usePagination, etc. 
*/

// Se importan los componentes propios de react 
import React, { useEffect } from 'react'
// Se importan los componente de react table
import { useTable, useFilters, useGlobalFilter, usePagination, useResizeColumns } from 'react-table'
// Se importan los componentes personalizados, estos componentes son los filtros e inputs de los mismos
// Se importan algunos aunque aun no se usan por si son necesarios en un futuro.
import { GlobalFilter, dataToExcel } from '../../helpers'
// Se importan las hojas de estilo del componente
import '../css/Table/tabla.css';
import { useState } from 'react';

//import {  SelectColumnFilterStatic } from './StaticFilters'; // Asegúrate de ajustar la ruta correcta

/*
    El componente final es la tabla con paginacion, , columnas con filtros y la posibilidad de exportarlo a excel
*/
export function Table({ columns, data, base='',updateColumnFilters,columnFilters, totalRegisters, nxtPage,prevPage, opciones}) {


    console.log('ACA ESTAN LAS OPCIONES DEL BACK ', opciones)

    const exportExcel = (data,base) => {
        //console.log('data a excel',data)
        dataToExcel(data,  {lugar:'Buscador',tipo: 'Exportación Excel', base: base, filtros: state.filters} );

    }

    // Función para renderizar los filtros específicos de cada columna
    const renderColumnFilter = (column) => {
        console.log('ESTOY EN LA FUNCION DEL RENDER,',column.id)

        if (column.filter == 'SelectColumnFilterStatic') {
           
            const opcionesColumna = opciones.find(opcion => opcion.nombre === column.id);
            console.log('DESPUES DE BUSCAR LAS OPCIONES', opcionesColumna)

            return (
                <SelectColumnFilterStatic
                    name={column.id}
                    opciones={opcionesColumna}
                />
                )
        }
    
        // Agrega más casos según sea necesario para otros tipos de filtros
        return null;
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,//para paginar hay que cambiar en vez de row a page
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        setAllFilters,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize
        },
    } = useTable(
        {
        columns,
        data,
        },
        useGlobalFilter, // useGlobalFilter!
        usePagination// usa la paginacion
    )



  /* --- --- --- ACA PUEDES ACCEDER A LOS RENGLONES FILTRADOS PARA POSTERIOR EXPORTACION --- --- ---
    FALTA TRATAR LA INFORMACION YA QUE REGRESA UN OBJETO UTILIZADO PARA EL REACT TABLE 
    en esa variable remisiones esta ubicada la informacion de dicha tabla en objeto json.
    pa posterior generar el componente de excel y si hace falta informacion hacer el llamado al backend
    en busca de mas ifnrmación.
     -----------------------------------------------------------------------------------------------*/
  let remisiones = preGlobalFilteredRows.map(row => row.values)
  //console.log('previa a excel :', remisiones)
    //TODO Como pasar el filtro al padre para el historial ?
  

    //efecto para poder observar los filtros

    // useEffect(() => {
    //     // Establece un temporizador para retrasar la actualización de los filtros
    //     const timerId = setTimeout(() => {
    //       // Actualiza los filtros del hook con los filtros locales
    //       updateColumnFilters(state.filters);
    //     }, 4000); // 4000 milisegundos (4 segundos)
      
    //     // Limpia el temporizador al desmontar el componente o al cambiar los filtros
    //     return () => clearTimeout(timerId);
      
    //     // Asegúrate de incluir las dependencias necesarias
    //   }, [state.filters]);

  return (
        <>
         <div className="row">
            <div className="col-md-12 ">
               <div className="row ms-5 ">
                <div className="col-md-8">
                    <button
                        onClick={() => exportExcel(remisiones,base)}
                        className='btn btn-export-csv'
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-filetype-csv" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"/>
                        </svg>
                        EXPORTAR EXCEL
                    </button>
                    <button 
                         onClick={() => {
                            console.log('Eliminar filtros');
                            updateColumnFilters([]); // Llamar a updateColumnFilters con un arreglo vacío
                            setAllFilters([]); // Limpiar los filtros locales
                        }}
                        className='ms-2 btn btn-reset-filters'
                    >
                        ELIMINAR FILTROS
                    </button>
                </div>
                <div className="col-md-4">
                    <h5>
                        { `${totalRegisters} REGISTROS ENCONTRADOS` }
                    </h5>
                </div>
               </div>
            </div>
         </div>
         <div className="outer-wrapper shadow">
            <div className='table-wrapper'>
                <table {...getTableProps()} className="table table-bordered table-hover shadow" >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className="align-middle" {...column.getHeaderProps({ style: { minWidth: column.minWidth } })}>
                                        {column.render('Header')}
                                        {/* Render the columns filter UI */}
                                        <div>{renderColumnFilter(column)}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
         </div>
        <div className="container">

            <div className="row">
                <div className="col-md-3">
                    <button className="btn btn-pagination" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                    </button>{' '}
                    <button className="btn btn-pagination" onClick={() => prevPage()} >
                    {'<'}
                    </button>{' '}
                    <button className="btn btn-pagination" onClick={() => nxtPage()}>
                    {'>'}
                    </button>{' '}
                    <button className="btn btn-pagination" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                    </button>{' '}
                </div>
                <div className="col-md-2">
                    <span>
                    PÁGINA {' '}
                    <strong>
                        {pageIndex + 1} DE {pageOptions.length}
                    </strong>{' '}
                    </span>
                </div>
                <div className="col-md-2">
                    <span>
                    | IR A LA PÁGINA:{' '}
                    <input
                        className="form-control input-sm"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                    </span>{' '}
                </div>

                <div className="col-md-5">
                    <select
                    className="form-control input-sm"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        MOSTRAR {pageSize}
                        </option>
                    ))}
                    </select>
                </div>
                
            </div>
        </div>

        <br />
        {/* se comenta sive para debugear que filtros se estan aplicando
         <div>
            <pre>
                <br />
                {console.log(state.filters)}
                <code>{JSON.stringify(state.filters, null, 2)}</code>
            </pre>
        </div>  */}
        </>
    )
}
