
import { Link } from "react-router-dom";

import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'

import "../css/BuscadorFacial/card.css";
import 'animate.css';
import { insertHistorial } from "../../../helpers/insertHistorial";

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


export const CardReconocimientoFacial = ({ parecido }) => {
  console.log('ENTRO A LA TARJETA')

  const{url,remision} = separarFichaRemision(parecido);

  const imgContainerRef = useRef(null);
  const [watermark, setWatermark] = useState("watermarked");

  const [isZoomed, setIsZoomed] = useState(false)

  const registrarMovimiento = () => {
    insertHistorial({lugar:'Reconocimiento Facial',tipo: 'Mas detalles',folio: remision,base: 'Remisiones'})
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
      <>
          <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={CustomZoomContent}>
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
                      <p className="card-text">{parecido._label}, Porcentaje: {100-(parecido.distance*100)} %</p>
                    </div>
                    <div className="row">
                      <Link to={`/remision/${remision}`} target="_blank"  onClick={registrarMovimiento}>
                        Ver mas...
                      </Link>
                    </div>
                    </div>
                  </div>
          </ControlledZoom>

      </>
  )

 
};
