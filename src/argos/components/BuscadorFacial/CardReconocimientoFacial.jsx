//Se importan los componentes de react router, necesarios para navegacion
import { Link } from "react-router-dom";
//Se importan los componentes necesarios de react 
import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
//Se importa una biblioteca de terceros para poder realizar zoom a las imagenes
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
//Se importan las hojas de estilo necesarias que requiere el componente
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'
import "../css/BuscadorFacial/card.css";
import 'animate.css';
//Se importan los helpers del historial
import { insertHistorial } from "../../../helpers/insertHistorial";
/*
  Esta funcion recibe resultado a resultado y lo transforma para poder reconstruir
  la ruta de la imagen que se obtiene de sarai.
*/
const separarFichaRemision = ({ _label }) => {
  let newLabel = _label.split(",");
  newLabel[0] = newLabel[0].split(" ");
  newLabel[1] = newLabel[1].trim();
  newLabel[1] = newLabel[1].split(" ");
  let url = "";

  if (window.location.href.includes("172.18.110.90")) {
    url =
      "http://172.18.110.25/sarai/public/files/Remisiones/" +
      newLabel[0][1] +
      "/FotosHuellas/" +
      newLabel[1][1] +
      "/rostro_frente.jpeg";
  } else if (window.location.href.includes("187.216.250.252")) {
    url =
      "http://187.216.250.245/sarai/public/files/Remisiones/" +
      newLabel[0][1] +
      "/FotosHuellas/" +
      newLabel[1][1] +
      "/rostro_frente.jpeg";
  }
    
  return {url,remision:newLabel[1][1],ficha:newLabel[0][1]};
};
/*
  Este es un componente interno, el cual nos permite manipular y sobre escribir algunas propiedades del componente expuesto
  por la biblioteca react-medium-image-zoom hay mas informacion en el repositorio de la biblioteca.
  Nos permite saber cuando se hace zoom en una imagen, y realizar la modificacion para poder implementar marcas de agua en las fotos

*/
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
      ? water = `S.I.A `.repeat(6000) 
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
/*
  El componente expuesto es la tarjeta que presenta, la foto resultante,
  con los folios asociados a la misma, y un enlace para poder saber mas información
  sobre ese resultado.
*/
export const CardReconocimientoFacial = ({ parecido }) => {
  console.log('ENTRO A LA TARJETA')

  const{url,remision} = separarFichaRemision(parecido);

  const imgContainerRef = useRef(null);//Referencia necesaria a la imagen
  const [watermark, setWatermark] = useState("watermarked");//estado para poder aplicar la marca de agua a la imagen
  const [isZoomed, setIsZoomed] = useState(false)//Estado bandera para saber cuando una imagen tiene o no zoom.
  //Funcion personalizada que permite detectar cuando le dan click al enlace de mas detalles de la tarjeta
  const registrarMovimiento = () => {
    insertHistorial({lugar:'Reconocimiento Facial',tipo: 'Mas detalles',folio: remision,base: 'Remisiones'})
  }

  //Funcion que nos permite manejar el zoom de las fotos
  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  /*
  Este useEffect permite disparar la marca de agua y ponerla en la imagen en el momento en que se aplica el estado
  de watermarked
  */
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

  /*
    El retorno es la tarjeta con los enlaces a la que se le puede hacer zoom. 
  */
  return (
      <>
          <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={CustomZoomContent}>
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
                      <p className="card-text">{parecido._label}, Porcentaje: {100-(parecido.distance*100)} %</p>
                      <p className="card-text">{(parecido.nombre) ? parecido.nombre.toUpperCase() : 'S/D' }</p>
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
