import React from 'react';

import './ResultsList.css';

export default function ResultsList({ data, setSelectedObject }) {
  return (
    <div className="results-list">
      {data.results.map((item) => (
        <div key={item.id} className="result-card">
          <h2
            className="clickable-title"
            onClick={() => setSelectedObject(item)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            {item.title}
          </h2>
          <p><strong>Address:</strong> {item.address}, {item.city}</p>
          <p><strong>Price:</strong> ${Number(item.price).toLocaleString()}</p>
          <p><strong>Area:</strong> {Number(item.area_sq_m).toLocaleString()} m²</p>
          <p><strong>Rooms:</strong> {item.rooms}</p>
          <p><strong>Type:</strong> {item.property_type}</p>
        </div>
      ))}
    </div>
  );
}
