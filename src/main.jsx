/*
  Este es el punto de entrada de la aplicacion el mas alto de todos y el que contiene toda la aplicacion
  se comenta el modo estricto de react se recomienda tenerlo habilitado solo para desarrrollo
  la aplicaicon argos, se encapsula en el router, que es el traductor de react para para manejar las url de la aplicacion
*/
//se importan los componentes propios de react
import React from 'react';
import ReactDOM from 'react-dom/client';
//se importan los router de react el browuser se usa si es un servidor http tipo node, el hash se usa en caso de no tener control directo sobre el servidor
import { BrowserRouter, HashRouter } from 'react-router-dom';
//se importan los componentes personalzados
import { ArgosApp } from './ArgosApp';
//se importan las hojas de estilo de la aplicacion styles por defecto suele ser global
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <HashRouter>
      <ArgosApp />
    </HashRouter>
  // </React.StrictMode>
);
