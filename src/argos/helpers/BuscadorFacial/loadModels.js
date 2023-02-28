import * as faceapi from "face-api.js";

export const loadModels = async () => {
    try {
        //para dev solo dejar el ./models/ para prod cambiar por  import.meta.env.VITE_PUBLIC_ROUTE  la ruta esta en el .env
        const MODEL_URL = import.meta.env.VITE_PUBLIC_ROUTE+'models';
        //const MODEL_URL = import.meta.env.VITE_PUBLIC_ROUTE+'models';
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