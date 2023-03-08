
import Zoom from 'react-medium-image-zoom'

import "../css/BuscadorFacial/card.css";
import 'animate.css';
import 'react-medium-image-zoom/dist/styles.css';
import { Link } from 'react-router-dom';

let guardar
const separarFichaInspeccion = ({ _label }) => {
    let newLabel = _label.split(" ");
    //console.log(newLabel);
    guardar = newLabel[1]
    newLabel.shift()
    newLabel.shift()
    let file = newLabel.join(' ');
    let url =
        "http://172.18.0.25/sarai/public/files/inspecciones/images/" +
        guardar+
        "/"+
        file;
  return {url,inspeccion:guardar};
};

export const CardReconocimientoFacialInsp = ({ parecido }) => {
  //console.log(parecido)

  const {url,inspeccion} = separarFichaInspeccion(parecido);

  return (
    <div className="card mt-2 ms-2 animate__animated animate__fadeIn" style={{ width: "20rem"}}>
      <Zoom>
        <img
          className="card-img-top mt-2"
          src={url}
          alt="Persona Inspeccionada"
        />
      </Zoom>
      <div className="card-body">
        <p className="card-text">Inspeccion {guardar}, Procentaje: {100-(parecido.distance*100)} %</p>
      </div>
      <div className="row">
        <Link to={`/inspeccion/${inspeccion}`} target="_blank">
          Ver mas...
        </Link>
      </div>
    </div>
  );
};
