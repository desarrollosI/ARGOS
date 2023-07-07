import React, { useState } from 'react'
//import './App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const AutoCompleteFD = ({data,handleFaltaDelitoEspecifico}) => {

    // console.log('REFERENCIA DE LA FUNCION', handleFaltaDelitoEspecifico)
    // console.log(data)

   const [items, setItems] = useState([])
  // note: the id field is mandatory
  let itemsFD = []
   data.forEach(dato => {
        itemsFD.push({id: dato.Id_Falta_Delito, name: dato.Descripcion})
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
    handleFaltaDelitoEspecifico(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const handleOnClear = () => {
    handleFaltaDelitoEspecifico({id:9999,name: ''})
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
            // styling={{backgroundColor: "black"}}
          />
        </div>
      </header>
    </div>
  )
}

// export default App