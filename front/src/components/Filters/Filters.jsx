import React from 'react';
import './Filters.css';

export default function Filters({ 
    filters, 
    setFilters, 
    propertyTypes,
    setShowFilters,
    setShowForm,
    showFilters,
    setPage,
    handleSearchClick
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="filters-container">
      <label>
        City:
        <input
          type="text"
          name="city"
          value={filters.city || ''}
          onChange={handleChange}
          placeholder="Enter city"
        />
      </label>

      <label>
        Price (min):
        <input
          type="number"
          name="price_min"
          value={filters.price_min || ''}
          onChange={handleChange}
          placeholder="Min price"
          min="0"
        />
      </label>

      <label>
        Price (max):
        <input
          type="number"
          name="price_max"
          value={filters.price_max || ''}
          onChange={handleChange}
          placeholder="Max price"
          min="0"
        />
      </label>

      <label>
        Area (min sq m):
        <input
          type="number"
          name="area_min"
          value={filters.area_min || ''}
          onChange={handleChange}
          placeholder="Min area"
          min="0"
        />
      </label>

      <label>
        Area (max sq m):
        <input
          type="number"
          name="area_max"
          value={filters.area_max || ''}
          onChange={handleChange}
          placeholder="Max area"
          min="0"
        />
      </label>

      <label>
        Rooms (min):
        <input
          type="number"
          name="rooms_min"
          value={filters.rooms_min || ''}
          onChange={handleChange}
          placeholder="Min rooms"
          min="0"
        />
      </label>

      <label className="full-width">
        Property Type:
        <select
          name="property_type"
          value={filters.property_type || ''}
          onChange={handleChange}
        >
          <option value="">All</option>
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <button 
        className="search-button"
        onClick={() => {
            setShowFilters(false);
            setPage(1);
            handleSearchClick(1);
          }}
      >
        Search
      </button>
    </form>
  );
}
