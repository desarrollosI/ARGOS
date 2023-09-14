import React from 'react'
import { MyChartSIC } from './MyChartSIC'


export const CatergorySic = () => {
  return (
    <>
    
    <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item" role="presentation">
        <button className="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">GENERAL</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="delito-tab" data-bs-toggle="tab" data-bs-target="#delito" type="button" role="tab" aria-controls="delito" aria-selected="true">POR DELITO</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="mes-tab" data-bs-toggle="tab" data-bs-target="#mes" type="button" role="tab" aria-controls="mes" aria-selected="true">POR MES</button>
    </li>
    </ul>
    <div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChartSIC configuracion={
                {
                    tipo:'barra',
                    endpoint:'eventos-tipo-violencia',
                    titulo:'TOTAL DE EVENTOS',
                    x:'CSviolencia', 
                    y:'total',
                    agrupacion:'SD',
                    etiqueta:'',
                    indexAxis:'x',
                    avanzada: 1
                }} 
                />
            </div>
        </div>
    </div>
    <div className="tab-pane fade show" id="delito" role="tabpanel" aria-labelledby="delito-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChartSIC configuracion={
                {
                    tipo:'dona',
                    endpoint:'eventos-tipo-delito',
                    titulo:'TOTAL DE EVENTOS',
                    x:'Descripcion', 
                    y:'total',
                    agrupacion:'Descripcion',
                    etiqueta:'',
                    indexAxis:'x',
                    avanzada: 2
                }}
                /> 
            </div>
        </div>
    </div>
    <div className="tab-pane fade show" id="mes" role="tabpanel" aria-labelledby="mes-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                 <MyChartSIC configuracion={
                {
                    tipo:'area',
                    endpoint:'eventos-por-mes',
                    titulo:'TOTAL DE EVENTOS POR MES',
                    x:'Mes', 
                    y:'total',
                    agrupacion:'Mes',
                    etiqueta:'',
                    indexAxis:'x',
                    avanzada: 3
                }}
                /> 
            </div>
            {/* <div className="col-md-8 my-3 card shadow">
                <MyChartSIC configuracion={
                {
                    tipo:'bar',
                    endpoint:'eventos-por-ano',
                    titulo:'TOTAL DE EVENTOS POR MES',
                    x:'Ano', 
                    y:'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
                    agrupacion:'Ano',
                    etiqueta:'',
                    indexAxis:'x',
                    avanzada: 3
                }}
                />
            </div> */}
        </div>
    </div>

    </div>
    
    </>
  )
}
