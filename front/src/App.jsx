import React, { useState } from 'react';
import './App.css';

const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
];

export default function App() {
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
  const [error, setError] = useState(null);

  const handleSearchClick = async () => {
    setShowForm(false);
    try {
      const response = await fetch('/api/real-estate/objects/', {
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
      <header className="header">Direct Real Estate</header>

      <div className="button-container">
        {!showForm && (
          <button
            className="button"
            onClick={() => {
              setShowForm(true);
              setData(null); // This hides the data results
            }}
          >
            Upload
        </button>
        )}
        {!data && (
          <button className="button" onClick={handleSearchClick}>Search</button>
        )}
      </div>

      {showForm && (
        <form
          className="upload-form"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-field"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Area (m²)"
            value={formData.area_sq_m}
            onChange={(e) => setFormData({ ...formData, area_sq_m: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rooms"
            value={formData.rooms}
            onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
          />
          <select
            value={formData.property_type}
            onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
            required
          >
            <option value="" disabled>Select Property Type</option>
            {PROPERTY_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button type="submit" className="button">Submit</button>
        </form>
      )}

      {data && (
        <div className="results-wrapper">
          <div className="results-list">
            {data.map((item) => (
              <div key={item.id} className="result-card">
                <h2>{item.title}</h2>
                <p><strong>Address:</strong> {item.address}, {item.city}</p>
                <p><strong>Price:</strong> ${parseFloat(item.price).toLocaleString()}</p>
                <p><strong>Area:</strong> {parseFloat(item.area_sq_m).toLocaleString()} m²</p>
                <p><strong>Rooms:</strong> {item.rooms}</p>
                <p><strong>Type:</strong> {item.property_type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 Direct RE. All rights reserved.</p>
        <p>
          <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );

}
