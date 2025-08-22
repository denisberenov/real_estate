import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

export default function Lightbox({ images, index, setIndex, onClose }) {
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setIndex(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose, setIndex]);

  return createPortal(
    <div className="fullscreen-overlay" onClick={onClose}>
      <button
        className="nav-button left"
        onClick={(e) => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }}
      >‹</button>

      <img
        src={images[index].url}
        alt=""
        className="fullscreen-img"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="nav-button right"
        onClick={(e) => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }}
      >›</button>
    </div>,
    document.body
  );
}
