import React, { useState, useEffect } from 'react';
import './App.css';
import { createPortal } from 'react-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';

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
  const [page, setPage] = useState(null);

  const [error, setError] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleSearchClick = async (pageNumber) => {
    setShowForm(false);

    // Build query params from filters + page
    const params = new URLSearchParams();
    params.append("page", pageNumber);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`/api/real-estate/objects/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': 'your_generated_secret_token_here',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  useEffect(() => {
    if (page !== null) {
      handleSearchClick(page);
    }
  }, [page]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/real-estate/objects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': 'your_generated_secret_token_here',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Error details from backend:', result);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Successfully created:', result);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        address: '',
        city: '',
        price: '',
        area_sq_m: '',
        rooms: '',
        property_type: ''
      });
    } catch (error) {
      console.error('Error creating real estate object:', error);
      alert('Failed to create object: ' + error.message);
    }
  };

  return (
    <div className="app-container">
      <Header data={data} showForm={showForm} />
      <Body
        showForm={showForm}
        setShowForm={setShowForm}
        data={data}
        setData={setData}
        handleSearchClick={handleSearchClick}
        error={error}
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
        showFilters={showFilters}
        handleOpenFilters={handleOpenFilters}
        setShowFilters={setShowFilters}
      />
      <Footer />
    </div>
  );
}
