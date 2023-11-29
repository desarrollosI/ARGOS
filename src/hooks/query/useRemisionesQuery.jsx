// En useRemisionesQuery.jsx
import React, { useState, useEffect } from 'react';
import { basesApi } from '../../api';
import { useQuery } from '@tanstack/react-query';

const getRemisionesDatosPersonales = async ({ endpoint, columnFilters = [], page = 1,pageSize }) => {
  console.log('tamaño  pagina: ',pageSize)
  const { data } = await basesApi.post(endpoint, { columnFilters, page, pageSize });
  console.log('VIENE DESDE REACT QUERY HOOK', data);
  return data;
};

export const useRemisionesQuery = (endpoint) => {
  const [page, setPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [columnFilters, setColumnFilters] = useState([]);

  const remisionesPersonalesQuery = useQuery({
    queryKey: [endpoint, { columnFilters, page, pageSize }],
    queryFn: () => getRemisionesDatosPersonales({ endpoint, columnFilters, page, pageSize }),
  });

  const updateColumnFilters = (newFilters) => {
   
    setColumnFilters(newFilters);

  };

  const nxtPage = () => {
    if (remisionesPersonalesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const gotoPage = (page) => {
    setPage(page)
  }
  
  const changePageSize = (size) => {
    setPageSize(size)
  }

  return {
    remisionesPersonalesQuery,
    page,
    pageSize,
    columnFilters,
    nxtPage,
    prevPage,
    gotoPage,
    changePageSize,
    updateColumnFilters,
  };
};