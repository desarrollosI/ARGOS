//Es un componente cuya finalidad es refejar mas informacion sobre un registro en este caso de Remisiones
//importacion de los componnentes necesarios
import { ImageZoom } from '../Shared/ImageZoom';
//importacion de las hojas de estilo requeridas
import '../css/Shared/FichaInformativa.css'
import 'animate.css';
//El componente es sencillo solo es la maquetacion en jsx de la información y como debe de ser mostrada
export const Detenido = ({data}) => {
  console.log('RECIBI LA REMISION:',data)
const imgUrl = window.location.href.includes('172.18.110.90') ? `http://172.18.110.25/sarai/public/files/Remisiones/${data.Ficha}/FotosHuellas/${data.No_Remision}/rostro_frente.jpeg` :
							 window.location.href.includes('187.216.250.252') ? `http://187.216.250.245/sarai/public/files/Remisiones/${data.Ficha}/FotosHuellas/${data.No_Remision}/rostro_frente.jpeg` :
							 `http://187.216.250.245/sarai/public/files/Remisiones/${data.Ficha}/FotosHuellas/${data.No_Remision}/rostro_frente.jpeg`;
const objUrl = window.location.href.includes('172.18.110.90') ? `http://172.18.110.25/sarai/public/files/Remisiones/${data.Ficha}/ObjRecuperados/${data.Ficha}_obj.jpeg` :
							 window.location.href.includes('187.216.250.252') ? `http://187.216.250.245/sarai/public/files/Remisiones/${data.Ficha}/ObjRecuperados/${data.Ficha}_obj.jpeg` :
							 `http://187.216.250.245/sarai/public/files/Remisiones/${data.Ficha}/ObjRecuperados/${data.Ficha}_obj.jpeg`;

  return (
    <>
		<div className="container-fluid card shadow mt-5 animate__animated animate__fadeIn mb-4 content">

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
							<p className="parrafo"><b>FICHA: </b> {data.Ficha}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>REMISION: </b> {data.No_Remision}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>ZONA: </b> {data.Zona}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>VECTOR: </b> {data.Vector}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>STATUS REMISION: </b> {data.Status_Remision}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>REMITIDO A: </b> {data.Instancia}</p>
						</div>
					</div>
					
					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> DATOS DEL DETENIDO: </h3>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-md-5">
							<p className='parrafo'><b>NOMBRE: </b> {`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`}</p>
						</div>
						<div className="col-md-2">
							<p className='parrafo'><b>GÉNERO: </b>	{`${data.Genero}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>NACIMIENTO: </b>	{`${data.Fecha_Nacimiento}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>CURP: </b>	{`${data.CURP}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>RFC: </b>	{`${data.RFC}`}</p>
						</div>
						<div className="col-md-2">
							<p className='parrafo'><b>EDAD: </b>	{`${data.Edad}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>ALIAS: </b>	{`${data.Alias}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>TÉLEFONO: </b>	{`${data.Telefono}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>ESCOLARIDAD: </b>	{`${data.Escolaridad}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>PROCEDENCIA: </b>	{`${data.Lugar_Origen}`}</p>
						</div>
						<div className="col-md-12">
							<p className='parrafo'><b>DOMICILIO: </b>	{`${data.Domicilio_Detenido}`}</p>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> DATOS DE LOS HECHOS: </h3>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<p className='parrafo'><b>FECHA-HORA: </b>	{`${data.Fecha_Hora}`}</p>
						</div>
						<div className="col-md-6">
							<p className='parrafo'><b>FALTAS/DELITOS: </b>	{`${data.Faltas_Delitos_Detenido}`}</p>
						</div>
						<div className="col-md-6">
							<p className='parrafo'><b>UBICACIÓN: </b>	{`${data.Ubicacion_Hechos}`}</p>
						</div>
					</div>

				</div>
			</div>
			
			<div className="row">
				<div className="col d-flex justify-content-center mb-2">
				<a className="btn btn-info" data-bs-toggle="collapse" href={`#rem-${data.No_Remision}`} role="button" aria-expanded="false" aria-controls={`rem-${data.No_Remision}`}>
    				VER MÁS...
  				</a>
				</div>
			</div>

			<div className="row collapse" id={`rem-${data.No_Remision}`}>
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-12">
							<p className="parrafo"><b>ARMAS DETENIDO: </b> {data.Armas_Detenido}</p>
						</div>
						<div className="col-md-12">
							<p className="parrafo"><b>DROGAS DETENIDO: </b> {data.Drogas_Detenido}</p>
						</div>
						<div className="col-md-12">
							<p className="parrafo"><b>OBJETOS DETENIDO: </b> {data.Objetos_Detenido}</p>
						</div>
						<div className="col-md-12">
							<p className="parrafo"><b>VEHICULOS DETENIDO: </b> {data.Vehiculos_Detenido}</p>
						</div>
						<div className="col-md-12">
							<p className="parrafo"><b>VINCULACIONES: </b> {data.Grupo_Vinculado}</p>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 mb-4">
					<ImageZoom url={objUrl} width={'600'} height={'450'}/>
				</div>
			</div>
		</div>
    </>
  )
}
