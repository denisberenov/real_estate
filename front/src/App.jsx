import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchClick = async () => {
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

  return (
    <div className="app-container">
      {!data && <header className="header">Direct Real Estate</header>}

      {!data && (
        <div className="button-container">
          <button className="button">Upload</button>
          <button className="button" onClick={handleSearchClick}>Search</button>
        </div>
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
