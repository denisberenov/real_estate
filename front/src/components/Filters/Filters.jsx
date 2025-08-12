import React from 'react';

import './Filters.css';

export default function Filters({ filters, setFilters, propertyTypes }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filters-container">
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
        Price (max):
        <input
          type="number"
          name="price"
          value={filters.price || ''}
          onChange={handleChange}
          placeholder="Max price"
          min="0"
        />
      </label>

      <label>
        Area (min sq m):
        <input
          type="number"
          name="area"
          value={filters.area || ''}
          onChange={handleChange}
          placeholder="Min area"
          min="0"
        />
      </label>

      <label>
        Rooms (min):
        <input
          type="number"
          name="rooms"
          value={filters.rooms || ''}
          onChange={handleChange}
          placeholder="Min rooms"
          min="0"
        />
      </label>

      <label>
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
    </div>
  );
}
