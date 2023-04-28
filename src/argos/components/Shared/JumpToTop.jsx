/*
  La funcionalidad de este componente es la de un boton flotante
  que redirige la pantalla hacia el tope superior, acutalmente implementado en el buscador
  para facilitar el volver a donde se encuentran los menú superiores al tener
  muchas instancias de búsqueda.
*/
//Se importan los componentes propios de React
import React, { useState } from 'react'
//Se importan los estilos propios del componente
import '../css/Shared/JumpToTop.css';

/* La exportacion del componente es un boton flotante con la capacidad de desplazarce al inicio de la pagina*/
export const JumpToTop = () => {


    const [visible, setVisible] = useState(false)//se crea el estado para hacerlo visible o invisible dependiendo de la view height
  // Se crea la funcion para hacer visible o invisible el botón de forma dinámica, esta funcion es la que manipula el estado del componente
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300){
        setVisible(true)
      } 
      else if (scrolled <= 300){
        setVisible(false)
      }
    };

    //Se crea la funcion que realiza la navegacion de la pantalla seteando las coordenadas Y en 0 y haciendolo de manera amigable
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };

    window.addEventListener('scroll', toggleVisible);
    //Por ultimo se retirna el componente con las asociaciones a sus variables de estado necesarias.
  return (
    <button
        className='btn bot-toTop'
        onClick={scrollToTop}
        style={{display: visible ? 'inline' : 'none'}}
    >   
        ^
    </button>
  )
}
