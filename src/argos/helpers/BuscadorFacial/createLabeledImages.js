    import * as faceapi from 'face-api.js';
    //Esta funcion toma el estado de la Data y la transforma en informacion manejable para la comparativa
    export const loadLabeledImagesRemisiones = async (RemisionesData) => {
    
        return Promise.all(
            RemisionesData.map(async res => { //una a  una 
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
    
    export const loadLabeledImagesInspecciones = async (InspeccionesData) => {
        return Promise.all(
            InspeccionesData.map(async res => {
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