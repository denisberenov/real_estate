import React from 'react';
import { useState } from "react";

import './UploadForm.css';

export default function UploadForm({ formData, setFormData, handleFormSubmit, PROPERTY_TYPES }) {
  const [images, setImages] = useState([]);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10); // max 10 images
    setImages(selectedFiles);
  };
  
  return (
    <form className="upload-form" onSubmit={handleFormSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="form-field"
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Area (m²)"
        value={formData.area_sq_m}
        onChange={(e) => setFormData({ ...formData, area_sq_m: e.target.value })}
      />
      <input
        type="number"
        placeholder="Rooms"
        value={formData.rooms}
        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
      />
      <select
        value={formData.property_type}
        onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
        required
      >
        <option value="" disabled>Select Property Type</option>
        {PROPERTY_TYPES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="file-input-wrapper">
        <button
          type="button"
          className="choose-image-button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Choose Images
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          style={{ display: "none" }}
        />

        <div className="image-previews" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {images.map((image, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(image)}
              alt={`preview ${idx}`}
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </div>
      </div>

      <button type="submit" className="button">Submit</button>
    </form>
  );
}
