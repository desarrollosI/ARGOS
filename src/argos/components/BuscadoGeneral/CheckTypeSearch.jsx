import React from 'react';

export const CheckTypeSearch = ({ selectedOption, handleOptionChange }) => {
    return (
        <div className="row ms-5">
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
        </div>
    );
};
