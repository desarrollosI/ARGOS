/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/

//se importa react
import React, { useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-elastic-carousel'

import './css/inicio.css';

import busqueda from '../../assets/bus.jpg';
import estadistica from '../../assets/est.jpg';
import geoanalisis from '../../assets/geo.jpg';
import reconocimiento from '../../assets/rf.jpg';



const Card = ({ card }) => (
  <div className="card" style={{minWidth:'500px'}}>
    <h3 className="text-center">{card.titulo}</h3>
    <ul className="me-4">
      {card.actualizaciones.map((actualizacion,index) => (<li key={index}>{actualizacion}</li>))}
    </ul>
      {card.desc}
  </div>
);

const actualizaciones = [
  {
    "titulo": "A.R.G.O.S. RC-3.0.0",
    "actualizaciones": [
      "Nueva Interfaz de Usuario",
      "Carga de bases de datos dinamica",
      "Multiples capas personalizadas en el mapa",
      "Capa de calor estatica",
      "Ahora se muestran nombres en RF"
    ]
  },
  {
    "titulo": "A.R.G.O.S. RC-2.7.0",
    "actualizaciones": [
      "Nueva Interfaz de Usuario",
      "Correciones en el poligono personalizado",
      "Correcciones en el filtro de fechas"
    ]
  },
  {
    "titulo": "A.R.G.O.S. RC-2.6.3",
    "actualizaciones": [
      "Solucionado problema de carga del módulo de Geoanálisis",
      "Añadida la navegacion por coordenadas",
      "Reeestructuracion del Módulo de estadística",
      "Añadidas gráficas SIC"
    ]
  },
  {
    "titulo": "A.R.G.O.S. RC-2.5.0",
    "actualizaciones": [
      "Añadida capa Puntos Identificados",
      "Añadida Vista Atlas",
      "Añadida Vista Eventos Delictivos",
      "Correccion en el catalogo de Falta/Delito ya no se repiten opciones",
      "Inicio de reestructuracion del Modulo Estadistica"
    ]
  },
  {
    "titulo": "A.R.G.O.S. RC-2.1.0",
    "actualizaciones": [
      "Añadida Vista Incidencia Delictiva",
      "Añadida Vista Eventos SIC",
      "Añadido Filtro FaltaDelito En Geoanalisis SIC",
      "Añadido el Domicilio Detenido en las busquedas Datos Personales, y Busqueda General"
    ]
  }
]
// Componente InicioPage
export const InicioPage = () => {

  const itemsPerPage = 2
  const items = actualizaciones
  const carouselRef = useRef(null);
  const totalPages = Math.ceil(items.length / itemsPerPage)
  let resetTimeout;

  return (
    <div className="container-fluid content">
      <div className="row card shadow">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center titulo">Bienvenida(o) al</h1>
            <h4 className="text-center subtitulo" > Sistema de Inteligencia policial con módulos especializados para el análisis de Información criminal.</h4>
          </div>
        </div>
        <div className="row d-flex justify-content-around mb-5">
          <div className="col-md-2">
            <img className="imagen" src={busqueda} width={300} alt="busqueda" />
          </div>
          <div className="col-md-2">
            <img className="imagen" src={reconocimiento} width={300} alt="reconocimiento" />
          </div>
          <div className="col-md-2">
            <img className="imagen" src={geoanalisis} width={300} alt="geoanalisis" />
          </div>
          <div className="col-md-2">
            <img className="imagen" src={estadistica} width={300} alt="estadistica" />
          </div>
        </div>

        <div className="row d-flex justify-content-around mb-5">
          <div className="col-md-2">
            <h5 className="text-center modulo">Buscador de Información</h5>
          </div>
          <div className="col-md-2">
            <h5 className="text-center modulo">Reconocimiento Facial</h5>
          </div>
          <div className="col-md-2">
            <h5 className="text-center modulo">Geoanálisis</h5>
          </div>
          <div className="col-md-2">
            <h5 className="text-center modulo">Estádistica</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-5">
            {/* Utiliza ReactCaroussel en lugar de Carousel */}
            <Carousel 
            ref={carouselRef}
            itemsToShow={2}
            enableAutoPlay
            autoPlaySpeed={4000}
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout)
              if (index + 1 === totalPages) {
                 resetTimeout = setTimeout(() => {
                    carouselRef.current.goTo(0)
                }, 1500) // same time
              }
         }}>
             
               {actualizaciones.map((actualziacion, index) => (
                <div key={actualziacion.titulo}>
                  <Card className="ms-2"card={actualziacion} />
                </div>
              ))} 
            </Carousel>


          </div>
        </div>
      </div>
    </div>
  );
};
