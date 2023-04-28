/*
  Es un componente sencillo el cual recibe el mensaje que va a imprimir
  usado para poder los mensajes de carga, exitosa, no exitosa, o de espera
  de respuesta del backend de reconocimiento facial
*/
export const LoadingFace = ({message}) => {
    return (
      <>
        <div className="row ms-2 mt-2">
            <div className={"alert alert-"+message[1]} role="alert">
            <strong>{message[0]}</strong>
            </div>
        </div>
      </>
    );
  }