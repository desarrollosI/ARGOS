
/*
  El componente es similar al componente <CardReconociminetoFacial /> revisarlo para documentacion
*/
import { Link } from "react-router-dom";

import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'

import "../css/BuscadorFacial/card.css";
import 'animate.css';
import { insertHistorial } from "../../../helpers/insertHistorial";

let guardar
const separarFolioHistorico = ({ _label }) => {
    let newLabel = _label.split(" ");
    //console.log(newLabel);
    guardar = newLabel[1]

    //console.log('FILE: ', guardar);
    let url =
      window.location.href.includes("172.18.110.90")
        ? "http://172.18.110.25/planeacion-recuperadas/Historicos/" + guardar.trim() + "/" + newLabel[2]
        : window.location.href.includes("187.216.250.252")
        ? "http://187.216.250.245/planeacion-recuperadas/Historicos/" + guardar.trim() + "/" + newLabel[2]
        : "";

  return {url,folio:guardar};
};

const CustomZoomContent = ({buttonUnzoom,modalState,img}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
  if (modalState === 'LOADED') {
      setIsLoaded(true)
  } else if (modalState === 'UNLOADING') {
      setIsLoaded(false)
  }
  }, [modalState])

  const classCaption = isLoaded
  ? 'zoom-caption zoom-caption--loaded'
  : 'zoom-caption'
  
  let water='';
  (isLoaded)
      ? water = `S.I.A. `.repeat(6000) 
      : water = '';
   
  return (
      <>
      {buttonUnzoom}
  
      <figure>
          {img}
          <figcaption className={classCaption} data-watermark="S.I.A.">
          {water}
          </figcaption>
      </figure>
      </>

  )
}

export const CardReconocimientoFacialHist = ({ parecido }) => {
  //console.log('PARECIDO',parecido)

  const {url,folio} = separarFolioHistorico(parecido);
  const imgContainerRef = useRef(null);
  const [watermark, setWatermark] = useState("watermarked");

  const [isZoomed, setIsZoomed] = useState(false)

  const registrarMovimiento = () => {
    insertHistorial({lugar:'Reconocimiento Facial',tipo: 'Mas detalles',folio: folio,base: 'Historico'})
  }

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])


  useEffect(() => {
    const imgContainerSelector = imgContainerRef.current.querySelector(".watermarked");

    if (watermark) {
      imgContainerSelector.dataset.watermark = (
        imgContainerSelector.dataset.watermark + "   "
      ).repeat(1000);
    } else {
      imgContainerSelector.dataset.watermark = "";
    }
  }, [watermark]);


  return (

        <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={CustomZoomContent} key={url}>
              <div className="card" style={{width: '25rem'}} ref={imgContainerRef}>
                      <div
                      className="watermarked" data-watermark="S.I.A."
                      aria-label="hongo"
                      role="img"
                      style={{
                          width: '23rem',
                          backgroundColor: '#fff',
                          backgroundImage: `url(${url})`,
                          backgroundPosition: '50%',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          height: '0',
                          paddingBottom: '56%',
                          margin:'auto',
                          marginTop: '10px',
                      }}
                      />
                  <div className=" card-body card-img-top" > 
                    <div className="row">
                      <p className="card-text">Folio: {folio}, Porcentaje: {100-(parecido.distance*100)} %</p>
                      <p className="card-text">{(parecido.nombre) ? parecido.nombre.toUpperCase() : 'S/D'}</p>
                    </div>
                    <div className="row">
                      <Link to={`/historico/${folio}`} target="_blank" onClick={registrarMovimiento}>
                        Ver mas...
                      </Link>
                    </div>
                    </div>
                  </div>
          </ControlledZoom>
  );
};
