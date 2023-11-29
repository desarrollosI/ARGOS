import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { GoToPageInput } from './GoToPage';
import { PageSizeSelect } from './PageSizeSelect';
import { PaginationInfo } from './PaginationInfo';

export const Table = ({ columns, data, totalRegisters, updateColumnFilters, columnFilters, gotoPage, prevPage, nxtPage, pageCount, pageIndex, curPage,changePageSize,pageSize, opciones }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: {   },
  } = useTable(
    {
      columns,
      data: data || [],
      initialState: { pageIndex: 0, pageSize  },
    },
    usePagination
  );

  // Update column filters when they change
  useEffect(() => {
    updateColumnFilters(columnFilters);
  }, [columnFilters, updateColumnFilters]);

  const handleFilterChange = (columnId, value) => {
    const newFilters = { ...columnFilters, [columnId]: value };
    updateColumnFilters(newFilters);
  };

  return (
    <div className="container">
    <div className="container">
        <div className="row">
            <h4>{totalRegisters} REGISTROS ENCONTRADOS</h4>
        </div>
    </div>
      <div style={{ overflowX: 'auto' }}>
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} style={{ display: 'flex' }}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()} style={{ flex: 1, padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {column.render('Header')}
                    <div>
                      {column.Filter
                        ? column.Filter({ column, onFilterChange: handleFilterChange,opciones })
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()} style={{ flex: 1, padding: '8px', wordBreak: 'break-word' }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="row">
          <PaginationInfo gotoPage={gotoPage} prevPage={prevPage} nxtPage={nxtPage} pageIndex={pageIndex} pageCount={pageCount} curPage={curPage} />
          <div className="col-md-2">
            <GoToPageInput pageIndex={curPage} pageCount={pageCount} gotoPage={gotoPage}/>
          </div>

          <div className="col-md-5">
            <PageSizeSelect currentPageSize={pageSize} changePageSize={changePageSize} />
          </div>
        </div>
      </div>
    </div>
  );
};
