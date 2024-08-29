import React, { useState } from 'react';
import { useForm } from '../../../hooks';
import { knnApi } from '../../../api';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';

const coordenadasFormFields = {
  coordx: '',
  coordy: '',
};

export const FormKnn = ({ setCoordenadasFlyTo }) => {

    const [isLoadingData, setIsLoadingData] = useState(false);
    const { coordx, coordy, onInputChange } = useForm(coordenadasFormFields);

    const fetchKnn = async (endpoint) => {
    try {
        setIsLoadingData(true)
        const response = await knnApi.post(endpoint,{coordx, coordy});
        console.log(response)
        //setSetDataResultadoBusqueda(response.data.data)
        const {data} = response.data
        let predicciones = data.nuevas_predicciones_formateadas;
        console.log('PREDICCIONES', predicciones);
        const tableHtml = ReactDOMServer.renderToString(
          <table border="1" className="table table-striped" style={{ margin: "auto !important", width: "80% !important" }}>
            <thead>
              <tr>
                <th></th>
                {Object.keys(predicciones).map(dia => <th>{dia}</th>)}
              </tr>
            </thead>
            <tbody>
              {['MAÑANA', 'TARDE', 'NOCHE', 'MADRUGADA'].map(horario => (
                <tr className="mt-1">
                  <td style={{ padding: "10px !important", width:"200px" }}><strong>{horario}</strong></td>
                  {Object.keys(predicciones).map(dia => <td style={{ padding: "10px !important" }}>{predicciones[dia][horario]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        );

        Swal.fire({
          title: 'Predicción realizada',
          html: `
            <h3>MODELO K-NN (K-Nearest Neighbors)</h3>
            <h5>Coordenadas de interpretación: (${coordx}, ${coordy})</h5>
            <p style="margin: auto !important; width: 80% !important; margin-bottom: 20px !important;">
            K-NN, o K-Vecinos Más Cercanos, es un método de clasificación en aprendizaje supervisado no
            paramétrico que se basa en la proximidad entre puntos de datos para realizar predicciones o
            clasificaciones individuales. Aquí se presenta una tabla que detalla los resultados del modelo de
            clasificación K-NN, identificando el delito más probable por día y franja horaria. El valor k en el
            algoritmo k-NN define cuántos vecinos se verificarán para determinar la clasificación de un punto de
            consulta específico, en el caso del presente es K=15.
            </p>
          ${tableHtml}
          `,
          icon: 'info',
          width: '90vw'  // Cambia esto al ancho que desees
        });
      
        setIsLoadingData(false)
        } catch (error) {
        console.log(error.response);
        }
    }    

  const FlyTo = (event) => {
    event.preventDefault();
    setCoordenadasFlyTo([Number(coordx), Number(coordy)]);
        fetchKnn('/generar-knn-especifico')
  };

  return (
    <div className="container">
      <form onSubmit={FlyTo} className="my-3">
        <div className="row">
          <div className="col-md-12">
            <h3>Realizar Predicciones en las coordenadas: </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label">Coordenada X, Negativa:</label>
              <input
                type="text"
                name="coordx"
                id="coordx"
                className="form-control"
                value={coordx}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label">Coordenada Y, Positiva:</label>
              <input
                type="text"
                name="coordy"
                id="coordy"
                className="form-control"
                value={coordy}
                onChange={onInputChange}
              />
            </div>
          </div>
        
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <button className="btn btn-primary float-end">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
};
