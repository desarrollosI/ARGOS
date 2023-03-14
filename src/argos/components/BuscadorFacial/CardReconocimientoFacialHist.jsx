

import { Link } from "react-router-dom";

import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'

import "../css/BuscadorFacial/card.css";
import 'animate.css';

let guardar
const separarFolioHistorico = ({ _label }) => {
    let newLabel = _label.split(" ");
    console.log(newLabel);
    guardar = newLabel[1]

    console.log('FILE: ', guardar);

    let url =
        "http://172.18.10.13/planeacion-recuperadas/Historicos/" +
        guardar.trim()+
        "/"+
        newLabel[2];

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
      ? water = `A.R.G.O.S. `.repeat(3000) 
      : water = '';
   
  return (
      <>
      {buttonUnzoom}
  
      <figure>
          {img}
          <figcaption className={classCaption} data-watermark="A.R.G.O.S.">
          {water}
          </figcaption>
      </figure>
      </>

  )
}

export const CardReconocimientoFacialHist = ({ parecido }) => {
  console.log('PARECIDO',parecido)

  const {url,folio} = separarFolioHistorico(parecido);
  const imgContainerRef = useRef(null);
  const [watermark, setWatermark] = useState("watermarked");

  const [isZoomed, setIsZoomed] = useState(false)

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
                      className="watermarked" data-watermark="A.R.G.O.S."
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
                    </div>
                    <div className="row">
                      <Link to={`/historico/${folio}`} target="_blank">
                        Ver mas...
                      </Link>
                    </div>
                    </div>
                  </div>
          </ControlledZoom>
  );
};
