import React from 'react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UploadForm from '../UploadForm/UploadForm';
import ResultsList from '../ResultsList/ResultsList';
import Pagination from '../Pagination/Pagination';
import DetailsModal from '../DetailsModal/DetailsModal';

import './Body.css';

export default function Body({
  showForm,
  setShowForm,
  data,
  setData,
  error,
  formData,
  setFormData,
  handleFormSubmit,
  PROPERTY_TYPES,
  page,
  setPage,
  selectedObject,
  setSelectedObject,
  handleSearchClick
}) {
  return (
    <>
      <ButtonGroup
        showForm={showForm}
        setShowForm={setShowForm}
        data={data}
        setData={setData}
        setPage={setPage}
        handleSearchClick={handleSearchClick}
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

      {data && (
        <div className="results-wrapper">
          <ResultsList data={data} setSelectedObject={setSelectedObject} />
          <Pagination page={page} setPage={setPage} data={data} />
        </div>
      )}

      {selectedObject && (
        <DetailsModal
          obj={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </>
  );
}
