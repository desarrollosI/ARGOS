/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/

//se importa react
import React from "react";

export const InicioPage = () => {
  return (
    <>
      <>
        <div className="container-fluid">
          <div className="row card shadow">
            <div className="col">
              <h1 className="titulo">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  className="bi bi-house-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                </svg>{" "}
                Bienvenido
              </h1>
            </div>
            <hr />
          </div>
          <div className="row card shadow">
            <div className="col-md-12">
              <h3>A.R.G.O.S. RC-2.1.0</h3>
              <ul>
                <li>Añadida Vista Incidencia Delictiva</li>
                <li>Añadida Vista Eventos SIC</li>
                <li>Añadido Filtro FaltaDelito En Geoanalisis SIC</li>
                <li>Añadido el Domicilio Detenido en las busquedas Datos Personales, y Busqueda General</li>
              </ul>
              <h5>A.R.G.O.S. RC-2.0.0</h5>
              <ul>
                <li>Añadido Buscador General</li>
                <li>Añadidas capas de Inspecciones, Eventos Sic en Geoanalisis</li>
                <li>Corrección de las fotos en tarjetas y con zoom se veian blancas</li>
                <li>Corrección las tarjetas del mapa ahora deben alternar correctamente</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
