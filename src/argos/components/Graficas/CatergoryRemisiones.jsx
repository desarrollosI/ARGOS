import React from 'react'
import { MyChart } from './MyChart'

export const CatergoryRemisiones = () => {
  return (
    <>
    
    <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item" role="presentation">
        <button className="nav-link active" id="instancia-tab" data-bs-toggle="tab" data-bs-target="#instancia" type="button" role="tab" aria-controls="instancia" aria-selected="true">POR INSTANCIA</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="genero-tab" data-bs-toggle="tab" data-bs-target="#genero" type="button" role="tab" aria-controls="genero" aria-selected="false">POR GÉNERO</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="edad-tab" data-bs-toggle="tab" data-bs-target="#edad" type="button" role="tab" aria-controls="edad" aria-selected="false">POR EDAD</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="respondiente-tab" data-bs-toggle="tab" data-bs-target="#respondiente" type="button" role="tab" aria-controls="respondiente" aria-selected="false">POR PRIMER RESPONDIENTE</button>
    </li>
    <li className="nav-item" role="presentation">
        <button className="nav-link" id="colonia-tab" data-bs-toggle="tab" data-bs-target="#colonia" type="button" role="tab" aria-controls="colonia" aria-selected="false">POR COLONIA</button>
    </li>
    </ul>
    <div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="instancia" role="tabpanel" aria-labelledby="instancia-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
            <MyChart configuracion={
                {
                tipo:'barra',
                endpoint:'remisiones-por-instancia',
                titulo:'TOTAL DE REMISIONES',
                x:'Instancia', 
                y:'total',
                agrupacion:'Instancia',
                etiqueta:'',
                indexAxis:'x',
                avanzada: 1
                }}
            />
            </div>
        </div>
    </div>
    <div className="tab-pane fade" id="genero" role="tabpanel" aria-labelledby="genero-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
            <MyChart configuracion={
            {
              tipo:'barra',
              endpoint:'remisiones-por-instancia-genero',
              titulo:'TOTAL DE REMISIONES POR GÉNERO',
              x:'Instancia', 
              y:'suma_hombres,suma_mujeres',
              agrupacion:'Instancia',
              etiqueta:'',
              indexAxis:'x',
              avanzada: 1
            }}
          />
            </div>
        </div>
    </div>
    <div className="tab-pane fade" id="edad" role="tabpanel" aria-labelledby="edad-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChart configuracion={
                {
                tipo:'barra',
                endpoint:'remisiones-por-instancia-edad',
                titulo:'TOTAL DE REMISIONES POR POR EDAD',
                x:'Instancia', 
                y:'0-5,6-10,11-15,16-20,21-25,26-30,31-35,36-40,41-45,46-50,51-55,56-60,61-65,66-70,71-75,76-80,81-85,86-90,91-95,96-100',
                agrupacion:'Instancia',
                etiqueta:'',
                indexAxis:'x',
                avanzada: 1
                }}
            />
            </div>
        </div>
    </div>
    <div className="tab-pane fade" id="respondiente" role="tabpanel" aria-labelledby="respondiente-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChart configuracion={
                {
                tipo:'barra',
                endpoint:'remisiones-por-primer-respondiente',
                titulo:'TOTAL DE REMISIONES POR PRIMER RESPONDIENTE',
                x:'Sector_Area', 
                y:'total',
                agrupacion:'Sector_Area',
                etiqueta:'Sector_Area',
                indexAxis:'y',
                avanzada: 1
                }}
                />
            </div>
        </div>
    </div>
    <div className="tab-pane fade" id="colonia" role="tabpanel" aria-labelledby="colonia-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChart configuracion={
                {
                tipo:'barra',
                endpoint:'remisiones-por-colonia-domicilio',
                titulo:'TOTAL DE REMISIONES POR COLONIA DOMICILIO DETENIDO - TOP 100',
                x:'Colonia', 
                y:'total',
                agrupacion:'Colonia',
                etiqueta:'Colonia',
                indexAxis:'y',
                avanzada: 2
                }}
                />
            </div>
        </div>
    </div>
    </div>
    
    </>
  )
}
