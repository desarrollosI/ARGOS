import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { BuscadorFacial, LoadingSpinner } from "../components/";

import "./css/ReconocimientoPage.css";

export const ReconocimientoPage = () => {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = import.meta.env.VITE_PUBLIC_ROUTE+"models";
        setInitializing(true);
        Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]).then(start);
      } catch (error) {
        setInitializing(false);
        console.error(error);
      }
    };
    loadModels();
  }, []);

  const start = () => {
    setInitializing(false);
    console.log("Modelos cargados");
  };

  return (
    <>
      <div className="container-fluid ms-3 me-3">
        <div className="row">
          <div className="col">
            <h1 className="titulo">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>{" "}
              Reconocimiento Facial
            </h1>
          </div>
          <hr />
        </div>
        <div className="row">
          {initializing ? <LoadingSpinner /> : <BuscadorFacial />}
        </div>
      </div>
    </>
  );
};
