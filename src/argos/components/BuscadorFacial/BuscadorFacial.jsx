//bibliotecas de react o bibliotecas especializadas para react
import React, {useState, useEffect, useRef, useMemo} from 'react';
//bibliotecas de terceros necesarias
import * as faceapi from 'face-api.js';
//componentes personalizados necesarios
import { LoadingFace, LoadingSpinner, MyLoader, ResultadosReconocimiento } from '../../components';
//archivos css
import '../css/BuscadorFacial/BuscadorFacial.css';
import { useAuthStore } from '../../../hooks';
import { insertHistorial } from '../../../helpers/insertHistorial';


const buscarCoincidenciasEnBase = async (caraInput) => {
  console.log('CARA INPUT', caraInput[0][0]);
  const resp = await fetch('http://172.18.10.71:9090/api/base/buscar-coincidencia',{
  method: 'POST',
  body: JSON.stringify({descriptorInput: caraInput}),
  headers: { 'Content-Type': 'application/json' }
 });
 let data = await resp.json()
 return data.data

}



export const BuscadorFacial = () => {

    const [ParecidosRemisiones, setParecidos] = useState([]);
    const [ParecidosInspecciones, setParecidosInspecciones] = useState([]);
    const [ParecidosHistoricos, setParecidosHistoricos] = useState([]);
    const [CaraSubida, setCaraSubida] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([import.meta.env.VITE_PUBLIC_ROUTE+'silueta.jpg']);
    const [IsLoadingFace, setIsLoadingFace] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [Message, setMessage] = useState(['Paciencia se esta cargando tu imagen','warning']);
 
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
            //console.log('que hay aca?',reader.result);
            insertHistorial({lugar:'Reconocimiento Facial',tipo: 'Subida de Foto',imagen: reader.result})
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
              // console.log('CARA SUBIDA STATE: ', CaraSubida[0][0].descriptor )
              setIsLoadingResults(true)
              let mejoresResultados =  await buscarCoincidenciasEnBase([resizedDetections])
              const {Remisiones,Inspecciones,Historicos} = mejoresResultados;
              setParecidos(Remisiones)
              setParecidosInspecciones(Inspecciones)
              setParecidosHistoricos(Historicos)
              console.log('extraido:',{Remisiones,Inspecciones,Historicos})
              setIsLoadingResults(false)
              setIsLoadingFace(false);
          }else{
            setMessage(['No se puede detectar un rostro en la fotografía','info'])
          }
        });
      };

  return (
    
    <>
   
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-5 shadow vh100 me-2">
                    <div className="row indicador mt-5">
                        {/* <p>Se cuenta con: {RemisionesData.length}  registros de Remisiones, con: {InspeccionesData.length} de Inspecciones 
                       </p> */}
                       {/*  y con {HistoricosData.length} de Historicos */}
                    </div>
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
                  {
                     (isLoadingResults) 
                      ? <><MyLoader/><MyLoader/><MyLoader/><MyLoader/><MyLoader/><MyLoader/><MyLoader/><MyLoader/></>
                      : <>

                        {ParecidosRemisiones.length>0 &&  <ResultadosReconocimiento parecidos={ParecidosRemisiones} lugar={'remisiones'}/> }
                        {ParecidosInspecciones.length>0 && <ResultadosReconocimiento parecidos={ParecidosInspecciones} lugar={'inspecciones'}/> }
                        {ParecidosHistoricos.length>0  && <ResultadosReconocimiento parecidos={ParecidosHistoricos} lugar={'historicos'}/>}
                        
                        </>
      
                  }
                   
                </div>
            </div>
        </div>
    
    </>
  )
}

