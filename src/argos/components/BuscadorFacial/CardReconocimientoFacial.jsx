import { useState } from "react";

import "../css/BuscadorFacial/card.css";

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
  return url;
};

export const CardReconocimientoFacial = ({ parecido }) => {
  const [zoomFlag, setZoomFlag] = useState(false);

  const handleSetFlag = () => {
    setZoomFlag(!zoomFlag);
  };

  let separado = separarFichaRemision(parecido);

  return (
    <div className="card mt-2 ms-2" style={{ width: "20rem" }}>
      {zoomFlag && (
        <div className="lightbox show">
          <div className="borde">
            <img
              className="card-img-top mt-2 show_image "
              src={separado}
              alt="Card image cap"
              onClick={handleSetFlag}
            />
          </div>
        </div>
      )}
      <img
        className="card-img-top mt-2"
        src={separado}
        alt="Card image cap"
        onClick={handleSetFlag}
      />
      <div className="card-body">
        <p className="card-text">{parecido._label}, Procentaje: {parecido.distance}</p>
      </div>
    </div>
  );
};
