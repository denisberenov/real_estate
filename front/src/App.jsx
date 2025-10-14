import React, { useState, useEffect } from 'react';
import './App.css';
import { createPortal } from 'react-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import { handleSearchClick, fetchAllObjects } from './services/search';
import { handleFormSubmit } from './services/submit';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
];

export default function App() {
  const [filters, setFilters] = useState({
    city: '',
    price: '',
    area: '',
    rooms: '',
    property_type: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    price: '',
    area_sq_m: '',
    rooms: '',
    property_type: ''
  });
  const [data, setData] = useState(null);
  const [fullData, setfullData] = useState([]);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");

  useEffect(() => {
    if (page !== null) {
      handleSearchClick({
        pageNumber: page,
        setLoading,
        setShowForm,
        filters,
        setData,
        setError
      });
    }
  }, [page]);

  return (
    <div className="app-container">
      <Header 
        data={data} 
        showForm={showForm} 
        showFilters={showFilters}
      />
      <Body
        showForm={showForm}
        setShowForm={setShowForm}
        data={data}
        setData={setData}
        handleSearchClick={handleSearchClick}
        error={error}
        setError={setError}
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
        PROPERTY_TYPES={PROPERTY_TYPES}
        page={page}
        setPage={setPage}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        fullData={fullData}
        fetchAllObjects={fetchAllObjects}
        setLoading={setLoading}
        setfullData={setfullData}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        view={view}
        setView={setView}
      />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
