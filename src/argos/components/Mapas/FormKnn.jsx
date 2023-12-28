import React, { useState } from 'react';
import { useForm } from '../../../hooks';
import { knnApi } from '../../../api';
import Swal from 'sweetalert2';

const coordenadasFormFields = {
  coordx: '',
  coordy: '',
  diasemana: '',
  tiempo: ''
};

export const FormKnn = ({ setCoordenadasFlyTo }) => {

    const [isLoadingData, setIsLoadingData] = useState(false);
    const { coordx, coordy, diasemana, tiempo, onInputChange } = useForm(coordenadasFormFields);

    const fetchKnn = async (endpoint) => {
    try {
        setIsLoadingData(true)
        const response = await knnApi.post(endpoint,{coordx, coordy, diasemana, tiempo});
        console.log(response)
        //setSetDataResultadoBusqueda(response.data.data)
        Swal.fire('Prediccion realizada', `Prediccion: ${response.data.data.prediccion} DIA: ${response.data.data.dia} HORARIO: ${response.data.data.rango}`, 'info');
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
            <h3>Buscar coordenadas</h3>
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
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label">Día:</label>
              <select
                name="diasemana"
                id="diasemana"
                className="form-select"
                value={diasemana}
                onChange={onInputChange}
              >
                <option value="">Seleccionar Día</option>
                <option value="LUNES">Lunes</option>
                <option value="MARTES">Martes</option>
                <option value="MIERCOLES">Miércoles</option>
                <option value="JUEVES">Jueves</option>
                <option value="VIERNES">Viernes</option>
                <option value="SABADO">Sábado</option>
                <option value="DOMINGO">Domingo</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label">Tiempo:</label>
              <select
                name="tiempo"
                id="tiempo"
                className="form-select"
                value={tiempo}
                onChange={onInputChange}
              >
                <option value="">Seleccionar Tiempo</option>
                <option value="MAÑANA">Mañana</option>
                <option value="TARDE">Tarde</option>
                <option value="NOCHE">Noche</option>
                <option value="MADRUGADA">Madrugada</option>
              </select>
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
