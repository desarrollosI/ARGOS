/* 
  Este componente solo es un mensaje de alerta para indicar cuando el usuario ha 
  o no seleccionado un filtro.
*/

export const TableHolder = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="alert alert-info" role="alert">
                    Debe de seleccionar una opción primero.
                </div>
            </div>
        </div>
    </div>
  )
}
