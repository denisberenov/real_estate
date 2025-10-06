import React from 'react';
import "./Pagination.css";
import { handlePageChange } from '../../services/general';

export default function Pagination({ page, setPage, data }) {
  const handlePageChange = (newPage) => {
    setPage(newPage);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={() => handlePageChange(setPage, page - 1)}
        disabled={!data?.previous}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => handlePageChange(setPage, page + 1)}
        disabled={!data?.next}
      >
        Next
      </button>
    </div>
  );
}
