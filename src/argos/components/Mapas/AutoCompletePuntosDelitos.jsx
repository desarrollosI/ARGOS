//se importa react
import React, { useState } from 'react'
//se importa el componente de terceros
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const AutoCompletePuntosDelitos = ({data,handleFaltaDelitoEspecificoPuntosIdentificados}) => {

/* 
  Como el nombre indica el componente es un input que recibe de datos de entrada 
  un catalogo, en concreo de faltas y delitos y el handler para almacenar la respuesta seleccionada
*/
   const [items, setItems] = useState([])
  let itemsFD = []
  data.forEach(dato => {
    itemsFD.push({id: dato.indice, name: dato.delito})
} )

  
    //todas estas funciones se dejan por si en algun punto es necesario utilizarlas, son handlers, parecido a funciones de un hook
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    handleFaltaDelitoEspecificoPuntosIdentificados(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const handleOnClear = () => {
    handleFaltaDelitoEspecificoPuntosIdentificados({id:9999,name: ''})
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

    /*
    El retorno del componente como se tiene es un input que va mostrando
    opciones para seleccionar de acuerdo a la entrada del usuario
  */

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="">Falta o Delito: </label>
        </div>
        <div style={{ width: 300 }}>
          <ReactSearchAutocomplete
            items={itemsFD}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            autoFocus
            formatResult={formatResult}
            styling={{
              maxWidth: "50px",
              height: "30px",
              border: "1px solid #dfe1e5",
              borderRadius: "24px",
              backgroundColor: "white",
              boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
              hoverBackgroundColor: "#eee",
              color: "#212121",
              fontSize: "12px",
              fontFamily: "Arial",
              iconColor: "grey",
              lineColor: "rgb(232, 234, 237)",
              placeholderColor: "grey",
              clearIconMargin: '1.5px 7px 0 0',
              searchIconMargin: '0 0 0 8px'
            }}
          />
        </div>
      </header>
    </div>
  )
}

// export default App