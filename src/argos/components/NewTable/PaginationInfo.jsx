// PaginationInfo.jsx
import React from 'react';

export const PaginationInfo = ({ gotoPage, prevPage, nxtPage, pageIndex, pageCount, curPage }) => {
  return (
    <>
      <div className="col-md-3">
        <button className="btn btn-pagination" onClick={() => gotoPage(1)}>
          {'<<'}
        </button>{' '}
        <button className="btn btn-pagination" onClick={prevPage} disabled={pageIndex === 0}>
          {'<'}
        </button>{' '}
        <button className="btn btn-pagination" onClick={nxtPage} disabled={pageIndex === pageCount - 1}>
          {'>'}
        </button>{' '}
        <button className="btn btn-pagination" onClick={() => gotoPage(pageCount - 1)}>
          {'>>'}
        </button>{' '}
      </div>

      <div className="col-md-2">
        <span>
          PÁGINA{' '}
          <strong>
            {curPage} DE {pageCount}
          </strong>{' '}
        </span>
      </div>
    </>
  );
};