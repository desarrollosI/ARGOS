//Es un componente cuya finalidad es refejar mas informacion sobre un registro en este caso de Inspecciones
//importacion de los componnentes necesarios
import { ImageZoom } from '../Shared/ImageZoom';
//importacion de las hojas de estilo requeridas
import '../css/Shared/FichaInformativa.css'
import 'animate.css';
//El componente es sencillo solo es la maquetacion en jsx de la información y como debe de ser mostrada
export const Inspeccion = ({data}) => {

  const { generales, fotos, personas } = data;
  console.log(generales, fotos, personas)

  var date = new Date(generales[0].Fecha_Hora_Inspeccion);
  const baseURLF='http://187.216.250.245/sarai/public/files/inspecciones/images/'

  return (
    <>
		<div className="container-fluid card shadow mt-5 animate__animated animate__fadeIn mb-4 content">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">DATOS DE LA CONSULTA:</h2>
				</div> 
			</div>

			<div className="row">
				{/* <div className="col-md-4">
					<ImageZoom url={imgUrl} width={'450'} height={'350'} ml={'20'}/>
				</div> */}
				<div className="col-md-12">
					
					<div className="row mt-3">
						
						<div className="col-md-3">
							<p className="parrafo"><b>INSPECCION: </b> {generales[0].Id_Inspeccion}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>ZONA: </b> {generales[0].Zona_Sector}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>GRUPO: </b> {generales[0].Grupo}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>MOTIVO: </b> {generales[0].Motivo_Inspeccion}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>FEHA/HORA:</b> {date.toLocaleString()}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>SOLICITA:</b> {generales[0].Quien_Solicita}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>UNIDAD:</b> {generales[0].Unidad}</p>
						</div>
						<div className="col-md-3">
							<p className="parrafo"><b>RESULTADO:</b> {generales[0].Resultado_Inspeccion}</p>
						</div>
					</div>
				</div>
					
				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> UBICACIÓN DE LA CONSULTA: </h3>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-4">
						<p className='parrafo'><b>COLONIA: </b> {`${generales[0].Colonia}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 1: </b> {`${generales[0].Calle_1}`}</p>
					</div>
					<div className="col-md-4">
						<p className='parrafo'><b>CALLE 2: </b> {`${generales[0].Calle_2}`}</p>
					</div>
					<div className="col-md-2">
						<p className='parrafo'><b>NO. EXT.: </b> {`${generales[0].No_Ext}`}</p>
					</div>
					<div className="col-md-2">
						<p className='parrafo'><b>NO. INT.: </b> {`${generales[0].No_Int}`}</p>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> PERSONAS CONSULTADAS: </h3>
					</div>
				</div>
				{	
				personas.map( persona => (
					<div className="row mt-3" key={persona.Id_Persona_Inspeccion}>
						<div className="col-md-5">
							<p className='parrafo'><b>NOMBRE: </b> {`${persona.Nombre} ${persona.Ap_Paterno} ${persona.Ap_Materno}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>NACIMIENTO: </b>	{`${persona.Fecha_Nacimiento}`}</p>
						</div>
					</div>
				))
				}

				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> VEHICULO CONSULTADO: </h3>
					</div>
				</div>

				<div className="row">
					<div className="col-md-3">
						<p className='parrafo'><b>MARCA: </b>	{`${generales[0].Marca}`}</p>
					</div>
					<div className="col-md-3">
						<p className='parrafo'><b>MODELO: </b>	{`${generales[0].Modelo}`}</p>
					</div>
					<div className="col-md-3">
						<p className='parrafo'><b>SUBMARCA: </b>	{`${generales[0].Submarca}`}</p>
					</div>
					<div className="col-md-3">
						<p className='parrafo'><b>COLOR: </b>	{`${generales[0].Color}`}</p>
					</div>
					<div className="col-md-3">
						<p className='parrafo'><b>PLACA: </b>	{`${generales[0].Placa}`}</p>
					</div>
					<div className="col-md-3">
						<p className='parrafo'><b>NIV: </b>	{`${generales[0].NIV}`}</p>
					</div>
				</div>

				<div className="row">
					<div className="col d-flex justify-content-center mb-2">
						<a className="btn btn-info" data-bs-toggle="collapse" href={`#insp-${generales[0].Id_Inspeccion}`} role="button" aria-expanded="false" aria-controls={`insp-${generales[0].Id_Inspeccion}`}>
    					VER FOTOS...
  					</a>
				</div>

				<div className="row collapse" id={`insp-${generales[0].Id_Inspeccion}`}>
					<div className="row mb-4">
						{
							fotos.map(foto => 
							(
								
								<div className="col-md-4" key={foto.Path_Imagen}>
									<ImageZoom  url={`${baseURLF}${generales[0].Id_Inspeccion}/${foto.Path_Imagen}`} width={'580'} height={'450'}/>
								</div>
							))
								
						}
					</div>
					
			</div>

			</div>

			</div>
		</div>
    </>
  )
}
