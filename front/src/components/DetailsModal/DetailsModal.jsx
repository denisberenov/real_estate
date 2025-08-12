import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './DetailsModal.css';

export default function DetailsModal({ obj, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const fmtNum = (n) => {
    const num = typeof n === 'number' ? n : parseFloat(n);
    return Number.isFinite(num) ? num.toLocaleString() : n;
  };

  return createPortal(
    <div className="details-overlay" onClick={onClose}>
      <div className="details-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>
        <h1>{obj.title}</h1>
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
      </div>
    </div>,
    document.body
  );
}
