//Bibliotecas de react o bibliotecas especializadas para react
import React, {useState, useEffect, useRef, useMemo} from 'react';
//Bibliotecas de terceros necesarias
import * as faceapi from 'face-api.js';
//Componentes personalizados necesarios, la importacion es corta, pues se jala de un archivo de barril.
import { LoadingFace, LoadingSpinner, MyLoader, ResultadosReconocimiento } from '../../components';
//Archivos css
import Silueta from '../../../assets/silueta.jpg'
import '../css/BuscadorFacial/BuscadorFacial.css';
//Importacion de hooks
import { useAuthStore } from '../../../hooks';
//Importacion de helpers
import { insertHistorial } from '../../../helpers/insertHistorial';
//Importacion de interceptores hacia el backedn.
import { basesApi } from '../../../api';

/*
  Esta funcion externa, realiza la peticion al backend , recibe como parametro
  la información de la cara que se ha ingresado al sistema, y regresa los resultados
  de las mejores coincidencias, para mas detalles consultar en el backend  
*/
const buscarCoincidenciasEnBase = async (caraInput) => {
  console.log('CARA INPUT', caraInput[0][0]);
  const {data} = await basesApi.post('buscar-coincidencia',{descriptorInput: caraInput})
  return data.data
}
/*
  El componente principal de reconocimiento facual, se encarga de recibir un archivo foto de entrada,
  mapear su cara y mostrar si si fue reconocible o no, con dicho mapeo realiza la peticion al backend
  con los resultados se llaman a los componentes que representan los resultados.
*/ 
export const BuscadorFacial = () => {
    // Inicializacion de los estados
    const [ParecidosRemisiones, setParecidos] = useState([]);//Resultados de Remisiones
    const [ParecidosInspecciones, setParecidosInspecciones] = useState([]);//Resultados de Inspecciones
    const [ParecidosHistoricos, setParecidosHistoricos] = useState([]);///Resultados de Historicos
    const [CaraSubida, setCaraSubida] = useState([]);//Cara que se sube al sistema
    const [files, setFiles] = useState([]);//sub estado para detectar cuando se carga un archivo
    const [images, setImages] = useState([Silueta]);//Estado para manejar la imagen placeholder cuando recien se incia el sistema
    const [IsLoadingFace, setIsLoadingFace] = useState(false);//Estado bandera para saber si la cara fue mapeada con exito, si se esta procesado o si no se pudo procesar
    const [isLoadingResults, setIsLoadingResults] = useState(false);// Estado bandera para saber si se siguen solicitando los resultados al backend
    const [Message, setMessage] = useState(['Paciencia se esta cargando tu imagen','warning']);//Estado que maneja los mensajes informativos cuando se carga una imagen
 
    // Esta funcion maneja el input de la imagen, la muestra y le detecta la cara
    //Su funcion es leer la imagen(base64), y guardarla en el hsitorial, independientemente si se mapea o no
    //Los helpers del hsitorial revisarlos en su modulo correspondiente
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
            insertHistorial({lugar:'Reconocimiento Facial',tipo: 'Subida de Foto',imagen: reader.result})
            setFiles(prevFiles => [ files]);
            setImages(prevImages => [ reader.result]);
          };
          //Se muestra la imagen en pantalla, si existiese una imagen ya mostrada se elimina.
          reader.readAsDataURL(files);
          let image
          let canvas
          let containerimg = document.querySelector('#contenedorimg');
          if (canvas) canvas.remove()
          console.log(containerimg.childNodes)
          let anteriores = document.querySelectorAll('canvas');
          console.log(anteriores)
          if(anteriores.length>0){
            anteriores.forEach( anterior => {
                anterior.remove();
            })
          }
        
          console.log(containerimg.childNodes[0].width);
          if (canvas) canvas.remove() 
          //Con la imagen mostrada se comienza el proceso de deteccion de la cara en la misma
          //se recomienda estudiar el repositorio de la biblioteca faceapi,  para comprender el funcionamiento
          //de las funciones y como se realiza la deteccion.
          image = await faceapi.bufferToImage(fileList[0])
          canvas = faceapi.createCanvasFromMedia(image)
          containerimg.append(canvas)
          const displaySize = { width: containerimg.childNodes[0].width, height: containerimg.childNodes[0].height } // se alinean canvas e imagen
          faceapi.matchDimensions(canvas, displaySize) // se alinean
          const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors() // se sacan todas las caras de la imagen en la cual debo de buscar contra la base
          if(detections.length>0){
              //si se detectan caras se realiza la peticion al backend
              const resizedDetections = faceapi.resizeResults(detections, displaySize) // se ajustan en tamaño los resultados
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)// se dibujan los resultados de las caras detectadas
              setMessage(['Cara localizada y mapeada','success'])
              setCaraSubida([resizedDetections]);
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
    /*
      El retorno del componente, es el input de tipo file para que se puedan subir las fotos, requiere de mas componentes como el que muestra
      los mensajes de carga de las fotos que se ingresan, asi mismo cuando se estan solicitando resultados se invoca el componente <MyLoader/>
      el cual es un Skeleton Loader, por último si el backend regresa resultados encontrados se invoca el componente que imprime los resultados
      <ResultadosReconocimiento /> 
    */
  return (
    
    <>
   
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-5 card shadow vh100 ">
                    <div className="row indicador mt-5">
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
    
                <div className="col-md-7 card shadow">
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

