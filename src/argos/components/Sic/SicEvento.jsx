//Es un componente cuya finalidad es refejar mas informacion sobre un registro en este caso de Inspecciones
import React from "react";
//importacion de los componnentes necesarios
import { ImageZoom } from '../Shared/ImageZoom';
//importacion de las hojas de estilo requeridas
import '../css/Shared/FichaInformativa.css'
import 'animate.css';
//El componente es sencillo solo es la maquetacion en jsx de la información y como debe de ser mostrada
export const SicEvento = ({data}) => {
  console.log(data[0])

   var date = new Date(data[0].FechaHora_Recepcion);
//   const baseURLF='http://187.216.250.245/sarai/public/files/inspecciones/images/'

return (
    <>
		<div className="container-fluid card shadow mt-5 animate__animated animate__fadeIn mb-4 content">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">DATOS DEL EVENTO:</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					
					<div className="row mt-3">
						
						<div className="col-md-3">
							<p className="parrafo"><b>FOLIO INFRA: </b> {data[0].Folio_infra}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>ZONA: </b> {data[0].Zona}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>VECTOR: </b> {data[0].Vector}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>FUENTE: </b> {data[0].Fuente}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>FOLIO 911: </b> {data[0].Folio_911}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>FEHA/HORA:</b> {date.toLocaleString()}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>STATUS EVENTO:</b> {data[0].Status_Evento}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>DELITOS:</b> {data[0].delitos_concat}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>GIRO:</b> {data[0].delito_giro}</p>
						</div>
                        <div className="col-md-4">
							<p className="parrafo"><b>TIPO VIOLENCIA:</b> {data[0].Tipo_Violencia}</p>
						</div>
					</div>
				</div>
					
				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> UBICACIÓN DEL EVENTO: </h3>
					</div>
				</div>
				<div className="row mt-3">
				    <div className="col-md-4">
						<p className='parrafo'><b>COLONIA: </b> {`${data[0].Colonia}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 1: </b> {`${data[0].Calle}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 2: </b> {`${data[0].Calle2}`}</p>
					</div>
					<div className="col-md-2">
						<p className='parrafo'><b>C.P.: </b> {`${data[0].CP}`}</p>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> DETALLES DE LOS HECHOS: </h3>
					</div>
				</div>
				<div className="row mt-3">
                    <div className="col-md-12">
                        {data[0].hechos_concat.split('DESCRIPCIÓN: ').map((part, index) => {
                            const trimmedPart = part.trim();
                            if (trimmedPart.length > 0) {
                            return (
                                <React.Fragment key={index}>
                                <p className='parrafo'>
                                    <b>DETALLES: </b>
                                    {trimmedPart}
                                </p>
                                </React.Fragment>
                            );
                            }
                            return null; // Ignorar fragmentos vacíos
                        })}
                    </div>
				    <div className="col-md-4">
						<p className='parrafo'><b>MASCULINOS: </b> {`${data[0].Conteo_Masculinos}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>FEMENINOS: </b> {`${data[0].Conteo_Femeninas}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>VEHICULOS: </b> {`${data[0].Conteo_Vehiculos}`}</p>
					</div>
				</div>

			</div>
		</div>
    </>
  )
}