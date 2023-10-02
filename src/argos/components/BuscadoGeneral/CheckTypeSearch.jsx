import React from 'react';
import { useAuthStore } from '../../../hooks';

export const CheckTypeSearch = ({ selectedOption, handleOptionChange }) => {

    const { status, user, startLogout } = useAuthStore();

    return (
        <div className="row ms-5">
            {(user.permisos.buscador.general.nombre) &&(
            <div className="col-md-2 form-check">
                <input
                    className="form-check-input form-check-input-sm"
                    type="radio"
                    value="nombre"
                    checked={selectedOption === 'nombre'}
                    onChange={handleOptionChange}
                />
                <label>Nombre</label>
            </div>
            )}
            {(user.permisos.buscador.general.direcciones) &&(
            <div className="col-md-2 form-check">
                <input
                    className="form-check-input form-check-input-sm"
                    type="radio"
                    value="direccion"
                    checked={selectedOption === 'direccion'}
                    onChange={handleOptionChange}
                />
                <label>Direcciones</label>
            </div>
            )}
            {(user.permisos.buscador.general.alias) &&(
            <div className="col-md-2 form-check">
                <input
                    className="form-check-input form-check-input-sm"
                    type="radio"
                    value="alias"
                    checked={selectedOption === 'alias'}
                    onChange={handleOptionChange}
                />
                <label>Alias</label>
            </div>
            )}
            {(user.permisos.buscador.general.placa) &&(   
            <div className="col-md-2 form-check">
                <input
                    className="form-check-input form-check-input-sm"
                    type="radio"
                    value="placaniv"
                    checked={selectedOption === 'placaniv'}
                    onChange={handleOptionChange}
                />
                <label>Placa / NIV</label>
            </div>
            )}
            {(user.permisos.buscador.general.telefono) &&(
            <div className="col-md-2 form-check">
                <input
                    className="form-check-input form-check-input-sm"
                    type="radio"
                    value="telefono"
                    checked={selectedOption === 'telefono'}
                    onChange={handleOptionChange}
                />
                <label>Teléfono</label>
            </div>
            )}
        </div>
    );
};
