
export const Detenido = ({data}) => {
  console.log(data)
  const imgUrl = `http://172.18.0.25/sarai/public/files/Remisiones/${data.Ficha}/FotosHuellas/${data.No_Remision}/rostro_frente.jpeg`;
  return (
    <>
		<div className="container shadow">

			<div className="row">
				<div className="col">
					<h2 className="text-center titulo mt-4">Detalles de Remision:</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-md-4">
					<img src={imgUrl} 
						alt={`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`} 
						className="img-thumbnail"
					/>
				</div>
				<div className="col-md-8">
					<p><b>Nombre: </b> {`${data.Nombre} ${data.Ap_Paterno} ${data.Ap_Materno}`}</p>
				</div>
			</div>
		</div>
    </>
  )
}
