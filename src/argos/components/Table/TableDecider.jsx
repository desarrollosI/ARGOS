// TableDecider.js
import React from 'react';
import { TableLoader } from '../Shared';
import { TableConstructor } from './TableConstructor';
import { useRemisionesQuery } from '../../../hooks';
import { TableDefinition } from '../NewTable/TableDefinition';

export const TableDecider = ({ lugar }) => {
  let endpoint = '';

  switch (lugar) {
    case 'Detenido: Datos Personales':
      endpoint = '/datos-personales-detenidos-experimental';
      break;
    // Agrega más casos según sea necesario

    default:
      // Manejo de caso no definido
      return null;
  }

  const { remisionesPersonalesQuery, updateColumnFilters, columnFilters, nxtPage, prevPage, page,gotoPage,changePageSize,pageSize } = useRemisionesQuery(endpoint);

  return remisionesPersonalesQuery.isLoading ? (
    Array(10)
      .fill('')
      .map((_, i) => <TableLoader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />)
  ) : (
    <TableDefinition
      lugar={lugar}
      datos={remisionesPersonalesQuery.data.data}
      updateColumnFilters={updateColumnFilters}
      columnFilters={columnFilters}
      nxtPage={nxtPage}
      prevPage={prevPage}
      curPage={page}
      pageCount={remisionesPersonalesQuery.data.data.totalPages}
      gotoPage={gotoPage}
      changePageSize={changePageSize}
      pageSize={pageSize}
      opciones={remisionesPersonalesQuery.data.data.opciones}
    />
  );
};
