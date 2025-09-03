import React from 'react';

import './ButtonGroup.css';

export default function ButtonGroup({ 
    showForm, 
    setShowForm, 
    data, 
    setData, 
    setPage, 
    handleSearchClick, 
    showFilters, 
    setShowFilters,
    loading
  }) {
  return (
    <div className="button-container">
      {!loading && !showForm && !data && !showFilters && (
        <button
          className="button"
          onClick={() => {
            setShowFilters(false);
            setShowForm(true);
            setData(null);
          }}
        >
          Upload
        </button>
      )}
      {!loading && !data && !showFilters && !showForm && (
        <button
          className={"button"}
          onClick={() => {
            setShowForm(false);
            setShowFilters(true);
          }}
        >
          Search
        </button>
      )}
      {(data || showForm) && (
        <button
          className="top-right-search"
          onClick={() => {
            setShowForm(false);
            setShowFilters(true);
            setData(null);
          }}
        >
          Search
        </button>
      )}
      {!showForm && (showFilters || data) && (
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
