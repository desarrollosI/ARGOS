import React, {useState, useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';

import './css/BuscadorFacial.css';

import {CardReconocimientoFacial}  from './CardReconocimientoFacial';
import {CardReconocimientoFacialInsp} from './CardReconocimientoFacialInsp';
import LoadingSpinner from './LoadingSpiner';
import LoadingFace from './LoadingFace';

export const BuscadorFacial = () => {

    const [Data, setData] = useState([]);
    const [DataInspecciones, setDataInspecciones] = useState([]);
    const [Parecidos, setParecidos] = useState([]);
    const [ParecidosInspecciones, setParecidosInspecciones] = useState([]);
    const [CaraSubida, setCaraSubida] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([import.meta.env.VITE_PUBLIC_ROUTE+'/assets/silueta.jpg']);
    const [IsLoadingData, setIsLoadinData] = useState(true);
    const [IsLoadingFace, setIsLoadingFace] = useState(false);
    const [Message, setMessage] = useState(['Paciencia se esta cargando tu imagen','warning']);

    //Esta funcion obtiene de la base de datos, todas las caras
    useEffect(() => {

       const buscarRegistros = async() => {
            try{
                const response = await fetch('http://172.18.10.71:2687/api/caras',{
                  method: 'POST',
                })
                //console.log(response.json())
                let json =  await response.json();
                //console.log('Respuesta del fetch', json.data.Remisiones);
                setData(json.data.Remisiones);
                setDataInspecciones(json.data.Inspecciones);
                setIsLoadinData(false)
            }catch (error) {
                console.error(error)
                setIsLoadinData(false)
                
              }
          }
        buscarRegistros();

      }, [])

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

    //Esta funcion toma el estado de la Data y la transforma en informacion manejable para la comparativa
    const loadLabeledImages = async () => {
    
    return Promise.all(
        Data.map(async res => { //una a  una 
        const descriptions = []
         // una imagen de muestra
         var arrayDesc = res.descriptor.split('_');
         arrayDesc.pop();
          descriptions.push(Float32Array.from(arrayDesc)) // guardo los descriptores en un arreglo, puede ser distinto ya con bd
        // revisar que imprime , regresa el nombre y los datos faciales
        return new faceapi.LabeledFaceDescriptors(`Ficha: ${res.No_Ficha}, Remisión: ${res.No_Remision}`, descriptions) 
        
        })
      )
    }

    const loadLabeledImagesInspecciones = async () => {
      return Promise.all(
        DataInspecciones.map(async res => {
          const descriptions = []
           // una imagen de muestra
           var arrayDesc = res.descriptor.split('_');
           arrayDesc.pop();
            descriptions.push(Float32Array.from(arrayDesc)) // guardo los descriptores en un arreglo, puede ser distinto ya con bd
          // revisar que imprime , regresa el nombre y los datos faciales
          return new faceapi.LabeledFaceDescriptors(`Inspeccion: ${res.No_inspeccion} ${res.src}`, descriptions) 
        })
      )
    }

    //Esta funcion busca las caras parecidas de entre el banco de datos
    const buscarParecidos = async (e) =>{
        let cincoDistancias = [];
        let distanciasInspecciones = [];
        const labeledFaceDescriptors = await loadLabeledImages()
        const labeledFaceDescriptorsInspecciones = await loadLabeledImagesInspecciones()
        // estas son de remisiones
        labeledFaceDescriptors.forEach( element =>{
             const distance = faceapi.euclideanDistance(element.descriptors[0], CaraSubida[0][0].descriptor) //en resized viene la cara que ando buscando
             element.distance = distance;
             cincoDistancias.push(element);
          })
          cincoDistancias.sort((a, b) => a.distance > b.distance ? 1 : -1)
          cincoDistancias=cincoDistancias.slice(0,10)
          //console.log('buscando la dif: ',cincoDistancias);
          const key = '_label';

          const arrayUniqueByKey = [...new Map(cincoDistancias.map(item =>
            [item[key], item])).values()];
        // estas son de inspecciones 
        labeledFaceDescriptorsInspecciones.forEach( element =>{
          const distance = faceapi.euclideanDistance(element.descriptors[0], CaraSubida[0][0].descriptor) //en resized viene la cara que ando buscando
          element.distance = distance;
          distanciasInspecciones.push(element);
        })
        distanciasInspecciones.sort((a, b) => a.distance > b.distance ? 1 : -1)
        distanciasInspecciones=distanciasInspecciones.slice(0,10)

        const arrayUniqueByKeyInsp = [...new Map(distanciasInspecciones.map(item =>
          [item[key], item])).values()];
        //seteo de resultados
        setParecidos(arrayUniqueByKey)
        setParecidosInspecciones(arrayUniqueByKeyInsp)
        //console.log('ya con resultados: ',arrayUniqueByKey);
    }
      

  return (
    
    <>
    {IsLoadingData ? <LoadingSpinner /> : 
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="row indicador">
                        <p>Se cuenta con: {Data.length}  registros de Remisiones y con: {DataInspecciones.length} de Inspecciones</p>
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
                    <div className="row mt-4" >
                        {images.map((images, i) => {

                            return (
                                <div  className="d-flex justify-content-center" key={i} id="contenedorimg">
                                    <img type="url" style={{ width: "80%" }} src={images} alt="a" id="imgmuestra"/>
                                </div>
                            );
                        })}
                    </div>
                    
                    
                </div>
                <div className="col-md-6">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="row mt-3"><h3>Resultados Remisiones: </h3></div>
                            <div className="row row-cols-2 d-flex justify-content-around">
                                { 
                                    Parecidos.map(parecido => {
                                        return <CardReconocimientoFacial key={parecido._label} parecido={parecido}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row mt-3"><h3>Resultados Inspecciones: </h3></div>
                            <div className="row row-cols-2 d-flex justify-content-around">
                                { 
                                    ParecidosInspecciones.map(parecido => {
                                        return <CardReconocimientoFacialInsp key={parecido._label} parecido={parecido}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
  )
}

