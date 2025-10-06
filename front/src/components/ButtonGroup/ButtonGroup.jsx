import React from 'react';

import './ButtonGroup.css';

export default function ButtonGroup({ 
    showForm, 
    setShowForm, 
    data, 
    setData, 
    setError,
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
            setError(null);
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
            setError(null);
            setShowForm(false);
            setShowFilters(true);
          }}
        >
          Search
        </button>
      )}

      {(showForm || showFilters) && (
        <>
          <button
            className="top-right-search"
            onClick={() => {
              setError(null);
              setShowForm(false);
              setShowFilters(true);
              setData(null);
            }}
            disabled={showFilters}
          >
            Search
          </button>
        
          <button
            className="top-right-upload"
            onClick={() => {
              setError(null);
              setShowForm(true);
              setData(null);
              setShowFilters(false);
            }}
            disabled={showForm}
          >
            Upload
          </button>
        </>
      )}

    </div>
  );
}
