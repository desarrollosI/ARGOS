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
import './category.css';
import { ReportesEspeciales } from '../Reportes';
export const CategoryChart = () => {
  return (
    <div className="row d-flex align-items-start content ">
    <div className="row min-space">
        <div className="col-md-1 mt-2 botones-busqueda">
            <div className="nav flex-column nav-pills me-3 col-md-1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active bd-selector mt-2" id="v-pills-sarai-tab" data-bs-toggle="pill" data-bs-target="#v-pills-remisiones" type="button" role="tab" aria-controls="v-pills-remisiones" aria-selected="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-person-exclamation" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                    </svg>
                    <b className='small-text'>ESTADÍSTICA REMISIONES</b>
                </button>
                <button className="nav-link bd-selector" id="v-pills-sic-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sic" type="button" role="tab" aria-controls="v-pills-sic" aria-selected="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                    <b className='small-text'>ESTADÍSTICA AURA</b> 
                </button>
                <button className="nav-link bd-selector" id="v-pills-historico-tab" data-bs-toggle="pill" data-bs-target="#v-pills-historico" type="button" role="tab" aria-controls="v-pills-historico" aria-selected="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                    <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z"/>
                    </svg>
                    <b className='small-text'>ESTADÍSTICA HISTORICO</b>
                </button>
                <button className="nav-link bd-selector" id="v-pills-reportes-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reportes" type="button" role="tab" aria-controls="v-pills-reportes" aria-selected="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0M2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                </svg>
                    <b className='small-text'>REPORTES ESPECIALES</b>
                </button>
            </div>
        </div>
        <div className="ms-3 col-md-10">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-remisiones" role="tabpanel" aria-labelledby="v-pills-remisiones-tab">
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
                <div className="tab-pane fade" id="v-pills-reportes" role="tabpanel" aria-labelledby="v-pills-reportes-tab">
                    <div className="row my-3">
                        <ReportesEspeciales/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
  )
}
