import React, { useState } from "react";
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UploadForm from '../UploadForm/UploadForm';
import ResultsList from '../ResultsList/ResultsList';
import Pagination from '../Pagination/Pagination';
import DetailsModal from '../DetailsModal/DetailsModal';
import Filters from '../Filters/Filters';
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import ObjectResultsMap from '../ObjectMap/ObjectResultsMap';

import './Body.css';

export default function Body({
  showForm,
  setShowForm,
  data,
  setData,
  error,
  setError,
  formData,
  setFormData,
  handleFormSubmit,
  PROPERTY_TYPES,
  page,
  setPage,
  selectedObject,
  setSelectedObject,
  handleSearchClick,
  filters,
  setFilters,
  showFilters,
  handleOpenFilters,
  setShowFilters,
  loading,
  fullData,
  fetchAllObjects
}) {

  const [view, setView] = useState("list");

  return (
    <>
      {showFilters && !showForm && !data && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          propertyTypes={PROPERTY_TYPES}
          setShowFilters={setShowFilters}
          setShowForm={setShowForm}
          setPage={setPage}
          handleSearchClick={handleSearchClick}
        />
      )}

      <ButtonGroup
        showForm={showForm}
        setShowForm={setShowForm}
        data={data}
        setData={setData}
        setPage={setPage}
        handleSearchClick={handleSearchClick}
        handleOpenFilters={handleOpenFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        loading={loading}
        setError={setError}
      />

      <ErrorMessage error={error} />

      {showForm && (
        <UploadForm
          formData={formData}
          setFormData={setFormData}
          handleFormSubmit={handleFormSubmit}
          PROPERTY_TYPES={PROPERTY_TYPES}
        />
      )}

      {!loading && data && (
        <div className="results-wrapper">
          {data.results && data.results.length > 0 ? (
            <>
              <ResultsList 
                data={data} 
                setSelectedObject={setSelectedObject} 
                view={view}
                setView={setView}
                fetchAllObjects={fetchAllObjects}
              />
              {view === "list" && data.count > 9 && (
                <Pagination page={page} setPage={setPage} data={data} />
              )}
            </>
          ) : (
            <p className="no-results-message">
              No results found. Try adjusting your filters.
            </p>
          )}
        </div>
      )}

      {!loading && data && view === "map" && (
        <ObjectResultsMap items={fullData} />
      )}

      {loading && (
        <p className="loading-message">Loading results...</p>
      )}

      <ScrollToTopButton />

      {selectedObject && (
        <DetailsModal
          obj={selectedObject}
          onClose={() => setSelectedObject(null)}
          onSearchClick={handleSearchClick}
        />
      )}
    </>
  );
}
