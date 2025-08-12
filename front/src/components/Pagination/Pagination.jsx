import React from 'react';

import './Pagination.css';

export default function Pagination({ page, setPage, data }) {
  return (
    <div className="pagination-controls">
      <button
        onClick={() => setPage(page - 1)}
        disabled={!data?.previous}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!data?.next}
      >
        Next
      </button>
    </div>
  );
}
