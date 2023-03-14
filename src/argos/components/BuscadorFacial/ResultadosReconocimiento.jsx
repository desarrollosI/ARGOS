import {CardReconocimientoFacial,CardReconocimientoFacialInsp} from '../BuscadorFacial';
import { CardReconocimientoFacialHist } from './CardReconocimientoFacialHist';

export const ResultadosReconocimiento =({parecidos,lugar}) =>{
    switch(lugar){
      case 'remisiones':
            return(
              <>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="row mt-3"><h3>Resultados Remisiones: </h3></div>
                          <div className="row row-cols-2 d-flex justify-content-around">
                              { 
                                  parecidos.map(parecido => {
                                      return <CardReconocimientoFacial key={parecido._label} parecido={parecido}/>
                                  })
                              }
                          </div>
                      </div>
                  </div>
              </>
        )
      case 'inspecciones':
          return (
              <>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="row mt-3"><h3>Resultados Inspecciones: </h3></div>
                          <div className="row row-cols-2 d-flex justify-content-around">
                              { 
                                  parecidos.map(parecido => {
                                      return <CardReconocimientoFacialInsp key={parecido._label} parecido={parecido}/>
                                  })
                              }
                          </div>
                      </div>
                  </div>
              </>
          )
      case 'historicos':
          return (
              <>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="row mt-3"><h3>Resultados Historicos: </h3></div>
                          <div className="row row-cols-2 d-flex justify-content-around">
                              { 
                                  parecidos.map(parecido => {
                                      return <CardReconocimientoFacialHist key={parecido._label} parecido={parecido}/>
                                  })
                              }
                          </div>
                      </div>
                  </div>
              </>
          )
  
    }
  }