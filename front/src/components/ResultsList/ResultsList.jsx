import React from 'react';
import './ResultsList.css';

export default function ResultsList({ data, setSelectedObject }) {
  if (!data || !Array.isArray(data.results)) {
    return null;
  }

  return (
    <div className="results-list">
      {data.results.map((item) => {
        const gallery = item.images || []; // backend gives array of {url: "..."}
        const fallback = item.image ? [{ url: item.image }] : []; // legacy single field
        const images = gallery.length > 0 ? gallery : fallback;

        return (
          <div key={item.id} className="result-card">
            <div className="result-content">
              {/* Left: text */}
              <div className="result-text">
                <h2
                  className="clickable-title"
                  onClick={() => setSelectedObject(item)}
                >
                  {item.title}
                </h2>

                <p><strong>Address:</strong> {item.address}, {item.city}</p>
                <p><strong>Price:</strong> ${Number(item.price).toLocaleString()}</p>
                <p><strong>Area:</strong> {Number(item.area_sq_m).toLocaleString()} m²</p>
                <p><strong>Rooms:</strong> {item.rooms}</p>
                <p><strong>Type:</strong> {item.property_type}</p>
              </div>

              {/* Right: gallery */}
              {images.length > 0 && (
                <div className="result-gallery">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={item.title}
                      className="result-thumb"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
