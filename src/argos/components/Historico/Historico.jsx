//Es un componente cuya finalidad es refejar mas informacion sobre un registro en este caso de Historico
//importacion de los componnentes necesarios
import { ImageZoom } from '../Shared/ImageZoom';
//importacion de las hojas de estilo requeridas
import '../css/Shared/FichaInformativa.css'
import 'animate.css';
//El componente es sencillo solo es la maquetacion en jsx de la información y como debe de ser mostrada
export const Historico = ({data}) => {
  console.log('RECIBI LA REMISION:',data)
  const imgUrl =  `http://172.18.10.227/planeacion-recuperadas/Historicos/${data[0].Folio}/${data[0].Folio}.jpg`

  return (
    <>
		<div className="container-fluid card shadow mt-5 animate__animated animate__fadeIn mb-4">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">DATOS DE LA REMISION:</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-md-4">
					<ImageZoom url={imgUrl} width={'450'} height={'350'} ml={'20'}/>
				</div>
				
				<div className="col-md-8">
					<div className="row mt-3">

						<div className="col-md-2">
							<p className="parrafo"><b>FOLIO: </b> {data[0].Folio}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>CIA: </b> {(data[0].CIA == 1) ? 'PRIMERA':'SEGUNDA' }</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>SECTOR: </b> {data[0].Zona}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>SUBSECTOR: </b> {data[0].SubSector}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>STATUS REMISION: </b> {data[0].status}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>REMITIDO A: </b> {data[0].Remitido_a}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>FALTA/DELITO: </b> {data[0].F_D}</p>
						</div>
						<div className="col-md-8">
							<p className="parrafo"><b>DETALLES: </b> {data[0].Descripcion}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>FECHA/HORA: </b> {data[0].Fecha_Hora}</p>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> DATOS DEL DETENIDO: </h3>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-md-4">
							<p className="parrafo"><b>NOMBRE: </b> {`${data[0].Nombre_de} ${data[0].Ap_paterno_de} ${data[0].Ap_materno_de}`}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>EDAD: </b>{data[0].Edad_d}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>GÉNERO: </b>{data[0].Sexo_d}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>ESCOLARIDAD: </b>{data[0].Escolaridad_d}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>PROCEDENCIA: </b>{`${data[0].Lugar_Origen_d}`}</p>
						</div>
						<div className="col-md-8">
							<p className='parrafo'><b>DOMICILIO: </b>{`${data[0].Dom_d} ${data[0].No_d}, ${data[0].Calle_2}, ${data[0].Col_d}`}</p>
						</div>
						<div className="col-md-8">
							<p className='parrafo'><b>PERTENENCIAS: </b>{`${data[0].Pertenencias_d}`}</p>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> UBICACIÓN DE LOS HECHOS: </h3>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-md-6">
							<p className='parrafo'><b>UBICACIÓN: </b>{`${data[0].Dom_Hechos} ${data[0].No_h}, ${data[0].Nombre_Colonia}`}</p>
						</div>
						<div className="col-md-6">
							<p className='parrafo'><b>PETICIONARIO: </b>{`${data[0].Nombre_P} ${data[0].Ap_paterno_P} ${data[0].Ap_Materno_P}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>PATRULLA: </b>{`${data[0].Patrulla_No}`}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
    </>
  )
}
