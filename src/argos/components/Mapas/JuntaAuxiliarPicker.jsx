//Se importa react
import React from 'react';
/*
  El retorno de este componente es el selector para realizar el fitlrado por alguna junta auxiliar
  como recordatorio ya que estamos hablando de capas, no funciona si no existe su capa exactamente con el mismo
  nombre la opcion dentro de los assets
*/
export function JuntaAuxiliarPicker({handleJuntaAuxiliar }) {
  return (
    <div className="row mt-2">
    <div className="col-md-12">
      <div className="form-group">
        <label htmlFor="Junta Auxiliar">Mostrar Junta Auxiliar:</label>
        <div onChange={handleJuntaAuxiliar} >
          <select className="form-select form-select-sm" name="zona" id="zona" >
            <option value="todas">TODAS LAS OPCIONES</option>
            <option value="J.A. IGNACIO ROMERO VARGAS">J.A. IGNACIO ROMERO VARGAS</option>
            <option value="J.A. IGNACIO ZARAGOZA">J.A. IGNACIO ZARAGOZA</option>
            <option value="J.A. LA LIBERTAD">J.A. LA LIBERTAD</option>
            <option value="J.A. LA RESURRECCIÓN">J.A. LA RESURRECCIÓN</option>
            <option value="J.A. SAN ANDRÉS AZUMIATLA">J.A. SAN ANDRÉS AZUMIATLA</option>
            <option value="J.A. SAN BALTAZAR CAMPECHE">J.A. SAN BALTAZAR CAMPECHE</option>
            <option value="J.A. SAN BALTAZAR TETELA">J.A. SAN BALTAZAR TETELA</option>
            <option value="J.A. SAN FELIPE HUEYOTLIPAN">J.A. SAN FELIPE HUEYOTLIPAN</option>
            <option value="J.A. SAN FRANCISCO TOTIMEHUACÁN">J.A. SAN FRANCISCO TOTIMEHUACÁN</option>
            <option value="J.A. SAN JERÓNIMO CALERAS">J.A. SAN JERÓNIMO CALERAS</option>
            <option value="J.A. SAN MIGUEL CANOA">J.A. SAN MIGUEL CANOA</option>
            <option value="J.A. SAN PABLO XOCHIMEHUACÁN">J.A. SAN PABLO XOCHIMEHUACÁN</option>
            <option value="J.A. SAN PEDRO ZACACHIMALPA">J.A. SAN PEDRO ZACACHIMALPA</option>
            <option value="J.A. SAN SEBASTIÁN DE APARICIO">J.A. SAN SEBASTIÁN DE APARICIO</option>
            <option value="J.A. SANTA MARÍA GUADALUPE TECOLA">J.A. SANTA MARÍA GUADALUPE TECOLA</option>
            <option value="J.A. SANTA MARÍA XONACATEPEC">J.A. SANTA MARÍA XONACATEPEC</option>
            <option value="J.A. SANTO TOMÁS CHIAUTLA">J.A. SANTO TOMÁS CHIAUTLA</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );
}