/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/
//Se realizan las importaciones de react
import React from "react";
//Se importan los componentes necesarios
import { BaseMultiplier } from "../components";
import { JumpToTop } from "../components/Shared/JumpToTop";

export const BuscadorPage = () => {
  return (
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
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>{" "}
              Buscador de Información
            </h1>
          </div>
          <hr />
        </div>
        <BaseMultiplier/>
        <JumpToTop/>
      </div>
    </>
  );
};
