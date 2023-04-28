/* 
  El componente es un spinner de carga solo se requiren los estilos del mismo,
   la funcionalidad se lleva a cabo con el archivo css
*/
import "../css/Shared/spinner.css";

export const LoadingSpinner =() => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}