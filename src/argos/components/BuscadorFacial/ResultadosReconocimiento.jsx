/*
    Este componente califica como un HOC su funcion es encapsular los componentes que 
    imprimen los diferentes resultados dependiendo de la base de datos
    El componente recibe como parametro los resultados que son parecidos con la imagen de entrada
    y el lugar de el que proceden para saber que tipo de componente es el que se va a renderizar
*/ 
import {CardReconocimientoFacial,CardReconocimientoFacialInsp,CardReconocimientoFacialHist} from '../BuscadorFacial';

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