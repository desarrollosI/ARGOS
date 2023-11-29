import React, { useState, useEffect } from 'react';

export const GoToPageInput = ({ pageIndex, pageCount, gotoPage }) => {
  const [inputValue, setInputValue] = useState(pageIndex);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const page = inputValue ? Number(inputValue) : 0;
      gotoPage(page);
    }
  };

  // Actualizar el valor del input si la página cambia externamente
  useEffect(() => {
    setInputValue(pageIndex);
  }, [pageIndex]);

  return (
    <span>
      | IR A LA PÁGINA:{' '}
      <input
        className="form-control input-sm"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{ width: '100px' }}
      />
    </span>
  );
};
