import React, { useState, useEffect } from 'react';
import './App.css';
import { createPortal } from 'react-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import { handleSearchClick, fetchAllObjects } from './services/search';
import { getCoordinatesOSM } from './services/coordinates'

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

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const coordinates = await getCoordinatesOSM(
        `${formData.address}, ${formData.city}, Україна`
      );
      console.log("Resolved coordinates:", coordinates);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("latitude", coordinates.lat);
      data.append("longitude", coordinates.lng);
      data.append("price", formData.price);
      data.append("area_sq_m", formData.area_sq_m);
      data.append("rooms", formData.rooms);
      data.append("property_type", formData.property_type);
      data.append("email", formData.email);

      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      }

      const response = await fetch("/api/real-estate/objects/", {
        method: "POST",
        headers: {
          "X-API-TOKEN": process.env.API_SECRET_TOKEN,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error details from backend:", result);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Successfully created:", result);

      handleSearchClick({
        pageNumber: page,
        setLoading,
        setShowForm,
        filters,
        setData,
        setError
      });

      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        address: "",
        city: "",
        price: "",
        area_sq_m: "",
        rooms: "",
        property_type: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating real estate object:", error);
      alert("Failed to create object: " + error.message);
    }
  };

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
        showFilters={showFilters}
        handleOpenFilters={handleOpenFilters}
        setShowFilters={setShowFilters}
        loading={loading}
        fullData={fullData}
        fetchAllObjects={fetchAllObjects}
        setLoading={setLoading}
        setfullData={setfullData}
      />
      <Footer />
    </div>
  );
}
