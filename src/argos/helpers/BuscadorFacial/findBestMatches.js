import * as faceapi from 'face-api.js';
import { loadLabeledImagesInspecciones, loadLabeledImagesRemisiones } from "./createLabeledImages";

export const findBestMatches = async(CaraSubida,RemisionesData,InspeccionesData) => {
    let cincoDistancias = [];
        let distanciasInspecciones = [];
        const labeledFaceDescriptors = await loadLabeledImagesRemisiones(RemisionesData)
        const labeledFaceDescriptorsInspecciones = await loadLabeledImagesInspecciones(InspeccionesData)
        // estas son de remisiones
        console.log('COPIAR: ',CaraSubida[0][0].descriptor)
        labeledFaceDescriptors.forEach( element =>{
            //console.log('TRUENA',element.descriptors[0])
             const distance = faceapi.euclideanDistance(element.descriptors[0], CaraSubida[0][0].descriptor) //en resized viene la cara que ando buscando
             element.distance = distance;
             cincoDistancias.push(element);
          })
          cincoDistancias.sort((a, b) => a.distance > b.distance ? 1 : -1)
          cincoDistancias=cincoDistancias.slice(0,10)
          //console.log('buscando la dif: ',cincoDistancias);
          const key = '_label';

          const arrayUniqueByKeyRemisiones = [...new Map(cincoDistancias.map(item =>
            [item[key], item])).values()];
        // estas son de inspecciones 
        labeledFaceDescriptorsInspecciones.forEach( element =>{
          const distance = faceapi.euclideanDistance(element.descriptors[0], CaraSubida[0][0].descriptor) //en resized viene la cara que ando buscando
          element.distance = distance;
          distanciasInspecciones.push(element);
        })
        distanciasInspecciones.sort((a, b) => a.distance > b.distance ? 1 : -1)
        distanciasInspecciones=distanciasInspecciones.slice(0,10)

        const arrayUniqueByKeyInspecciones = [...new Map(distanciasInspecciones.map(item =>
          [item[key], item])).values()];
        //seteo de resultados
        return {arrayUniqueByKeyRemisiones,arrayUniqueByKeyInspecciones}
}