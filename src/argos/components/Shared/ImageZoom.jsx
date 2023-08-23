/* 
  Este componente se enfoca en poder realizar zoom a los elementos de imagen sin la necesidar de que tengan
  que pertenecer a una tarjeta
*/
//Se importan los componentes necesarios propios de React
import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
//Se importan los componentes proveidos por la biblioteca react-medium-image-zoom, son los que realizan el zoom
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
//Se importan las hojas de estilos necesarias para el componente
import 'react-medium-image-zoom/dist/styles.css'
import '../css/BuscadorFacial/card-imagen.css'
/*
  El componente es muy similar a cualquiera de las card de reconocimiento facial
  simplemente se le recotan capacidades como la solicitud al backend por información
  en esencia hacen lo mismo transforman la fuente de la imagen a un componente
  div, manejable por zoom.
*/
const CustomZoomContent = ({buttonUnzoom,modalState,img}) => {
    console.log('ENTRO AL CUSTOM : ')
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


export const ImageZoom = ({url,width=0,height=0,ml=0}) => {
    

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
        <>
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={CustomZoomContent}>
                <div ref={imgContainerRef} id={url}>
                        <div
                        className="watermarked" data-watermark="A.R.G.O.S."
                        aria-label="hongo"
                        role="img"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            backgroundColor: '#fff',
                            backgroundImage: `url("${url}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            paddingBottom: '56%',
                            margin:'0',
                            marginLeft: `${ml}px`
                        }}
                        />
                </div>
            </ControlledZoom>

        </>
    )
  }