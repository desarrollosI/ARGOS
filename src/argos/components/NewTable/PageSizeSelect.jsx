import React from 'react';

export const PageSizeSelect = ({ currentPageSize, changePageSize }) => {
  return (
    <select
      className="form-control input-sm"
      value={currentPageSize}
      onChange={(e) => {
        changePageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          MOSTRAR {pageSize}
        </option>
      ))}
    </select>
  );
};

