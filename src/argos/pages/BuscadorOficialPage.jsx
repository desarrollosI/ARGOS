import React from "react";

import { JumpToTop } from "../components/Shared/JumpToTop";
import { SelectBaseComponent } from "../components/Table";

import { useForm } from '../../hooks';
import { personasApi } from "../../api";

const personaFormFields = {
  nombre:    '',
  paterno: '',
  materno: ''
}

export const BuscadorOficialPage = () => {

  const { nombre, paterno, materno, onInputChange:onSearchInputChange } = useForm( personaFormFields );

  const buscarPersona = async ( event ) => {
      event.preventDefault();
      console.log({ nombre,paterno,materno });

      const res = await personasApi.post('/puebla',{ nombre,paterno,materno })
      console.log(res)

  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="titulo">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>{" "}
              Buscador de Información bases Oficiales
            </h1>
          </div>
          <hr />
        </div>

        <div className="row">
          <div className="col">
          <form onSubmit={ buscarPersona }>
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="nombre"
                        value={ nombre }
                        onChange={ onSearchInputChange }
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Apellido Paterno"
                        name="paterno"
                        value={ paterno }
                        onChange={ onSearchInputChange }
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Apellido Ma"
                        name="materno"
                        value={ materno }
                        onChange={ onSearchInputChange }
                    />
                </div>
                
                <div className="d-grid gap-2">
                    <input 
                        type="submit"
                        className="btnSubmit"
                        value="Buscar" 
                    />
                </div>
            </form>
          </div>
        </div>

        {/* <div className="row">
          <SelectBaseComponent base={'PERSONAS'} /> 
        </div> */}
        {/*<div className="row">
          <SelectBaseComponent base={'SARAI INSPECCIONES'} /> 
        </div>*/}
        <JumpToTop/>
      </div>
    </>
  );
};
