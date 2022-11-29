import React, {useState, useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';

export const BuscadorFacial = () => {

    const [Data, setData] = useState([]);
    const [Parecidos, setParecidos] = useState([]);
    const [Imgsrc, setImgsc] = useState('http://via.placeholder.com/640x700')

    useEffect(() => {

       const buscarRegistros = async() => {
            try{
                const response = await fetch('http://192.168.9.227/face/buscarCaras.php')
                //console.log(response.json())
                let json =  await response.json();
                setData(json);
                console.log(Data);
            }catch (error) {
                console.error(error)
              }
          }
        buscarRegistros();

      }, [])

  return (
    
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <p>Se cuenta con: {Data.length}  registros</p>
                </div>
                <div className="row mt-2">
                    <div className="form-group mt-4">
                        <input type="file" className="form-control-file" id="inputBuscado" />
                    </div>
                </div>
                <div className="row mt-2">
                    <img id="buscado" src={Imgsrc} alt="personaBuscada" />
                </div>
                <div className="row mt-2 float-end">
                    <div className="col-md-2">
                        <button className='btn btn-success'>Buscar</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                { 
                    Parecidos.map(parecido => {
                        return <span>hay resultado</span>
                    })
                }
            </div>
        </div>
    </div>
    </>
  )
}

