//Es un componente cuya finalidad es refejar mas informacion sobre un registro en este caso de Incidencia Delictiva
import React from "react";
//importacion de los componnentes necesarios
import { ImageZoom } from '../Shared/ImageZoom';
//importacion de las hojas de estilo requeridas
import '../css/Shared/FichaInformativa.css'
import 'animate.css';
//El componente es sencillo solo es la maquetacion en jsx de la información y como debe de ser mostrada
export const Incidencia = ({data}) => {
  console.log(data[0])

   var date = new Date(data[0].Fecha_Hora);
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
							<p className="parrafo"><b>ID INCIDENCIA: </b> {data[0].id_incidencia}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>FOLIO: </b> {data[0].Folio}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>ZONA: </b> {data[0].Zona}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>VECTOR: </b> {data[0].Vector}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>FEHA/HORA:</b> {date.toLocaleString()}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>SITUACIÓN:</b> {data[0].Situacion}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>TIPO:</b> {data[0].TipodeRobo}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>GIRO:</b> {data[0].Giro}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>VIOLENCIA:</b> {(data[0].Violencia=='N')?'SIN VIOLENCIA':'CON VIOLENCIA'}</p>
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
						<p className='parrafo'><b>COLONIA: </b> {`${data[0].TipoColonia} ${data[0].Colonia}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 1: </b> {`${data[0].Calle_1}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 2: </b> {`${data[0].Calle_2}`}</p>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> DETALLES DE LOS HECHOS: </h3>
					</div>
				</div>
				<div className="row mt-3">
				    <div className="col-md-4">
						<p className='parrafo'><b>MASCULINOS: </b> {`${data[0].Hombres}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>FEMENINOS: </b> {`${data[0].Mujeres}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>DETENIDOS: </b> {`${data[0].CantidadDetenidos}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>OBJETOS: </b> {`${data[0].Objetos}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>OBJETOS RECUPERADOS: </b> {`${data[0].Obj_Recuperados}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>OBSERVACIONES: </b> {`${data[0].Observaciones}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>CARACTERISTICA DEL ROBO: </b> {`${data[0].CaracteristicadelRobo}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>MODO DE FUGA: </b> {`${data[0].MododeFuga}`}</p>
					</div>
				    <div className="col-md-4">
						<p className='parrafo'><b>MODUS OPERANDI: </b> {`${data[0].ModusOperandi}`}</p>
					</div>
				</div>*

			</div> 
		</div>
    </>
  )
}