import React from 'react';

import './ButtonGroup.css';

export default function ButtonGroup({ showForm, setShowForm, data, setData, setPage, handleSearchClick, handleOpenFilters, showFilters, setShowFilters }) {
  return (
    <div className="button-container">
      {!showForm && !data && (
        <button
          className="button"
          onClick={() => {
            if (showFilters) {
              setShowFilters(false);
              setShowForm(true);
              setData(null);
            } else {
              handleOpenFilters()
            }
          }}
        >
          Upload
        </button>
      )}
      {!data && (
        <button
          className={showForm ? "top-right-search" : "button"}
          onClick={() => {
            if (!showFilters) {
              // First click → show filters, no search
              setShowForm(false);
              setShowFilters(true);
            } else {
              // Second click → hide filters and search
              setShowFilters(false);
              setPage(1);
              handleSearchClick(1);
            }
          }}
        >
          Search
        </button>
      )}
      {data && (
        <button
          className="top-right-search"
          onClick={() => {
            setData(null)
            setShowForm(false);
            setShowFilters(true);
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
            setShowFilters(false);
          }}
        >
          Upload
        </button>
      )}
    </div>
  );
}
