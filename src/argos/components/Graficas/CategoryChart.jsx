//se importa react
import React from 'react'
//se importan los componentes "hijos" cada uno representa un tab sobre la base de las graficas que contienen
import { CatergoryRemisiones } from './CatergoryRemisiones'
import { CatergoryHistorico } from './CategoryHistorico'
import { CatergorySic } from './CategorySic'
/*El componente es muy sencillo solo es un panel que muestra o oculta determinada pagina dependiendo donde se le de click
conteniendo tres categorias, Renisiones,Sic e Historico, Si se quieren mas categorias se ha de crear
un componente similar y adoc a la base de datos con la que se trabaja 
*/
export const CategoryChart = () => {
  return (
    <div className="row d-flex align-items-start content">
    <div className="row">
        <div className="col-md-1 mt-2">
            <div className="nav flex-column nav-pills me-3 col-md-1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active" id="v-pills-sarai-tab" data-bs-toggle="pill" data-bs-target="#v-pills-remisiones" type="button" role="tab" aria-controls="v-pills-remisiones" aria-selected="true">ESTADÍSTICA REMISIONES</button>
                <button className="nav-link" id="v-pills-sic-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sic" type="button" role="tab" aria-controls="v-pills-sic" aria-selected="false">ESTADÍSTICA SIC</button>
                <button className="nav-link" id="v-pills-historico-tab" data-bs-toggle="pill" data-bs-target="#v-pills-historico" type="button" role="tab" aria-controls="v-pills-historico" aria-selected="false">ESTADÍSTICA HISTORICO</button>
            </div>
        </div>
        <div className="ms-3 col-md-10">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show" id="v-pills-remisiones" role="tabpanel" aria-labelledby="v-pills-remisiones-tab">
                    <div className="row my-3">
                        <CatergoryRemisiones/>
                    </div>
                </div>
                <div className="tab-pane fade" id="v-pills-sic" role="tabpanel" aria-labelledby="v-pills-sic-tab">
                    <div className="row my-3">
                        <CatergorySic/>
                    </div>
                </div>
                <div className="tab-pane fade" id="v-pills-historico" role="tabpanel" aria-labelledby="v-pills-historico-tab">
                    <div className="row my-3">
                        <CatergoryHistorico/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
  )
}
