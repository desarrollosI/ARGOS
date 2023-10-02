import React from 'react'
import { ImageZoom } from '../Shared';

export const PersonaAtlas = ({data}) => {
    const {Persona,Banda,Integrantes} = data;
    const baseURLF='http://172.18.10.227/FotosAtlas/'
    let pathPersona=Persona[0].PATH_IMAGEN.split('?');
    console.log('PERSONA: ', Persona)
  return (
    <div className="container-fluid card shadow mt-5 animate__animated animate__fadeIn mb-4 content">

    <div className="row">
        <div className="col">
            <h2 className="text-center titulo mt-4">DATOS DEL INTEGRANTE:</h2>
        </div>
    </div>

    <div className="row">
        <div className="col-md-12">
            
            <div className="row mt-3">
                <div className="col-md-4">
                    <p className="parrafo"><b>NOMBRE COMPLETO: </b> {Persona[0].NOMBRE_COMPLETO.toUpperCase()}</p>
                </div>
                <div className="col-md-2">
                    <p className="parrafo"><b>ALIAS: </b> {Persona[0].ALIAS.toUpperCase()}</p>
                </div>
                <div className="col-md-2">
                    <p className="parrafo"><b>ESTATUS: </b> {Persona[0].ESTATUS.toUpperCase()}</p>
                </div>
                <div className="col-md-2">
                    <p className="parrafo"><b>SEXO: </b> {Persona[0].SEXO.toUpperCase()}</p>
                </div>
                <div className="col-md-3">
                    <p className="parrafo"><b>CURP: </b> {Persona[0].CURP.toUpperCase()}</p>
                </div>
                <div className="col-md-4">
                    <p className="parrafo"><b>UDC: </b> {Persona[0].UDC.toUpperCase()}</p>
                </div>
                <div className="col-md-2">
                    <p className="parrafo"><b>UTC: </b> {Persona[0].UTC.toUpperCase()}</p>
                </div>
                <div className="col-md-3">
                    <p className="parrafo"><b>PERFIL FACEBOOK: </b> {Persona[0].PERFIL_FACEBOOK.toUpperCase()}</p>
                </div>
                <div className="col-md-12">
                    <p className="parrafo"><b>DESCRIPCION: </b> {Persona[0].DESCRIPCION.toUpperCase()}</p>
                </div>

                <div className="col-md-4" key={Persona[0].PATH_IMAGEN}>
                    <ImageZoom  url={`${baseURLF}${Persona[0].ID_BANDA}/Grupo/${pathPersona[0]}`} width={'580'} height={'450'}/>
                </div>
                
            </div>
        </div>
            
        <div className="row mt-3">
            <div className="col">
                <h3 className='text-center titulo'> DETALLES DE LA BANDA: </h3>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-md-3">
                <p className="parrafo"><b>BANDA: </b> {Banda[0].NOMBRE_BANDA.toUpperCase()}</p>
            </div>
            <div className="col-md-9">
                <p className="parrafo"><b>ANTECEDENTES: </b> {Banda[0].ANTECEDENTES.toUpperCase()}</p>
            </div>
            <div className="col-md-3">
                <p className="parrafo"><b>COLONIAS: </b> {Banda[0].COLONIAS.toUpperCase()}</p>
            </div>
            <div className="col-md-6">
                <p className="parrafo"><b>DELITOS: </b> {Banda[0].PRINCIPALES_DELITOS.toUpperCase()}</p>
            </div>
            <div className="col-md-3">
                <p className="parrafo"><b>PELIGORSIDAD: </b> {Banda[0].PELIGROSIDAD.toUpperCase()}</p>
            </div>
            <div className="col-md-3">
                <p className="parrafo"><b>ZONAS: </b> {Banda[0].ZONAS.toUpperCase()}</p>
            </div>
        </div>

        <div className="row mt-3">
            <div className="col">
                <h3 className='text-center titulo'> INTEGRANTES: </h3>
            </div>
        </div>
        
        {
            Integrantes.map( integrante => {
                let pathimagen = integrante.PATH_IMAGEN.split('?');
                return (
                
                    <div className="row mt-3" key={integrante.ID_PERSONA}>
                        <div className="col-md-12">
                            <hr></hr>
                        </div>
                        <div className="col-md-4">
                            <p className="parrafo"><b>NOMBRE COMPLETO: </b> {integrante.NOMBRE_COMPLETO.toUpperCase()}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="parrafo"><b>ALIAS: </b> {integrante.ALIAS.toUpperCase()}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="parrafo"><b>ESTATUS: </b> {integrante.ESTATUS.toUpperCase()}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="parrafo"><b>SEXO: </b> {integrante.SEXO.toUpperCase()}</p>
                        </div>
                        <div className="col-md-3">
                            <p className="parrafo"><b>CURP: </b> {integrante.CURP.toUpperCase()}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="parrafo"><b>UDC: </b> {integrante.UDC.toUpperCase()}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="parrafo"><b>UTC: </b> {integrante.UTC.toUpperCase()}</p>
                        </div>
                        <div className="col-md-3">
                            <p className="parrafo"><b>PERFIL FACEBOOK: </b> {integrante.PERFIL_FACEBOOK}</p>
                        </div>
                        <div className="col-md-12">
                            <p className="parrafo"><b>DESCRIPCION: </b> {integrante.DESCRIPCION.toUpperCase()}</p>
                        </div>
                        <div className="col-md-4" key={integrante.PATH_IMAGEN}>
                            <ImageZoom  url={`${baseURLF}${integrante.ID_BANDA}/Grupo/${pathimagen[0]}`} width={'580'} height={'450'}/>
                        </div>
                    
                </div>
                )

            })
        }

    </div> 
</div>
  )
}
