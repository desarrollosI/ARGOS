//se importan los componentes de react
import React, { useState } from 'react';
//se importan los componentes de bootstrap
import { Button, ButtonToolbar, Overlay, Popover } from 'react-bootstrap';
//se importan los helpers necesarios para el historial
import { historialApi } from '../../../api';

/* 
  Este componente se encagra de hacer una peticion al backend para solicitar una foto especifica de un registro
  del historial, esto con el fin de hacer que el historial no se sobrecargue 
*/
export const MyPopover = ({id}) => {
  
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [fetchedData, setFetchedData] = useState();

  const fetchData = async(endpont) => {
      setIsLoadingData(true);
      const {data} =  await historialApi.get(endpont);
     
      setFetchedData(data.foto);
      console.log(fetchedData)
      setIsLoadingData(false);
  }


  const handleClick = (e) => {
    fetchData(`/fotografia-facial/${id}`);
    setTarget(e.target);
    setShow(!show);
  };

  const popoverStyle = {
    width: '600px',
  };

  return (
    <ButtonToolbar>
      <Button onClick={handleClick}>Foto</Button>

      <Overlay
        show={show}
        target={target}
        placement="left-start"
        container={this}
        containerPadding={20}
      >
        
          <Popover id="popover-contained" title="Fotografia subida" style={popoverStyle}>
            <img src={fetchedData} alt="imagen cargada" width={300}/> 
          </Popover>
        
      </Overlay>
    </ButtonToolbar>
  );
};
