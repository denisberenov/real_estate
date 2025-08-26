import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Lightbox from '../Lightbox/Lightbox';   // ✅ import reusable Lightbox
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './DetailsModal.css';

export default function DetailsModal({ obj, onClose, onSearchClick }) {
  const [fullscreenImages, setFullscreenImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      if (!fullscreenImages || fullscreenImages.length === 0) {
        document.body.style.overflow = prev;
      }
    };
  }, [fullscreenImages]);

  if (!obj) return null;

  const fmtNum = (n) => {
    const num = typeof n === 'number' ? n : parseFloat(n);
    return Number.isFinite(num) ? num.toLocaleString() : n;
  };

  const gallery = Array.isArray(obj.images) ? obj.images : [];
  const cover = obj.image ? [{ url: obj.image }] : [];
  const images = [...cover, ...gallery];

  return createPortal(
    <div className="details-overlay" onClick={onClose}>
      <div className="details-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>
        <h1>{obj.title}</h1>

        {images.length > 0 && (
          <div
            className="image-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
              margin: '12px 0 20px'
            }}
          >
            {images.map((img, idx) => (
              <img
                key={img.id || idx}
                src={img.url}
                alt={img.alt || obj.title}
                style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }}
                onClick={() => {
                  setFullscreenImages(images);
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
        )}

        <p><strong>Description:</strong> {obj.description}</p>
        <p><strong>Address:</strong> {obj.address}</p>
        <p><strong>City:</strong> {obj.city}</p>
        <p><strong>Price:</strong> ${fmtNum(obj.price)}</p>
        <p><strong>Area:</strong> {fmtNum(obj.area_sq_m)} m²</p>
        <p><strong>Rooms:</strong> {obj.rooms}</p>
        <p><strong>Property Type:</strong> {obj.property_type}</p>
        {obj.created_at && (
          <p><strong>Created At:</strong> {new Date(obj.created_at).toLocaleString()}</p>
        )}

        <button 
          className="delete-button"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
      </div>

      {/* Lightbox overlay */}
      {fullscreenImages.length > 0 && (
        <Lightbox
          images={fullscreenImages}
          index={currentIndex}
          setIndex={setCurrentIndex}
          onClose={() => setFullscreenImages([])}
        />
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          item={obj}
          onCancel={() => setShowDeleteModal(false)}
          onSearchClick={onSearchClick}
          onDeleteConfirmed={(id) => {
            // Call your deletion function here
            setShowDeleteModal(false);
            onClose?.(); // optional: close details after delete
          }}
        />
      )}
    </div>,
    document.body
  );
}
