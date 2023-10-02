//se importa react
import React from 'react'
/*se importa el componente MyChart este se encarga de mostrar y manipular la grafica de acuerdo a los controles 
  este componente funciona en bases como Sarai, Historico.
*/
import { MyChart } from './MyChart'
/* 
  El componente resultante a su vez  pueden ser una serie de pestañas con categorias especificas de graficas
  de igual forma si se quieren mas categorias se tienen que añadir en este tipo de archivos
*/
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
                {/* 
                  Paramtros de entrada para el componente:
                  Tipo de grafica,
                  Endpoint de donde sacara la informacion (proviene de GraficasApi)
                  titulo
                  En nombre del campo que sera representado en el eje x 
                  El nombre del campo que sera representado en el eje y
                  si los datos tienen agrupacion especifica o ese control, debe ir el nombre del campo por el que se agrupan
                  etiqueta es un parametro algo complicado, separado por comas deben de ir todos los grupos que pertecen a una
                  misma columna de x, se entiende mejor visualizando las graficas
                  indexAxis es para cambiar o "girar" la orientacion de la grafica
                  avanzada representa la cantidad y complejidad de los controles
                */}

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
