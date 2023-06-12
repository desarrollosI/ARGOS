/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/

//Se realizan las importaciones de react
import React from "react";
import { Mapa } from "../components/Mapas/Mapa";

export const GeoanalisisPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="titulo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              Geoanálisis
            </h1>
          </div>
          <hr />
        </div>
        <div className="row">
          <Mapa/>
        </div>
      </div>
    </>
  );
};
