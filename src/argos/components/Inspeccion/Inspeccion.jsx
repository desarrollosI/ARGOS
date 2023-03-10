import '../css/Shared/FichaInformativa.css'
import 'animate.css';
import { ImageZoom } from '../Shared/ImageZoom';
export const Inspeccion = ({data}) => {

  const { generales, fotos, personas } = data;
  console.log(generales, fotos, personas)

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
				<div className="col-md-8">
					
					<div className="row mt-3">
						
						<div className="col-md-2">
							<p className="parrafo"><b>INSPECCION: </b> {generales[0].Id_Inspeccione}</p>
						</div>
						<div className="col-md-2">
							<p className="parrafo"><b>ZONA: </b> {generales[0].Zona_Sector}</p>
						</div>
						<div className="col-md-4">
							<p className="parrafo"><b>GRUPO: </b> {generales[0].Grupo}</p>
						</div>
					</div>
					
					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> PERSONAS INSPECCIONADAS: </h3>
						</div>
					</div>
          {
            personas.map( persona => {
              <div className="row mt-3" key={persona.Id_PersonaInspeccion}>
						    <div className="col-md-5">
							    <p className='parrafo'><b>NOMBRE: </b> {`${personas[0].Nombre} ${personas[0].Ap_Paterno} ${personas[0].Ap_Materno}`}</p>
						    </div>
                <div className="col-md-3">
                  <p className='parrafo'><b>NACIMIENTO: </b>	{`${personas[0].Fecha_Nacimiento}`}</p>
                </div>
					    </div>
            })
          }
				
				</div>
			</div>
			
			{/* <div className="row">
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
			</div> */}
		</div>
    </>
  )
}
