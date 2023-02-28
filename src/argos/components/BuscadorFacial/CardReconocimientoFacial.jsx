import { useState } from "react";
import { Link } from "react-router-dom";

import Zoom from 'react-medium-image-zoom'

import "../css/BuscadorFacial/card.css";
import 'animate.css';
import 'react-medium-image-zoom/dist/styles.css'

const separarFichaRemision = ({ _label }) => {
  let newLabel = _label.split(",");
  newLabel[0] = newLabel[0].split(" ");
  newLabel[1] = newLabel[1].trim();
  newLabel[1] = newLabel[1].split(" ");
  let url =
    "http://172.18.0.25/sarai/public/files/Remisiones/" +
    newLabel[0][1] +
    "/FotosHuellas/" +
    newLabel[1][1] +
    "/rostro_frente.jpeg";
    
  return {url,remision:newLabel[1][1],ficha:newLabel[0][1]};
};

export const CardReconocimientoFacial = ({ parecido }) => {
  console.log('ENTRO A LA TARJETA')
  const [zoomFlag, setZoomFlag] = useState(false);

  const handleSetFlag = () => {
    setZoomFlag(!zoomFlag);
  };

  const{url,remision} = separarFichaRemision(parecido);

  return (
    <div className="card mt-2 ms-2 animate__animated animate__fadeIn" style={{ width: "20rem" }}>
       <Zoom>
        <img
          className="card-img-top mt-2"
          src={url}
          alt="Card image cap"
        />
       </Zoom>
      <div className="card-body">
        <div className="row">
          <p className="card-text">{parecido._label}, Porcentaje: {100-(parecido.distance*100)} %</p>
        </div>
        <div className="row">
          <Link to={`/remision/${remision}`} target="_blank">
            Ver mas...
          </Link>
        </div>
      </div>
    </div>
  );
};
