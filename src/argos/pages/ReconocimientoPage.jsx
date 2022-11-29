import React, {useState, useEffect, useRef} from 'react'
import * as faceapi from 'face-api.js'
import { BuscadorFacial } from '../components/BuscadorFacial'

export const ReconocimientoPage = () => {

    const [initializing, setInitializing] = useState(false);

    useEffect(() => {
      const loadModels = async () => {
        try{

          const MODEL_URL = '/models';
          setInitializing(true);
          Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
          ]).then(start);
        } catch (error) {
          console.error(error)
        }
      }
      loadModels();
    }, [])

    const start = () =>{
      console.log('Modelos cargados')
    }
    

  return (
    <>
       <div className="container">
        <div className="row">
          <div className="col">
            <h1>Reconocimiento Facial</h1>
          </div>
        </div>
        <div className="row">
          <BuscadorFacial/>
        </div>
       </div>

        
    </>
  )
}
