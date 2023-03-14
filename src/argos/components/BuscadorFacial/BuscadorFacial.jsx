//bibliotecas de react o bibliotecas especializadas para react
import React, {useState, useEffect, useRef, useMemo} from 'react';
//bibliotecas de terceros necesarias
import * as faceapi from 'face-api.js';
//componentes personalizados necesarios
import { LoadingFace, LoadingSpinner, ResultadosReconocimiento } from '../../components';
//helpers necesarios
import {findBestMatches} from '../../helpers'
//hooks personalizados
import {useFetch} from '../../../hooks/useFetch'
//archivos css
import '../css/BuscadorFacial/BuscadorFacial.css';

export const BuscadorFacial = () => {

    const [ParecidosRemisiones, setParecidos] = useState([]);
    const [ParecidosInspecciones, setParecidosInspecciones] = useState([]);
    const [ParecidosHistoricos, setParecidosHistoricos] = useState([]);
    const [CaraSubida, setCaraSubida] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([import.meta.env.VITE_PUBLIC_ROUTE+'silueta.jpg']);
    const [IsLoadingFace, setIsLoadingFace] = useState(false);
    const [Message, setMessage] = useState(['Paciencia se esta cargando tu imagen','warning']);

    /*se lanza el hook use Fetch para obtener toda la data necesaria*/
    let RemisionesData,InspeccionesData,HistoricosData;
    const { data, isLoading, hasError } = useFetch('http://172.18.10.71:9090/api/base/facialRecognition',`POST`);
    if(isLoading === false){
      const {Remisiones,Inspecciones,Historicos} = data.data;
      RemisionesData = Remisiones
      InspeccionesData =Inspecciones
      HistoricosData = Historicos
    }
 
    // Esta funcion maneja el input de la imagen, la muestra y le detecta la cara 
      const handleImageChange = async (e) => {
        setIsLoadingFace(true);
        console.log("handleImageChange");
        // FileList to Array
        let fileList = Array.from(e.target.files);
        console.log("fileList", fileList);
        // File Reader for Each file and and update state arrays
        fileList.forEach(async (files, i) => {
          let reader = new FileReader();
    
          reader.onloadend = () => {
            console.log('que hay aca?',reader.result);
            setFiles(prevFiles => [ files]);
            setImages(prevImages => [ reader.result]);
          };
    
          reader.readAsDataURL(files);
         
          let image
          let canvas
          let containerimg = document.querySelector('#contenedorimg');
          if (canvas) canvas.remove()
          console.log(containerimg.childNodes)
        //   console.log(containerimg.ChildNodes().length);
          let anteriores = document.querySelectorAll('canvas');
          console.log(anteriores)
          if(anteriores.length>0){
            anteriores.forEach( anterior => {
                anterior.remove();
            })
          }

          console.log(containerimg.childNodes[0].width);
          if (canvas) canvas.remove() // si ya existe se elimina
          image = await faceapi.bufferToImage(fileList[0])
          canvas = faceapi.createCanvasFromMedia(image)
          containerimg.append(canvas) //
          const displaySize = { width: containerimg.childNodes[0].width, height: containerimg.childNodes[0].height } // se alinean canvas e imagen
          faceapi.matchDimensions(canvas, displaySize) // se alinean
          const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors() // se sacan todas las caras de la imagen en la cual debo de buscar contra la base
          if(detections.length>0){

              const resizedDetections = faceapi.resizeResults(detections, displaySize) // se ajustan los resultados
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
              setMessage(['Cara localizada y mapeada','success'])
              setCaraSubida([resizedDetections]);
              setIsLoadingFace(false);
          }else{
            setMessage(['No se puede detectar un rostro en la fotografía','info'])
          }
        });
      };



    //Esta funcion busca las caras parecidas de entre el banco de datos
    const buscarParecidos = async (e) =>{
        const {arrayUniqueByKeyRemisiones, arrayUniqueByKeyInspecciones, arrayUniqueByKeyHistoricos} = await findBestMatches(CaraSubida,RemisionesData,InspeccionesData, HistoricosData)
        setParecidos(arrayUniqueByKeyRemisiones)
        setParecidosInspecciones(arrayUniqueByKeyInspecciones)
        setParecidosHistoricos(arrayUniqueByKeyHistoricos)
        //console.log('ya con resultados: ',arrayUniqueByKey);
    }
      

  return (
    
    <>
    {isLoading ? <LoadingSpinner /> : 
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-5 shadow vh100 me-2">
                    <div className="row indicador mt-5">
                        <p>Se cuenta con: {RemisionesData.length}  registros de Remisiones, con: {InspeccionesData.length} de Inspecciones 
                        y con {HistoricosData.length} de Historicos</p>
                    </div>
                    {
                    IsLoadingFace ? <></> :
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <button className='btn btn-success btn-lg float-end' onClick={buscarParecidos}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-binoculars-fill" viewBox="0 0 16 16">
                            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                            </svg>  Buscar</button>
                        </div>
                    </div>
                    }       
                    <div className="row mt-2">
                        <div className="col-md-10 d-flex justify-content-center">
                            <div className="form-group mt-4">
                                <input type="file" className="form-control form-control-lg" id="inputBuscado" onChange={handleImageChange}/>
                            </div>
                        </div>
                    </div>
                    {IsLoadingFace ? <LoadingFace message={Message} /> : <></>}  
                    <div className="row mt-4 contendor" >
                        {images.map((images, i) => {

                            return (
                                <div  className="d-flex justify-content-center mb-5" key={i} id="contenedorimg">
                                    <img type="url" style={{ width: "80%" }} src={images} alt="a" id="imgmuestra"/>
                                </div>
                            );
                        })}
                    </div>
                    
                    
                </div>
    
                <div className="col-md-6 shadow">
                    { (ParecidosRemisiones.length !=0) && <ResultadosReconocimiento parecidos={ParecidosRemisiones} lugar={'remisiones'}/>}
                    { (ParecidosInspecciones.length !=0) && <ResultadosReconocimiento parecidos={ParecidosInspecciones} lugar={'inspecciones'}/> }
                    { (ParecidosHistoricos.length !=0) && <ResultadosReconocimiento parecidos={ParecidosHistoricos} lugar={'historicos'}/> }
                </div>
            </div>
        </div>
    }
    </>
  )
}

