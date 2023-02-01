import { useState } from "react";

import "./css/card.css";
let guardar
const separarFichaInspeccion = ({ _label }) => {
    let newLabel = _label.split(" ");
    console.log(newLabel);
    guardar = newLabel[1]
    newLabel.shift()
    newLabel.shift()
    let file = newLabel.join(' ');
    let url =
        "http://172.18.0.25/sarai/public/files/inspecciones/images/" +
        guardar+
        "/"+
        file;
  return url;
};

export const CardReconocimientoFacialInsp = ({ parecido }) => {
  const [zoomFlag, setZoomFlag] = useState(false);

  const handleSetFlag = () => {
    setZoomFlag(!zoomFlag);
  };

  let separado = separarFichaInspeccion(parecido);

  return (
    <div className="card mt-2 ms-2" style={{ width: "20rem"}}>
      {zoomFlag && (
        <div className="lightbox show">
          <div className="borde">
            <img
              className="card-img-top mt-2  show_image2 "
              src={separado}
              alt="Persona Inspeccionada"
              style={{ width: "10rem"}}
              onClick={handleSetFlag}
            />
          </div>
        </div>
      )}
      <img
        className="card-img-top mt-2"
        src={separado}
        alt="Persona Inspeccionada"
        onClick={handleSetFlag}
      />
      <div className="card-body">
        <p className="card-text">Inspeccion {guardar}</p>
      </div>
    </div>
  );
};
