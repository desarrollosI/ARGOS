/*
  El objetivo de este helper es la carga de los modelos de reconocimiento facial, para 
  poder proceder a utulizar sus funciones.
*/

import * as faceapi from "face-api.js";

export const loadModels = async () => {
    try {
        const MODEL_URL = './models';
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(start);
    } catch (error) {
      console.error(error);
    }
  };
  
  const start = () => {
    console.log("Modelos cargados");
  };