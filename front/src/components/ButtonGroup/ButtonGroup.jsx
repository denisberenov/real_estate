import React from 'react';

import './ButtonGroup.css';

export default function ButtonGroup({ showForm, setShowForm, data, setData, setPage, handleSearchClick }) {
  return (
    <div className="button-container">
      {!showForm && !data && (
        <button
          className="button"
          onClick={() => {
            setShowForm(true);
            setData(null);
          }}
        >
          Upload
        </button>
      )}
      {!data && (
        <button
          className={showForm ? "top-right-search" : "button"}
          onClick={() => {
            setPage(1);
            handleSearchClick(1);
          }}
        >
          Search
        </button>
      )}
      {data && !showForm && (
        <button
          className="top-right-upload"
          onClick={() => {
            setShowForm(true);
            setData(null);
          }}
        >
          Upload
        </button>
      )}
    </div>
  );
}
