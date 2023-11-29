/*
  En este archivo se encuentran diferentes mini componentes, son inpunts , que ayudan a definir
  los filtros de la informacion conforme se vaya necesitando, asi mismo dentro de cada filtro
  se tiene la logica que los controla.
*/
//Se importan los componentes propios de react
import React from 'react'
//se importan los componentes propios de react table
import { useAsyncDebounce } from 'react-table'
// se importa la bibliotecha de match sorterm es la encargada de buscar informacion dado un texto de entrada
import {matchSorter} from 'match-sorter'
// se importa traductor hacia javascript
import "babel-polyfill";
// Este componente es el que se encarga de realizar el filtrado global en todas las columnas de la tabla
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 4000)
  
    return (
      <span>
        BÚSQUEDA GENERAL:{' '}
        <input
          className="form-control"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} REGISTROS...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  //esta funcion devuelve la interfaz del filtro general
  // Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        className="form-control"
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`BUSCAR ${count} REGISTROS`}
      />
    )
  }
  
  // This is a custom filter UI for selecting
  // a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        className="form-control"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">TODOS</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  // This is a custom filter UI that uses a
  // slider to set the filter value between a column's
  // min and max values
export function SliderColumnFilter({
      column: { filterValue, setFilter, preFilteredRows, id },
      }) {
      // Calculate the min and max
      // using the preFilteredRows
  
      const [min, max] = React.useMemo(() => {
          let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          preFilteredRows.forEach(row => {
          min = Math.min(row.values[id], min)
          max = Math.max(row.values[id], max)
          })
          return [min, max]
      }, [id, preFilteredRows])
  
      return (
          <>
          <input
              className="form-control"
              type="range"
              min={min}
              max={max}
              value={filterValue || min}
              onChange={e => {
              setFilter(parseInt(e.target.value, 10))
              }}
          />
          <button onClick={() => setFilter(undefined)}>Off</button>
          </>
      )
  }
  
  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
export function NumberRangeColumnFilter({
      column: { filterValue = [], preFilteredRows, setFilter, id },
      }) {
      const [min, max] = React.useMemo(() => {
          let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          preFilteredRows.forEach(row => {
          min = Math.min(row.values[id], min)
          max = Math.max(row.values[id], max)
          })
          return [min, max]
      }, [id, preFilteredRows])
  
      return (
          <div
          style={{
              display: 'flex',
          }}
          >
          <input
              className="form-control"
              value={filterValue[0] || ''}
              type="number"
              onChange={e => {
              const val = e.target.value
              setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
              }}
              placeholder={`Min (${min})`}
              style={{
              width: '70px',
              marginRight: '0.5rem',
              }}
          />
          A
          <input
              className="form-control"
              value={filterValue[1] || ''}
              type="number"
              onChange={e => {
              const val = e.target.value
              setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
              }}
              placeholder={`Max (${max})`}
              style={{
              width: '70px',
              marginLeft: '0.5rem',
              }}
          />
          </div>
      )
  }
  
  //Este es el filtro que se encarga de obtener la información basado en un texto de entrada.
export function fuzzyTextFilterFn(rows, id, filterValue) {
      return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  // Esta funcion realiza la busqueda entre dos rangos de fehcas,
  //hace los ajustes necesarios y la reconversion de los mismos para empatar las horas
  export function dateBetweenFilterFn(rows, id, filterValues) {
    
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
    if(sd!= undefined) sd.setHours(sd.getHours() + 6)

    if (ed || sd) {

      return rows.filter((r) => {
        // format data
        var dateAndHour = r.values[id].split(" ");
        var [year, month, day] = dateAndHour[0].split("-");
        var date = [year, month, day].join("-");
        var hour = dateAndHour[1];
        var formattedData = date + " " + hour;
  
        const cellDate = new Date(formattedData);
  
        if (ed && sd) {
          return cellDate >= sd && cellDate <= ed;
        } else if (sd) {
          //sd.setHours(sd.getHours() + 6)
          return cellDate >= sd;
        } else {
          //e//d.setHours(ed.getHours() + 6)
          return cellDate <= ed;
        }
      });
    } else {
      return rows;
    }
  }
  
  // esta funcion realiza el renderizado de los dos inputs para establecer las fechas
  //minima y maxima para el filtrado
  export function DateRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id }
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length
        ? new Date(preFilteredRows[0].values[id])
        : new Date(0);
      let max = preFilteredRows.length
        ? new Date(preFilteredRows[0].values[id])
        : new Date(0);
  
      preFilteredRows.forEach((row) => {
        const rowDate = new Date(row.values[id]);
  
        min = rowDate <= min ? rowDate : min;
        max = rowDate >= max ? rowDate : max;
      });
      //console.log({min,max})
      return [min, max];
    }, [id, preFilteredRows]);
  
    return (
      <div>
        <input  className="form-control"
          min={min.toISOString().slice(0, 10)}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              val ? val.concat("") : undefined, 
              old[1]
            ]);
          }}
          type="date"
          value={filterValue[0] || ""}
        />
        {" HASTA "}
        <input  className="form-control"
          max={max.toISOString().slice(0, 10)}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              old[0],
              val ? val.concat(" 23:59") : undefined //"T23:59:59.999Z"
            ]);
          }}
          type="date"
          value={filterValue[1]?.slice(0, 10) || ""}
        />
      </div>
    );


    
  }
  


  export function TextColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const count = preFilteredRows.length;
  
    const onChange = useAsyncDebounce((value) => {
      setFilter(id, value || undefined);
    }, 4000);
  
    return (
      <input
        className="form-control"
        value={filterValue || ''}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={`Buscar (${count} registros)`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    );
  }