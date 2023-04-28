/* 
  Este componente se le conoce como un skeleton loader
  su funcion es la de ocupar el espacio y forma de el componente
  que se esta previo a renderizar pero que requiere de informacón proveeida por el backend
  para dar la sensación de que se esta realizando una acción
*/
//Se importan los componentes propios de react
import React from "react"
//Se importan los componentes de react-content-loader
import ContentLoader from "react-content-loader"
/*
  Se crea el componente personalizado el cual toma el componente propio de la biblioteca
  utilizando sus funciones y parametros se pueden crear las formas necesarias y adecuarlas
  al tipo de componente que se quiere dar forma en este caso es para las tarjetas de 
  reconocimiento facial, para mas información buscar el repositorio de la biblioteca
*/
//Lo que termina de exportar la funcón no es mas que un svg animado.
export const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={329}
    viewBox="0 0 400 329"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="591" cy="228" r="58" /> 
    <rect x="133" y="91" rx="0" ry="0" width="0" height="1" /> 
    <rect x="17" y="14" rx="0" ry="0" width="369" height="223" /> 
    <rect x="22" y="256" rx="0" ry="0" width="366" height="10" /> 
    <rect x="27" y="277" rx="0" ry="0" width="360" height="10" /> 
    <rect x="22" y="299" rx="0" ry="0" width="100" height="10" />
  </ContentLoader>
)

