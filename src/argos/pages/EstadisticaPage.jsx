/*
  Los compoenentes presentados en la carpeta de pages pueden calificar como componentes hoc,
  puesto que su funcion general es ser la vista que muestra en las paginas, y a su vez
  renderizan los componentes mencionados en la carpeta components

  No es algo mas complejo que una  maquetación de la estructura de como se debe de ver determianda pagina
  adoc al nombre
*/
/*
  Tipos de graficas:
  1- controles de agrupacion, ver uno en especifico
  2. sin controles de agrupacion, ver uno en especifico, asendente o desendente
  3. sin controles, solo rango de fechas
*/ 
//Se realizan las importaciones de react
import React from "react";
import { CategoryChart, MyChart, MyChartSIC } from "../components";
//Se importan los componentes necesarios


export const EstadisticaPage = () => {
  return (
    <>

      {/* se creo un nuevo componente funciona como una ventana con paneles de diferentes categorias */}
      <div className="row card shadow ms-1 me-1 reset">
        <CategoryChart/>
      </div>
    </>
  );
};
