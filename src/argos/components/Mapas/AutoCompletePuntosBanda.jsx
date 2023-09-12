import React, { useState } from 'react'
//import './App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const AutoCompletePuntosBanda = ({data,handleBandaPuntosIdentificados}) => {

    // console.log('REFERENCIA DE LA FUNCION', handleFaltaDelitoEspecifico)
    // console.log(data)

   const [items, setItems] = useState([])
  // note: the id field is mandatory
  let itemsFD = []
  data.forEach(dato => {
    itemsFD.push({id: dato.indice, name: dato.banda})
} )

  

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
    handleBandaPuntosIdentificados(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const handleOnClear = () => {
    handleBandaPuntosIdentificados({id:9999,name: ''})
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="">Banda: </label>
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