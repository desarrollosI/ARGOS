

import { Link } from "react-router-dom";

import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'

import "../css/BuscadorFacial/card.css";
import 'animate.css';

let guardar
const separarFichaInspeccion = ({ _label }) => {
    let newLabel = _label.split(" ");
    //console.log(newLabel);
    guardar = newLabel[1]
    guardar = guardar.replace(' ', '%20')
    newLabel.shift()
    newLabel.shift()
    let file = newLabel.join(' ');
    file = file.replaceAll(' ', '%20')
    let url =
        "http://172.18.0.25/sarai/public/files/inspecciones/images/" +
        guardar+
        "/"+
        file;
  return {url,inspeccion:guardar};
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

export const CardReconocimientoFacialInsp = ({ parecido }) => {
  //console.log(parecido)

  const {url,inspeccion} = separarFichaInspeccion(parecido);
  console.log('URL: ', url)
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
                      <Link to={`/inspeccion/${inspeccion}`} target="_blank">
                        Ver mas...
                      </Link>
                    </div>
                    </div>
                  </div>
          </ControlledZoom>
  );
};
