/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/

//Se realizan las importaciones de react
import React, { useState, useEffect, useRef } from "react";
//se importan los helpers necesarios
import { loadModels } from "../helpers";

//se importan los componentes necesarios 
import { BuscadorFacial, LoadingSpinner } from "../components/";

/* 
  Esta pagina es un poco diferente, puesto que tiene un estado propio, este estado es necesario
  para poder saber cuando se cargarn los modulos de inteligencia artificial
*/
export const ReconocimientoPage = () => {
  const [initializing, setInitializing] = useState(true);
// Este efecto lo que hace es disparar apenas se cargue el componente, los modelos de IA, cuando se terminan de cargar se vuelve a un estado sin cargar
  useEffect(() => {  
    loadModels()
    setInitializing(false);
  }, []);

  return (
    <>
      <div className="container-fluid ms-3 me-3">
        <div className="row card shadow">
          <div className="col">
            <h1 className="titulo">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>{" "}
              Reconocimiento Facial
            </h1>
          </div>
          <hr />
        </div>
        <div className="row">
          {initializing ? <LoadingSpinner /> : <BuscadorFacial />}
        </div>
      </div>
    </>
  );
};
