import React from 'react'
import { MyChart } from './MyChart'

export const CatergoryHistorico = () => {
  return (
    <>
    
    <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item" role="presentation">
        <button className="nav-link active" id="instancia-hist-tab" data-bs-toggle="tab" data-bs-target="#instancia-hist" type="button" role="tab" aria-controls="instancia-hist" aria-selected="true">POR INSTANCIA</button>
    </li>
    </ul>
    <div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="instancia-hist" role="tabpanel" aria-labelledby="instancia-hist-tab">
        <div className="row d-flex justify-content-around ">
            <div className="col-md-8 my-3 card shadow">
                <MyChart configuracion={
                {
                tipo:'barra',
                endpoint:'remisiones-por-instancia-historico',
                titulo:'TOTAL DE REMISIONES',
                x:'Remitido_a', 
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

    </div>
    
    </>
  )
}
