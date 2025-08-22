import React, { useState } from 'react';
import Lightbox from '../Lightbox/Lightbox';
import './ResultsList.css';

export default function ResultsList({ data, setSelectedObject }) {
  const [fullscreenImages, setFullscreenImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || !Array.isArray(data.results)) return null;

  return (
    <div className="results-list">
      <h3 className="results-count">
        {data.count} result{data.count !== 1 ? 's' : ''} found
      </h3>

      {data.results.map((item) => {
        const gallery = item.images || [];
        const fallback = item.image ? [{ url: item.image }] : [];
        const images = gallery.length > 0 ? gallery : fallback;

        return (
          <div key={item.id} className="result-card">
            <div className="result-content">
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

              {images.length > 0 && (
                <div className="result-gallery">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={item.title}
                      className="result-thumb"
                      onClick={() => { setFullscreenImages(images); setCurrentIndex(idx); }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {fullscreenImages.length > 0 && (
        <Lightbox
          images={fullscreenImages}
          index={currentIndex}
          setIndex={setCurrentIndex}
          onClose={() => setFullscreenImages([])}
        />
      )}
    </div>
  );
}
