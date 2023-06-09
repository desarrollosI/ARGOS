/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/
//Se realizan las importaciones de react
import React from "react";
import { MyChart } from "../components";
//Se importan los componentes necesarios


export const EstadisticaPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
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
              Estádistica
            </h1>
          </div>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <MyChart configuracion={
            {
              tipo:'barra',
              endpoint:'remisiones-por-instancia',
              titulo:'TOTAL DE REMISIONES',
              x:'Instancia', 
              y:'total',
              agrupacion:'Instancia',
              etiqueta:'',
              avanzada: true
            }}
          />
        </div>
        <div className="col-md-6  mb-3">
          <MyChart configuracion={
            {
              tipo:'barra',
              endpoint:'remisiones-por-instancia-genero',
              titulo:'TOTAL DE REMISIONES POR GÉNERO',
              x:'Instancia', 
              y:'suma_hombres,suma_mujeres',
              agrupacion:'Instancia',
              etiqueta:'',
              avanzada: true
            }}
          />
        </div>
        <div className="col-md-12  mb-3">
          <MyChart configuracion={
            {
              tipo:'barra',
              endpoint:'remisiones-por-instancia-edad',
              titulo:'TOTAL DE REMISIONES POR POR EDAD',
              x:'Instancia', 
              y:'0-5,6-10,11-15,16-20,21-25,26-30,31-35,36-40,41-45,46-50,51-55,56-60,61-65,66-70,71-75,76-80,81-85,86-90,91-95,96-100',
              agrupacion:'Instancia',
              etiqueta:'',
              avanzada: true
            }}
          />
        </div>
        <div className="col-md-12  mb-3">
          <MyChart configuracion={
            {
              tipo:'barra',
              endpoint:'remisiones-por-primer-respondiente',
              titulo:'TOTAL DE REMISIONES POR PRIMER RESPONDIENTE',
              x:'Sector_Area', 
              y:'total',
              agrupacion:'Sector_Area',
              etiqueta:'Sector_Area',
              avanzada: false
            }}
          />
        </div>
      </div>
    </>
  );
};
