//se importa react
import React from 'react'
//Este componente presenta el control para ordenar los resultado de manera ascendente o descendente
export const SpecifyOrderBySelector = ({handeSpecifyOrderByChange}) => {
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="agrupar">Ordenar  :</label>
          <div onChange={handeSpecifyOrderByChange} className="form-check form-check-inline">
            <select className="form-select" name="orden" id="orden">
              <option value="desc">DESENDENTEMENTE</option>
              <option value="asc">ASENDENTEMENTE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
