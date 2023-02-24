import '../css/Remision/detenido.css'

export const Detenido = ({data}) => {
  console.log('RECIBI LA REMISION:',data)
  const imgUrl = `http://172.18.0.25/sarai/public/files/Remisiones/${data.Ficha}/FotosHuellas/${data.No_Remision}/rostro_frente.jpeg`;
  return (
    <>
		<div className="container-fluid shadow mt-5">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">DATOS DE LA REMISION:</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-md-4">
					<img src={imgUrl} 
						alt={`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`} 
						className="img-thumbnail ms-2 mb-3"
					/>
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
						<div className="col-md-4">
							<p className='parrafo'><b>TÉLEFONO: </b>	{`${data.Telefono}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>ESCOLARIDAD: </b>	{`${data.Escolaridad}`}</p>
						</div>
						<div className="col-md-4">
							<p className='parrafo'><b>PROCEDENCIA: </b>	{`${data.Lugar_Origen}`}</p>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col">
							<h3 className='text-center titulo'> DATOS DE LOS HECHOS: </h3>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<p className='parrafo'><b>UBICACIÓN: </b>	{`${data.Ubicacion_Hechos}`}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
    </>
  )
}
