import '../css/Shared/FichaInformativa.css'
import 'animate.css';
import { ImageZoom } from '../Shared/ImageZoom';
export const Inspeccion = ({data}) => {

  const { generales, fotos, personas } = data;
  console.log(generales, fotos, personas)

  var date = new Date(generales[0].Fecha_Hora_Inspeccion);

  return (
    <>
		<div className="container-fluid shadow mt-5 animate__animated animate__fadeIn mb-4">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">DATOS DE LA INSPECCION:</h2>
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
							<p className="parrafo"><b>FEHA:</b> {date.toLocaleString()}</p>
						</div>
					</div>
				</div>
					
				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> PERSONAS INSPECCIONADAS: </h3>
					</div>
				</div>
				{	
				personas.map( persona => (
					<div className="row mt-3" key={persona.Id_Persona_Inspeccion}>
						<div className="col-md-5">
							<p className='parrafo'><b>NOMBRE: </b> {`${personas[0].Nombre} ${personas[0].Ap_Paterno} ${personas[0].Ap_Materno}`}</p>
						</div>
						<div className="col-md-3">
							<p className='parrafo'><b>NACIMIENTO: </b>	{`${personas[0].Fecha_Nacimiento}`}</p>
						</div>
					</div>
				))
				}

				<div className="row mt-3">
					<div className="col">
						<h3 className='text-center titulo'> VEHICULO INSPECCIONADO: </h3>
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
			</div>
		</div>
    </>
  )
}
