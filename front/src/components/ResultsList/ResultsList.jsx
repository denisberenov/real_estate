import React, { useState, useEffect } from 'react';
import './ResultsList.css';

export default function ResultsList({ data, setSelectedObject }) {
  const [fullscreenImages, setFullscreenImages] = useState([]); // list of images
  const [currentIndex, setCurrentIndex] = useState(0); // current image index

  // Close on ESC key + navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFullscreenImages([]);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) =>
          prev + 1 < fullscreenImages.length ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : fullscreenImages.length - 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImages]);

  // 🔹 Move early return *after* hooks
  if (!data || !Array.isArray(data.results)) {
    return null;
  }

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
                      onClick={() => {
                        setFullscreenImages(images);
                        setCurrentIndex(idx);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {fullscreenImages.length > 0 && (
        <div
          className="fullscreen-overlay"
          onClick={() => setFullscreenImages([])}
        >
          <button
            className="nav-button left"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev - 1 >= 0 ? prev - 1 : fullscreenImages.length - 1
              );
            }}
          >
            ‹
          </button>

          <img
            src={fullscreenImages[currentIndex].url}
            alt="fullscreen view"
            className="fullscreen-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="nav-button right"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev + 1 < fullscreenImages.length ? prev + 1 : 0
              );
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
